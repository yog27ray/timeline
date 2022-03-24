"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityHelper = void 0;
const inversify_1 = require("inversify");
const timeline_error_1 = require("../components/errors/timeline-error");
let SecurityHelper = class SecurityHelper {
    isAuthenticatedRequest(request) {
        return !!(request.user || request.master);
    }
    getOption(request) {
        const option = { useMasterKey: !!request.master };
        if (request.user) {
            option.sessionToken = request.user.getSessionToken();
        }
        return option;
    }
    authenticatedCloudFunction(name, callback) {
        Parse.Cloud.define(name, async (req) => {
            if (!this.isAuthenticatedRequest(req)) {
                throw new Parse.Error(401, 'Unauthorized Access.');
            }
            return this.handleCallback(req, callback);
        });
    }
    unauthenticatedCloudFunction(name, callback) {
        Parse.Cloud.define(name, (req) => this.handleCallback(req, callback));
    }
    authenticatedBeforeSave(Table, callback) {
        Parse.Cloud.beforeSave(new Table().className, async (req) => {
            if (!this.isAuthenticatedRequest(req)) {
                throw new Parse.Error(401, 'Unauthorized Access.');
            }
            return this.handleCallback(req, callback);
        });
    }
    unauthenticatedBeforeSave(Table, callback) {
        Parse.Cloud.beforeSave(new Table().className, (req) => this.handleCallback(req, callback));
    }
    authenticatedBeforeDelete(Table, callback) {
        Parse.Cloud.beforeDelete(new Table().className, async (req) => {
            if (!this.isAuthenticatedRequest(req)) {
                throw new Parse.Error(401, 'Unauthorized Access.');
            }
            return this.handleCallback(req, callback);
        });
    }
    authenticatedBeforeFind(Table, callback) {
        Parse.Cloud.beforeFind(new Table().className, async (req) => {
            if (!this.isAuthenticatedRequest(req)) {
                throw new Parse.Error(401, 'Unauthorized Access.');
            }
            return this.handleCallback(req, callback);
        });
    }
    afterSave(Table, callback) {
        Parse.Cloud.afterSave(new Table().className, (req) => this.handleCallback(req, callback));
    }
    afterDelete(Table, callback) {
        Parse.Cloud.afterDelete(new Table().className, (req) => this.handleCallback(req, callback));
    }
    afterFind(Table, callback) {
        Parse.Cloud.afterFind(new Table().className, (req) => this.handleCallback(req, callback));
    }
    getMasterOption(option) {
        return { ...option, useMasterKey: true };
    }
    isMasterKeyUsed(req) {
        if (this.getOption(req).useMasterKey) {
            return;
        }
        throw new timeline_error_1.TimelineError({ code: 401, message: 'Only master key can perform this action', type: 'ERROR_NO_MASTER_KEY' });
    }
    async handleCallback(request, callback) {
        try {
            return (await callback(request, this.getOption(request)));
        }
        catch (error) {
            const { code, message } = error;
            throw new Parse.Error(code || 400, message);
        }
    }
};
SecurityHelper = __decorate([
    (0, inversify_1.injectable)()
], SecurityHelper);
exports.SecurityHelper = SecurityHelper;
//# sourceMappingURL=security.helper.js.map