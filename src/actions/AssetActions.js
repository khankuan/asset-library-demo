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
  };
}
