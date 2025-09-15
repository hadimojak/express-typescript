"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/login", (req, res) => {
    res.send(`
       <form action="" method="post">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div> 
        <label>Password</label>
        <input type="password" name="password" />
      </div>
      <button >Submit</button>
    </form>
    `);
});
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email && password && email === "asdf" && password === "asdf") {
        req.session = { loggedIn: true };
        res.redirect("/");
    }
    else
        res.send("email or password must be incorrect");
});
router.get("/", (req, res) => {
    if (req.session.loggedIn)
        res.send("user logged in");
});
