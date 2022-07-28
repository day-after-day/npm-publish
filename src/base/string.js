/**
 * 将字符串中的连续空格统一转化为一个空格
 * @param str
 * @return {*}
 */
export const  initStringBlank = (str)=> {
    str = str.replace(/  /g," ");
    if (str.indexOf("  ") !== -1) {
        str = this.initStringBlank(str)
    }
    return str
};