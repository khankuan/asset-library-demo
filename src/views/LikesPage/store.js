
export default class LikesPageStore {
  constructor() {
    const LikesPageActions = this.alt.getActions('LikesPage');
    const AssetActions = this.alt.getActions('Asset');

    this.bindListeners({
      onFetchUserLikes: LikesPageActions.fetchUserLikes,
      onFetchUserLikesSuccess: LikesPageActions.fetchUserLikesSuccess,
      onFetchUserLikesError: LikesPageActions.fetchUserLikesError,
      onCreateSuccess: AssetActions.createSuccess,
    });

    this.state = {
      likesUserId: null,
      likesAssetIds: null,
      fetchState: null,
      fetchError: null,
    };
  }

  onFetchUserLikes(likesUserId) {
    this.setState({ likesUserId, fetchState: 'PENDING'});
  }

  onFetchUserLikesSuccess(assets) {
    this.setState({
      likesAssetIds: assets.map(asset => asset.id),
      fetchState: 'SUCCESS',
      fetchError: null,
    });
  }

  onFetchUserLikesError(error) {
    this.setState({ fetchError: error, fetchState: 'ERROR'});
  }

  onCreateSuccess(asset) {
    if (this.state.likesUserId === asset.likesUserId) {
      const likesAssetIds = this.state.likesAssetIds;
      likesAssetIds.unshift(asset.id);
      this.setState({ likesAssetIds });
    }
  }
}
