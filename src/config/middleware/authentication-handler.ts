import * as express from 'express';

export const expressAuthentication = (
  request: express.Request,
  securityName: string,
  scopes?: string[],
): Promise<any> => {
  const token = request.body.token || request.query.token || request.headers['x-access-token'];

  return new Promise((resolve, reject) => {
    if (!token) {
      reject(new Error('Invalid JWT token'));
    }
    resolve(token);
  });
};
