import {numToTwo,initStringBlank} from "../base";
import {consoleStyle} from "../constants";

let __timeFormat__ = {
    deleteDayAfter(time){
        if (time.length > 10) {
            if (time.substring(10,11) !== " ") {
                time = time.substring(0, 10) + time.substring(11)
                time = this.deleteDayAfter(time)
            }
            return time
        }else {
            return time
        }
    },
    stringToDate(time){
        if (typeof time !== "string") {console.log("%c function stringToDate's param time is not String type",consoleStyle);return null;}
        time = initStringBlank(time); //将连续的空格全转化成单个空格
        time = this.deleteDayAfter(time);    // 将"28日"的"28"后面的字符删除，直到遇到空格

        let year = time.substring(0,4);
        let month = time.substring(5,7) - 1;
        let day = time.substring(8,10);
        let hour = time.substring(11,13);
        let minute = time.substring(14,16);
        let second = time.substring(17,19);
        return new Date(year, month, day, hour, minute, second)
    },
    DateToString(date,type){
        if (!date instanceof Date) {console.log("%c function DateTotime's param date is not Date type",consoleStyle); return null}
        if (!type instanceof String) {console.log("%c function DateTotime's param type is not String type",consoleStyle); return null}

        let year = date.getFullYear();
        let month = numToTwo(date.getMonth() + 1);
        let day = numToTwo(date.getDate());
        let hour = numToTwo(date.getHours());
        let minute = numToTwo(date.getMinutes());
        let second = numToTwo(date.getSeconds());
        return type.replace(/[y|Y]{4}/,year).replace(/MM/,month).replace(/[d|D]{2}/,day).replace(/[h|H]{2}/,hour).replace(/mm/,minute).replace(/[s|S]{2}/,second)
    }
}

const format = (time, type) =>{
    if (time instanceof Date){
        if (type === undefined) { console.log("%c function format's param type is undefined",consoleStyle);return null}
        return __timeFormat__.DateToString(time,type)
    }else if (typeof time === "string") {
        return __timeFormat__.stringToDate(time)
    }else {
        console.log("%c function format's param time is not [Date | String] type",consoleStyle);
        return null
    }
}
export default format