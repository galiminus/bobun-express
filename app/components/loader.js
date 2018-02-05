import React from 'react';

import { connect } from 'react-redux';

import AppBar from "./appbar";
import ResponsiveContainer from './responsiveContainer';
import { push } from 'react-router-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Board from './board';
import { loadBoard } from '../actions/board';

class Loader extends React.Component {
  componentWillMount() {
    if (!this.props.board) {
      this.props.loadBoard();
    }
    if (this.props.scrollUp) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    if (this.props.board) {
      return (React.cloneElement(this.props.children))
    }

    return (
      <div
        style={{
          paddingTop: "calc(50vh - 30px)",
          textAlign: "center"
        }}
      >
        <CircularProgress />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    board: state.board,
    configuration: state.configuration
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    loadBoard: (board) => dispatch(loadBoard(board))
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    loadBoard: () => dispatchProps.loadBoard(stateProps.configuration.board),
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Loader);
