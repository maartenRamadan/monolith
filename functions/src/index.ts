import * as functions from "firebase-functions";
import * as express from "express";
import {
  addRoutes,
  getRoutes,
  getAllRoutes,
  updateRoutes,
  deleteRoutes,
} from "./controller";

const app = express();

app.post("/routes", addRoutes);
app.get("/routes/:id", getRoutes);
app.get("/routes", getAllRoutes);
app.patch("/routes/:id/update", updateRoutes);
app.delete("/routes/:id/delete", deleteRoutes);

app.get("/", (req, res) =>
  res.status(200).sendFile("index.html", {
    root: __dirname,
  })
);

exports.app = functions.https.onRequest(app);
