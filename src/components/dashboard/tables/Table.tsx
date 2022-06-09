import { useRouter } from "next/router";
import { SearchOutlined } from "@ant-design/icons";
import MoreButton from "../button/MoreButton";
import { Asset, TableProps } from "../../../types/types";
import Skeleton from "react-loading-skeleton";
import { formatItemType } from "../../../util/custom";
import { useState } from "react";

export default function Table(props: TableProps): JSX.Element {
  const [checkAll, setCheckAll] = useState(false)
  const [assets, setAssets] = useState<Asset[]>();
  const [foundAssets, setFoundAssets] = useState<any>();

  const router = useRouter();
  let rootPath: any =  props.addPath.split('/')
  rootPath = rootPath.length > 3? rootPath[1]+'/'+rootPath[2]: rootPath[1] //get root path like users, asset

  const loaders = (
    <tr className="bg-white border-b-4 border-lightGray p-3 h-12 my-2">
      <td>
        <Skeleton width={"100%"} height={20} />
      </td>
      <td>
        <Skeleton width={"100%"} height={20} />
      </td>
      {props.cols?.map((item: string, i: number) => {
        return (
          <td key={i}>
            <Skeleton width={"100%"} height={20} />
          </td>
        );
      })}
      {props.hasActions && (
        <td>
          <Skeleton width={"100%"} height={20} />
        </td>
      )}
    </tr>
  );

  const handleSelectAll = (event:any) => {
    if (event.target.checked) {
      setCheckAll(true)
    } else {
      setCheckAll(false)
    }
  }

  // const searchModules = (searchedText: string) => {
  //   let searchedModule = new RegExp(searchedText, "i");

  //   let module = assets?.filter(
  //     (el) =>
  //       el.name.match(searchedModule) ||
  //       el.brand.match(searchedModule) ||
  //       el.model.match(searchedModule)
  //   );

  //   setFoundAssets(module);
  // };
  // userSearchModules(searchUser);
  // searchModules(search);
  // }, [users, searchUser, assets, search]);
  // loader ends here
  return (
    <div>
      {/* table search headers && filters */}
      {props.hasHeader && (
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5 text-sm my-5">
          <form action="">
            <div className="form-group flex bg-white p-2 rounded items-center text-gray-400 md:w-1/2">
              <SearchOutlined className="" />
              <input
                type="text"
                name=""
                id=""
                className="form-control outline-none px-3 w-full"
                placeholder={`Search ${props.searchPlaceholder}`}
                // onChange={(el) => {
                //   loadAssets();
                //   setSearch(el.target.value);
                //   handleSearchBlock(true);
                // }}
              />
            </div>
          </form>
          <div>
            <div className="form-group flex items-center gap-2 justify-between lg:float-right">
              <div className="flex gap-3">
                <span className="font-bold">Sort by</span>
                <select
                  name=""
                  id=""
                  className="form-control outline-none bg-transparent"
                >
                  <option value="">Date</option>
                </select>
              </div>
              <button
                className="bg-primary px-10 py-2 text-white rounded-full hover:opacity-50"
                onClick={() => router.push(props.addPath)}
              >
                + {props.btnTitle}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="w-max md:w-full">
          <table className="text-sm w-full">
            <thead className="w-full font-bold h-12">
              <tr>
                <td>
                  <input type="checkbox" name="" id="" onChange={(event)=> handleSelectAll(event)} />
                </td>
                <td>#</td>
                {props.cols.map((item, i) => {
                  return <td key={i}>{item}</td>;
                })}
                {props.hasActions && <td>Actions</td>}
              </tr>
            </thead>

            <tbody>
              {props.rows ? (
                props.rows?.map((item, i) => {
                  return (
                    <tr
                      key={i}
                      className="bg-white border-b-4 border-lightGray p-3 h-12 my-2"
                    >
                      <td>
                        <input type="checkbox" name="" id="" checked={checkAll ? checkAll : undefined } />
                      </td>
                      <td>{i + 1}</td>
                      {/* vendor */}
                      {item.names && <td>{item.names}</td>}

                      {/* asset */}
                      {item.tag && <td className="text-primary">{item.tag}</td>}

                      {item.name && <td>{item.name}</td>}
                      {item.model && <td>{item.model}</td>}
                      {item.brand && <td>{item.brand}</td>}
                      {item.serial_number && <td>{item.serial_number}</td>}
                      {item.asset_type?.name && (
                        <td>{item.asset_type?.name}</td>
                      )}
                      {item.unit_price && <td>{item.unit_price}</td>}

                      {/* organization */}
                      {item.contact_email && <td>{item.contact_email}</td>}
                      {item.contact_phone && <td>{item.contact_phone}</td>}
                      {item.address && <td>{item.address}</td>}

                      {/* checkouts  */}
                      {item.organisation_user?.user.first_name && (
                        <td>
                          {item.organisation_user?.user.first_name +
                            " " +
                            item.organisation_user?.user.first_name}
                        </td>
                      )}
                      {item.organisation_user?.organisation.name && (
                        <td>{item.organisation_user?.organisation.name}</td>
                      )}

                      {/* user */}
                      {item.user?.first_name && (
                        <td>
                          {item.user?.first_name + " " + item.user?.last_name}
                        </td>
                      )}

                      {item.asset?.name && !item.date_of_transfer && (
                        <td>
                          {item.asset?.name +
                            ", S/N: " +
                            item.asset?.serial_number}
                        </td>
                      )}
                      {item.asset_checkout?.asset.name && (
                        <td>
                          {item.asset_checkout?.asset.name +
                            ", S/N: " +
                            item.asset_checkout?.asset.serial_number}
                        </td>
                      )}
                      {item.asset_checkout?.organisation_user.user
                        .first_name && (
                        <td>
                          {item.asset_checkout?.organisation_user.user
                            .first_name +
                            " " +
                            item.asset_checkout?.organisation_user.user
                              .last_name}
                        </td>
                      )}
                      {item.asset_checkout?.organisation_user.organisation
                        .name && (
                        <td>
                          {
                            item.asset_checkout?.organisation_user.organisation
                              .name
                          }
                        </td>
                      )}

                      {item.user?.gender && (
                        <td className="capitalize">{item.user?.gender}</td>
                      )}
                      {item.user?.email && <td>{item.user?.email}</td>}
                      {item.user?.phone && <td>{item.user?.phone}</td>}
                      {/* {item.user?.national_id && <td>{item.user?.national_id}</td>} */}
                      {item.user?.address && <td>{item.user?.address}</td>}

                      {/* orders */}
                      {item.code && (
                        <td className="text-primary">{item.code}</td>
                      )}
                      {item.supplierNames && <td>{item.supplierNames}</td>}
                      {item.total_quantity && <td>{item.total_quantity}</td>}
                      {item.total_amount && <td>{item.total_amount}</td>}
                      {item.order_date && <td>{item.order_date}</td>}
                      {(item.order_date || item.delivery_date) && (
                        <td>{item.delivery_date}</td>
                      )}
                      {item.organisation?.name && (
                        <td>{item.organisation?.name}</td>
                      )}
                      {item.vendor?.names && <td>{item.vendor?.names}</td>}

                      {/* vendor */}

                      {item.type && <td>{formatItemType(item.type)}</td>}

                      {/* transfers */}
                      {item.asset && <td>{item.asset.name}</td>}
                      {item.source_initiator && (
                        <td>
                          {`${item.source_initiator.user.first_name} ` +
                            `${item.source_initiator.user.last_name}`}
                        </td>
                      )}
                      {item.source_organisation && (
                        <td>{item.source_organisation.name}</td>
                      )}
                      {item.destination_organisation && (
                        <td>{item.destination_organisation.name}</td>
                      )}
                      {item.date_of_transfer && (
                        <td>{item.date_of_transfer}</td>
                      )}

                      {/* dates */}
                      {item.checkout_date && <td>{item.checkout_date}</td>}
                      {item.checkin_date && <td>{item.checkin_date}</td>}

                      {/* shared */}
                      {item.status && (
                        <td
                          className={`capitalize ${
                            item.status.toLowerCase() === "good" ||
                            item.status.toLowerCase() === "active" ||
                            item.status.toLowerCase() === "approved" ||
                            item.status.toLowerCase() === "delivered"
                              ? "text-green-500"
                              : item.status.toLowerCase() === "pending"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          {item.status}
                        </td>
                      )}

                      {props.hasActions && (
                        <td>
                          {" "}
                          <MoreButton
                            index={i}
                            id={item.id ? item.id : ""}
                            status={item.status}
                            ServiceClass={props.action.service}
                            path={props.action.redirect}
                            url={rootPath}
                          />{" "}
                        </td>
                      )}
                    </tr>
                  );
                })
              ) : (
                <>
                  {props.cols?.map((item: string, i: number) => {
                    return <>{loaders}</>;
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
