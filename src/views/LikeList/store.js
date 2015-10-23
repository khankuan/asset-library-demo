//  This store  handles 'Like' relationship between user and asset.
//  In the future if there are other use cases that needs the relationship data,
//  we can refactor this into a global store
export default class LikeListStore {
  constructor() {
    const LikeListActions = this.alt.getActions('LikeList');
    const AssetActions = this.alt.getActions('Asset');

    this.bindListeners({
      onFetchAssetLikedBy: LikeListActions.fetchAssetLikedBy,
      onFetchAssetLikedBySuccess: LikeListActions.fetchAssetLikedBySuccess,
      onFetchAssetLikedByError: LikeListActions.fetchAssetLikedByError,
      onLikeAsset: AssetActions.likeAsset,
      onUnlikeAsset: AssetActions.unlikeAsset,
    });

    this.state = {
      likeList: {},
      likeListState: {},
    };
  }

  onFetchAssetLikedBy(assetId) {
    const likeListState = this.state.likeListState;
    likeListState[assetId] = 'PENDING';
    this.setState({ likeListState });
  }

  onFetchAssetLikedBySuccess({ assetId, users }) {
    const likeList = this.state.likeList;
    likeList[assetId] = users.map(user => user.id);
    const likeListState = this.state.likeListState;
    likeListState[assetId] = 'SUCCESS';
    this.setState({ likeList, likeListState });
  }

  onFetchAssetLikedByError({ assetId, error }) {
    const likeListState = this.state.likeListState;
    likeListState[assetId] = 'ERROR';
    this.setState({ likeListState });
  }

  onLikeAsset(assetId) {
    const likeList = this.state.likeList;
    const userId = this.alt.getStore('Auth').authUser ? this.alt.getStore('Auth').authUser.id : null;
    if (userId && likeList[assetId]) {
      likeList[assetId].splice(likeList[assetId].indexOf(userId), 1);
      this.setState({ likeList });
    }
  }

  onUnlikeAsset(assetId) {
    const likeList = this.state.likeList;
    const userId = this.alt.getStore('Auth').authUser ? this.alt.getStore('Auth').authUser.id : null;
    if (userId && likeList[assetId] && likeList[assetId].indexOf(userId) === -1) {
      likeList[assetId].push(userId);
      this.setState({ likeList });
    }
  }

}
