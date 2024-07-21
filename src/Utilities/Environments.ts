let APIURL = '';

switch (window.location.hostname) {
  case 'localhost' || '127.0.0.1':
    APIURL = 'http://localhost:3000';
    break;
  case 'https://accounthub.vercel.app/':
    APIURL = 'https://accounthub.vercel.app/';
    break;
}

export default APIURL;
