import e, { urlencoded } from "express";
import cors from "cors";
import { routes } from "./routes";

const app = e();

app.use(cors());

app.use(e.json());
app.use(e.urlencoded({ extended: true }))

app.use("/public", e.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.use("/api", routes);

const port = process.env.PORT || 3000

app.listen(port, () =>
  console.log(`Server is Running on ${port}`)
);

export default app