class HTTP {
  async getText<TResponse>(idGroup = ''): Promise<TResponse> {
    return fetch(`https://keyboardrace.herokuapp.com/api/text/rand/${idGroup}`, {
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
    return fetch(`https://keyboardrace.herokuapp.com/api/group/all/`, {
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
    return fetch(`https://keyboardrace.herokuapp.com/api/user/${idUser}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'ru',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => data as TResponse);
  }

  async login<TResponse>(userName: string, password: string): Promise<TResponse> {
    return fetch(`https://keyboardrace.herokuapp.com/api/user/login`, {
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
    return fetch(`https://keyboardrace.herokuapp.com/api/user/registration`, {
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
