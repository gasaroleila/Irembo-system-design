import { useRouter } from "next/router"
import { HeaderTabProps } from "../../../types/types"

export default function HeaderTab(props:HeaderTabProps):JSX.Element{
    const router = useRouter()
    let query = (props.query==='')?'':('?q='+ props.query)
    let url = props.path+query
    return(
        <div className={`flex gap-1 items-center capitalize ${props.query ==='' && (!router.query.q) ? 'header--tab-active' : (props.query && (router.query.q === props.query) &&' header--tab-active')}`} onClick={() => router.push(url)}> <div className={`${props.circleColor} xs-circle rounded-full`}></div> {props.title.status} <p className="font-bold"> ({props.title.total})</p></div>
    )
}