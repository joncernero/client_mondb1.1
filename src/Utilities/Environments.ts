let APIURL = '';

switch (window.location.hostname) {
  case 'localhost' || '127.0.0.1':
    APIURL = 'http://localhost:3000';
    break;
  case 'jac-accounthubclient.herokuapp.com':
    APIURL = 'https://jac-accounthubclient.herokuapp.com';
}

export default APIURL;
