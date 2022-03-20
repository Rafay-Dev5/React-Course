import { COMMENTS } from "../shared/comments";
import * as ActionTypes from "./ActionTypes";

export const Comments = (state = COMMENTS, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      console.log("In Comments.js");
      console.log("ACtion payload: ", action.payload);
      let comment = action.payload;
      comment.id = state.length;
      comment.date = new Date().toISOString();
      console.log("Comment: " + comment.dishId);
      return state.concat(comment); // original state doesnt change
    default:
      return state;
  }
};
