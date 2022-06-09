import Button from '../../authentication/button'

import { useForm, SubmitHandler } from 'react-hook-form'
import {Asset, Organisation, OrganisationUser, Transfer} from '../../../../types/types'
import { Transferservice } from '../../../../pages/api/services/TransferService'
import { useState, useEffect } from 'react'
import { Toast } from '../../toasts/Toast'
import { OrganisationService } from '../../../../pages/api/services/OrganizationService'
import { CloseOutlined } from '@ant-design/icons'
import { UserService } from '../../../../pages/api/services/UserService'
import { AssetService } from '../../../../pages/api/services/AssetService'
import { useRouter } from 'next/router'

export function EditTransfer(props:any): JSX.Element {
   const { register, handleSubmit, formState: { errors }, watch,reset } = useForm<Transfer>()
   const [{ status, message }, handleToast] = useState({ status: '', message: '' })
   const [loading, handleLoading] = useState<Boolean>(false)
   const [organisations, setOrganisations] = useState<Organisation[]>();
   const [foundUsers, setFoundUsers] = useState<any>();
  const [search, setSearch] = useState<string>("");
  const [searchUser, setSearchUser] = useState<string>("");
  const [searchBlock, handleSearchBlock] = useState<Boolean>(false);
  const [searchUserBlock, handleUserSearchBlock] = useState<Boolean>(false);
   const [userId, setUserId] = useState<string|any>(" ");
   const [users, setUsers] = useState<OrganisationUser[]>();
   
   const [foundAssets, setFoundAssets] = useState<any>();
  const [assets, setAssets] = useState<Asset[]>();
  const [assetId, setAssetId] = useState<string>(" ");
   
   
   const loadOrganisations = async () => {
      const organisationService = new OrganisationService();
      try {
        const response = await organisationService.getAll(1, 30);
        setOrganisations(response.data.data);
      } catch (error) {
        handleToast({ status: "error", message: "Error" });
      }
   };

   const loadUsers = async () => {
      const userService = new UserService();
      try {
        const response = await userService.getAll(1, 30);
         setUsers(response.data.data);
      } catch (error) {
        console.log("Error occured: ", error);
      }
   };

   const loadAssets = async () => {
      const assetService = new AssetService();
      try {
        const response = await assetService.getAll(1, 30);
        setAssets(response.data.data);
      } catch (error) {
        console.log("Error occured: ", error);
      }
    };
   
   useEffect(() => {
      const userSearchModules = (searchedText: string) => {
        let searchedModule = new RegExp(searchedText, "i");
  
        let module = users?.filter(
          (el) =>
            el.user?.first_name.match(searchedModule) ||
            el.user?.last_name.match(searchedModule) ||
            el.organisation?.name.match(searchedModule)
        );
  
        setFoundUsers(module);
      };

      const searchModules = (searchedText: string) => {
         let searchedModule = new RegExp(searchedText, "i");
   
         let module = assets?.filter(
           (el) =>
             el.name.match(searchedModule) ||
             el.brand.match(searchedModule) ||
             el.model.match(searchedModule)
         );
   
         setFoundAssets(module);
       };
       userSearchModules(searchUser);
       searchModules(search);
   }, [users, searchUser, search, assets]);
  
  const router = useRouter()
   
   const registerTransfer: SubmitHandler<Transfer> = async (data) => {
      console.log(data)
      data.source_initiator = userId;
      data.asset = assetId;
   handleLoading(true)
      const transferService = new Transferservice()
      try{
      const response = await transferService.create(data)
      if (response.success===false) {
        let errorResponse = response.message?response.message:'Error occured, try again'
        handleToast({ status: 'error', message: errorResponse  })
      } else {
        handleToast({ status: 'success', message: 'Checkout saved successfully' })
        reset(response)
        setSearch('')
        router.push('/transfers')
      }
      handleLoading(false)
      setTimeout(() => {
        handleToast({ status: '', message: '' })
      }, 3000)
   
   
   }catch (error:any) {
     handleToast({ status: 'error', message: error.response.data.message?error.response.data.message: 'Error occured, try again'  })
     setTimeout(() => {
       handleToast({ status: '', message: '' })
     }, 3000)
      handleLoading(false)
      
   }
   }
   
  return (
     <div className="w-full">
        {status &&
        <Toast
          status={status}
          message={message}
        />
      }
        <form onSubmit={handleSubmit(registerTransfer)} className="text-sm w-full -mt-2">
         <div className=" mt-7 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
         <div className="form-group">
            <label
              htmlFor="organisation"
              className="mb-2 text-sm capitalize block"
            >
              Source organisation
            </label>
            <select
              id="organisation"
              className="rounded-sm bg-gray-50 text-gray-600 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
              {...register("source_organisation", {
                required: "Please select the source organisation",
              })}
              onMouseDown={() => {
                loadOrganisations();
              }}
            >
              <option value="">----</option>
              {!organisations && (
                <option value="">Loading organisations ...</option>
              )}
              {organisations?.map((item: Organisation, i: number) => {
                return (
                  <option value={item.id} key={i}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <span className="text-red-600 text-xs block mt-2 w-48">
              {errors.source_organisation?.message}
            </span>
          </div>
           
          <div className="form-group">
            <label
              htmlFor="organisation_user"
              className="mb-2 text-sm capitalize block"
            >
             Source Initiator
            </label>
            <input
              type="text"
              name=""
              id=""
              value={searchUser}
              onChange={(el) => {
               loadUsers();
                setSearchUser(el.target.value);
                handleUserSearchBlock(true);
              }}
              className="rounded-sm bg-gray-50 text-gray-600 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
            />
            <input
              type="text"
              value={userId}
              id="organisation_user"
              className="rounded-sm bg-gray-50 text-gray-600 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
              {...register("source_initiator", {
                required: "Please choose the employee",
              })}
              hidden
            />

            <span className="text-red-600 text-xs block mt-2">
              {errors.source_initiator?.message}
            </span>
            <div className=" max-h-96 overflow-y-auto">
              {/* search block */}
              {searchUserBlock && searchUser && (
                <div className="bg-white shadow p-1 absolute rounded mr-2 mt-1">
                  <div className="grid grid-cols-2 w-full">
                    <span className="text-xs text-gray-500 p-3">
                      {
                         users?(
                           foundUsers?.length === 0 ? "Employee not found" : "Employees")
                      :'Loading employees ...'
                         }
                    </span>
                    <div className="flex justify-end items-center">
                      <span
                        className="hover:bg-gray-50 text-gray-600 rounded-full sm-img cursor-pointer flex items-center justify-center"
                        onClick={() => {
                          handleUserSearchBlock(false);
                        }}
                      >
                        <CloseOutlined className="font-bold text-gray-500 text-xs " />
                      </span>
                    </div>
                  </div>
                  <hr />
                  {foundUsers?.map((item: OrganisationUser, i: number) => {
                    return (
                      <div
                        key={i}
                        className="hover:bg-blue-50 px-3 py-2 cursor-pointer"
                        onClick={() => {
                          setUserId(item.id);
                          setSearchUser(
                            item.user?.first_name + " " + item.user?.last_name
                          );
                          handleUserSearchBlock(false);
                        }}
                      >
                        <p className="text-gray-500 text-xs">
                          {item.user?.first_name +
                            " " +
                            item.user?.last_name +
                            ", " +
                            item.organisation?.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
              </div>
              
           </div>

           <div className=" mt-7 w-full flex flex-col">
            <label
              htmlFor="organisation"
              className="mb-2 text-sm capitalize block"
            >
              Destination organisation
            </label>
            <select
              id="organisation"
              className="rounded-sm bg-gray-50 text-gray-600 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
              {...register("destination_organisation", {
                required: "Please select the destination organisation",
              })}
              onMouseDown={() => {
                loadOrganisations();
              }}
            >
              <option value="">----</option>
              {!organisations && (
                <option value="">Loading organisations ...</option>
              )}
              {organisations?.map((item: Organisation, i: number) => {
                return (
                  <option value={item.id} key={i}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <span className="text-red-600 text-xs block mt-2 w-48">
              {errors.destination_organisation?.message}
            </span>
              </div>
              

           <div className=" mt-7 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
           <div className="form-group w-full">
            <label
              htmlFor="checkout_date"
              className="mb-2 text-sm capitalize block"
            >
              Transfer date
            </label>
            <input
              type="date"
              id="checkout_date"
              className="rounded-sm bg-gray-50 text-gray-600 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
              {...register("date_of_transfer", {
                required: "Please choose the transfer date",
              })}
            />

            <span className="text-red-600 text-xs block mt-2">
              {errors.date_of_transfer?.message}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="asset" className="mb-2 text-sm capitalize block">
              Asset
            </label>
            <input
              type="text"
              name=""
              id=""
              value={search}
              onChange={(el) => {
                loadAssets();
                setSearch(el.target.value);
                handleSearchBlock(true);
              }}
              className="rounded-sm bg-gray-50 text-gray-600 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
            />
            <input
              type="text"
              value={assetId}
              id="asset"
              className="rounded-sm bg-gray-50 text-gray-600 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
              {...register("asset", {
                required: "Please choose the asset",
              })}
              hidden
            />

            <span className="text-red-600 text-xs block mt-2">
              {errors.asset?.message}
            </span>
            <div className=" max-h-96 overflow-y-auto">
              {/* search block */}
              {searchBlock && search && (
                <div className="bg-white shadow p-1 absolute rounded mr-2 mt-1">
                  <div className="grid grid-cols-2 w-full">
                    <span className="text-xs text-gray-500 p-3">
                      {assets
                        ? foundAssets?.length === 0
                          ? "Asset not found"
                          : "Assets"
                        : "Loading assets ..."}
                    </span>
                    <div className="flex justify-end items-center">
                      <span
                        className="hover:bg-gray-50 text-gray-600 rounded-full sm-img cursor-pointer flex items-center justify-center"
                        onClick={() => {
                          handleSearchBlock(false);
                        }}
                      >
                        <CloseOutlined className="font-bold text-gray-500 text-xs " />
                      </span>
                    </div>
                  </div>
                  <hr />
                  {foundAssets?.map((item: Asset, i: number) => {
                    return (
                      <div
                        key={i}
                        className="hover:bg-blue-50 px-3 py-2 cursor-pointer"
                        onClick={() => {
                          setAssetId(item.id);
                          setSearch(
                            item.name +
                              "," +
                              item.model +
                              "," +
                              item.brand +
                              "," +
                              item.serial_number
                          );
                          handleSearchBlock(false);
                        }}
                      >
                        <p className="text-gray-500 text-xs">
                          {item.name},{item.model}, {item.brand},{" "}
                          {item.serial_number}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
           </div>

           <div className=" mt-7 w-full flex flex-col">
          <label htmlFor="comment" className="mb-2 text-sm capitalize">
            Comment
          </label>
          <textarea
            id="comment"
            rows={5}
            className="rounded-sm bg-gray-50 text-gray-600 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
            {...register("comment", {
              required: "Please enter the comment",
            })}
          ></textarea>
          <span className="text-red-600 text-xs block mt-2">
            {errors.comment?.message}
          </span>
        </div>               

           <Button title="Save" loading={loading} loadingTitle="Saving ..." small />
           </form >
        </div >
    )
}