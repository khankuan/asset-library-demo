
export default function(api) {
  return class UserActions {
    constructor() {
    }

    get(userId) {
      this.dispatch(userId);
      return api.User.get(userId)
        .then(this.actions.getSuccess, this.actions.getError);
    }

    getSuccess(user) {
      this.dispatch(user);
      return user;
    }

    getError(error) {
      this.dispatch(error);
      return error;
    }
  };
}
