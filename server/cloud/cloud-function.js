"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudFunction = void 0;
const inversify_1 = require("inversify");
const login_1 = require("../components/login");
const security_helper_1 = require("./security.helper");
let CloudFunction = class CloudFunction {
    initialize() {
        this.login();
    }
    login() {
        this.securityHelper.unauthenticatedCloudFunction('login', async (req) => {
            const { method, authData } = req.params;
            const sessionToken = await this.socialLogin.login(method, authData);
            return { sessionToken };
        });
    }
};
__decorate([
    (0, inversify_1.inject)(security_helper_1.SecurityHelper),
    __metadata("design:type", security_helper_1.SecurityHelper)
], CloudFunction.prototype, "securityHelper", void 0);
__decorate([
    (0, inversify_1.inject)(login_1.SocialLogin),
    __metadata("design:type", login_1.SocialLogin)
], CloudFunction.prototype, "socialLogin", void 0);
CloudFunction = __decorate([
    (0, inversify_1.injectable)()
], CloudFunction);
exports.CloudFunction = CloudFunction;
//# sourceMappingURL=cloud-function.js.map