import {configureStore} from '@reduxjs/toolkit'
import { userReducer } from './slices/user'

export const store = configureStore ({
    reducer: userReducer
})

export type TypeDispatch = typeof store.dispatch

export type TypeStata = ReturnType < typeof store.getState >