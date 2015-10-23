//  Global store for all asset objects.

export default class AssetStore {
  constructor() {
    const HomePageActions = this.alt.getActions('HomePage');
    const CategoryPageActions = this.alt.getActions('CategoryPage');
    const LikesPageActions = this.alt.getActions('LikesPage');
    const AssetActions = this.alt.getActions('Asset');

    this.bindListeners({
      onFetchNewestSuccess: HomePageActions.fetchNewestSuccess,
      onFetchCategorySuccess: CategoryPageActions.fetchCategorySuccess,
      onFetchUserLikesSuccess: LikesPageActions.fetchUserLikesSuccess,
      onGetSuccess: AssetActions.getSuccess,
      onCreateSuccess: AssetActions.createSuccess,
      onLikeAsset: AssetActions.likeAsset,
      onUnlikeAsset: AssetActions.unlikeAsset,
    });

    this.state = {
      assets: {},
    };
  }

  _setAssets(newAssets) {
    const isArr = Array.isArray(newAssets);
    if (!isArr) {
      newAssets = [newAssets];
    }

    const assets = this.state.assets;
    newAssets.forEach(newAsset => {
      assets[newAsset.id] = newAsset;
    });
    this.setState({ assets });
  }

  onFetchNewestSuccess(newAssets) {
    this._setAssets(newAssets.audio);
    this._setAssets(newAssets.image);
  }

  onFetchCategorySuccess(newAssets) {
    this._setAssets(newAssets);
  }

  onFetchUserLikesSuccess(newAssets) {
    this._setAssets(newAssets);
  }

  onGetSuccess(asset) {
    this._setAssets(asset);
  }

  onCreateSuccess(asset) {
    this._setAssets(asset);
  }

  onLikeAsset(assetId) {
    const assets = this.state.assets;
    let asset = assets[assetId];
    if (asset) {
      asset = {...asset}; //  Clone object so we can ensure === checks will fail. Or we can use immutable in the future.
      asset.likedByCount = asset.likedByCount ? asset.likedByCount + 1 : 1;
      asset.isLiked = true;
      assets[asset.id] = asset;
      this.setState({ assets });
    }
  }

  onUnlikeAsset(assetId) {
    const assets = this.state.assets;
    let asset = assets[assetId];
    if (asset) {
      asset = {...asset}; //  Clone object so we can ensure === checks will fail. Or we can use immutable in the future.
      asset.likedByCount = asset.likedByCount ? asset.likedByCount - 1 : 0;
      asset.isLiked = false;
      assets[asset.id] = asset;
      this.setState({ assets });
    }
  }
}
