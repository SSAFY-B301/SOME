import Moment from "react-moment";
import 'moment/locale/ko';

interface AlarmTimeType {
    time : string
}

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
