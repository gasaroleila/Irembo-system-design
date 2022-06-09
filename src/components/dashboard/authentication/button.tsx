import { LoadingOutlined } from "@ant-design/icons"

type ButtonProps={
    loading?:Boolean
    loadingTitle?:string
    title:string
    small?:boolean
    disabled?:boolean
}
export default function Button(props:ButtonProps) : JSX.Element {
    return (
        <button 
        className={` bg-primary py-3 rounded-full capitalize mt-10 text-white  text-sm hover:opacity-50 flex items-center justify-center gap-1 ${props.disabled && 'opacity-50 cursor-not-allowed '} ${!props?.small?'w-full':'w-full md:w-1/3 lg:w-1/4'}
        ${props.loading && 'opacity-50'}
        `} 
        type="submit" disabled ={props.disabled}> {props.loading && <LoadingOutlined/> } { props.loading ? props.loadingTitle : props.title}</button>
    )
}
// ${props.small? 'w-full sm:w-5/12 md:w-8/12 lg:w-2/12 mt-4': 'md:w-11/12 mt-16'}