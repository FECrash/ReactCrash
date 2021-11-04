import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api';
import { startLoading, finishLoading } from './loading';

// 액션 타입 선언, 한 요청당 세 개를 작성합니다(요청, 성공, 실패)
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

// thunk 함수 생성, 함수 내부에서 시작, 성공, 실패 액션을 디스패치합니다.
export const getPost = createAction(GET_POST, id => id);
export const getUsers = createAction(GET_USERS);

function* getPostSaga(action) {
  yield put(startLoading(GET_POST));  // 로딩 시작
  // 파라미터로 action을 받아 오면 액션의 정보를 조회할 수 있습니다.
  try {
    // call을 사용하여 Promise를 반환하는 함수를 호출하고, 기다립니다.
    // 첫 번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수입니다.
    const post = yield call(api.getPost, action.payload); // api.getPost(action.payload)를 의미합니다.
    yield put({
      type   : GET_POST_SUCCESS,
      payload: post.data,
    });
  } catch (error) {
    // try/catch 문을 사용하여 에러를 캐치하는 것도 가능합니다.
    yield put({
      type   : GET_POST_FAILURE,
      payload: error,
      error  : true,
    });
  }
  yield put(finishLoading(GET_POST));
}

function* getUsersSaga(action) {
  yield put(startLoading(GET_USERS));
  try {
    const post = yield call(api.getUsers, action.payload);
    yield put({
      type   : GET_USERS_SUCCESS,
      payload: post.data,
    });
  } catch (error) {
    yield put({
      type   : GET_USERS_FAILURE,
      payload: error,
      error  : true,
    });
  }
  yield put(finishLoading(GET_USERS));
}

export function* sampleSaga(){
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}

// 초기 상태 선언, loading 객체 추가
const initialState = {
  post : null,
  users: null,
};

const sample = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      post: action.payload,
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload,
    }),
  },
  initialState,
);

export default sample;