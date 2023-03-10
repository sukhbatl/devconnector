import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// Register User
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post('/api/users', body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      console.log(res.data);
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((errorr) => dispatch(setAlert(errorr.msg, 'danger')));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
      console.log(err.response.data);
    }
  };
