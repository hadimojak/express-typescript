"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send("not permitted");
}
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
    if (req.session && req.session.loggedIn) {
        res.send(`
     <div><h1>you are logged in</h1></div>
    <div>
      <a href="http://localhost:3000/logout" class="btn">logout</a>
    </div>
    `);
    }
    else {
        res.send(`
        <div><h1>you are logged out</h1></div>
    <div>
      <a href="http://localhost:3000/login" class="btn">login</a>
    </div>
        `);
    }
});
router.get("/logout", (req, res) => {
    console.log("heerrreee");
    req.session.loggedIn = false;
    res.redirect("/");
});
router.get("/protected", requireAuth, (req, res) => {
    res.send("welcome to protected route");
});
