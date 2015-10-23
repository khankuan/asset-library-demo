//  NavDrawer has a store to listen to actions that trigger opening of the store.
//  If NavDrawer stores the 'open' state in the component store, it will be quite hard to
//  programatically open the drawer.
export default class NavDrawerStore {
  constructor() {
    const NavDrawerActions = this.alt.getActions('NavDrawer');

    this.bindListeners({
      onToggleNavDrawer: NavDrawerActions.toggleNavDrawer,
    });

    this.state = {
      show: false,
    };
  }

  onToggleNavDrawer() { this.setState({ show: !this.state.show }); }
}
