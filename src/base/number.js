/**
 * 功能：将100以内的数字，格式化转化为两位数形式
 * @param num
 * @return {*}
 */
export const numToTwo = (num)=> {
    if (num < 10) {
        return "0" + num
    }else {
        return num
    }
};

