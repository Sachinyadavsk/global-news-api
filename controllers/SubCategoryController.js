import SubCategory from "../models/SubCategory.js";

//  Create SubCategory API
export const createSubCategory = async (req, res) => {
    try {
        let body = { ...req.body };

        const subcategory = new SubCategory(body);
        const saved = await subcategory.save();

        res.status(201).json({
            success: true,
            message: "SubCategory created successfully",
            data: saved
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//  Get All SubCategories
export const getSubCategories = async (req, res) => {
    try {
        let { page = 1, limit = 5, search = "" } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const query = {};

        // 🔍 Search (by name or slug)
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { slug: { $regex: search, $options: "i" } }
            ];
        }

        // Total count
        const total = await SubCategory.countDocuments(query);

        // Fetch paginated data
        const subCategories = await SubCategory.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: subCategories,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.log("ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//  Get by Category ID
export const getByCategory = async (req, res) => {
    try {
        const data = await SubCategory.find({ category_id: req.params.category_id });

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching subcategories",
            error: error.message
        });
    }
};

//  Get Single SubCategory
export const getSubCategoryById = async (req, res) => {
    try {
        const data = await SubCategory.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "SubCategory not found"
            });
        }

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching subcategory",
            error: error.message
        });
    }
};

//  Update
export const updateSubCategory = async (req, res) => {
    try {
        let body = { ...req.body };

        const updated = await SubCategory.findByIdAndUpdate(
            req.params.id,
            body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "SubCategory not found"
            });
        }

        res.json({
            success: true,
            message: "SubCategory updated",
            data: updated
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating subcategory",
            error: error.message
        });
    }
};

//  Delete
export const deleteSubCategory = async (req, res) => {
    try {
        const deleted = await SubCategory.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "SubCategory not found"
            });
        }

        res.json({
            success: true,
            message: "SubCategory deleted"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting subcategory",
            error: error.message
        });
    }
};