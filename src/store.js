import { configureStore } from '@reduxjs/toolkit';

import { reducer as coursesReducer } from './example/data';

export function initializeStore(preloadedState = undefined) {
  return configureStore({
    reducer: { courses: coursesReducer },
    preloadedState,
  });
}

export const store = initializeStore();