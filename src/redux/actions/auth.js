import { ALL_POSTS, CREATE_POSTS, DELETE_POSTS, GET_POSTS_BY_ID, ALL_POST, LOGIN_API, MY_PROFILE, RESEND_CODE, RESET_PASSWORD, SIGNUP_API, VERIFY_ACC, BLOCK_USER, ALL_BLOCKED_LIST } from '../../config/urls';
// import { storeData } from '../../utils/helperFunctions';
import { apiDelete, apiGet, apiPost, apiPut } from '../../utils/utils';
// import { saveUserData } from '../reducers/auth';
// import store from '../store';
// import types from '../types';
// const { dispatch } = store;

// export const userLogin = (data) => {
//     return new Promise((resolve, reject)=>{
//       apiPost(LOGIN_API, data).then((res)=>{
//         console.log("first login res ======== ", res.data)
//         if (!!res.data) {
//           // storeData('userData', res.data).then((value) => {
//           //   console.log("see it this ======== ", res)
//           //   // dispatch(saveUserData(res.data))
//           // }).catch((error) => {
//           //   resolve(res)
//           // })
//         // } else {
//         //   resolve(res)
//         // }
//       }
//       ).catch((error)=>{
//         reject(error)
//       }
//       )
//     })
//   // dispatch(saveUserData(data));
// };
 
export const fetchUserProfile = (token) => {
  return async (dispatch) => {
    try {
      const res = await myProifile(token);
      dispatch({ type: 'FETCH_USER_PROFILE', payload: res.authenticated_user });
    } catch (error) {
      console.log("Profile fetch error:", error);
    }
  };
};


export const userSignup = (data) => {
  return apiPost(SIGNUP_API, data,
    {headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'JWT fefege...'
  },}
    )
};

export const resendOTP = (data) => {
  return apiPost(RESEND_CODE, data,
    {headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'JWT fefege...'
  },}
    )
};

export const resetPassword = (data) => {
  return apiPut(RESET_PASSWORD, data,
    {headers: {
      'Content-Type': 'application/json', 
  },}
    )
};

export const verifyAccout = (data) => {
  return apiPut(VERIFY_ACC, data,
    {headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'JWT fefege...'
  },}
    )
};

export function logout() {
  dispatch({ type: types.CLEAR_REDUX_STATE });
}


// AUTHENTICATED 
// USER


export const myProifile = (userToken) => {
  return apiGet(MY_PROFILE, 
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
     },}
    )
};




// POSTS

export const createPosts = (data, userToken ) => {
  return apiPost(CREATE_POSTS,
    data, 
    { 
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${userToken}`
    }, 
    )
};
 
export const getAllPosts = (userToken) => {
  return apiGet(ALL_POSTS,
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
     },}
    )
};

export const getPostsById = (userToken) => {
  return apiGet(GET_POSTS_BY_ID,
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
     },}
    )
};

export const deletePost = (userToken) => {
  return apiDelete(DELETE_POSTS,
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
     },}
    )
};


export const getUserPosts = (id, userToken) => {
  return apiGet(ALL_POST+id,
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },}
    )
};

export const getBlockedUsers = (id, userToken) => {
  return apiGet(ALL_BLOCKED_LIST,
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },}
    )
};