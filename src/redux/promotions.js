import { PROMOTIONS } from "../shared/promotions";
import * as ActionTypes from "./ActionTypes";

export const Promotions = (
  state = { isLoading: true, errmess: null, promotions: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_PROMOS:
      //console.log("IN DISHES.JS:" + state.dishes.length);
      //console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        promotions: action.payload,
      };
    case ActionTypes.DISHES_LOADING:
      return { ...state, isLoading: true, errMess: null, promotions: [] };
    case ActionTypes.DISHES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        promotions: [],
      };
    default:
      return state;
  }
};
