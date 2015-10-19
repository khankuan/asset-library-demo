
const AssetApi = {

  //  Dumbly populates the likedBy attribute with user profile objects
  _populateAssetsWithLikedBy: (req, inputs) => {
    const authUser = req.session ? req.session.userId : null;
    const isArr = Array.isArray(inputs);
    let assets = inputs;
    if (!isArr) {
      assets = [inputs];
    }

    return Promise.all(assets.map(asset => {
      return asset.getLikedBy()
        .then(users => {
          const assetObj = asset.toObject();
          assetObj.likedBy = users.map(user => user.toProfile());
          assetObj.isLiked = users.map(user => user.id).indexOf(authUser) > -1;
          return assetObj;
        });
    })).then(results => {
      if (!isArr) {
        return results[0];
      }

      return results;
    });
  },

  //  Just grab any 4 asset of category (audio, image) each
  getNewest: (req, res, next) => {
    const audioPromise = req.models.Asset.findAll({
      limit: 4,
      order: 'createdAt DESC',
      where: { category: 'audio' },
    }).then(AssetApi._populateAssetsWithLikedBy.bind(null, req));

    const imagePromise = req.models.Asset.findAll({
      limit: 4,
      order: 'createdAt DESC',
      where: { category: 'image' },
    }).then(AssetApi._populateAssetsWithLikedBy.bind(null, req));

    return Promise.all([audioPromise, imagePromise])
      .then(results => {
        res.send({
          audio: results[0],
          image: results[1],
        });
      }, next);
  },

  getByCategory: (req, res, next) => {
    const query = req.query;
    query.limit = query.limit || 10;
    query.order = 'createdAt DESC';
    query.where = {category: req.params.category};

    return req.models.Asset.findAll(query)
      .then(AssetApi._populateAssetsWithLikedBy.bind(null, req))
      .then(assets => {
        res.send(assets);
      }, next);
  },

  getAsset: (req, res, next) => {
    const assetId = req.params.assetId;
    return req.models.Asset.findById(assetId)
      .then(AssetApi._populateAssetsWithLikedBy.bind(null, req))
      .then(asset => {
        res.send(asset);
      }, next);
  },

  getAssetData: (req, res, next) => {
    const assetId = req.params.assetId;
    return req.models.Asset.findById(assetId)
      .then(asset => {
        res.writeHead(200, {'Content-Type': asset.contentType });
        res.end(asset.data, 'binary');
      }, next);
  },

  createAsset: (req, res, next) => {
    const file = req.file || {name: 'Test', mimetype: 'audio/mp3', buffer: 'DATA'};
    return req.models.Asset.create({
      title: file.originalname,
      contentType: file.mimetype,
      data: file.buffer,
    }).then(asset => {
      res.send(asset.toObject());
    }, next);
  },

};

module.exports = AssetApi;
