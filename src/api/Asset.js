
export default class Asset {
  constructor(request) {
    this.request = request;
  }

  fetchNewest() {
    return this.request.get('/assets/newest');
  }

  fetchCategory(category) {
    return this.request.get('/assets/category/' + category);
  }

  get(assetId) {
    return this.request.get('/assets/' + assetId);
  }

  getAssetLikedUsers(assetId) {
    return this.request.get('/assets/' + assetId + '/likes');
  }

  createAsset(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.request.post('/assets', {
      data: formData,
    });
  }
}
