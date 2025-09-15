"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginRotes_1 = require("./routes/loginRotes");
const cookie_session_1 = __importDefault(require("cookie-session"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_session_1.default)({ keys: ["asdasd78"] }));
app.use(loginRotes_1.router);
app.listen(3000, () => {
    console.log("listening on port 3000");
});
