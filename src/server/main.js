import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import ViteExpress from "vite-express";
import MenuGeneratorRouter from "./routes/MenuGeneratorRouter.mjs";

dotenv.config();

const PORT = process.env.PORT || 3000;
const ONE_DAY = 1000 * 60 * 60 * 24;
console.log(process.env.VITE_PORT);
const app = express();
app.use(express.json());

app.use(
  session({
    secret: "this_is_a_lastlook_secret",
    saveUninitialized: true,
    cookie: { maxAge: ONE_DAY },
    resave: false,
  })
);

app.use(MenuGeneratorRouter);

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}...`)
);
