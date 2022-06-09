import { LoadingOutlined } from "@ant-design/icons";
import { LoadingBgProps } from "../../../types/types";
import EllipsisLoader from "./EllipsisLoader";
export default function LoadingBackground(props:LoadingBgProps):JSX.Element {
    return(
        <div className="modal bg-gray-100 opacity-90"> 
        <div className="flex items-center justify-center h-full">
            <div className="grid grid-cols-1 justify-center">
                <div className="flex justify-center">
                <EllipsisLoader/>
                </div>
                {/* <h1 className="text-primary text-sm font-bold">{props.operationTitle}</h1> */}
            </div>
        </div>
        </div>
    )
}