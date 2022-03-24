"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var RequestClient_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestClient = void 0;
const inversify_1 = require("inversify");
const node_fetch_1 = __importDefault(require("node-fetch"));
const error_type_1 = require("../errors/error-type");
const timeline_error_1 = require("../errors/timeline-error");
let RequestClient = RequestClient_1 = class RequestClient {
    static async transformResponse(response, json) {
        if (response.status >= 200 && response.status < 300) {
            if (json) {
                return response.json();
            }
            return response.text();
        }
        const errorMessage = await response.text();
        throw new timeline_error_1.TimelineError({
            type: error_type_1.ErrorType.NetworkError,
            message: errorMessage,
            code: response.status,
        });
    }
    async get(url, json) {
        const response = await (0, node_fetch_1.default)(url);
        return RequestClient_1.transformResponse(response, json);
    }
};
RequestClient = RequestClient_1 = __decorate([
    (0, inversify_1.injectable)()
], RequestClient);
exports.RequestClient = RequestClient;
//# sourceMappingURL=request-client.js.map