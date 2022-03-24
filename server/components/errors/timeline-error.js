"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineError = void 0;
class TimelineError extends Error {
    constructor(error) {
        super(error.message);
        Object.setPrototypeOf(this, TimelineError.prototype);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, TimelineError);
        }
        this.name = error.type;
        this.code = error.code;
        this.type = error.type;
        this.params = error.params;
        this.logMessage = error.logMessage;
        this.skipSentry = error.skipSentry;
    }
    toJSON() {
        const jsonObj = { code: this.code, type: this.type, message: this.message };
        ['logMessage', 'skipSentry', 'params'].forEach((key) => {
            if (!this[key]) {
                return;
            }
            jsonObj[key] = this[key];
        });
        return jsonObj;
    }
}
exports.TimelineError = TimelineError;
//# sourceMappingURL=timeline-error.js.map