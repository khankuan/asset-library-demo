
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
