
export default class AuthStore {
  constructor() {
    const HomePageActions = this.alt.getActions('HomePage');

    this.bindListeners({
      onFetchNewestSuccess: HomePageActions.fetchNewestSuccess,
    });

    this.state = {
      assets: {},
    };
  }

  onFetchNewestSuccess(newAssets) {
    const assets = {};
    newAssets.audio.forEach(asset => assets[asset.id] = asset);
    newAssets.image.forEach(asset => assets[asset.id] = asset);
    this.setState({ assets });
  }
}
