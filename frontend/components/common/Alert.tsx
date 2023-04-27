interface AlertType{
    msg : string,
    yesHandler : () => void, 
    noHandler : () => void,
}

export default function Alert(props : AlertType) {
    return(
        <div onClick={props.noHandler} className="absolute top-0 flex items-center justify-center bg-black bg-opacity-40" style={{width: "100vw", height: "100vh"}}>
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center justify-center w-64 bg-white rounded-lg h-28 gap-y-4">
                <p>{props.msg}</p>
                <div className="flex items-center justify-center gap-x-4">
                    <button onClick={props.yesHandler} className="w-24 rounded-lg shadow">예</button>
                    <button onClick={props.noHandler} className="w-24 rounded-lg shadow">아니오</button>
                </div>
            </div>
        </div>
    )
};
