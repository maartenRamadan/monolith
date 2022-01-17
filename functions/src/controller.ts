import { Response } from "express";
import { db } from "./config/firebase";

type RouteType = {
  location: string;
  grade: string;
};

type RouteRequest = {
  body: RouteType;
  params: { id: string };
};

/**
 * Routes
 */

export const addRoutes = async (
  req: RouteRequest,
  res: Response
): Promise<void> => {
  const { location, grade } = req.body;

  const route = db.collection("routes").doc();

  const routeObject = {
    location,
    grade,
  };

  route.set(routeObject);

  res.status(200).send({
    status: "success",
    message: "route added successfully",
    data: routeObject,
  });
};

export const getAllRoutes = async (
  req: RouteRequest,
  res: Response
): Promise<unknown> => {
  const allRoutes: RouteType[] = [];
  const querySnapshot = await db.collection("routes").get();
  querySnapshot.forEach((doc: any) => allRoutes.push(doc.data()));

  return res.status(200).json(allRoutes);
};

export const getRoutes = async (
  req: RouteRequest,
  res: Response
): Promise<unknown> => {
  const {
    params: { id },
  } = req;

  const routeSnapshot = await db.collection("routes").doc(id).get();

  return res.status(200).json(routeSnapshot.data());
};

export const updateRoutes = async (
  req: RouteRequest,
  res: Response
): Promise<unknown> => {
  const {
    body: { grade, location },
    params: { id },
  } = req;

  const routeReference = db.collection("routes").doc(id);

  const currentData = (await routeReference.get()).data() || {};

  const routeObject = {
    location: location || currentData.location,
    grade: grade || currentData.grade,
  };

  routeReference.set(routeObject);

  return res.status(200).json({
    status: "success",
    message: "route updated successfully",
    data: routeObject,
  });
};

export const deleteRoutes = async (
  req: RouteRequest,
  res: Response
): Promise<unknown> => {
  const {
    params: { id },
  } = req;

  db.collection("routes").doc(id).delete();

  return res.status(200).json({
    status: "success",
    message: "route deleted",
  });
};

/**
 * Climbers
 */

type ClimberType = {
  name: string;
  highestGrade: string;
  medalCount: number;
  shoeSize: number;
};

type ClimberRequest = {
  body: ClimberType;
  params: { id: string };
};

export const addClimbers = async (
  req: ClimberRequest,
  res: Response
): Promise<void> => {
  const { name, highestGrade, medalCount, shoeSize } = req.body;

  const climber = db.collection("climbers").doc();

  const climberObject = { name, highestGrade, medalCount, shoeSize };

  climber.set(climberObject);

  res.status(200).send({
    status: "success",
    message: "climber added successfully",
    data: climberObject,
  });
};

export const getAllClimbers = async (
  req: ClimberRequest,
  res: Response
): Promise<unknown> => {
  const allClimbers: RouteType[] = [];
  const querySnapshot = await db.collection("climbers").get();
  querySnapshot.forEach((doc: any) => allClimbers.push(doc.data()));

  return res.status(200).json(allClimbers);
};

export const getClimbers = async (
  req: ClimberRequest,
  res: Response
): Promise<unknown> => {
  const {
    params: { id },
  } = req;

  const climberSnapshot = await db.collection("climbers").doc(id).get();

  return res.status(200).json(climberSnapshot.data());
};

export const updateClimbers = async (
  req: ClimberRequest,
  res: Response
): Promise<unknown> => {
  const {
    body: { name, highestGrade, medalCount, shoeSize },
    params: { id },
  } = req;

  const climberReference = db.collection("climbers").doc(id);

  const currentData = (await climberReference.get()).data() || {};

  const climberObject = {
    name: name || currentData.name,
    highestGrade: highestGrade || currentData.highestGrade,
    medalCount: medalCount || currentData.medalCount,
    shoeSize: shoeSize || currentData.shoeSize,
  };

  climberReference.set(climberObject);

  return res.status(200).json({
    status: "success",
    message: "climber updated successfully",
    data: climberObject,
  });
};

export const deleteClimbers = async (
  req: ClimberRequest,
  res: Response
): Promise<unknown> => {
  const {
    params: { id },
  } = req;

  db.collection("climbers").doc(id).delete();

  return res.status(200).json({
    status: "success",
    message: "climber deleted",
  });
};

/**
 * Climbed routes
 */

type ClimbedRouteType = {
  climberId: string;
  routeId: string;
};

type ClimbedRouteRequest = {
  body: ClimbedRouteType;
  params: { id: string };
};

export const addClimbedRoutes = async (
  req: ClimbedRouteRequest,
  res: Response
): Promise<void> => {
  const { climberId, routeId } = req.body;

  const climbedRoutes = db.collection("climbedRoutes").doc();

  const climbedRouteObject = { climberId, routeId };

  climbedRoutes.set(climbedRouteObject);

  res.status(200).send({
    status: "success",
    message: "climbed route added successfully",
    data: climbedRouteObject,
  });
};

export const getAllClimbedRoutes = async (
  req: ClimbedRouteRequest,
  res: Response
): Promise<unknown> => {
  const allClimbedRoutes: RouteType[] = [];
  const querySnapshot = await db.collection("climbedRoutes").get();
  querySnapshot.forEach((doc: any) => allClimbedRoutes.push(doc.data()));

  return res.status(200).json(allClimbedRoutes);
};

export const getClimbedRoutes = async (
  req: ClimbedRouteRequest,
  res: Response
): Promise<unknown> => {
  const {
    params: { id },
  } = req;

  const climbedRoutesSnapshot = await db
    .collection("climbedRoutes")
    .where("climberId", "==", id)
    .get();

  const climbedRoutes: RouteType[] = [];

  for await (const climbedRoute of climbedRoutesSnapshot.docs) {
    const routeSnapshot = await db
      .collection("routes")
      .doc(climbedRoute.data().routeId)
      .get();

    climbedRoutes.push(routeSnapshot.data() as RouteType);
  }

  return res.status(200).json(climbedRoutes);
};

export const updateClimbedRoutes = async (
  req: ClimbedRouteRequest,
  res: Response
): Promise<unknown> => {
  const {
    body: { climberId, routeId },
    params: { id },
  } = req;

  const climberReference = db.collection("climbedRoutes").doc(id);

  const currentData = (await climberReference.get()).data() || {};

  const climbedRouteObject = {
    climber: climberId || currentData.climber,
    route: routeId || currentData.route,
  };

  climberReference.set(climbedRouteObject);

  return res.status(200).json({
    status: "success",
    message: "climbed route updated successfully",
    data: climbedRouteObject,
  });
};

export const deleteClimbedRoutes = async (
  req: ClimbedRouteRequest,
  res: Response
): Promise<unknown> => {
  const {
    params: { id },
  } = req;

  db.collection("climbedRoutes").doc(id).delete();

  return res.status(200).json({
    status: "success",
    message: "climbed route deleted",
  });
};

/**
 * Route climbers
 */

export const getRouteClimbers = async (
  req: ClimbedRouteRequest,
  res: Response
): Promise<unknown> => {
  const {
    params: { id },
  } = req;

  const climbedRoutesSnapshot = await db
    .collection("climbedRoutes")
    .where("routeId", "==", id)
    .get();

  const routeClimbers: ClimberType[] = [];

  for await (const climbedRoute of climbedRoutesSnapshot.docs) {
    const climberSnapshot = await db
      .collection("climbers")
      .doc(climbedRoute.data().climberId)
      .get();

    routeClimbers.push(climberSnapshot.data() as ClimberType);
  }

  return res.status(200).json(routeClimbers);
};
