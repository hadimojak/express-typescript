import { Router, Request, Response, NextFunction } from "express";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

interface SessionObject {
  loggedIn: boolean;
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send("not permitted");
}

const router = Router();

router.get("/login", (req: Request, res: Response) => {
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

router.post("/login", (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === "asdf" && password === "asdf") {
    req.session = { loggedIn: true };
    res.redirect("/");
  } else res.send("email or password must be incorrect");
});

router.get("/", (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(
      `
     <div><h1>you are logged in</h1></div>
    <div>
      <a href="http://localhost:3000/logout" class="btn">logout</a>
    </div>
    `
    );
  } else {
    res.send(`
        <div><h1>you are logged out</h1></div>
    <div>
      <a href="http://localhost:3000/login" class="btn">login</a>
    </div>
        `);
  }
});

router.get("/logout", (req: Request, res: Response) => {
  console.log("heerrreee");

  (req.session as SessionObject).loggedIn = false;
  res.redirect("/");
});

router.get("/protected", requireAuth,(req: Request, res: Response) => {
  res.send("welcome to protected route");
});

export { router };
 