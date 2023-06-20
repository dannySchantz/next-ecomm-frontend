import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { writable } from 'svelte/store';

const emptyAuth = {
  'accessToken': '',
  // 'userId': ''
};


export function logOut() {
  localStorage.setItem('auth', JSON.stringify(emptyAuth));
  loggedIn.set(false);
  return true;
}

export const loggedIn = writable(false);


export function getTokenFromLocalStorage() {
  const auth = localStorage.getItem('auth');
  if (auth) {
    return JSON.parse(auth)["accessToken"]
  }
  return null;
}



export async function isLoggedIn() {
  if (!getTokenFromLocalStorage()) {
    return false;
  } loggedIn.set(true)
  return true
  // try {
  //   const rawResponse = await fetch(
  //     PUBLIC_BACKEND_BASE_URL + '/users',
  //     {
  //       method: 'POST',
  //       mode: 'cors',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: getTokenFromLocalStorage()
  //       }
  //     }
  //   );

  //   const parsedResponse = await rawResponse.json();
  //   if (rawResponse.status == 200) {
  //     localStorage.setItem(
  //       'auth',
  //       JSON.stringify({
  //         'accessToken': parsedResponse.accessToken,
  //       })
  //     );
  //     console.log('hi')
  //     loggedIn.set(true)
  //     return true;
  //   }
  //   return false
  // } catch {
  //   return false;
  // }
}

export async function logInUser(email, password) {
  const resp = await fetch(
    PUBLIC_BACKEND_BASE_URL + '/auth',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    }
  );
  const res = await resp.json();

  if (resp.status === 200) {
    localStorage.setItem(
      'auth',
      JSON.stringify({
        'accessToken': res.accessToken,
      })
    );
    loggedIn.set(true)
    return {
      success: true,
      res: res,
    };
  }

  return {
    success: false,
    res: res
  };
}
