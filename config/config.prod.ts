import getAbsoluteFSPath from "swagger-ui-dist/absolute-path.js";

/**
 * egg-swagger default config
 */
export default {
    swagger: {
        enable: false,
        dir: getAbsoluteFSPath(),
        prefix: "/docs",
        url: "/swagger.json",
        dynamic: true,
        preload: false,
        maxAge: 0,
        buffer: false,
        maxFiles: 10,
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
