import { Response } from "express";
import { db } from "./config/firebase";

type RouteType = {
  location: string;
  grade: string;
};

type Request = {
  body: RouteType;
  params: { id: string };
};

export const addRoutes = async (req: Request, res: Response): Promise<void> => {
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
  req: Request,
  res: Response
): Promise<unknown> => {
  const allRoutes: RouteType[] = [];
  const querySnapshot = await db.collection("routes").get();
  querySnapshot.forEach((doc: any) => allRoutes.push(doc.data()));

  return res.status(200).json(allRoutes);
};

export const getRoutes = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  const {
    params: { id },
  } = req;

  const routeSnapshot = await db.collection("routes").doc(id).get();

  return res.status(200).json(routeSnapshot.data());
};

export const updateRoutes = async (
  req: Request,
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
  req: Request,
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
