"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.get("/", (req, res) => {
    res.send("Hello, TypeScript Express!");
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
