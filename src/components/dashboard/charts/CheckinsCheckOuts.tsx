/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import { Chart, LineAdvance } from "bizcharts";
import { Api } from "../../../pages/api/Api";
import { EbackendEndpoints, EhttpMethod } from "../../../types/enums";
import { UserContext } from "../authentication/ContextProvider";
import { OrganisationUser } from "../../../types/types";
import EllipsisLoader from "../loaders/EllipsisLoader";

type LineChartProps = {
  year?: number;
  category?: string;
};

type StatisticalData = {
  month: number;
  total: number;
};
type Report = {
  month: number;
  total: number;
  type: string;
};

export default function CheckinsCheckOuts(props: LineChartProps): JSX.Element {
  const { user }: OrganisationUser = useContext(UserContext);
  const [statisticsReport, setStatisticsReport] = useState<any>();
  const [loading,setLoading] = useState<boolean>(true);
  function formatReport(arr: any[], type: string): StatisticalData[] {
    let reportArr: StatisticalData[] = [];
    for (let j: number = 0; j < 12; j++) {
      let report: Report = {
        month: arr[0][j],
        total: arr[1][j],
        type: type,
      };
      reportArr.push(report);
    }
    return reportArr;
  }
  let org_id = user?.organisation?.id;

  const loadReport = async () => {
    setLoading(true)
    await new Api()
      .connect(
        EbackendEndpoints.GET_ORGANISATION_STATISTICS +
          org_id +
          "/annual-stats/" +
          props.year,
        EhttpMethod.GET
      )
      .then((response) => {
        if (response.success) {
          setStatisticsReport(response.data);
          setLoading(false)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [org_id, props.year]);
  let data;
  if (statisticsReport) {
  if(props.category === 'asset_movements'){
    data = formatReport(
      statisticsReport?.asset_checkins.perMonth,
      "Checkins"
    ).concat(
      formatReport(statisticsReport?.asset_checkouts.perMonth, "Checkouts")
    );
  }

  else if(props.category === 'assets'){
    data = formatReport(
      statisticsReport?.assets.perMonth,
      "Assets"
    )
  }
  else{
    data = formatReport(
      statisticsReport?.purchase_orders.perMonth,
      "Purchase Orders"
    )
  }


  
  }

  // console.log(data);
  // console.log('dataaaaaaa ', org_id ,statisticsReport?.asset_checkouts.perMonth)
  return (
    <div>
      {!loading && data ? (
        <Chart padding={[10, 20, 60, 40]} autoFit height={300} data={data}>
          <LineAdvance
            shape={props.category==='assets'?'hard':'smooth'}
            point
            area
            position="month*total"
            color="type"
          />
        </Chart>
      ) : (
        <div className="relative">
          <div className="w-full h-64 opacity-40 bg-white">
            <img
              src="./images/stats.png"
              alt=""
              className="object-cover h-full w-full"
            />
          </div>
          <div className="flex w-full justify-center my-3 gap-5">
            <div className="w-32 rounded h-5 bg-gray-100 animate-pulse"></div>
            <div className="w-32 rounded h-5 bg-gray-100 animate-pulse"></div>
          </div>
          <div className="w-full h-72 bg-gray-50 rounded opacity-90  absolute top-0"></div>
          <div className="absolute top-0 h-64 w-full flex items-center justify-center">
            <EllipsisLoader />
          </div>
        </div>
      )}
    </div>
  );
}
