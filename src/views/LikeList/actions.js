
export default function(api) {
  return class LikeListActions {
    constructor() {
      this.generateActions('fetchAssetLikedBySuccess', 'fetchAssetLikedByError');
    }

    fetchAssetLikedBy(assetId) {
      this.dispatch(assetId);

      return api.Asset.fetchAssetLikedBy(assetId)
        .then(users => {
          return this.actions.fetchAssetLikedBySuccess({assetId, users});
        }, error => {
          return this.actions.fetchAssetLikedByError({assetId, error});
        });
    }
  };
}
