"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostHelper = void 0;
const inversify_1 = require("inversify");
const error_type_1 = require("../../components/errors/error-type");
const timeline_error_1 = require("../../components/errors/timeline-error");
let PostHelper = class PostHelper {
    addUser(post, user) {
        if (!post.has('user') && user) {
            post.set('user', user);
        }
    }
    validation(post) {
        if (['user', 'title', 'description'].some((each) => !post.has(each))) {
            throw new timeline_error_1.TimelineError({
                code: 412,
                type: error_type_1.ErrorType.InvalidRequest,
                message: 'Required data is missing',
            });
        }
    }
    updateEventTime(post) {
        if (!post.has('eventTime')) {
            post.set('eventTime', new Date());
        }
    }
};
PostHelper = __decorate([
    (0, inversify_1.injectable)()
], PostHelper);
exports.PostHelper = PostHelper;
//# sourceMappingURL=post.helper.js.map