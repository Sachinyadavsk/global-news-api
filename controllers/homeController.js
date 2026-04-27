import Post from "../models/Post.js";
export const getHomeData = async (req, res) => {
    try {
        const latestPost = await Post.findOne().sort({ _id: -1 });
        const specialDeals = await Post.find({ category_id: 7 }).limit(8);
        const popular = await Post.find({ is_popular: true }).limit(8);
        const under10 = await Post.find({ is_deals_under: true }).limit(8);

        res.json({
            latestPost,
            slidersTop,
            slidersBottom,
            slidersExclusives,
            specialDeals,
            popular,
            under10
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};