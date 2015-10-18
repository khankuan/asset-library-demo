
export default function(api) {
  return class HomePageActions {
    constructor() {
    }

    fetchNewest() {
      this.dispatch();

      return api.Asset.fetchNewest()
        .then(this.actions.fetchNewestSuccess, this.actions.fetchNewestError);
    }

    fetchNewestSuccess(assets) {
      this.dispatch(assets);
      return assets;
    }

    fetchNewestError(error) {
      this.dispatch(error);
      return error;
    }
  };
}
