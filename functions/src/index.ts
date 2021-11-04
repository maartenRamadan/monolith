import * as functions from "firebase-functions";
import * as express from "express";
import { addRoute, getAllRoutes } from "./controller";

const app = express();

// app.get("/", (req, res) => res.status(200).send("Hey there!"));

app.post("/add-route", addRoute);
app.get("/routes", getAllRoutes);

app.get("/", (req, res) =>
  res.status(200).sendFile("index.html", {
    root: __dirname,
  })
);

exports.app = functions.https.onRequest(app);
