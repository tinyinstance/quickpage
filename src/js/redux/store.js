import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import rootReducer from './reducer'

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let middleware = []
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({})
  middleware = [...middleware, logger]
}

const store = createStore(persistedReducer, applyMiddleware(...middleware))

export const persistor = persistStore(store)

export default store
