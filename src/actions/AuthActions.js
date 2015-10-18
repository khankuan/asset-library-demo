
export default function(api) {
  return class AuthActions {
    constructor() {
    }

    signUp(email, password, name) {
      this.dispatch({ email, password, name });
      return api.User.signUp(email, password, name)
        .then(this.actions.signUpSuccess, this.actions.signUpError);
    }

    signUpSuccess(user) {
      this.dispatch(user);
      return user;
    }

    signUpError(error) {
      this.dispatch(error);
      return error;
    }

    signIn(email, password) {
      this.dispatch({ email, password });
      return api.User.signIn(email, password)
        .then(this.actions.signInSuccess, this.actions.signInError);
    }

    signInSuccess(user) {
      this.dispatch(user);
      return user;
    }

    signInError(error) {
      this.dispatch(error);
      return error;
    }


    me() {
      this.dispatch();
      return api.User.me()
        .then(this.actions.meSuccess, this.actions.meError);
    }

    meSuccess(user) {
      this.dispatch(user);
      return user;
    }

    meError(error) {
      this.dispatch(error);
      return error;
    }
  };
}

