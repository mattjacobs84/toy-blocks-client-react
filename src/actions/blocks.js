import fetch from "cross-fetch";
import * as types from "../constants/actionTypes";

const blockLoading = (node) => {
  return {
    type: types.BLOCKS_LOADING,
    node,
  };
};

const blocksLoaded = (node, res) => {
  return {
    type: types.BLOCKS_LOADED,
    node,
    res,
  };
};

const blockFailure = (node) => {
  return {
    type: types.BLOCKS_FAILURE,
    node,
  };
};

export function fetchBlocks(node) {
  return async (dispatch) => {
    try {
      dispatch(blockLoading(node));
      const res = await fetch(`${node.url}/api/v1/blocks`);

      if (res.status >= 400) {
        return dispatch(blockFailure(node));
      }

      const json = await res.json();

      dispatch(blocksLoaded(node, json.data));
    } catch (err) {
      dispatch(blockFailure(node));
    }
  };
}
