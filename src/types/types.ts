import { Request, Response, NextFunction } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
export type Req = Request<any, any, any, ParsedQs, Record<string, any>>;
export type Res =  Response<any, Record<string, any>, number>;
export type Next = NextFunction;