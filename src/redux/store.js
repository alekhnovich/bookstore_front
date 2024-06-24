import { configureStore } from '@reduxjs/toolkit';
import {authReducer} from './slices/auth';
import {postsReducer} from './slices/posts';
import {cartReducer} from './slices/cart';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    cart: cartReducer,
  },
});

export default store;
