
import Auth from './AuthApi';
import ApiClient from '../core/ApiClient';

export default class Api {
  constructor(request) {
    const apiClient = new ApiClient(request);
    this.Auth = new Auth(apiClient);
  }
}
