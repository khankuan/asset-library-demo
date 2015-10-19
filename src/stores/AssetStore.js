
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
      onLikeAsset: AssetActions.likeAsset,
      onUnlikeAsset: AssetActions.unlikeAsset,
    });

    this.state = {
      assets: {},
    };
  }

  _setAsset(asset) {
    const assets = this.state.assets;
    assets[asset.id] = this._extractLikedBy(asset);
    this.setState({ assets });
  }

  //  Converts likedby into just an array of userid
  _extractLikedBy(inputs) {
    const isArr = Array.isArray(inputs);
    let assets = inputs;
    if (!isArr) {
      assets = [inputs];
    }

    assets.forEach(asset => {
      asset.likedBy = asset.likedBy.map(likedBy => likedBy.id);
    });

    if (!isArr) {
      assets = assets[0];
    }
    return assets;
  }

  onFetchNewestSuccess(newAssets) {
    const assets = this.state.assets;
    newAssets.audio = this._extractLikedBy(newAssets.audio);
    newAssets.audio.forEach(asset => assets[asset.id] = asset);
    newAssets.image = this._extractLikedBy(newAssets.image);
    newAssets.image.forEach(asset => assets[asset.id] = asset);
    this.setState({ assets });
  }

  onFetchCategorySuccess(newAssets) {
    const assets = this.state.assets;
    this._extractLikedBy(newAssets).forEach(asset => assets[asset.id] = asset);
    this.setState({ assets });
  }

  onGetSuccess(asset) {
    this._setAsset(asset);
  }

  onCreateSuccess(asset) {
    this._setAsset(asset);
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
