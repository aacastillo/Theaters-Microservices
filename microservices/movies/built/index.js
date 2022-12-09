"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_js_1 = require("./routes/routes.js");
const dbInit_js_1 = require("./data/dbInit.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(routes_js_1.router);
(0, dbInit_js_1.startupDB)();
app.listen(4004, () => {
    console.log('Listening on 4004');
});
