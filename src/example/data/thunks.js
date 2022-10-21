import { camelCaseObject } from '@edx/frontend-platform';
import { logError } from '@edx/frontend-platform/logging';

import { getCourses } from './api';
import { fetchCoursesFailed, fetchCoursesRequest, fetchCoursesSuccess } from './slices';

export function fetchCourses() {
  return async (dispatch) => {
    try {
      dispatch(fetchCoursesRequest());
      dispatch(fetchCoursesSuccess(camelCaseObject((await getCourses()).data)));
    } catch (error) {
      dispatch(fetchCoursesFailed());
      logError(error);
    }
  };
}

export default fetchCourses;