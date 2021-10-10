import { combineReducers } from '@reduxjs/toolkit';

import login from './LoginSlice';
import todo from './TodoSlice';

export default combineReducers({
  login,
  todo,
});
