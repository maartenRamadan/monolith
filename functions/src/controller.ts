import { Response } from "express";
import { db } from "./config/firebase";

type RouteType = {
  location: string;
  grade: string;
};

type Request = {
  body: RouteType;
  params: { routeId: string };
};

export const addRoute = async (req: Request, res: Response): Promise<void> => {
  const { location, grade } = req.body;
  try {
    const route = db.collection("routes").doc();

    const routeObject = {
      id: route.id,
      location,
      grade,
    };

    route.set(routeObject);

    console.log("success");

    res.status(200).send({
      status: "success",
      message: "route added successfully",
      data: routeObject,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllRoutes = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  const allRoutes: RouteType[] = [];
  const querySnapshot = await db.collection("routes").get();
  querySnapshot.forEach((doc: any) => allRoutes.push(doc.data()));

  try {
    return res.status(200).json(allRoutes);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updateRoute = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  const {
    body: { grade, location },
    params: { routeId },
  } = req;

  try {
    const route = db.collection("routes").doc(routeId);
    const currentData = (await route.get()).data() || {};

    const routeObject = {
      location: location || currentData.location,
      grade: grade || currentData.grade,
    };

    route.set(routeObject);

    return res.status(200).json({
      status: "success",
      message: "route updated successfully",
      data: routeObject,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
