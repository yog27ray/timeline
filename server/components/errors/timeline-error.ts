declare interface TimelineErrorType {
  message: string;
  code: number;
  type: string;
  logMessage?: string;
  skipSentry?: boolean;
  params?: { [key: string]: any };
}

class TimelineError extends Error {
  readonly skipSentry: boolean;

  readonly code: number;

  private readonly type: string;

  private readonly logMessage: string;

  private readonly params: { [key: string]: any };

  constructor(error: TimelineErrorType) {
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

  toJSON(): unknown {
    const jsonObj: any = { code: this.code, type: this.type, message: this.message };
    ['logMessage', 'skipSentry', 'params'].forEach((key: string) => {
      if (!this[key]) {
        return;
      }
      jsonObj[key] = this[key];
    });
    return jsonObj;
  }
}

export { TimelineError };
