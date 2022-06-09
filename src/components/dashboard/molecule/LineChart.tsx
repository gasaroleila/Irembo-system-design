import { useState } from "react";
import CheckinsCheckOuts from "../charts/CheckinsCheckOuts";

type LineChartProps = {
  title:string
  category: string

}
export default function LineChart(props:LineChartProps) {
  const years: number[] = [2022, 2023, 2024, 2025];
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [toggle, handleToggle] = useState<boolean>(false);
  return (
    <section className="bg-white p-2 md:p-5 w-full rounded-md my-5">
      <div className="md:flex justify-between">
        <h1 className="font-bold text-md md:my-5">{props.title}</h1>
        <div className="flex gap-5 items-center cursor-pointer">
          <h1 className="text-gray-400">Filter by year</h1>
          <div className="relative text-sm">
            <div
              className="border px-4 py-2 rounded-lg text-center hover:shadow-lg hover:border-primary"
              onClick={() => {
                handleToggle(!toggle);
              }}
            >
              {selectedYear}
            </div>
            {toggle && (
              <div className="shadow-lg p-2 rounded absolute bg-white z-10">
                {years.map((year: number, i: number) => {
                  return (
                    <span
                      key={i}
                      className="block p-2 hover:bg-primary hover:text-white rounded-lg"
                      onClick={() => {setSelectedYear(year); handleToggle(false)}}
                    >
                      {year}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* charts */}
      <div className="overflow-x-auto">
        <div className="w-max md:w-full">
          <CheckinsCheckOuts category={props.category} year={selectedYear} />
        </div>
      </div>
    </section>
  );
}
