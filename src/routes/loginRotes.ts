import { Router, Request, Response, response } from "express";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

interface SessionObject {
  loggedIn: boolean;
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
  if ((req.session as SessionObject).loggedIn) res.send("user logged in");
});

export { router };
 