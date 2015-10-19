
export default class AssetStore {
  constructor() {
    const HomePageActions = this.alt.getActions('HomePage');
    const CategoryPageActions = this.alt.getActions('CategoryPage');
    const AssetActions = this.alt.getActions('Asset');

    this.bindListeners({
      onFetchNewestSuccess: HomePageActions.fetchNewestSuccess,
      onFetchCategorySuccess: CategoryPageActions.fetchCategorySuccess,
      onGetSuccess: AssetActions.getSuccess,
      onCreateSuccess: AssetActions.createSuccess,
    });

    this.state = {
      assets: {},
    };
  }

  _setAsset(asset) {
    const assets = this.state.assets;
    assets[asset.id] = asset;
    this.setState({ assets });
  }

  onFetchNewestSuccess(newAssets) {
    const assets = this.state.assets;
    newAssets.audio.forEach(asset => assets[asset.id] = asset);
    newAssets.image.forEach(asset => assets[asset.id] = asset);
    this.setState({ assets });
  }

  onFetchCategorySuccess(newAssets) {
    const assets = this.state.assets;
    newAssets.forEach(asset => assets[asset.id] = asset);
    this.setState({ assets });
  }

  onGetSuccess(asset) {
    this._setAsset(asset);
  }

  onCreateSuccess(asset) {
    this._setAsset(asset);
  }
}
