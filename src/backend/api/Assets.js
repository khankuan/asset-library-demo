
const AssetApi = {

  //  Just grab any 4 asset of category (audio, image) each
  getNewest: (req, res, next) => {
    const audioPromise = req.models.Asset.findAll({
      limit: 4,
      order: 'createdAt DESC',
      where: { category: 'audio' },
    });

    const imagePromise = req.models.Asset.findAll({
      limit: 4,
      order: 'createdAt DESC',
      where: { category: 'image' },
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
    query.order = 'createdAt DESC';
    query.where = {category: req.params.category};

    return req.models.Asset.findAll(query)
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
