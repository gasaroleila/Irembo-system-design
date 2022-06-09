import Button from '../../authentication/button'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Asset, CheckOut, ICheckOut, OrganisationUser } from '../../../../types/types'
import { useEffect, useState } from 'react'
import { AssetService } from '../../../../pages/api/services/AssetService'
import { UserService } from '../../../../pages/api/services/UserService'
import { CloseOutlined } from '@ant-design/icons'
import { Toast } from '../../toasts/Toast'
import { CheckoutService } from '../../../../pages/api/services/CheckoutService'
import { useRouter } from 'next/router'


export function EditCheckOut(props:any): JSX.Element {

   const { register, handleSubmit, formState: { errors }, reset } = useForm<CheckOut>()
   const [{ status, message }, handleToast] = useState({ status: '', message: '' })
   const [loading, handleLoading] = useState<Boolean>(false)
   const [assets, setAssets] = useState<Asset[]>()
   const [users, setUsers] = useState<OrganisationUser[]>()
   const [foundAssets, setFoundAssets] = useState<any>()
   const [foundUsers, setFoundUsers] = useState<any>()
   const [search, setSearch] = useState<string>('')
   const [searchUser, setSearchUser] = useState<string>('')
   const [searchBlock, handleSearchBlock] = useState<Boolean>(false)
   const [searchUserBlock, handleUserSearchBlock] = useState<Boolean>(false)
   const [userId, setUserId] = useState<string|any>(" ");
   const [assetId, setAssetId] = useState<string>(" ")
   const [firstname, setFirstname] = useState("")
   const [lastname, setLastname] = useState("")
   const [names,setNames] = useState<string>(" ")
   const [checkout, setCheckout] = useState<ICheckOut>({
       id: '',
       organisation_user: {},
       asset: {},
       checkout_date: '',
       comment: ''
   })
   const [showAssetSearch,setShowAssetSearch] = useState(false)
   const [showEmployeeSearch,setShowEmployeeSearch] = useState(false)

   
   const router = useRouter()

//    function getCheckOut(id: String) {
    
// }

   useEffect(() => {
      const loadAssets = async () => {
         const assetService = new AssetService()
         try {
            const response = await assetService.getAll(1, 30)
            setAssets(response.data.data)
         } catch (error) {
            console.log('Error occured: ', error)
         }

      }
      const loadOrganisations = async () => {
         const userService = new UserService()
         try {
            const response = await userService.getAll(1, 30)
            setUsers(response.data.data)
         } catch (error) {
            console.log('Error occured: ', error)
         }

      }

      const getCheckOut = async(id:String)=> {
        try {
        const service = new CheckoutService()
        let Checkout = await service.getOne(id)
        setCheckout(Checkout.data)
      //   console.log('checkout',checkout.data.organisation_user.first_name)
             setFirstname(checkout?.organisation_user?.user?.first_name)
             setLastname(checkout?.organisation_user?.user?.last_name)
             setNames(`${firstname}`+ ' '+ `${lastname}`)
             console.log(firstname, lastname)
         }catch(err) {
         console.log(err)
      }
     }
      loadAssets()
      loadOrganisations()
      getCheckOut(props.id)
   }, [props.id,firstname,lastname,checkout?.organisation_user?.user?.first_name, checkout?.organisation_user?.user?.last_name])


   // asset search
   useEffect(() => {

      const searchModules = (searchedText: string) => {

         let searchedModule = new RegExp(searchedText, 'i')

         let module = assets?.filter((el) =>
            el.name.match(searchedModule) || el.brand.match(searchedModule) || el.model.match(searchedModule)
         )

         setFoundAssets(module)

      }
      searchModules(search)

   }, [assets, search])


   // user search
   useEffect(() => {

      const searchModules = (searchedText: string) => {

         let searchedModule = new RegExp(searchedText, 'i')

         let module = users?.filter((el) =>
            el.user?.first_name.match(searchedModule) || el.user?.last_name.match(searchedModule) || el.organisation?.name.match(searchedModule)
         )

         setFoundUsers(module)

      }
      searchModules(searchUser)

   }, [users, searchUser])


   
   const editCheckOut: SubmitHandler<CheckOut> = async(data) => {
      data.organisation_user = userId
      data.asset = assetId
      let newCheckout = {
          id:props.id,
          organisation_user: data.organisation_user == " " ? checkout.organisation_user.id : data.organisation_user,
          asset: data.asset == " " ? checkout.asset.id : data.asset ,
          checkout_date: data.checkout_date || checkout.checkout_date,
          comment: data.comment || checkout.comment
      }
      console.log('assetId', assetId)
      console.log('newCheckOut',newCheckout)
      handleLoading(true)
         const checkoutService = new CheckoutService()
         try{
         const response = await checkoutService.update(newCheckout,props.id)
         if (response.success===false) {
           let errorResponse = response.message?response.message:'Error occured, try again'
           handleToast({ status: 'error', message: errorResponse  })
         } else {
           handleToast({ status: 'success', message: 'Checkout saved successfully' })
           reset(response)
           setSearch('')
           setSearchUser('')
           router.push('/checkouts')
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
    {/* toast */}
      {status &&
        <Toast
          status={status}
          message={message}
        />
      }
      {/* toast ends here */}
         <form onSubmit={handleSubmit(editCheckOut)} className="text-sm w-full -mt-2">
            <div className=" mt-7 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
               {/* asset field */}
               <div className="form-group">
                  <label htmlFor="asset" className="mb-2 text-sm capitalize block">Asset</label>
                  <input type="text" name="" id=""

                     value={showAssetSearch ? search: checkout.asset?.name}
                     // defaultValue={checkout?.asset?.name}
                     onChange={(el) => { setSearch(el.target.value); handleSearchBlock(true);setShowAssetSearch(true) }}
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                  />
                  <input
                     type="text"
                     value={assetId}
                     id="asset"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('asset',
                       )}

                        hidden
                        
                  />

                  <span className="text-red-600 text-xs block mt-2">{errors.asset?.message}</span>
                  <div className=" max-h-96 overflow-y-auto">


                     {/* search block */}
                     {searchBlock && search &&
                        <div className="bg-white shadow p-1 absolute rounded mr-2 mt-1">
                           <div className="grid grid-cols-2 w-full">

                              <span className="text-xs text-gray-500 p-3">{foundAssets?.length === 0 ? 'Asset not found' : 'Assets'}</span>
                              <div className="flex justify-end items-center">
                                 <span className="hover:bg-gray-50 rounded-full sm-img cursor-pointer flex items-center justify-center"
                                    onClick={() => { handleSearchBlock(false) }}
                                 >
                                    <CloseOutlined className="font-bold text-gray-500 text-xs " />
                                 </span>
                              </div>
                           </div>
                           <hr />
                           {foundAssets?.map((item: Asset, i: number) => {
                              return (
                                 <div key={i} className="hover:bg-blue-50 px-3 py-2 cursor-pointer"
                                 onClick={() => { setAssetId(item.id); setSearch(item.name + ',' + item.model + ',' + item.brand + ',' + item.serial_number); handleSearchBlock(false) }}
                                 
                                 >
                                    <p className="text-gray-500 text-xs"
                                       >{item.name},{item.model}, {item.brand}, {item.serial_number}</p>
                                 </div>
                              )
                           })}
                        </div>
                     }
                  </div>
               </div>
               {/* asset field ends here */}

               {/* empoyee field */}
               <div className="form-group">
                  <label htmlFor="organisation_user" className="mb-2 text-sm capitalize block">Employee names</label>
                  <input type="text" name="" id=""

                     value={showEmployeeSearch? searchUser : names}
                     // defaultValue={names ? names: ''}
                     onChange={(el) => { setSearchUser(el.target.value); handleUserSearchBlock(true);setShowEmployeeSearch(true) }}
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                  />
                   <input
                     type="text"
                     value={userId}
                     id="organisation_user"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('organisation_user',
                        )}
                        hidden
                  />

                  <span className="text-red-600 text-xs block mt-2">{errors.organisation_user?.message}</span>
                  <div className=" max-h-96 overflow-y-auto">


                     {/* search block */}
                     {searchUserBlock && searchUser &&
                        <div className="bg-white shadow p-1 absolute rounded mr-2 mt-1">
                           <div className="grid grid-cols-2 w-full">

                              <span className="text-xs text-gray-500 p-3">{foundUsers?.length === 0 ? 'User not found' : 'Users'}</span>
                              <div className="flex justify-end items-center">
                                 <span className="hover:bg-gray-50 rounded-full sm-img cursor-pointer flex items-center justify-center"
                                    onClick={() => { handleUserSearchBlock(false) }}
                                 >
                                    <CloseOutlined className="font-bold text-gray-500 text-xs " />
                                 </span>
                              </div>
                           </div>
                           <hr />
                           {foundUsers?.map((item: OrganisationUser, i: number) => {
                              return (
                                 <div key={i} className="hover:bg-blue-50 px-3 py-2 cursor-pointer"
                                 onClick={() => { setUserId(item.id); setSearchUser(item.user?.first_name+' '+item.user?.last_name); handleUserSearchBlock(false) }}
                                   
                                 >
                                    <p className="text-gray-500 text-xs"
                                     >{item.user?.first_name+' '+item?.user?.last_name+', '+item.organisation?.name}</p>
                                 </div>
                              )
                           })}
                        </div>
                     }
                  </div>
               </div>

               <div className="form-group w-full">
                  <label htmlFor="checkout_date" className="mb-2 text-sm capitalize block">Checkout date</label>
                  <input
                     type="date"
                     id="checkout_date"
                     defaultValue={checkout?.checkout_date}
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('checkout_date',
                        )}
                        
                  />

                  <span className="text-red-600 text-xs block mt-2">{errors.checkout_date?.message}</span>

               </div>
            
            </div>

            <div className=" mt-7 w-full flex flex-col">
               <label htmlFor="comment" className="mb-2 text-sm capitalize">Comment</label>
               <textarea id="comment"  rows={5} className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3" defaultValue={checkout?.comment}
                {...register('comment',
                   )}
             >

               </textarea>
             <span className="text-red-600 text-xs block mt-2">{errors.comment?.message}</span>
            </div>

            <Button title="Update" loading={loading} loadingTitle="Updating ..." small />
         </form >
      </div >
   )
}