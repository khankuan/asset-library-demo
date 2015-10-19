
import User from './User';
import Asset from './Asset';
import Like from './Like';
import ApiClient from '../core/ApiClient';

export default class Api {
  constructor(request) {
    const apiClient = new ApiClient(request);
    this.User = new User(apiClient);
    this.Asset = new Asset(apiClient);
    this.Like = new Like(apiClient);
  }
}
