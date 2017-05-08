import { polyfill } from 'es6-promise';
import server from './server';

polyfill();
server();
