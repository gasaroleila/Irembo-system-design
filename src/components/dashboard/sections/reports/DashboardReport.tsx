import { useEffect, useState } from "react"
import { Api } from "../../../../pages/api/Api"
import { EbackendEndpoints, EhttpMethod } from "../../../../types/enums"
import { StatisticalReport } from "../../../../types/types"
import CounterCard from "../../cards/CounterCard"

export default function DashboardReport(){

    const [statisticsReport, setStatisticsReport] = useState<StatisticalReport>()

    useEffect(() => {
        const loadReport = async() =>{
            await new Api().connect(
                EbackendEndpoints.GET_HIGH_LEVEL_REPORT,
                EhttpMethod.GET

            )
            .then((response) =>{
                if(response.success){
                    setStatisticsReport(response.data)
                }
            })
            .catch((error) =>{
                console.log(error)
            })
        }
        loadReport()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[''])
    return(
        <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
       

       {/* organisations */}
              <CounterCard
              title = 'Organisations'
              total={statisticsReport?.organisations?.total}
            //   percentile={<span className="text-green-500">{item.percentile} %</span>}
            //   comment={item.comment}
              />

               {/* organisations users */}
               <CounterCard
              title = 'users'
              total={statisticsReport?.organisation_users?.total}
            //   percentile={<span className="text-green-500">{item.percentile} %</span>}
            //   comment={item.comment}
              />
          {/* organisations users */}
          <CounterCard
              title = 'assets'
              total={statisticsReport?.assets?.total}
            //   percentile={<span className="text-green-500">{item.percentile} %</span>}
            //   comment={item.comment}
              />
         
        </div>
        </div>
    )
}