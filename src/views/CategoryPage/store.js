//  Store for Page: Note that this store only stores id and component depends on global asset store as truth.
//  Note that page/component stores often contain "app states". View states are stored here for consistency and easy debugging.
export default class {
  constructor() {
    const CategoryPageActions = this.alt.getActions('CategoryPage');
    const AssetActions = this.alt.getActions('Asset');

    this.bindListeners({
      onFetchCategory: CategoryPageActions.fetchCategory,
      onFetchCategorySuccess: CategoryPageActions.fetchCategorySuccess,
      onFetchCategoryError: CategoryPageActions.fetchCategoryError,
      onCreateSuccess: AssetActions.createSuccess,
    });

    this.state = {
      category: null,
      categoryAssetIds: null,
      fetchState: null,
      fetchError: null,
    };
  }

  onFetchCategory(category) {
    this.setState({ category, fetchState: 'PENDING'});
  }

  onFetchCategorySuccess(assets) {
    this.setState({
      categoryAssetIds: assets.map(asset => asset.id),
      fetchState: 'SUCCESS',
      fetchError: null,
    });
  }

  onFetchCategoryError(error) {
    this.setState({ fetchError: error, fetchState: 'ERROR'});
  }

  onCreateSuccess(asset) {
    if (this.state.category === asset.category) {
      const categoryAssetIds = this.state.categoryAssetIds;
      categoryAssetIds.unshift(asset.id);
      this.setState({ categoryAssetIds });
    }
  }
}
