import { getHttpClient } from '@edx/frontend-platform/auth';

const coursesApiUrl = `${process.env.LMS_BASE_URL}/api/courses/v1/courses/`;

export function getCourses() {
  return getHttpClient().get(coursesApiUrl);
}

export default getCourses;