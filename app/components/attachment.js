import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog'

const Attachment = ({ attachment, history, ...props}) => (
  <Dialog
    open={true}
    onRequestClose={() => history.goBack()}
  >
    <img
      src={attachment.url}
      style={{
        objectFit: "cover",
        width: "100%",
        height: "100%"
      }}
    />
  </Dialog>
);

function mapStateToProps(state, props) {
  const card = state.board.cards.find((card) => card.id === props.match.params.cardId);
  return {
    configuration: state.configuration,
    attachment: card.attachments.find((attachment) => attachment.id === props.match.params.attachmentId),
    card
  };
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Attachment);
