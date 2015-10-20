
import Alt from 'alt';

export default class AppAlt extends Alt {
  constructor(api) {
    super();

    //  Actions
    this.addActions('Auth', require('../actions/AuthActions')(api));
    this.addActions('Asset', require('../actions/AssetActions')(api));
    this.addActions('User', require('../actions/UserActions')(api));

    this.addActions('HomePage', require('../views/HomePage/actions')(api));
    this.addActions('CategoryPage', require('../views/CategoryPage/actions')(api));
    this.addActions('LikesPage', require('../views/LikesPage/actions')(api));
    this.addActions('Onboarding', require('../views/Onboarding/actions')(api));
    this.addActions('NavDrawer', require('../views/NavDrawer/actions')(api));

    //  Stores (must be after actions)
    this.addStore('Auth', require('../stores/AuthStore'));
    this.addStore('Asset', require('../stores/AssetStore'));
    this.addStore('User', require('../stores/UserStore'));

    this.addStore('HomePage', require('../views/HomePage/store'));
    this.addStore('CategoryPage', require('../views/CategoryPage/store'));
    this.addStore('LikesPage', require('../views/LikesPage/store'));
    this.addStore('Onboarding', require('../views/Onboarding/store'));
    this.addStore('NavDrawer', require('../views/NavDrawer/store'));

    if (typeof window !== 'undefined') window.alt = this;
  }
}
