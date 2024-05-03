import { type Request, type Response } from 'express';

const clientId = 'Ov23liEDgasXeWB4r0xw';
const clientSecret = '0fca7923f9a404712bacdba06e33eb5caaff0617';

export class AuthController {
  auth = async (request: Request, response: Response) => {
    const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;

    response.redirect(redirectUrl);
  };

  authCallback = async (request: Request, response: Response) => {
    console.log(request.query);

    return response.send();
  };
}
