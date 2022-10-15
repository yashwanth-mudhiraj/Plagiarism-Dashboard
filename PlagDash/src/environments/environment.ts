import { windowCount } from 'rxjs';
// import { domain, clientId } from '../../auth_config.json';

export const environment = {
  production: false,
  auth : {
    "domain": "dev-z2phpr01.us.auth0.com",
    "clientId": "m0fcURadoPG7QpnjYFIvGbHD7XVMEbWV",
    redirectUri: window.location.origin
  }
};


