// import getAbsoluteFSPath from "swagger-ui-dist/absolute-path.js";

/**
 * egg-swagger default config
 */

const path = require.resolve("swagger-ui-dist/package.json");
const dir = path.substr(0, path.length - 12);
export default {
    swagger: {
        enable: true,
        dir,
        prefix: "/docs",
        url: "/swagger.json",
        dynamic: true,
        preload: false,
        maxAge: 0,
        maxFiles: 10,
        buffer: false,
        apis: ["app/controller/**/*.ts", "app/router/**/*.ts"],
        definition: {
            openapi: "3.0.2",
            info: {
                title: "swagger",
                version: "0.1.0",
            },
        },
    },
};
