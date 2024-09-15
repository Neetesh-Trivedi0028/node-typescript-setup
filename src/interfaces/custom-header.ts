/**
 * CustomRequest interface
 * @description we are defining custom headers  !!
 */
export interface CustomRequest extends Request {
  customHeaders?: {
    version: string;
    acceptLanguage: string;
    platform: string;
  };
}
