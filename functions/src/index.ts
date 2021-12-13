import * as functions from "firebase-functions";
import * as express from "express";
import {
  addRoutes,
  getRoutes,
  getAllRoutes,
  updateRoutes,
  deleteRoutes,
  addClimbers,
  getClimbers,
  getAllClimbers,
  updateClimbers,
  deleteClimbers,
  getRouteClimbers,
  addClimbedRoutes,
  getClimbedRoutes,
  getAllClimbedRoutes,
  updateClimbedRoutes,
  deleteClimbedRoutes,
} from "./controller";

const app = express();

app.post("/routes", addRoutes);
app.get("/routes/:id", getRoutes);
app.get("/routes", getAllRoutes);
app.patch("/routes/:id/update", updateRoutes);
app.delete("/routes/:id/delete", deleteRoutes);

app.post("/climbers", addClimbers);
app.get("/climbers/:id", getClimbers);
app.get("/climbers", getAllClimbers);
app.patch("/climbers/:id/update", updateClimbers);
app.delete("/climbers/:id/delete", deleteClimbers);

app.post("/climbedRoutes", addClimbedRoutes);
app.get("/climbedRoutes/:id", getClimbedRoutes);
app.get("/climbedRoutes", getAllClimbedRoutes);
app.patch("/climbedRoutes/:id/update", updateClimbedRoutes);
app.delete("/climbedRoutes/:id/delete", deleteClimbedRoutes);

app.get("/routeClimbers/:id", getRouteClimbers);

app.get("/", (req, res) =>
  res.status(200).sendFile("index.html", {
    root: __dirname,
  })
);

exports.app = functions.https.onRequest(app);
