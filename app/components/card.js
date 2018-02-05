import React from 'react';
import MaterialAppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { connect } from 'react-redux';
import { Route } from 'react-router'

import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';

import showdown from 'showdown';

import AppBar from "./appbar";
import ResponsiveContainer from './responsiveContainer';
import { getCardTitle, getCardSubtitle } from '../utils/card';
import { toggleListsDrawer } from '../actions/listsDrawer';
import AttachmentLoader from './attachmentLoader';

const converter = new showdown.Converter();
converter.setFlavor('github');

const PageCard = ({ card, match, ...props}) => (
  <div>
    <AppBar
      title={getCardTitle(card)}
      onLeftIconButtonClick={props.history.goBack}
      iconElementLeft={<IconButton><BackIcon /></IconButton>}
    />
    <div
      style={{
        paddingTop: 64,
        zIndex: 0
      }}
    >
      <Card
        style={{ marginTop: "0em" }}
        zDepth={0}
      >
        {
          card.attachments.length === 0 ?
            <CardTitle title={getCardTitle(card)} />
          :
            <CardMedia>
              <img
                src={card.attachments[0].url}
                alt={card.name}
                style={{
                  height: "calc(100vh - 64px - 8em)",
                  objectFit: "cover"
                }}
              />
            </CardMedia>
        }
        <CardText>
          <ResponsiveContainer
            paperStyle={{
              minHeight: "calc(100vh - 184px)",
            }}
          >
            <div>
              <div
                className="markdown-body"
                dangerouslySetInnerHTML={{__html: converter.makeHtml(card.desc)}}
              >
              </div>
              {
                card.attachments.length > 1 &&
                  <GridList
                    style={{
                      marginTop: "1em"
                    }}
                  >
                    {
                      card.attachments.slice(1, card.attachments.length).map((attachment, index) => (
                        <GridTile
                          containerElement={<Link to={`/${card.idList}/${card.id}/${attachment.id}`} />}
                          key={index}
                          style={{
                            fontFamily: "Roboto, sans-serif"
                          }}
                        >
                          <img src={attachment.url} />
                        </GridTile>
                      ))
                    }
                  </GridList>
              }
            </div>
          </ResponsiveContainer>
        </CardText>
      </Card>
    </div>
    <Route path={`${match.path}/:attachmentId`} component={AttachmentLoader} />
  </div>
);

function mapStateToProps(state, props) {
  return {
    configuration: state.configuration,
    card: state.board.cards.find((card) => card.id === props.match.params.cardId)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleListsDrawer: () => dispatch(toggleListsDrawer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageCard);
