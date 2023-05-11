import Moment from "react-moment";
import 'moment/locale/ko';

interface AlarmTimeType {
    time : string
}

export function PhotoTime(params: AlarmTimeType) {
    let startTime = new Date(params.time).getTime();
    let nowTime = Date.now();
    if(startTime - nowTime > -60000) {
        return <Moment className="text-sm text-gray-400" format="방금 전">{startTime}</Moment>;
    }
    else if(startTime - nowTime < -86400000) {
        return <Moment className="text-sm text-gray-400" format="MMM D일">{startTime}</Moment>;
    }
    else if(startTime - nowTime > -86400000) {
        return <Moment className="text-sm text-gray-400" fromNow>{startTime}</Moment>;
    }
    else{
        return <></>
    }
};


export default function AlarmTime(params: AlarmTimeType) {
    let startTime = new Date(params.time).getTime();
    let nowTime = Date.now();
    if(startTime - nowTime > -60000) {
        return <Moment className="text-xs dark:text-gray-200" format="방금 전">{startTime}</Moment>;
    }
    else if(startTime - nowTime < -86400000) {
        return <Moment className="text-xs dark:text-gray-200" format="MMM D일">{startTime}</Moment>;
    }
    else if(startTime - nowTime > -86400000) {
        return <Moment className="text-xs dark:text-gray-200" fromNow>{startTime}</Moment>;
    }
    else{
        return <></>
    }
};
