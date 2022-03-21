import { COMMENTS } from "../shared/comments";
import * as ActionTypes from "./ActionTypes";

export const Comments = (
  state = {
    errMess: null,
    comments: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      console.log("In Comments.js");
      console.log("ACtion payload: ", action.payload);
      let comment = action.payload;
      //console.log("Comment: " + comment.dishId);
      return { ...state, comments: state.comments.concat(comment) }; // original state doesnt change

    case ActionTypes.ADD_COMMENTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        comments: action.payload,
      };

    case ActionTypes.COMMENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        comments: [],
      };
    default:
      return state;
  }
};
