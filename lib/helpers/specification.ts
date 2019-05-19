import { OpenAPIObject, TagObject } from "openapi3-ts";
import { Spec, Tag } from "swagger-schema-official";

type TagType = TagObject | Tag;

const simpleProperties = [
    "component",
    "components",
    "consume",
    "consumes",
    "produce",
    "produces",
    "path",
    "paths",
    "schema",
    "schemas",
    "securityDefinition",
    "securityDefinitions",
    "response",
    "responses",
    "parameter",
    "parameters",
    "definition",
    "definitions",
];
const schemaWrongProperties = [
    "consume",
    "produce",
    "path",
    "tag",
    "definition",
    "securityDefinition",
    "scheme",
    "response",
    "parameter",
];
/**
 * Makes a deprecated property plural if necessary.
 * @param propertyName The swagger property name to check.
 * @returns {string} The updated propertyName if neccessary.
 */
export function correctSwaggerKey(propertyName: string): string {
    if (schemaWrongProperties.indexOf(propertyName) > 0) {
        // Returns the corrected property name.
        return `${propertyName}s`;
    }
    return propertyName;
}

function tagDuplicated(target: TagType[], tag: TagType) {
    // Check input is workable.
    if (target && target.length && tag) {
        for (const targetTag of target) {
            // The name of the tag to include already exists in the taget.
            // Therefore, it's not necessary to be added again.
            if (targetTag.name === tag.name) {
                return true;
            }
        }
    }

    // This will indicate that `tag` is not present in `target`.
    return false;
}

/**
 * Adds the tags property to a swagger object.
 * @function
 * @param {object} conf - Flexible configuration.
 */
export function attachTags(
    tags: TagType | TagType[],
    definition: Spec | OpenAPIObject,
) {
    // Correct deprecated property.
    if (Array.isArray(tags)) {
        for (const tag of tags) {
            if (!tagDuplicated(definition.tags!, tag)) {
                definition.tags!.push(tag);
            }
        }
    } else if (!tagDuplicated(definition.tags!, tags)) {
        definition.tags!.push(tags);
    }
}

export function organizeSwaggerProperties(
    definition: OpenAPIObject | Spec,
    pathObject: any,
    propertyName: string,
) {
    if (simpleProperties.indexOf(propertyName) !== -1) {
        const keyName = correctSwaggerKey(propertyName);
        const definitionNames = Object.keys(pathObject);
        for (const definitionName of definitionNames) {
            definition[keyName][definitionName] = Object.assign(
                {},
                definition[keyName][definitionName],
                pathObject[definitionName],
            );
        }
    } else if (propertyName === "tag" || propertyName === "tags") {
        attachTags(pathObject, definition);
    } else {
        definition.paths[propertyName] = Object.assign(
            {},
            definition.paths[propertyName],
            pathObject,
        );
    }
}

export function addDataToSwaggerObject(
    definition: OpenAPIObject | Spec,
    data: any[],
) {
    if (!definition || !data) {
        throw new Error("definition and data are required!");
    }
    for (const pathObject of data) {
        for (const propertyName of Object.keys(pathObject)) {
            organizeSwaggerProperties(
                definition,
                pathObject[propertyName],
                propertyName,
            );
        }
    }
}
