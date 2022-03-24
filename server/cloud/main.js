"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("../components/inversify");
const cloud_function_1 = require("./cloud-function");
const post_hooks_1 = require("./post/post.hooks");
const user_hooks_1 = require("./user/user.hooks");
inversify_1.container.get(cloud_function_1.CloudFunction).initialize();
inversify_1.container.get(post_hooks_1.PostHooks).initialize();
inversify_1.container.get(user_hooks_1.UserHooks).initialize();
//# sourceMappingURL=main.js.map