/*
 * @Description:
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-14 11:14:18
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-08-17 09:56:19
 */
import "reflect-metadata";
import {
  createExpressServer,
  useContainer,
  useExpressServer,
  Action,
  getMetadataArgsStorage,
} from "routing-controllers";
import { Container } from "typedi";
import { CategoryController } from "./controllers/CategoryController";
import { PostController } from "./controllers/PostController";
import { UserController } from "./controllers/UserController";
import { AuthController } from "./controllers/AuthController";

import { validationMetadatasToSchemas } from "class-validator-jsonschema";
const { defaultMetadataStorage } = require("class-transformer/cjs/storage");
import { routingControllersToSpec } from "routing-controllers-openapi";
import * as swaggerUiExpress from "swagger-ui-express";
import DB from './mongo/db'
import { ErrorMiddleware } from "./middleware/ErrorMiddleware";
// import { ResponseMiddleware } from "./middleware/ResponseMiddleware";
/**
 * Setup routing-controllers to use typedi container.
 */

useContainer(Container);

DB.init()
/**
 * We can add options about how routing-controllers should configure itself.
 * Here we specify what controllers should be registered in our express server.
 */
const routingControllersOptions = {
  controllers: [CategoryController, PostController, UserController, AuthController],
  authorizationChecker: async (action: Action, roles?: string[]) => {
    // perform queries based on token from request headers
    // const token = action.request.headers["authorization"];
    // return database.findUserByToken(token).roles.in(roles);
    console.log(roles);
    // return roles.indexOf("get") > -1;
    return true
  },
  middlewares: [ErrorMiddleware],
  // middlewares: [ResponseMiddleware],
};

/**
 * We create a new express server instance.
 * We could have also use useExpressServer here to attach controllers to an existing express instance.
 */
const expressApp = createExpressServer(routingControllersOptions);

// Parse class-validator classes into JSON Schema:
const schemas = validationMetadatasToSchemas({
  classTransformerMetadataStorage: defaultMetadataStorage,
  refPointerPrefix: "#/components/schemas/",
});

// Parse routing-controllers classes into OpenAPI spec:
const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(
  storage as any,
  routingControllersOptions,
  {
    components: {
      schemas,
      securitySchemes: {
        basicAuth: {
          scheme: "basic",
          type: "http",
        },
      },
    },
    info: {
      description: "Generated with `routing-controllers-openapi`",
      title: "A sample API",
      version: "1.0.0",
    },
  }
);

expressApp.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec)); 
/**
 * Start the express app.
 */
expressApp.listen(3000);

console.log("Server is up and running at port 3000");
