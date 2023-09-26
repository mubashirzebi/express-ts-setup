"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const customFormat = winston_1.format.printf(({ level, message, timestamp }) => {
    return `${level}: ${timestamp}: ${message} `;
});
const log = (0, winston_1.createLogger)({
    level: 'debug',
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.align(), customFormat),
    transports: [
        new winston_1.transports.File({ filename: './src/logs/error.log', level: 'error' }),
        new winston_1.transports.File({ filename: './src/logs/info.log', level: 'info' }),
        new winston_1.transports.File({ filename: './src/logs/warn.log', level: 'warn' }),
        new winston_1.transports.Console()
    ]
});
exports.default = log;
