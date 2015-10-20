
export default function(api) {
  return class LikesPageActions {
    constructor() {
    }

    fetchUserLikes(likesUserId) {
      this.dispatch(likesUserId);

      return api.Like.fetchUserLikes(likesUserId)
        .then(this.actions.fetchUserLikesSuccess, this.actions.fetchUserLikesError);
    }

    fetchUserLikesSuccess(likesUserId) {
      this.dispatch(likesUserId);
      return likesUserId;
    }

    fetchUserLikesError(error) {
      this.dispatch(error);
      return error;
    }
  };
}
