"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SENTRY_DSN = void 0;
require("dotenv").config();
exports.SENTRY_DSN = process.env.SENTRY_DSN;
