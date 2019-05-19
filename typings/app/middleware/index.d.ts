// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportSwagger from '../../../app/middleware/swagger';

declare module 'egg' {
  interface IMiddleware {
    swagger: typeof ExportSwagger;
  }
}
