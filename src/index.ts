import cors from "cors";
import express from "express";
import helmet from "helmet";
import router from "./router";

const port = process.env.APP_PORT ?? 8080;
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/", router);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
