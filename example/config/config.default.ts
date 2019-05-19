import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
    const config = {
        keys: "123456",
        swagger: {
            apis: ["app/controller/**/*.ts"],
            definition: {
                openapi: "3.0.2",
                info: {
                    title: "swagger-test",
                    version: "0.1.0",
                },
            },
        },
    } as PowerPartial<EggAppConfig>;
    return config;
};
