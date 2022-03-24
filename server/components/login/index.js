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
var SocialLogin_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialLogin = void 0;
const inversify_1 = require("inversify");
const env_1 = require("../../config/env");
const d_b_query_1 = require("../d-b-query/d-b-query");
const error_type_1 = require("../errors/error-type");
const timeline_error_1 = require("../errors/timeline-error");
const google_login_1 = require("./google-login");
let SocialLogin = SocialLogin_1 = class SocialLogin {
    static verifyEmailAccess(email) {
        const validEmailIdDomains = env_1.env.WHITELISTED_EMAIL_DOMAIN.split(',').filter((each) => each);
        if (!validEmailIdDomains.length) {
            return;
        }
        if (validEmailIdDomains.includes(email.split('@')[1])) {
            return;
        }
        throw new timeline_error_1.TimelineError({
            code: 412,
            message: 'Email Id not allowed to access.',
            type: error_type_1.ErrorType.InvalidEmailId,
        });
    }
    async login(method, authData) {
        switch (method) {
            case 'google': {
                const { name, email, photo } = await this.findSocialProfile(method, authData);
                SocialLogin_1.verifyEmailAccess(email);
                const user = (await this.dbQuery.findOne(Table.User, {
                    where: { email },
                    option: { useMasterKey: true },
                })) || new Table.User();
                await user.linkWith(method, { authData }, { useMasterKey: true });
                await user.save({ name, photo }, { useMasterKey: true });
                return user.getSessionToken();
            }
            default: {
                throw new timeline_error_1.TimelineError({
                    code: 404,
                    type: error_type_1.ErrorType.InvalidLoginMethod,
                    message: 'Unsupported Login Method.',
                });
            }
        }
    }
    findSocialProfile(method, { id_token: token }) {
        return this.googleLogin.findSocialProfile(token);
    }
};
__decorate([
    (0, inversify_1.inject)(d_b_query_1.DBQuery),
    __metadata("design:type", d_b_query_1.DBQuery)
], SocialLogin.prototype, "dbQuery", void 0);
__decorate([
    (0, inversify_1.inject)(google_login_1.GoogleLogin),
    __metadata("design:type", google_login_1.GoogleLogin)
], SocialLogin.prototype, "googleLogin", void 0);
SocialLogin = SocialLogin_1 = __decorate([
    (0, inversify_1.injectable)()
], SocialLogin);
exports.SocialLogin = SocialLogin;
//# sourceMappingURL=index.js.map