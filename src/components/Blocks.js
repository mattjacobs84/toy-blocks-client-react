import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlocks } from "../actions/blocks";
import { Typography, makeStyles, Box } from "@material-ui/core";

const Blocks = ({ node }) => {
  const blocks = useSelector((state) => state.blocks[node.url]);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlocks(node));
  }, []);

  if (!blocks || blocks.loading) {
    return (
      <Box className={classes.blockContainer}>
        <Typography>Fetching block data.</Typography>
      </Box>
    );
  }

  if (blocks.error) {
    return (
      <Box className={classes.blockContainer}>
        <Typography>Something went wrong.</Typography>
      </Box>
    );
  }

  return (
    <React.Fragment>
      {!blocks.data ? (
        <Box className={classes.blockContainer}>
          <Typography>There are no blocks for this node.</Typography>
        </Box>
      ) : (
        blocks.data.map((block, index) => {
          return (
            <Box key={block.id} className={classes.blockContainer}>
              <Box className={classes.blockNumber}>{`00${index}`}</Box>
              <Box>{block.attributes.data}</Box>
            </Box>
          );
        })
      )}
    </React.Fragment>
  );
};

const useStyles = makeStyles(() => ({
  blockContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    borderRadius: "2px",
    width: "100%",
    padding: "8px",
    marginBottom: "4px",
    fontFamily: "Roboto",
  },
  blockNumber: {
    fontSize: "10px",
    fontWeight: 700,
    lineHeight: 1.6,
    letterSpacing: "1.5px",
    color: "#304FFE",
  },
  blockData: {
    fontSize: "14px",
    lineHeight: 1.43,
    letterSpacing: "0.25px",
    color: "#263238",
  },
}));

Blocks.propTypes = {
  node: PropTypes.object.isRequired,
};

export default Blocks;
