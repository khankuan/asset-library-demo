export default class Like {
  constructor(request) {
    this.request = request;
  }

  likeAsset(assetId) {
    return this.request.post(`/users/assets/${assetId}/like`, {});
  }

  unlikeAsset(assetId) {
    return this.request.post(`/users/assets/${assetId}/unlike`, {});
  }

  fetchUserLikes(userId) {
    return this.request.get(`/users/${userId}/likes`, {});
  }
}
