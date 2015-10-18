
import Alt from 'alt';

export default class AppAlt extends Alt {
  constructor(api) {
    super();
    this.addActions('AuthActions', require('../actions/AuthActions'), {}, api);
    this.addStore('AuthStore', require('../stores/AuthStore'));
  }
}
