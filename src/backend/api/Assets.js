
const AssetApi = {

  //  Just grab any 4 asset of category (audio, image) each
  getNewest: (req, res, next) => {
    const audioPromise = req.User.Asset.find({
      limit: 4,
      order: '-createdAt',
      category: 'audio',
    });

    const imagePromise = req.User.Asset.find({
      limit: 4,
      order: '-createdAt',
      category: 'image',
    });

    return Promise.all([audioPromise, imagePromise])
      .then(results => {
        res.send({
          audio: results[0].map(asset => asset.toObject()),
          image: results[1].map(asset => asset.toObject()),
        });
      }, next);
  },

  getByCategory: (req, res, next) => {
    const query = req.query;
    query.limit = query.limit || 10;
    query.order = 'createdAt';
    query.where = {category: req.params.category};

    return req.models.Asset.find(query)
      .then(assets => {
        res.send(assets.map(asset => asset.toObject()));
      }, next);
  },

  getAsset: (req, res, next) => {
    const assetId = req.params.assetId;
    return req.models.Asset.findById(assetId)
      .then(asset => {
        res.send(asset.toObject());
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
    const file = req.file;
    return req.models.Asset.create({
      title: file.filename,
      contentType: file.mimetype,
      data: file.buffer,
    }).then(asset => {
      res.send(asset.toObject());
    }, next);
  },

};

module.exports = AssetApi;
