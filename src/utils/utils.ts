/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
/**
 * login url 
 */
export const LOGIN_URL = '/user/login';

/**
 * 否为完整的 http 接口
 * @param path  string
 */
export const isUrl = (path: string): boolean => reg.test(path);

/**
 * 连字符转驼峰
 * @param val string
 */
export const hyphen2Hump = (val: string | undefined): string => {
  if (val) {
    return val.replace(/-(\2)/g, (...args) => {
      return args[1].toUpperCase();
    })
  } else {
    return "";
  }
}

/**
 * 驼峰转连字符
 * @param val string
 */
export const hump2Hyphen = (val: string | undefined): string => {
  if (val) {
    return val.replace(/([A-Z])/g, "-$1").toLowerCase();
  } else {
    return "";
  }
}
