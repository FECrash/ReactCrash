import { startLoading, finishLoading } from '../modules/loading';

const createRequestThunk = (type, request) => {
  // 성공 및 실패 액션 타입 정의
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return params => async (dispatch) => {
    dispatch({ type });
    dispatch(startLoading(type));
    try {
      const response = await request(params);
      dispatch({
        type   : SUCCESS,
        payload: response.data,
      });
      dispatch(finishLoading(type));
    } catch (error) {
      dispatch({
        type   : FAILURE,
        payload: error,
        error  : true,
      });
      dispatch(startLoading(type));
      throw error;
    }
  };
};

export default createRequestThunk;