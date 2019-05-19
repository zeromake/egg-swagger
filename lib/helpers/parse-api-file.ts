import * as fs from "fs";
import * as path from "path";
import jsYaml from "js-yaml";
import doctrine, { Annotation } from "doctrine";

const defaultOpt = {
    reg: /\/\*\*([\s\S]*?)\*\//gm,
};

/**
 * 解析doc中的yaml
 * @param {string} file 要解析的文件路径
 * @param {object} [opt] 配置
 * @param {RegExp} opt.reg 注释匹配正则
 */
export default function parseApiFile(
    file: string,
    opt: { reg: RegExp } = defaultOpt,
) {
    const fileContent = fs.readFileSync(file, { encoding: "utf8" });
    const ext = path.extname(file);
    const yaml: any[] = [];
    const docComments: Annotation[] = [];
    if (ext === "yaml" || ext === "yml") {
        yaml.push(jsYaml.safeLoad(fileContent));
    } else {
        const regexResults = fileContent.match(opt.reg);
        if (regexResults) {
            for (let i = 0, len = regexResults.length; i < len; i += 1) {
                const docComment = doctrine.parse(regexResults[i], {
                    unwrap: true,
                });
                docComments.push(docComment);
            }
        }
    }
    return {
        yaml,
        doc: docComments,
    };
}
