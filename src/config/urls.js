// export const API_BASE_URL = "http://localhost:3000"
export const API_BASE_URL = "https://api.digiyo.com"

export const getApiURL = (endpoint) => API_BASE_URL + endpoint

export const SIGNUP_API = getApiURL('/auth/signup');
export const LOGIN_API = getApiURL('/auth/login');
export const RESEND_CODE = getApiURL('/auth/resend/otp/email');
export const RESET_PASSWORD = getApiURL('/auth/reset/password');
export const VERIFY_ACC = getApiURL('/auth/verify/account');

export const MY_PROFILE = getApiURL('/auth/profile');

export const ALL_POSTS = getApiURL('/posts?page=1&perPage=20');
export const CREATE_POSTS = getApiURL('/posts'); 
export const DELETE_POSTS = getApiURL('/posts');
export const GET_POSTS_BY_ID = getApiURL('/posts/id');

export const GET_POSTS_COMMENTS = getApiURL('/posts/id/comment');
export const COMMENT_POSTS = getApiURL('/posts/id/comment');