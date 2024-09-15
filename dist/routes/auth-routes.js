"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth-controller");
const apiRoutes_1 = require("../constants/apiRoutes");
const authrouter = express_1.default.Router();
// to register new user into out application
authrouter.post(`${apiRoutes_1.apiRoutes.register}`, auth_controller_1.register);
// to setup new user password in his account
authrouter.post(`${apiRoutes_1.apiRoutes.passwordsetup}`, auth_controller_1.passwordsetup);
// to login  into out application
authrouter.post(`${apiRoutes_1.apiRoutes.login}`, auth_controller_1.login);
// to logout  into out application
authrouter.get(`${apiRoutes_1.apiRoutes.logout}`, auth_controller_1.logout);
// test api
authrouter.get(`${apiRoutes_1.apiRoutes.testapi}`, auth_controller_1.testapi);
exports.default = authrouter;
//# sourceMappingURL=auth-routes.js.map