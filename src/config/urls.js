// export const API_BASE_URL = "http://localhost:3000"
export const API_BASE_URL = 
// "https://api.digiyo.com"
"https://apitest.digiyo.com"

export const getApiURL = (endpoint) => API_BASE_URL + endpoint
 
export const SIGNUP_API = getApiURL('/auth/signup');
export const LOGIN_API = getApiURL('/auth/login');
export const RESEND_CODE = getApiURL('/auth/resend/otp/email');
export const RESET_PASSWORD = getApiURL('/auth/reset/password');
export const VERIFY_ACC = getApiURL('/auth/verify/account');

// FOUNDERS STRIPE
export const JOIN_FOUNDERS = getApiURL('/users/join/founders/club');

export const MY_PROFILE = getApiURL('/auth/profile');

export const ALL_POSTS = getApiURL('/posts?page=1&perPage=20');
export const CREATE_POSTS = getApiURL('/posts'); 
export const DELETE_POSTS = getApiURL('/posts/');
export const GET_POSTS_BY_ID = getApiURL('/posts/id');
export const ALL_POST = getApiURL('/users/posts/');

export const FOLLOW = getApiURL('/users/');
export const FOLLOWERS = getApiURL('/users/my/followers');
export const FOLLOWING = getApiURL('/users/my/followings');
export const FOLLOW_TOGGLE = getApiURL('/users/togglefollow');

export const USER = getApiURL('/users');
export const BIO = getApiURL('/users/profile');

export const BLOCK_USER = getApiURL('/users/toggleblock/');
export const ALL_BLOCKED_LIST = getApiURL('/users/my/blocks');

export const SEARCH = getApiURL('/search');

export const GET_POSTS_COMMENTS = getApiURL('/posts/');
// export const COMMENT_POSTS = getApiURL('/posts/'); 