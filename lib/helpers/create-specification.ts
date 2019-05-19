import { OpenAPIObject } from "openapi3-ts";
import { Spec } from "swagger-schema-official";

const v2 = [
    "paths",
    "definitions",
    "responses",
    "parameters",
    "securityDefinitions",
];

const v3 = ["components"];

export default function createSpecification(
    definition: OpenAPIObject | Spec,
): OpenAPIObject | Spec {
    for (const property of v2) {
        definition[property] = definition[property] || {};
    }
    if ((definition as OpenAPIObject).openapi) {
        const spec: OpenAPIObject = definition as OpenAPIObject;
        for (const property of v3) {
            if (!spec[property]) {
                spec[property] = {};
            }
        }
    } else {
        const spec: Spec = definition as Spec;
        spec.swagger = "2.0";
    }
    if (!definition.tags) {
        definition.tags = [];
    }
    return definition;
}
