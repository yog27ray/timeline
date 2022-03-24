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
exports.PostHooks = void 0;
const inversify_1 = require("inversify");
const table_1 = require("../../components/d-b-query/table");
const acl_update_1 = require("../acl/acl-update");
const security_helper_1 = require("../security.helper");
const post_helper_1 = require("./post.helper");
let PostHooks = class PostHooks {
    initialize() {
        this.beforeSave();
    }
    beforeSave() {
        this.securityHelper.authenticatedBeforeSave(table_1.Table.Post, async (req) => {
            this.postHelper.addUser(req.object, req.user);
            this.postHelper.validation(req.object);
            this.postHelper.updateEventTime(req.object);
            await this.aclUpdate.post(req.object);
        });
    }
};
__decorate([
    (0, inversify_1.inject)(security_helper_1.SecurityHelper),
    __metadata("design:type", security_helper_1.SecurityHelper)
], PostHooks.prototype, "securityHelper", void 0);
__decorate([
    (0, inversify_1.inject)(post_helper_1.PostHelper),
    __metadata("design:type", post_helper_1.PostHelper)
], PostHooks.prototype, "postHelper", void 0);
__decorate([
    (0, inversify_1.inject)(acl_update_1.AclUpdate),
    __metadata("design:type", acl_update_1.AclUpdate)
], PostHooks.prototype, "aclUpdate", void 0);
PostHooks = __decorate([
    (0, inversify_1.injectable)()
], PostHooks);
exports.PostHooks = PostHooks;
//# sourceMappingURL=post.hooks.js.map