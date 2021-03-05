import {
  BLOCKS_LOADING,
  BLOCKS_FAILURE,
  BLOCKS_LOADED,
} from "../constants/actionTypes";

export default function blocksReducer(state = {}, action) {
  switch (action.type) {
    case BLOCKS_LOADING:
      return {
        ...state,
        [action.node.url]: {
          ...state[action.node.url],
          loading: true,
          error: false,
        },
      };
    case BLOCKS_FAILURE:
      return {
        ...state,
        [action.node.url]: {
          ...state[action.node.url],
          loading: false,
          error: true,
        },
      };
    case BLOCKS_LOADED:
      return {
        ...state,
        [action.node.url]: {
          ...state[action.node.url],
          loading: false,
          error: false,
          data: action.res,
        },
      };
    default:
      return state;
  }
}
