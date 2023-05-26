import { setupServer } from 'msw/node';
import { handlers } from './handlers';

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;
export const server = setupServer(...handlers);
