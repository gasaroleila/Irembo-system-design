import Button from '../authentication/button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CheckIn, CheckOut } from '../../../types/types'
import { useEffect, useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Toast } from '../toasts/Toast'
import { CheckinService } from '../../../pages/api/services/CheckinService'
import { CheckoutService } from '../../../pages/api/services/CheckoutService'
import { useRouter } from 'next/router'


export function RegisterCheckIn(): JSX.Element {


   const { register, handleSubmit, formState: { errors }, reset } = useForm<CheckIn>()
   const [{ status, message }, handleToast] = useState({ status: '', message: '' })
   const [loading, handleLoading] = useState<Boolean>(false)
   const [assets, setAssets] = useState<CheckOut[]>()
   const [foundAssets, setFoundAssets] = useState<CheckOut[]>()
   const [search, setSearch] = useState<string>('')
   const [searchBlock, handleSearchBlock] = useState<Boolean>(false)
   const [assetId, setAssetId] = useState<string>(" ")
   


      const loadAssets = async () => {
         const checkoutService = new CheckoutService();
         try {
            const response = await checkoutService.getAll(1, 30)
            setAssets(response.data.data)
            // console.log(response.data.data)
         } catch (error) {
            console.log('Error occured: ', error)
         }

      }
     


   // asset search
   useEffect(() => {

      const searchModules = (searchedText: string) => {

         let searchedModule = new RegExp(searchedText, 'i')

         let module = assets?.filter((el) =>
            el.asset.name.match(searchedModule) || el.asset.brand.match(searchedModule) || el.asset.model.match(searchedModule)
         )

         setFoundAssets(module)

      }
      searchModules(search)

   }, [assets, search])


   const router = useRouter()
   
   const registerCheckOut: SubmitHandler<CheckIn> = async(data) => {
      data.asset_checkout = assetId
      handleLoading(true)
         const checkinService = new CheckinService()
         try{
         const response = await checkinService.create(data)
         if (response.success===false) {
           let errorResponse = response.message?response.message:'Error occured, try again'
           handleToast({ status: 'error', message: errorResponse  })
         } else {
           handleToast({ status: 'success', message: 'Checkout saved successfully' })
           reset(response)
            setSearch('')
            router.push('/checkins')
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
         <form onSubmit={handleSubmit(registerCheckOut)} className="text-sm w-full -mt-2">
            <div className=" mt-7 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
               {/* asset field */}
               <div className="form-group">
                  <label htmlFor="asset" className="mb-2 text-sm capitalize block">Asset</label>
                  <input type="text" name="" id=""

                     value={search}
                     onChange={(el) => { loadAssets();  setSearch(el.target.value); handleSearchBlock(true) }}
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                  />
                  <input
                     type="text"
                     value={assetId}
                     id="asset"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('asset_checkout',
                        {
                           required: "Please choose the asset"
                        })}

                        hidden
                        
                  />

                  <span className="text-red-600 text-xs block mt-2">{errors.asset_checkout?.message}</span>
                  <div className=" max-h-96 overflow-y-auto">


                     {/* search block */}
                     {searchBlock && search &&
                        <div className="bg-white shadow p-1 absolute rounded mr-2 mt-1">
                           <div className="grid grid-cols-2 w-full">

                              <span className="text-xs text-gray-500 p-3">{
                                 assets?(foundAssets?.length === 0 ? 'Asset not found' : 'Assets'):'Loading assets ...'
                              }</span>
                              <div className="flex justify-end items-center">
                                 <span className="hover:bg-gray-50 rounded-full sm-img cursor-pointer flex items-center justify-center"
                                    onClick={() => { handleSearchBlock(false) }}
                                 >
                                    <CloseOutlined className="font-bold text-gray-500 text-xs " />
                                 </span>
                              </div>
                           </div>
                           <hr />
                           {foundAssets?.map((item: CheckOut, i: number) => {
                              return (
                                 <div key={i} className="hover:bg-blue-50 px-3 py-2 cursor-pointer"
                                 onClick={() => { setAssetId(item.id); setSearch(item.asset.name + ',' + item.asset.model + ',' + item.asset.brand + ',' + item.asset.serial_number); handleSearchBlock(false) }}
                                 
                                 >
                                    <p className="text-gray-500 text-xs"
                                       >{item.asset.name},{item.asset.model}, {item.asset.brand}, {item.asset.serial_number}</p>
                                 </div>
                              )
                           })}
                        </div>
                     }
                  </div>
               </div>
               {/* asset field ends here */}


               <div className="form-group w-full">
                  <label htmlFor="checkout_date" className="mb-2 text-sm capitalize block">Checkin date</label>
                  <input
                     type="date"
                     id="checkout_date"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('checkin_date',
                        {
                           required: "Please choose the date"
                        })}
                        
                  />

                  <span className="text-red-600 text-xs block mt-2">{errors.checkin_date?.message}</span>

               </div>
            
            </div>
            <div className=" mt-7 w-full flex flex-col">
               <label htmlFor="reason" className="mb-2 text-sm capitalize">Reason</label>
               <textarea id="reason"  rows={3} className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                {...register('reason',
                   {
                      required: "Please enter the reason"
                   })}
             >

               </textarea>
             <span className="text-red-600 text-xs block mt-2">{errors.reason?.message}</span>
            </div>

            <div className=" mt-7 w-full flex flex-col">
               <label htmlFor="comment" className="mb-2 text-sm capitalize">Comment</label>
               <textarea id="comment"  rows={5} className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                {...register('comment',
                   {
                      required: "Please enter the comment"
                   })}
             >

               </textarea>
             <span className="text-red-600 text-xs block mt-2">{errors.comment?.message}</span>
            </div>

            <Button title="Save" loading={loading} loadingTitle="Saving ..." small />
         </form >
      </div >
   )
}