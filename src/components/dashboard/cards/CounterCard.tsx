import { CardProps } from "../../../types/types";

export default function CounterCard(props:CardProps): JSX.Element {
    return(
        <div className="bg-white p-5 rounded-md">
            <h1 className="text-sm text-gray-400 my-2 capitalize">{props?.title}</h1>
            <div className="grid grid-cols-2 my-2">
               {props?.total? <span className="font-bold text-lg">{props?.total}</span>: <div className="w-7 h-7 bg-gray-100 rounded-full"></div> }
                <div>
                    <div className="float-right">
                        {props?.percentile}
                    </div>
                </div>
            </div>
            <span className="text-xs text-gray-400">{props?.comment}</span>

        </div>
    )
}