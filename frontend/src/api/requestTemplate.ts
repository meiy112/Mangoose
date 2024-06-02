import { BASE_URL } from "../constants/Config";

export const requests = {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
}

// performs a get request to the given url with the given jwt token. Throws an error on faliure
async function getRequest(token: string, url: string) {
  // req headers
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
  let response;
  let data;

  // try to call backend
  try {
    response = await fetch(BASE_URL + url, {
      method: 'GET',
      headers: headers,
    });
    data = await response.json();
  } catch (e) {
    throw new Error(e + " for GET " + url)
  }
  
  // if nothing went wrong, return data
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message + ": " + data.details + " at GET " + url); // for debugging
    // throw new Error(data.details); // for production
  }
}

// performs a post request to the given url with the given jwt token and body. Throws an error on faliure
// body must be a json object
async function postRequest(token: string, url: string, body: any) {
  console.log("post")
  // req headers
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type' : 'application/json'
  };
  let response;
  let data;

  // try to call backend
  try {
    response = await fetch(BASE_URL + url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });
    data = await response.json();
  } catch (e) {
    throw new Error(e + " for POST " + url)
  }
  
  // if nothing went wrong, return data
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message + ": " + data.details + " at POST " + url); // for debugging
    // throw new Error(data.details); // for production
  }
}

// performs a put request to the given url with the given jwt token. Throws an error on faliure
async function putRequest(token: string, url: string, body: any) {
  // req headers
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type' : 'application/json'
  };
  let response;
  let data;

  // try to call backend
  try {
    response = await fetch(BASE_URL + url, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(body),
    });
    data = await response.json();
  } catch (e) {
    throw new Error(e + " for PUT " + url)
  }
  
  // if nothing went wrong, return data
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message + ": " + data.details + " at PUT " + url); // for debugging
    // throw new Error(data.details); // for production
  }
}

// performs a delete request to the given url with the given jwt token. Throws an error on faliure
async function deleteRequest(token: string, url: string) {
  // req headers
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
  let response;
  let data;

  // try to call backend
  try {
    response = await fetch(BASE_URL + url, {
      method: 'DELETE',
      headers: headers,
    });
    data = await response.json();
  } catch (e) {
    throw new Error(e + " for DELETE " + url)
  }
  
  // if nothing went wrong, return
  if (response.ok) {
    return;
  } else {
    throw new Error(data.message + ": " + data.details + " at DELETE " + url); // for debugging
    // throw new Error(data.details); // for production
  }
}
