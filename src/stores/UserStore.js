
export default class UserStore {
  constructor() {
    const UserActions = this.alt.getActions('UserActions');
    const AuthActions = this.alt.getActions('AuthActions');

    this.bindListeners({
      onGetSuccess: UserActions.getSuccess,
      onSignUpSuccess: AuthActions.signUpSuccess,
      onSignInSuccess: AuthActions.signInSuccess,
      onMeSuccess: AuthActions.meSuccess,
    });

    this.state = {
      users: {},
    };
  }

  _setUsers(newUsers) {
    if (!Array.isArray(newUsers)) {
      newUsers = [newUsers];
    }

    const users = this.state.users;
    newUsers.forEach(newUser => {
      users[newUser.id] = newUser;
    });
    this.setState({ users });
  }

  onGetSuccess(user) { this._setUsers(user); }
  onSignUpSuccess(user) { this._setUsers(user); }
  onSignInSuccess(user) { this._setUsers(user); }
  onMeSuccess(user) { this._setUsers(user); }

}
