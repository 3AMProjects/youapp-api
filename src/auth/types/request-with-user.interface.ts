import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    sub: string; // ID of the user (from JWT)
    email: string;
  };
}
