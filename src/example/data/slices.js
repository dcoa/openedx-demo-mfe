/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const requestStatus = {
  IN_PROGRESS: 'in-progress',
  SUCCESSFUL: 'successful',
  FAILED: 'failed',
};

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    status: 'in-progress',
    data: [],
  },
  reducers: {
    fetchCoursesRequest: (state) => {
      state.status = requestStatus.IN_PROGRESS;
    },
    fetchCoursesSuccess: (state, { payload }) => {
      state.status = requestStatus.SUCCESSFUL;
      state.data = payload;
    },
    fetchCoursesFailed: (state) => {
      state.status = requestStatus.FAILED;
    },
  },
});

export const {
  fetchCoursesRequest,
  fetchCoursesSuccess,
  fetchCoursesFailed,
} = courseSlice.actions;

export const { reducer } = courseSlice;