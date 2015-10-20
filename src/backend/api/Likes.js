import AssetApi from './Assets';

const LikesApi = {

  /*  Assets Like */
  getUserLikedAssets: (req, res, next) => {
    const userId = req.params.userId;
    return req.models.Like.findAll({where: { userId }})
      .then(likes => {
        return req.models.Asset.findAll({id: {$in: likes.map(like => like.assetId) }});
      })
      .then(AssetApi._populateAssetsWithLikedBy.bind(null, req))
      .then(assets => {
        res.send(assets);
      }, next);
  },

  getAssetLikedUsers: (req, res, next) => {
    const assetId = req.params.assetId;
    return req.models.Likes.findAll({ assetId })
      .then(likes => {
        return req.models.User.findAll({id: {$in: likes.map(like => like.userId) }});
      })
      .then(users => {
        res.send(users.map(user => user.toProfile()));
      }, next);
  },

  likeAsset: (req, res, next) => {
    const userId = req.session.userId;
    const assetId = req.params.assetId;
    return req.models.Like.upsert({ userId, assetId })
      .then(like => {
        res.send();
      }, next);
  },


  unlikeAsset: (req, res, next) => {
    const userId = req.session.userId;
    const assetId = req.params.assetId;
    return req.models.Like.destroy({where: { userId, assetId }})
      .then(like => {
        res.send();
      }, next);
  },

};

module.exports = LikesApi;
