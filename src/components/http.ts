import appStore from './appStore';

class HTTP {
  async getText<TResponse>(idGroup = ''): Promise<TResponse> {
    return fetch(`${appStore.apiUrl}/api/text/rand/${idGroup}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'ru',
      },
    })
      .then((response) => response.json())
      .then((data) => data as TResponse);
  }

  async getRating<TResponse>(limit = ''): Promise<TResponse> {
    return fetch(`${appStore.apiUrl}/api/user/rating/${limit}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'ru',
      },
    })
      .then((response) => response.json())
      .then((data) => data as TResponse);
  }

  async getAchievement<TResponse>(): Promise<TResponse> {
    return fetch(`${appStore.apiUrl}/api/achievement/all/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'ru',
      },
    })
      .then((response) => response.json())
      .then((data) => data as TResponse);
  }

  async getLesson<TResponse>(numberLesson = 1): Promise<TResponse> {
    return fetch(`${appStore.apiUrl}/api/text/lesson/${numberLesson}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'ru',
      },
    })
      .then((response) => response.json())
      .then((data) => data as TResponse);
  }

  async getGroups<TResponse>(): Promise<TResponse> {
    return fetch(`${appStore.apiUrl}/api/group/all/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'ru',
      },
    })
      .then((response) => response.json())
      .then((data) => data as TResponse);
  }

  async getUser<TResponse>(idUser = ''): Promise<TResponse> {
    return fetch(`${appStore.apiUrl}/api/user/${idUser}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'ru',
        Authorization: `Bearer ${appStore.user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => data as TResponse);
  }

  async updateUser<TResponse>(): Promise<TResponse> {
    return fetch(`${appStore.apiUrl}/api/user/${appStore.user._id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'ru',
        Authorization: `Bearer ${appStore.user.token}`,
      },
      body: JSON.stringify(appStore.user),
    })
      .then((response) => response.json())
      .then((data) => data as TResponse);
  }

  async login<TResponse>(userName: string, password: string): Promise<TResponse> {
    return fetch(`${appStore.apiUrl}/api/user/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'ru',
      },
      body: JSON.stringify({
        username: userName,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => data as TResponse);
  }

  async registration<TResponse>(userName: string, password: string): Promise<TResponse> {
    return fetch(`${appStore.apiUrl}/api/user/registration`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'ru',
      },
      body: JSON.stringify({
        username: userName,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => data as TResponse);
  }
}

const http = new HTTP();

export default http;
