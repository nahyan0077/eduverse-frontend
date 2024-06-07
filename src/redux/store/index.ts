import {configureStore} from '@reduxjs/toolkit'
import { userReducer } from './slices/user'
import { categoryReducer } from './slices/category'


export const store = configureStore ({
    reducer: {
        user: userReducer,
        category: categoryReducer
    }
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType < typeof store.getState >