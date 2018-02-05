import React from 'react';
import MaterialAppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import { connect } from 'react-redux';

import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import { Link } from 'react-router-dom';

import AppBar from "./appbar";
import ResponsiveContainer from './responsiveContainer';

import { getCardTitle, getCardSubtitle } from '../utils/card';

import showdown from 'showdown';
import { toggleListsDrawer } from '../actions/listsDrawer';

const converter = new showdown.Converter();
converter.setFlavor('github');


const filterCardsByList = (cards, list) => {
  if (!list) {
    return (cards);
  }
  return (cards.filter((card) => card.idList === list.id));
}

const Board = ({ board, list, ...props }) => {
  const filteredCards = filterCardsByList(board.cards, list);

  return (
    <div>
      <AppBar
        title={list ? list.name : board.name}
        onLeftIconButtonClick={props.toggleListsDrawer}
      />
      <div
        style={{
          paddingTop: 64,
          zIndex: 0
        }}
      >
        <ResponsiveContainer
          paperStyle={{
            minHeight: "calc(100vh - 64px - 2em)",
            boxShadow: "none"
          }}
        >
          {
            filteredCards.map((card, index) => (
              <Link
                style={{
                  textDecoration: "none"
                }}
                key={index}
                to={`/${card.idList}/${card.id}`}
              >
                <Card
                  style={{
                    margin: "1em"
                  }}
                >
                  {
                    card.attachments.length === 0 ?
                      <CardTitle title={getCardTitle(card)} />
                    :
                      <CardMedia
                        overlay={
                          <CardTitle
                            title={getCardTitle(card)}
                            subtitle={getCardSubtitle(card)}
                          />}
                      >
                        <img src={card.attachments[0].url} alt="" />
                      </CardMedia>
                  }
                  <CardText>
                    <div
                      style={{
                      }}
                      className="markdown-body"
                      dangerouslySetInnerHTML={{__html: converter.makeHtml(card.desc.split("\n")[0])}}
                    ></div>
                  </CardText>
                  { index !== (filteredCards.length - 1) && <Divider /> }
                </Card>
              </Link>
            ))
          }
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function mapStateToProps(state, props) {
  return {
    board: state.board,
    configuration: state.configuration,
    list: state.board.lists.find((list) => list.id === props.match.params.listId)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleListsDrawer: () => dispatch(toggleListsDrawer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
