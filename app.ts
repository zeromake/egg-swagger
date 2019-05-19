import { Application } from "egg";
import { sep } from "path";
// import { swaggerConfig } from "./index";
import defaultConfig from "./config/config.default";
import getSpecificationObject from "./lib/helpers/get-specification-object";

export default (app: Application) => {
    const config = Object.assign({}, defaultConfig, app.config.swagger);
    app.config.swagger = config;
    if (config.enable) {
        app.config.coreMiddleware.push('swagger');
        config.apis = config.apis.map((file: string) => {
            if (file[0] !== sep && file[1] !== ":") {
                return app.baseDir + sep + file;
            }
            return file;
        });
        app.swagger = getSpecificationObject(config);
    }
};
