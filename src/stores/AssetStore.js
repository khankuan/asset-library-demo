
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
    this._extractLikedBy(newAssets).forEach(newAsset => {
      assets[newAsset.id] = newAsset;
    });
    this.setState({ assets });
  }

  //  Converts likedby into just an array of userid
  _extractLikedBy(assets) {
    assets.forEach(asset => {
      asset.likedBy = asset.likedBy.map(likedBy => likedBy.id);
    });
    return assets;
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
      const userId = this.alt.getStore('Auth').getState().authUser;
      if (asset.likedBy.indexOf(userId) === -1) {
        asset.likedBy.push(userId);
        asset.isLiked = true;
      }
      assets[asset.id] = asset;
      this.setState({ assets });
    }
  }

  onUnlikeAsset(assetId) {
    const assets = this.state.assets;
    let asset = assets[assetId];
    if (asset) {
      asset = {...asset}; //  Clone object so we can ensure === checks will fail. Or we can use immutable in the future.
      const userId = this.alt.getStore('Auth').getState().authUser;
      if (asset.likedBy.indexOf(userId) > -1) {
        asset.likedBy.splice(asset.likedBy.indexOf(userId), 1);
        delete asset.isLiked;
      }
      assets[asset.id] = asset;
      this.setState({ assets });
    }
  }
}
