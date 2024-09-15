import express from "express";
import {
  register,
  login,
  passwordsetup,
  logout,
  testapi,
} from "../controllers/auth-controller";
import { apiRoutes } from "../constants/apiRoutes";

const authrouter = express.Router();
// to register new user into out application
authrouter.post(`${apiRoutes.register}`, register);
// to setup new user password in his account
authrouter.post(`${apiRoutes.passwordsetup}`, passwordsetup);
// to login  into out application
authrouter.post(`${apiRoutes.login}`, login);
// to logout  into out application
authrouter.get(`${apiRoutes.logout}`, logout);
// test api
authrouter.get(`${apiRoutes.testapi}`, testapi);

export default authrouter;
