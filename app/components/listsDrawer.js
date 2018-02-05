import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ListsDrawer = ({ board, ...props }) => (
  <Drawer
    {...props}
  >
    <MenuItem
      containerElement={<Link to={`/`} />}
    >
      {"All articles"}
    </MenuItem>
    <Divider />
    {
      board.lists.map((list, index) => (
        <MenuItem
          key={index}
          containerElement={<Link to={`/${list.id}`} />}
        >
          {list.name}
        </MenuItem>
      ))
    }
  </Drawer>
)

function mapStateToProps(state, props) {
  return {
    board: state.board,
    open: state.listsDrawer
  };
}

export default muiThemeable()(connect(mapStateToProps)(ListsDrawer));
