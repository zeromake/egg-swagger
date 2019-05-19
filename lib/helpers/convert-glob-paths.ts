import { sync, IOptions } from "glob";

/**
 * 通过 glob 表达式获取匹配的文件路径列表
 * @param {string} glob 表达式
 * @param {object} [opt] glob选项
 * @returns {string[]} 匹配的路径列表
 */
export default function convertGlobPaths(
    glob: string,
    opt?: IOptions,
): string[] {
    return sync(glob, opt);
}
