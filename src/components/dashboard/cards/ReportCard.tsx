import {
 FilePdfFilled,
 DownloadOutlined
}
    from '@ant-design/icons'
import { ReportCardProps } from '../../../types/types'
export default function ReportCard(props:ReportCardProps):JSX.Element {
    return(
        <div className="p-3 hover:bg-lightPrimary grid grid-cols-1 md:grid-cols-12 items-center text-sm gap-5 rounded border my-2 md:my-0 md:border-0 cursor-pointer">
            <div className="col-span-2 lg:col-span-1">
                <div className="flex items-center justify-center bg-white rounded-full sm-img p-2">
                    <FilePdfFilled className="text-red-500 text-xl"/>
                </div>

            </div>
            <div className="col-span-10">
                <h1 className="font-bold">{props.title}</h1>
                   <p className="text-gray-400 text-xs">{props.description}</p>
            </div>
            <div className="col-span-1">
                <div className="flex justify-center  rounded-full sm-img">
                    <DownloadOutlined className="text-green-500 text-xl"/>
                </div>

            </div>
            
        </div>
    )
}