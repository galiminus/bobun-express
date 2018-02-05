import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router'
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blueGrey800 } from 'material-ui/styles/colors';
import Color from 'color';

import BoardLoader from './boardLoader';
import CardLoader from './cardLoader';
import ListsDrawer from './listsDrawer';

import { toggleListsDrawer } from '../actions/listsDrawer';
import muiThemeable from 'material-ui/styles/muiThemeable';

const muiTheme = (board) => {
  const backgroundColor = board ? board.prefs.backgroundBottomColor : blueGrey800;
  return (
    getMuiTheme({
      palette: {
        primary1Color: backgroundColor,
        primary2Color: backgroundColor,
      },
      appBar: {
        color: Color(backgroundColor).darken(0.15).hsl().string()
      }
    })
  )
}

const Background = ({ muiTheme, children }) => (
  <div
    style={{
    }}
  >
    {children}
  </div>
)
const ThemableBackground = muiThemeable()(Background);

const Main = (props) => {
  return (
    <MuiThemeProvider muiTheme={muiTheme(props.board)}>
      <ThemableBackground>
        {
          props.board &&
            <ListsDrawer
              docked={false}
              onRequestChange={props.toggleListsDrawer}
            />
        }
        <Switch>
          <Route exact path="/" component={BoardLoader} />
          <Route exact path="/:listId" component={BoardLoader} />
          <Route path="/:listId/:cardId" component={CardLoader} />
        </Switch>
        { !!props.error && <Snackbar open={true} message={props.error} autoHideDuration={2000} /> }
      </ThemableBackground>
    </MuiThemeProvider>
  )
}

const mapStateToProps = state => {
  return {
    error: state.error,
    board: state.board
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleListsDrawer: () => dispatch(toggleListsDrawer())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
