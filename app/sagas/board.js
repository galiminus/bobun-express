import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import fetchJsonp from 'fetch-jsonp';
import { setBoard } from '../actions/board';
import objectFromEntries from "object-from-entries";
import { replace } from 'react-router-redux';

function* fetchBoard(action) {
   try {
      const board = yield fetch(`https://api.trello.com/1/boards/${action.board}?cards=visible&card_attachments=true&card_fields=all&lists=all`).then(response => response.json())
      yield put(setBoard(board));
   }
   catch (e) {
      yield put({ type: "SET_ERROR", payload: e.message });
   }
}

function* pageSaga() {
  yield takeLatest("LOAD_BOARD", fetchBoard);
}

export default pageSaga;
