import Button from '../authentication/button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Asset, AssetType, Order } from '../../../types/types'
import { AssetService } from '../../../pages/api/services/AssetService'
import { useState } from 'react'
import { Toast } from '../toasts/Toast'
import { OrderService } from '../../../pages/api/services/OrderService'
import { AssetTypeService } from '../../../pages/api/services/AssetTypeService'
import { useRouter } from 'next/router'
export function RegisterAsset(): JSX.Element {
   const { register, handleSubmit, formState: { errors }, reset } = useForm<Asset>()
   const [{ status, message }, handleToast] = useState({ status: '', message: '' })
   const [loading, handleLoading] = useState<Boolean>(false)
   const [assetTypes, setAssetTypes] = useState<AssetType[]>()
   const [orders, setOrders] = useState<Order[]>()

      const loadAssetTypes = async () => {
          const assetTypeService = new AssetTypeService()
          try{
          const response = await assetTypeService.getAll(1,30)
          setAssetTypes(response.data.data)
        }catch (error) {
         handleToast({ status: 'error', message: 'Error occured'  })
       }
       
        }
        const loadOrders = async () => {
           const orderService = new OrderService()
           try{
           const response = await orderService.getAll(1,30)
           setOrders(response.data.data)
         }catch (error) {
            handleToast({ status: 'error', message: 'Error occured'  })
        }
        
         }

      

   const router = useRouter()
   const registerAsset: SubmitHandler<Asset> = async(data) => {
      handleLoading(true)
         const assetService = new AssetService()
         try{
         const response = await assetService.create(data)
         if (response.success===false) {
           let errorResponse = response.message?response.message:'Error occured, try again'
           handleToast({ status: 'error', message: errorResponse  })
         } else {
           handleToast({ status: 'success', message: data.tag+' is registered successfully' })
            reset(response)
            router.push('/assets')
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
         <form onSubmit={handleSubmit(registerAsset)} className="text-sm w-full mt-4">
         <div className="my-7 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-5 ">
           
            <div className="form-group">
               <label htmlFor="tag" className="mb-2 text-sm capitalize block">Tag</label>
               <input
                  type="text"
                  id="tag"
                  className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                  {...register('tag',
                     {
                        required: "Please enter an asset code"
                     })}
               />

               <span className="text-red-600 text-xs block mt-2 w-48">{errors.tag?.message}</span>

            </div>


              <div className="form-group">
                  <label htmlFor="name" className="mb-2 text-sm capitalize block">Name</label>
                  <input
                     type="text"
                     id="name"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('name',
                        {
                           required: "Please enter asset name"
                        })}
                  />

                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.name?.message}</span>

               </div>

               <div className="form-group">
                  <label htmlFor="model" className="mb-2 text-sm capitalize block">Model</label>
                  <input
                     type="text"
                     id="model"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('model',
                        {
                           required: "Please enter a model"
                        })}
                  />

                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.model?.message}</span>

               </div>
               <div className="form-group">
                  <label htmlFor="model" className="mb-2 text-sm capitalize block">Brand</label>
                  <input
                     type="text"
                     id="brand"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('brand',
                        {
                           required: "Please enter a brand"
                        })}
                  />

                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.brand?.message}</span>

               </div>

               <div className="form-group">
                  <label htmlFor="model" className="mb-2 text-sm capitalize block">Serial number (S/N)</label>
                  <input
                     type="text"
                     id="serial_number"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('serial_number',
                        {
                           required: "Please enter a serial_number"
                        })}
                  />

                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.serial_number?.message}</span>

               </div>

               <div className="form-group">
                  <label htmlFor="asset_type" className="mb-2 text-sm capitalize block">Type</label>
                  <select id="asset_type" className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                   {...register('asset_type',
                   {
                      required: "Please select an asset type"
                   })}
                   onMouseDown={()=> loadAssetTypes()}
                  >
                      <option value="">----</option>
                      {!assetTypes && <option value="">Loading asset types ...</option>}
                     {assetTypes?.map((item:AssetType,i:number)=>{
                        return(
                           <option value={item.id} key={i}>{item.name}</option>
                        )
                     })}
                  </select>

                  {/* <span className="text-red-600 text-xs block mt-2 w-48">{errors.asset_type?.message}</span> */}


               </div>

               <div className="form-group">
                  <label htmlFor="unit_price" className="mb-2 text-sm capitalize block">Unit Price</label>
                  <input
                     type="number"
                     id="unit_price"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('unit_price',
                        {
                           required: "Please enter a unit_price"
                        })}
                  />

                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.unit_price?.message}</span>

               </div>

               <div className="form-group">
                  <label htmlFor="purchase_order" className="mb-2 text-sm capitalize block">Purchase order</label>
                  <select id="purchase_order" className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                   {...register('purchase_order',
                   {
                      required: "Please enter a model"
                   })}
                   onMouseDown={() =>loadOrders()}
                  >
                      <option value="">----</option>
                      {!orders && <option value="">Loading orders ...</option>}
                     {orders?.map((item:Order,i:number)=>{
                        return(
                           <option value={item.id} key={i}>{item.code}</option>
                        )
                     })}
                  </select>

                  {/* <span className="text-red-600 text-xs block mt-2 w-48">{errors.purchase_order?.message}</span> */}


               </div>

         
            
            </div>

            <div className="form-group">
                  <label htmlFor="description" className="mb-2 text-sm capitalize block">Description</label>
                  <textarea rows={5} id="description" className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                  placeholder="Write down here ..."

                  {...register('description',
                  {
                     required: "Please enter a model"
                  })}
                  >
           
                  </textarea>
                   <span className="text-red-600 text-xs block mt-2 w-48">{errors.description?.message}</span>

               </div>

           
               <Button title="Register" loading={loading} loadingTitle="Registering ..." small />
    
         
         </form>
      </div>
   )
}