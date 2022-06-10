import StyleTableRow from "./StyleTableRow";
import { useState, useEffect } from "react";

// import { formatDate } from "../../../util/formatDate";
export default function Row(props: any): JSX.Element {
  const [allData, setAllData] = useState<any[]>();
  const keys: any = props.keys;
  const data: any = props.data;
  const populates: any = props.populate;

  // return the populated value from object

  function getValueFromPopulatedObject(entry: object, arrSet: any): any {
    const keys = Object.keys(entry);
    for (let k = 0; k < keys.length; k++) {
      if (arrSet === keys[k]) {
        return keys.indexOf(keys[k]);
      }
    }
  }

  useEffect(() => {
    function getData() {
      let all_data: any = [];
      populates.map((item: any, k: number) => {
        item.attributes.map((attr: any, j: number) => {
          keys.map((key: any, i: number) => {
            if (item.model === key && data[key]) {
              all_data.push(
                Object.values(data[key])[
                  getValueFromPopulatedObject(data[key], attr)
                ]
              );
            } else {
              if (j === 0) {
                let new_obj: any = (data[key] && Object.keys(data[key])) || [];
                !new_obj.includes(attr) && all_data.push(data[key]);
              }
            }
          });
        });
      });
      setAllData(all_data);
      return all_data;
    }

    !allData && getData();
  }, [allData, data, keys, populates]);
  // console.log(allData)

  return (
    <>
      {allData?.map((item: any, i: number) => {
        return (
          <td key={i} className="text-gray-700 text-sm">
            {typeof item === 'number' ?
           new Intl.NumberFormat('en-US').format(item)
          :
          <StyleTableRow data = {item}/>
          // formatDate(item)
          }
          </td>
        );
      })}
    </>
  );
}
