import { useRouter } from 'next/router'
import { EService } from '../../../types/enums'
import { IPagination, IPaginationButton, PaginationProps } from '../../../types/types'

export default function Pagination(props: PaginationProps): JSX.Element {
    const router = useRouter()
    if (props.service === EService.USERS) {

    }

    let pages: IPagination[] = []

    let availableLinks = props.pages
    for (let i = 0; i < availableLinks?.length; i++) {
         pages.push(availableLinks[i])
       
    }

    function changePage(pageIndex:number, service:string, rows:number) {
        let PageInfo:IPaginationButton = {
            page:pageIndex,
            service,
            rows:rows
        }
       localStorage.setItem('pageInfo', JSON.stringify(PageInfo))
    }
    return (
        <div className="mb-5 px-5 py-2 overflow-x-auto text-sm bg-white">
            <div className="w-max md:w-full">

                <div className="grid grid-cols-1 md:grid-cols-5">

                <div className="flex gap-3 col-span-1 items-center" >

                    <span>Showing 10 rows</span>
                    <form action="">
                        <select name="" id="" className="border p-2 rounded">
                            <option value="">10</option>
                            <option value="">50</option>
                            <option value="">100</option>
                        </select>
                    </form>
                </div>

                <div className="flex justify-end col-span-4">
                    <div className="my-3 flex gap-2 items-center text-gray-500">
                        {pages?.map((page: IPagination, i: number) => {
                            if(i===0 || i+1===pages.length){
                           return (
                            <div className={`${page?.active === false ? 'bg-gray-100 cursor-not-allowed ':'cursor-pointer hover:bg-primary hover:text-white ' }bg-white border rounded text-gray-500 p-2  `}
                            onClick={() => { if(page?.active === true) return router.push(page?.url) }}

                            key={i}
                        >
                            <div dangerouslySetInnerHTML={{__html:(page?.label).toString()}}></div>
                           
                        </div>
                            )}else{
                                return(
                               
                             <button className={`${page?.active ? 'bg-primary text-white': ' text-gray-500 ' } border rounded-full sm-img flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white`}
                             onClick={() => { return changePage(i,props.service,5) }}

                             key={i}
                         >
                             {page?.label}
                         </button>
                                )
                            }
                        })}



                    </div>
                </div>
            </div>
            </div>

        </div>
    )
}