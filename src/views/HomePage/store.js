
export default class HomePageStore {
  constructor() {
    const HomePageActions = this.alt.getActions('HomePage');
    const AssetActions = this.alt.getActions('Asset');

    this.bindListeners({
      onFetchNewest: HomePageActions.fetchNewest,
      onFetchNewestSuccess: HomePageActions.fetchNewestSuccess,
      onFetchNewestError: HomePageActions.fetchNewestError,
      onCreateSuccess: AssetActions.createSuccess,
    });

    this.state = {
      loading: false,
      error: null,
      newestAssetIds: null,
    };
  }

  onFetchNewest() {
    this.setState({ loading: true });
  }

  onFetchNewestSuccess(assets) {
    const newestAssetIds = this.state.newestAssetIds || { audio: {}, image: {} };
    newestAssetIds.audio = assets.audio.map(asset => asset.id);
    newestAssetIds.image = assets.image.map(asset => asset.id);
    this.setState({ loading: false, newestAssetIds });
  }

  onFetchNewestError(error) {
    this.setState({ loading: false, error });
  }

  onCreateSuccess(asset) {
    //  Push new asset into home page, only if they are fetched before
    const newestAssetIds = this.state.newestAssetIds;
    if (newestAssetIds) {
      newestAssetIds[asset.category].unshift(asset.id);
      newestAssetIds[asset.category].splice(4, 1);
      this.setState({ newestAssetIds });
    }
  }
}
