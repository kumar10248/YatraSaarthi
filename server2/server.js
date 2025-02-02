import express from "express";
// import "dotenv/config.js";

import sightRoute from "./src/routes/sightSeeing.routes.js";

const app = express();
app.use(express.json());

app.use("/", sightRoute);

export default app;
