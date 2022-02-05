// This is where the store is setup. This is where redux updates the state of the store based on the user actions.
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { wallet } from './reducers/walletReducer';

const loggerMiddleware = createLogger();

export const store = createStore(wallet, applyMiddleware(thunkMiddleware, loggerMiddleware));