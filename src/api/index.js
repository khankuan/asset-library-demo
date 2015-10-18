
import User from './User';
import Asset from './Asset';
import ApiClient from '../core/ApiClient';

export default class Api {
  constructor(request) {
    const apiClient = new ApiClient(request);
    this.User = new User(apiClient);
    this.Asset = new Asset(apiClient);
  }
}
