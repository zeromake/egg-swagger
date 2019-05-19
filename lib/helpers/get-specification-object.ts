import { swaggerConfig } from "../../index";
import createSpecification from "./create-specification";
import parseApiFile from "./parse-api-file";
import convertGlobPaths from "./convert-glob-paths";
import { addDataToSwaggerObject } from "./specification";
import { Annotation } from "doctrine";
import { safeLoad } from "js-yaml";
import { parse } from "swagger-parser";
import { OpenAPIObject } from "openapi3-ts";

function filterJsDocComments(docComments: Annotation[]): any[] {
    const openApiDocComments: any[] = [];
    for (const docComment of docComments) {
        for (const tag of docComment.tags) {
            if (tag.title === "swagger" && tag.description) {
                openApiDocComments.push(safeLoad(tag.description));
            }
        }
    }
    return openApiDocComments;
}
const toClean = [
    "definitions",
    "responses",
    "parameters",
    "securityDefinitions",
];

function cleanUselessProperties(definition: OpenAPIObject): OpenAPIObject {
    for (const to of toClean) {
        if (to in definition && Object.keys(definition[to]).length === 0) {
            delete definition[to];
        }
    }
    return definition;
}

export default function getSpecificationObject(options: swaggerConfig) {
    let definition = createSpecification(options.definition);

    for (const api of options.apis) {
        const files = convertGlobPaths(api);
        for (const file of files) {
            const lex = parseApiFile(file);
            const openApiDocComments = filterJsDocComments(lex.doc);
            addDataToSwaggerObject(definition, lex.yaml);
            addDataToSwaggerObject(definition, openApiDocComments);
        }
    }
    parse(definition as any, (err, api) => {
        if (!err) {
            definition = api;
        }
    });

    if ((definition as OpenAPIObject).openapi) {
        definition = cleanUselessProperties(definition as OpenAPIObject);
    }
    return definition;
}
