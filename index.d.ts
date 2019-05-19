import { Spec } from "swagger-schema-official";
import { OpenAPIObject } from "openapi3-ts";

export interface swaggerConfig {
    enable: boolean;
    dir: string;
    prefix: string,
    url: string,
    dynamic: boolean,
    preload: boolean,
    maxAge: number,
    maxFiles: number,
    files?: any,
    buffer: boolean,
    apis: string[],
    definition: Spec | OpenAPIObject,
}

declare module "egg" {
    interface EggAppConfig {
        swagger: swaggerConfig;
    }
    interface Application {
        swagger: Spec | OpenAPIObject;
    }
}