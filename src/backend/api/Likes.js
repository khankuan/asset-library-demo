const LikesApi = {

  /*  Assets Like */
  getUserLikedAssets: (req, res, next) => {
    const userId = req.params.userId;
    return req.models.Likes.find({ userId })
      .then(likes => {
        return req.models.Assets.find({id: {$in: likes.map(like => like.assetId) }});
      })
      .then(assets => {
        res.send(assets.map(asset => asset.toObject()));
      }, next);
  },

  getAssetLikedByUsers: (req, res, next) => {
    const assetId = req.params.assetId;
    return req.models.Likes.find({ assetId })
      .then(likes => {
        return req.models.User.find({id: {$in: likes.map(like => like.userId) }});
      })
      .then(users => {
        res.send(users.map(user => user.toProfile()));
      }, next);
  },

  likeAsset: (req, res, next) => {
    const userId = req.session.userId;
    const assetId = req.params.assetId;
    return req.models.Likes.upsert({ userId, assetId })
      .then(like => {
        res.send();
      }, next);
  },


  unlikeAsset: (req, res, next) => {
    const userId = req.session.userId;
    const assetId = req.params.assetId;
    return req.models.Likes.destroy({ userId, assetId })
      .then(like => {
        res.send();
      }, next);
  },

};

module.exports = LikesApi;
