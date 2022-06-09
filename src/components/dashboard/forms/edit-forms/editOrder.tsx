import Link from 'next/link'
import Button from '../../authentication/button'


import { useForm, SubmitHandler } from 'react-hook-form'
import { Order, Organisation, Vendor } from '../../../../types/types'
import { useEffect, useState } from 'react'
import { VendorService } from '../../../../pages/api/services/VendorService'
import { OrganisationService } from '../../../../pages/api/services/OrganizationService'
import { OrderService } from '../../../../pages/api/services/OrderService'
import { Toast } from '../../toasts/Toast'
import { useRouter } from 'next/router'

export function EditOrder(props:any): JSX.Element {
   const { register, handleSubmit, formState: { errors }, reset } = useForm<Order>()
   const [{ status, message }, handleToast] = useState({ status: '', message: '' })
   const [loading, handleLoading] = useState<Boolean>(false)
   const [vendors, setVendors] = useState<Vendor[]>()
   const [organisations, setOrganisations] = useState<Organisation[]>()
   const [order,setOrder] = useState<any>({})
  

   const router = useRouter()
   function getOneOrder(id: String) {
    const service = new OrderService()
    service.getOne(id)
    .then(res=> {
        setOrder(res.data)
     }).catch(err=> {
         console.log(err)
     })
   }

   useEffect(() => {
       const loadVendors = async () => {
           const vendorService = new VendorService()
           try{
           const response = await vendorService.getAll(1,30)
           setVendors(response.data.data)
         }catch (error) {
           console.log('Error occured: ',error)
        }
        
         }
         const loadOrganisations = async () => {
            const organisationService = new OrganisationService()
            try{
            const response = await organisationService.getAll(1,30)
            setOrganisations(response.data.data)
          }catch (error) {
            console.log('Error occured: ',error)
         }
         
          }
          loadVendors()
         loadOrganisations()
        getOneOrder(props.id)

   },[vendors,organisations,props.id])


      
   const updateOrder: SubmitHandler<Order> = async(data) => {
      let newOrder = {
         id: props.id,
         code: data.code || order.code,
         vendor: data.vendor || order.vendor.id,
         order_date: data.order_date || order.order_date,
         delivery_date: data.delivery_date || order.delivery_date,
         organisation: data.organisation || order.organisation.id,
         total_quantity: data.total_quantity || order.total_quantity,
         total_amount: data.total_amount || order.total_amount,
         status: order.status
      }
      handleLoading(true)
      console.log('toooo', newOrder)
         const orderService = new OrderService()
         data.status = 'PENDING'
         try{
         const response = await orderService.update(newOrder, props.id)
         if (response.success===false) {
           let errorResponse = response.message?response.message:'Error occured, try again'
           handleToast({ status: 'error', message: errorResponse  })
         } else {
           handleToast({ status: 'success', message: 'Order '+ data.code+' is updated successfully' })
           reset(response)
           router.push('/orders')
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
         <form onSubmit={handleSubmit(updateOrder)} className="text-sm w-full -mt-2">
            <div className=" mt-7 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
               <div className="form-group w-full">
                  <label htmlFor="code" className="mb-2 text-sm capitalize block">Order code</label>
                  <input
                     type="text"
                     id="code"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('code',
                        )}
                     defaultValue={order.code}
                  />

                  <span className="text-red-600 text-xs block mt-2">{errors.code?.message}</span>

               </div>

               <div className="form-group">
                  <label htmlFor="productQuantity" className="mb-2 text-sm capitalize block">Product Quantity</label>
                  <input
                     type="number"
                     id="productQuantity"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('total_quantity',
                        )}
                    defaultValue={order.total_quantity}
                  />
                  <span className="text-red-600 text-xs block mt-2">{errors.total_quantity?.message}</span>
               </div>

               <div className="form-group">
                  <label htmlFor="productUnitPrice" className="mb-2 text-sm capitalize block">Total Amount</label>
                  <input
                     type="number"
                     id="productUnitPrice"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('total_amount',
                        )}
                    defaultValue={order.total_amount}
                  />
                  <span className="text-red-600 text-xs block mt-2">{errors.total_amount?.message}</span>
               </div>

               <div className="form-group">
                  <label htmlFor="orderDate" className="mb-2 text-sm capitalize block">Order Date</label>
                  <input
                     type="date"
                     id="orderDate"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('order_date',
                       )}
                   defaultValue={order.order_date}
                  />

                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.order_date?.message}</span>

               </div>

               <div className="form-group">
                  <label htmlFor="orderDate" className="mb-2 text-sm capitalize block">Delivery Date</label>
                  <input
                     type="date"
                     id="orderDate"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('delivery_date',
                        )}
                     defaultValue={order.delivery_date}
                  />

                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.delivery_date?.message}</span>

               </div>
            </div>

            <div className=" mt-7 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
               <div className="form-group">
                  <label htmlFor="organisation" className="mb-2 text-sm capitalize block">Organisation</label>
                  <select id="organisation" className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                   {...register('organisation',
                  )}
                  >
                     <option value={order.organisation?.id}>{order.organisation?.name}</option>
                     {organisations?.map((item:Organisation,i:number)=>{
                        if(item.id !== order.organisation?.id) {
                        return(
                           <option value={item.id} key={i}>{item.name}</option>
                        )
                        }
                     })}
                  </select>
                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.organisation?.message}</span>
                     
                   
               </div>

               <div className="form-group">
                  <label htmlFor="vendor" className="mb-2 text-sm capitalize block">Vendor</label>
                  <select id="vendor" className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                    {...register('vendor',
                    )}
                  >
                  <option value={order.vendor?.id}>{order.vendor?.names}</option>
                     {vendors?.map((item:Vendor,i:number)=>{
                        if(item.id !== order.vendor?.id) {
                        return(
                           <option value={item.id} key={i}>{item.names}</option>
                        )
                        }
                     })}
                  </select>
                  <span className="text-red-600 text-xs block mt-2">{errors.vendor?.message}</span>
                  <div className="text-xs my-5">
                        Vendor not registered?  <Link href="/vendors/register"><a className="text-primary hover:underline">Register vendor here</a></Link>
                     </div>
               </div>

            </div>


            <Button title="Update" loading={loading} loadingTitle="Updating ..." small />
        
         </form >
      </div >
   )
}