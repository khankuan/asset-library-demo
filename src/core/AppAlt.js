
import Alt from 'alt';

export default class AppAlt extends Alt {
  constructor(api) {
    super();

    //  Actions
    this.addActions('Auth', require('../actions/AuthActions')(api));
    this.addActions('Asset', require('../actions/AssetActions')(api));

    this.addActions('HomePage', require('../views/HomePage/actions')(api));
    this.addActions('Onboarding', require('../views/Onboarding/actions')(api));

    //  Stores (must be after actions)
    this.addStore('Auth', require('../stores/AuthStore'));
    this.addStore('Asset', require('../stores/AssetStore'));

    this.addStore('HomePage', require('../views/HomePage/store'));
    this.addStore('Onboarding', require('../views/Onboarding/store'));

    if (typeof window !== 'undefined') window.alt = this;
  }
}
