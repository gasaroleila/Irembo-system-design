import Button from '../../authentication/button'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Asset, AssetType, Order } from '../../../../types/types'
import { AssetService } from '../../../../pages/api/services/AssetService'
import { useEffect, useState } from 'react'
import { Toast } from '../../toasts/Toast'
import { OrderService } from '../../../../pages/api/services/OrderService'
import { AssetTypeService } from '../../../../pages/api/services/AssetTypeService'
import { useRouter } from 'next/router'
export function EditAsset(props:any): JSX.Element {
   const { register, handleSubmit, formState: { errors }, reset } = useForm<Asset>({
      // defaultValues: {
      //        tag: '---',
      //        name: '---',
      //        model:'---',
      //        brand:'---',
      //        serial_number:'---',
      //        asset_type: {
      //         id:'---',
      //         name: '---',
      //         type: '---'
      //        },
      //        unit_price: 0,
      //        status: '---',
      //        purchase_order:{
      //         id:'',
      //         code: '',
      //         vendor: '',
      //         order_date: '',
      //         delivery_date:'',
      //         organisation: '',
      //         total_quantity:0,
      //         total_amount:0,
      //         status:''
      //        },
      //        description:'---'
      // }
   })
   const [{ status, message }, handleToast] = useState({ status: '', message: '' })
   const [loading, handleLoading] = useState<Boolean>(false)
   const [assetTypes, setAssetTypes] = useState<AssetType[]>([])
   const [orders, setOrders] = useState<Order[]>([])
   const [asset,setAsset] = useState<any>({})

   const router = useRouter()

   function getAsset(id: String) {
      // handleLoading(true)
      const service = new AssetService()
      service.getOne(id)
       .then(res=> {
           setAsset(res.data)
       }).catch(err=> {
         //   console.log(err)
       })
  }

   useEffect(() => {
      console.log('there')
      const loadAssetTypes = async () => {
          const assetTypeService = new AssetTypeService()
          try{
          const response = await assetTypeService.getAll(1,30)
          setAssetTypes(response.data.data)
        }catch (error) {
         //  console.log('Error occured: ',error)
       }
       
        }
        const loadOrders = async () => {
           const orderService = new OrderService()
           try{
           const response = await orderService.getAll(1,30)
           setOrders(response.data.data)
         }catch (error) {
         //   console.log('Error occured: ',error)
        }
        
         }
         loadAssetTypes()
        loadOrders()
        if(props?.id) {
           getAsset(props.id)
         }
  },[orders,assetTypes,props.id])
 
   const updateAsset: SubmitHandler<Asset> = async(data) => {
      let newAsset = {
         id: props.id,
         tag: data.tag || asset.tag,
         name: data.name || asset.name,
         description: data.description || asset.description,
         model: data.model || asset.model,
         brand: data.brand || asset.brand,
         serial_number: data.serial_number || asset.serial_number,
         asset_type: data.asset_type || asset.asset_type.id,
         unit_price: data.unit_price || asset.unit_price,
         status: data.status || asset.status,
         purchase_order: data.purchase_order || asset.purchase_order.id
      }

      console.log(newAsset)
      handleLoading(true)
         const assetService = new AssetService()
         try{
         const response = await assetService.update(newAsset)
         if (response.success===false) {
           let errorResponse = response.message?response.message:'Error occured, try again'
           console.log(errorResponse)
           handleToast({ status: 'error', message: errorResponse  })
         } else {
           handleToast({ status: 'success', message: data.tag+' is updated successfully' })
           reset(response)
           router.push('/assets')
         }
         handleLoading(false)
         setTimeout(() => {
           handleToast({ status: '', message: '' })
         }, 10000)
      
      
      }catch (error:any) {
         console.log(error.message)
        handleToast({ status: 'error', message: error.response.data.message?error.response.data.message: 'Error occured, try again'  })
        setTimeout(() => {
          handleToast({ status: '', message: '' })
        }, 3000)
         handleLoading(false)
         
      }
       }

      // const handleChange = (event:any)=> {
      //    setAsset({...asset,[event?.target.name]: event.target.value})
      // }

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
         <form onSubmit={handleSubmit(updateAsset)} className="text-sm w-full mt-4">
         <div className="my-7 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-5 ">
           
            <div className="form-group">
               <label htmlFor="tag" className="mb-2 text-sm capitalize block">Tag</label>
               <input
                  type="text"
                  id="tag"
                  className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                  {...register('tag',
                    )}
                  defaultValue={asset.tag}
                  // onChange={(e)=> setAsset({...asset,tag: e.target.value}) }               
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
                       )}
                        defaultValue={asset.name}
                        //  onChange={(e)=> setAsset({...asset,name: e.target.value}) }               
                        
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
                       )}
                     defaultValue={asset.model}
                     // onChange={(e)=> setAsset({...asset,model: e.target.value}) }               

                  />

                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.model?.message}</span>

               </div>
               <div className="form-group">
                  <label htmlFor="brand" className="mb-2 text-sm capitalize block">Brand</label>
                  <input
                     type="text"
                     id="brand"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('brand',
                       )}
                     defaultValue={asset.brand}
                     // onChange={(e)=> setAsset({...asset,brand: e.target.value}) }
                  />

                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.brand?.message}</span>

               </div>

               <div className="form-group">
                  <label htmlFor="serial_number" className="mb-2 text-sm capitalize block">Serial number (S/N)</label>
                  <input
                     type="text"
                     id="serial_number"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('serial_number',
                       )}
                   defaultValue={asset.serial_number}
                  //  onChange={(e)=> setAsset({...asset,serial_number: e.target.value}) }
                  //  onChange={(e)=> asset.serial_number = e.target.value}
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
                  >
                      <option value={asset.asset_type?.id}>{asset.asset_type?.name}</option>
                     {assetTypes?.map((item:AssetType,i:number)=>{
                        if(item.id !== asset.asset_type?.id) {
                        return(
                           <option value={item.id} key={i}>{item.name}</option>
                        )
                        }
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
                        )}
                   defaultValue={asset.unit_price}
                  //  onChange={(e)=> setAsset({...asset,unit_price: e.target.value}) }
                  //  onChange={(e)=> asset.unit_price = e.target.value}
                     
                  />

                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.unit_price?.message}</span>

               </div>

               <div className="form-group">
                  <label htmlFor="purchase_order" className="mb-2 text-sm capitalize block">Purchase order</label>
                  <select id="purchase_order" className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                   {...register('purchase_order',
                   )}
                  >
                      <option value={asset.purchase_order?.id}>{asset.purchase_order?.code}</option>
                     { orders?.map((item:Order,i:number)=>{
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
                 )}
                  defaultValue={asset.description}
                  // onChange={(e)=> setAsset({...asset,description: e.target.value}) }
                  >
           
                  </textarea>
                   <span className="text-red-600 text-xs block mt-2 w-48">{errors.description?.message}</span>

               </div>

           
               <Button title="Update" loading={loading} loadingTitle="Updating ..." small />
         </form>
      </div>
   )
}