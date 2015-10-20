
export default class UserStore {
  constructor() {
    const UserActions = this.alt.getActions('User');
    const AuthActions = this.alt.getActions('Auth');
    const LikeListActions = this.alt.getActions('LikeList');

    this.bindListeners({
      onGetSuccess: UserActions.getSuccess,
      onSignUpSuccess: AuthActions.signUpSuccess,
      onSignInSuccess: AuthActions.signInSuccess,
      onMeSuccess: AuthActions.meSuccess,
      onFetchAssetLikedBySuccess: LikeListActions.fetchAssetLikedBySuccess,
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
  onFetchAssetLikedBySuccess({ users }) { this._setUsers(users); }

}
