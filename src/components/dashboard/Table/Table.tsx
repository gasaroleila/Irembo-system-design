import { useContext, useState } from "react";
import { Edit, Eye, MoreHorizontal, MoreVertical, Trash2 } from "react-feather";
import { useNavigate } from "react-router";
// import { AppContext } from "src/context/GlobalContext";
// import { TableProps } from "src/types";
// import TableLoader from "../loaders/TableLoader";
// import DeleteModal from "../modals/modals/DeleteModal";
import Row from "./Row";

/* eslint-disable @next/next/no-img-element */
export default function Table(props: any): JSX.Element {
    const navigate = useNavigate()

  const cols: any = props.cols;
  const rowsHide: any = props.hide;
  let rows: any = props.rows;

  const actions: any = props.actions;

  // check the delete icon
  // if (actions) {
  //   actions[actions.indexOf("delete")] = "trash";
  // }

  let modelIds: string[] = [];
  
  const getModelIDs = () => {
    rows.map((item: any, i: number) => {
      modelIds.push(item._id);
    });
  };
  const getKeys = () => {
    const keys: string[] = Object.keys(rows[0]);
    getModelIDs();
    rowsHide.push("_id");
    return keys.filter((item) => !rowsHide.includes(item));
  };

  const [actionToggle, setActionToggle] = useState<any>(
    {
      open: false,
      index: 0
    }
  )

  const [modelId, setModelId] = useState<string>('')
const actionPath:any = props.actionPath
  return (
    <>
      {/* {modelId !=='' && <DeleteModal reload = {()=>props.reload()} path = {actionPath} close = {()=>setModelId('')} id={modelId} model={props.model as string}  />} */}
      <div className="overflow-x-auto">
        <div className="w-max md:w-full">
          <table className="w-full gilroy-medium text-sm">
            <thead className="w-full">
              <tr className="w-full capitalize">
                <td className="">
                  <input type="checkbox" name="" id="" />
                </td>
                {cols.map((item: string, i: number) => {
                  return <td key={i}>{item}</td>;
                })}
                {actions && <td>Action</td>}
              </tr>
            </thead>

            <tbody className="bg-white">
              {!props.loading && rows?.map((item: any, i: number) => {
                return (
                  <tr key={i} className="">
                    <td className="">
                      <input type="checkbox" name="" id="" />
                    </td>

                    <Row
                      data={item}
                      keys={getKeys()}
                      populate={props?.populate}
                    />

                    <td className="flex items-center gap-5 cursor-pointer md:absolute">

                      <div className="">
                        <div className={`cursor-pointer 
                     ${actionToggle.open && actionToggle.index === i ? 'bg-primary text-white ' : 'bg-gray-100 text-gray-400 '}
                     hover:bg-primary hover:text-white flex items-center justify-center w-10 h-10 rounded-full`}
                          onClick={() => setActionToggle({
                            open: actionToggle.index !== i ? true: !actionToggle.open,
                            index: i
                          })}>
                          {actionToggle.open && actionToggle.index === i ? <MoreHorizontal size={15} /> : <MoreVertical size={15} />}

                          {
                            actionToggle.open && actionToggle.index === i &&
                            <div className="absolute top-16 right-0 shadow-xl shadow-blue-100  bg-white w-32 z-10 rounded-lg p-2">

                              {actions.map((action: string, i: number) => {
                                return (
                                  <div key={i} className="flex gap-2 text-gray-600 py-2 text-xs p-3 hover:bg-primary hover:text-white rounded-lg capitalize"
                                  onClick={() => { 

                                    if(action === 'edit' || action === 'view'){
                                       navigate(actionPath+
                                        (action === 'view'?'view':
                                        action === 'edit' ?'add':'delete')+
                                        '?q='+item.id)
                                    }
                                    else{
                                      setModelId(item.id)
                                    }

                                  }}
                                  >
                                    {
                                    action === 'view' ? <Eye size={15} /> :
                                    action === 'edit' ? <Edit size={15} /> :
                                      action === 'delete' ? <Trash2 size={15} /> : ''
                                    }
                                    {action}</div>
                                )
                              })}

                            </div>
                          }

                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
