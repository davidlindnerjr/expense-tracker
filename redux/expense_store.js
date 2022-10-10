import { configureStore, createSerializableStateInvariantMiddleware, isPlain, } from '@reduxjs/toolkit';
import expensesReducer from './expense_reducers';
import userReducer from './user_reducer';
import { Iterable } from 'immutable';

// Augment middleware to consider Immutable.JS iterables serializable
const isSerializable = (value) => Iterable.isIterable(value) || isPlain(value)

const getEntries = (value) =>
  Iterable.isIterable(value) ? value.entries() : Object.entries(value)

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable,
  getEntries,
})

export const store = configureStore({
    reducer: {
        expenses: expensesReducer,
        user: userReducer,
    },
    middleware: [serializableMiddleware],
})

