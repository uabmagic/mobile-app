const baseUrl = 'https://uabmagic-api.vercel.app/api';

async function get(url, authInfo) {
  try {
    let headers = {
      'Content-Type': 'application/json',
    };

    if (authInfo) {
      headers.Authorization = authInfo;
    }

    let response = await fetch(url, {headers});

    return await response.json();
  } catch (error) {
    return null;
  }
}

async function post(url, data, authInfo) {
  try {
    let headers = {
      'Content-Type': 'application/json',
    };

    if (authInfo) {
      headers.Authorization = authInfo;
    }

    let response = await fetch(url, {
      body: JSON.stringify(data),
      headers,
      method: 'POST',
    });

    return await response.json();
  } catch (error) {
    return null;
  }
}

async function makeDeleteCall(url, data, authInfo) {
  try {
    let headers = {
      'Content-Type': 'application/json',
    };

    if (authInfo) {
      headers.Authorization = authInfo;
    }

    let response = await fetch(url, {
      body: JSON.stringify(data),
      headers,
      method: 'DELETE',
    });

    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function deleteRequest(requestId, songId, username, userId, sid) {
  const authInfo = `${userId}:${sid}`;

  return await makeDeleteCall(
    `${baseUrl}/pendingrequests`,
    {
      requestId,
      songId,
      username,
    },
    authInfo
  );
}

export async function getFavorites(userId, sid) {
  const authInfo = `${userId}:${sid}`;

  return await get(`${baseUrl}/favorites`, authInfo);
}

export async function getNowPlaying(userId = 0, sid = '') {
  const authInfo = userId !== 0 && sid.length !== 0 ? `${userId}:${sid}` : '';

  return await get(`${baseUrl}/songs/now-playing`, authInfo);
}

export async function getPendingRequests(userId, sid) {
  const authInfo = `${userId}:${sid}`;

  return await get(`${baseUrl}/pendingrequests`, authInfo);
}

export async function getSong(songId) {
  return await get(`${baseUrl}/songs/${songId}`);
}

export async function login(username, password) {
  return await post(`${baseUrl}/auth/login`, {username, password});
}

export async function request(songId, userId, sid) {
  const authInfo = `${userId}:${sid}`;

  return await post(`${baseUrl}/request`, {songId}, authInfo);
}

export async function search(query) {
  return await get(`${baseUrl}/search/${query}`);
}

export async function updatePushToken(username, userid, token) {
  return await post(`${baseUrl}/auth/push-token`, {username, userid, token});
}
