export default function(api) {
  return class AssetActions {
    constructor() {
    }

    create(file) {
      this.dispatch(file);
      return api.Asset.createAsset(file)
        .then(this.actions.createSuccess, this.actions.createError);
    }

    createSuccess(asset) {
      this.dispatch(asset);
      return asset;
    }

    createError(error) {
      this.dispatch(error);
      return error;
    }

    get(assetId) {
      this.dispatch(assetId);
      return api.Asset.get(assetId)
        .then(this.actions.getSuccess, this.actions.getError);
    }

    getSuccess(asset) {
      this.dispatch(asset);
      return asset;
    }

    getError(error) {
      this.dispatch(error);
      return error;
    }

    likeAsset(assetId) {
      this.dispatch(assetId);
      return api.Like.likeAsset(assetId)
        .then(this.actions.likeAssetSuccess.bind(null, assetId),
              this.actions.likeAssetError.bind(null, assetId));
    }

    likeAssetSuccess(assetId) {
      this.dispatch(assetId);
      return assetId;
    }

    likeAssetError(assetId, error) {
      this.dispatch(assetId, error);
      return error;
    }

    unlikeAsset(assetId) {
      this.dispatch(assetId);
      return api.Like.unlikeAsset(assetId)
        .then(this.actions.unlikeAssetSuccess.bind(null, assetId),
              this.actions.unlikeAssetError.bind(null, assetId));
    }

    unlikeAssetSuccess(assetId) {
      this.dispatch(assetId);
      return assetId;
    }

    unlikeAssetError(assetId, error) {
      this.dispatch(assetId, error);
      return error;
    }
  };
}
