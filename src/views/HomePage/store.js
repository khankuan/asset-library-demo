
export default class AuthStore {
  constructor() {
    const HomePageActions = this.alt.getActions('HomePage');

    this.bindListeners({
      onFetchNewest: HomePageActions.fetchNewest,
      onFetchNewestSuccess: HomePageActions.fetchNewestSuccess,
      onFetchNewestError: HomePageActions.fetchNewestError,
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
    const newestAssetIds = { audio: {}, image: {} };
    newestAssetIds.audio = assets.audio.map(asset => asset.id);
    newestAssetIds.image = assets.image.map(asset => asset.id);
    this.setState({ loading: false, newestAssetIds });
  }

  onFetchNewestError(error) {
    this.setState({ loading: false, error });
  }
}
