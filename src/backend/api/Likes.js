import AssetApi from './Assets';

const LikesApi = {

  /*  Assets Like */
  getUserLikedAssets: (req, res, next) => {
    const userId = req.params.userId;
    return req.models.Like.findAll({where: { userId }})
      .then(likes => {
        const assetIds = likes.map(like => like.assetId);
        return req.models.Asset.findAll({where: {id: assetIds }});
      })
      .then(AssetApi._populateAssetsWithLikedBy.bind(null, req))
      .then(assets => {
        res.status(200).send(assets);
      }, next);
  },

  getAssetLikedUsers: (req, res, next) => {
    const assetId = req.params.assetId;
    return req.models.Like.findAll({where: { assetId }})
      .then(likes => {
        const likeUserIds = likes.map(like => like.userId);
        return req.models.User.findAll({where: {id: likeUserIds}});
      })
      .then(users => {
        res.status(200).send(users.map(user => user.toProfile()));
      }, next);
  },

  likeAsset: (req, res, next) => {
    const userId = req.session.userId;
    const assetId = req.params.assetId;
    return req.models.Like.upsert({ userId, assetId })
      .then(like => {
        res.status(200).send();
      }, next);
  },


  unlikeAsset: (req, res, next) => {
    const userId = req.session.userId;
    const assetId = req.params.assetId;
    return req.models.Like.destroy({where: { userId, assetId }})
      .then(like => {
        res.status(200).send();
      }, next);
  },

};

module.exports = LikesApi;
