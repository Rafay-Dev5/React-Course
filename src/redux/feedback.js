import { COMMENTS } from "../shared/comments";
import * as ActionTypes from "./ActionTypes";

export const Comments = (
  state = {
    errMess: null,
    feedback: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_FEEDBACK:
      console.log("In feedback.js");
      console.log("ACtion payload: ", action.payload);
      let feedback = action.payload;
      //console.log("Comment: " + comment.dishId);
      return { ...state, feedback: state.comments.concat(feedback) }; // original state doesnt change

    default:
      return state;
  }
};
