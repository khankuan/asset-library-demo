
export default function(api) {
  return class CategoryPageActions {
    constructor() {
    }

    fetchCategory(category) {
      this.dispatch(category);

      return api.Asset.fetchCategory(category)
        .then(this.actions.fetchCategorySuccess, this.actions.fetchCategoryError);
    }

    fetchCategorySuccess(assets) {
      this.dispatch(assets);
      return assets;
    }

    fetchCategoryError(error) {
      this.dispatch(error);
      return error;
    }
  };
}
