let APIURL = '';

switch (window.location.hostname) {
  case 'https://accounthub.vercel.app':
    APIURL = 'https://server-mondb.onrender.com';
    break;
  case 'localhost' || '127.0.0.1':
    APIURL = 'http://localhost:3000';
    break;
  default:
    APIURL = 'https://server-mondb.onrender.com';
}

// APIURL = 'https://server-mondb.onrender.com';
export default APIURL;
