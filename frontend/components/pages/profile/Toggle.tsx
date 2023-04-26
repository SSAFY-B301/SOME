import { useEffect, useState } from "react"

interface TogglePropType{
    categori : string,
}

export default function Toggle(props: TogglePropType) {
    const [toggleChecked, setToggleChecked] = useState<boolean>(false);

    function onToggleClick(){
        setToggleChecked(!toggleChecked);
    }
    
    useEffect(() => {
        console.log(props.categori+" 알림 수신 상태 변경")
        return() => {}
    }, [toggleChecked])

    return(
        <div onClick={onToggleClick} className="relative inline-block w-10 mr-2 align-middle transition duration-200 ease-in select-none">
            <input type="checkbox" name="toggle" id="toggle" checked={toggleChecked} 
                className={toggleChecked ? "absolute block w-1/2 h-5/6 m-0.5 bg-white rounded-full appearance-none cursor-pointer transition-all translate-x-4" : "absolute block right-0 w-1/2 h-5/6 m-0.5 transition-all -translate-x-4 bg-white rounded-full appearance-none cursor-pointer toggle-checkbox"} />
            <label htmlFor="toggle" 
                className={toggleChecked ? "block h-6 overflow-hidden rounded-full cursor-pointer toggle-label" : "block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer toggle-label"}
                style={toggleChecked? {background : "linear-gradient(238.55deg, rgba(244, 114, 182, 0.75) 15.98%, rgba(145, 153, 217, 0.75) 55.85%, rgba(56, 189, 248, 0.75) 84.59%), linear-gradient(134.36deg, #F472B6 15.23%, #9797D7 49.79%, #38BDF8 84.77%)"} : {}}></label>
        </div>
    )
};
