import { createAction, handleActions } from 'redux-actions';
import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 마우스 클릭 이벤트가 payload 안에 들어가지 않게
// () => undefined를 두 번째 파라미터로 넣어 줍니다.
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

function* increaseSaga(){
  yield delay(1000); // 1초 대기
  yield put(increase()); // 특정 액션 디스패치
}

function* decreaseSaga(){
  yield delay(1000); // 1초 대기
  yield put(decrease()); // 특정 액션 디스패치
}

export function* counterSaga(){
  // takeEvery는 들어오는 모든 액션에 대해 특정 작업을 처리합니다.
  yield takeEvery(INCREASE_ASYNC, increaseSaga);
  // takeLatest는 기존 진행 중인 작업을 취소하고 가장 마지막 작업만 실행합니다.
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

const initialState = 0;

const counter = handleActions(
  {
    [INCREASE]: state => state +1,
    [DECREASE]: state => state -1,
  },
  initialState,
);

export default counter;