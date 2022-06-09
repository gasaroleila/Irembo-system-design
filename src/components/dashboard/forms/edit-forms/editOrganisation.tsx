
import { useState,useEffect } from 'react'
import Button from '../../authentication/button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Organisation } from '../../../../types/types'
import { Toast } from '../../toasts/Toast'
import { OrganisationService } from '../../../../pages/api/services/OrganizationService'
import { Router, useRouter } from 'next/router'

export function EditOrganisation(props:any): JSX.Element {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Organisation>()
  const [{ status, message }, handleToast] = useState({ status: '', message: '' })
  const [loading, handleLoading] = useState<Boolean>(false)
  const [organisation,setOrganisation] = useState<any>({})

  const router = useRouter()
  
  function getOneOrganisation(id: String) {
    const service = new OrganisationService()
    service.getOne(id)
    .then(res=> {
        setOrganisation(res.data)
     }).catch(err=> {
         console.log(err)
     })
}

useEffect(()=> {
    getOneOrganisation(props.id)
})

  const updateOrganisation: SubmitHandler<Organisation> = async(data) => {
   handleLoading(true)
   let newOrganisation = {
     id: props.id,
     name: data.name || organisation.name,
     contact_email: data.contact_email || organisation.contact_email,
     contact_phone: data.contact_phone || organisation.contact_phone,
     address: data.address || organisation.address,
     type: data.type ||  organisation.type
   }
   const organisationService = new OrganisationService()
   try{
   const response = await organisationService.update(newOrganisation,props.id)
   if (response.success===false) {
     let errorResponse = response.message?response.message:'Error occured, try again'
     handleToast({ status: 'error', message: errorResponse  })
   } else {
     handleToast({ status: 'success', message: data.name+' is registered successfully' })
     reset(response)
     router.push('/organisations')
   }
   handleLoading(false)
   setTimeout(() => {
     handleToast({ status: '', message: '' })
   }, 3000)


}catch (error) {
  handleToast({ status: 'error', message: 'Error occured, try again'  })
  setTimeout(() => {
    handleToast({ status: '', message: '' })
  }, 3000)
   handleLoading(false)
   
   console.log('Error occured: ',error)
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
        <form onSubmit={handleSubmit(updateOrganisation)} className="text-sm w-full -mt-2">
        <div className="row mt-7 w-full">
        <label htmlFor="email" className="mb-2 text-sm capitalize block">Name</label>
           <input
            type="name"
            id="name"
            className= "rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
         {...register('name',
         )}
           defaultValue={organisation.name}
           />

           <span className="text-red-600 text-xs block mt-2">{errors.name?.message}</span>

         </div>


         <div className=" mt-7 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
           <div className="form-group">
           <label htmlFor="email" className="mb-2 text-sm capitalize block">Contact Email</label> 
           <input
            type="email"
            id="email"
            className= "rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
         {...register('contact_email',
        )}
           defaultValue={organisation.contact_email}
           />

        <span className="text-red-600 text-xs block mt-2 w-48">{errors.contact_email?.message}</span>

           </div>

           <div className="form-group">
           <label htmlFor="phone" className="mb-2 text-sm capitalize block">Contact Phone</label> 
          <input
            type="text"
            id="phone"
            className = "rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
            {...register('contact_phone',
            )}
            defaultValue={organisation.contact_phone}
           />
           <span className="text-red-600 text-xs block mt-2">{errors.contact_phone?.message }</span>
           </div>

           </div>

           <div className=" mt-7 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
           <div className="form-group">
           <label htmlFor="address" className="mb-2 text-sm capitalize block">Address</label> 
          <input
            type="text"
            id="address"
            className = "rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
            {...register('address',
            )}
            defaultValue={organisation.address}
           />

        <span className="text-red-600 text-xs block mt-2 w-48">{errors.address?.message}</span>

           </div>

           <div className="form-group">
           <label htmlFor="confirmPassword" className="mb-2 text-sm capitalize block">Type</label> 
           <select  id="type"  className = "rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
            {...register('type',
           )}
           >
             <option value={organisation.type}>{organisation.type}</option>
             {organisation.type!== 'HEAD_OFFICE' && (<option value="HEAD_OFFICE">HEAD OFFICE</option>)}  
             {organisation.type!== 'SUBSIDIARY' && (<option value="SUBSIDIARY">SUBSIDIARY</option> )}
             {organisation.type!== 'JOINT_VENDOR' && (<option value="JOINT_VENDOR">JOINT VENDOR</option>)}
          
           </select>
         <span className="text-red-600 text-xs block mt-2">{errors.type?.message }</span>
           </div>

           </div>
         

           <Button title="Update" loading={loading} loadingTitle="Updating ..." small/>
           </form >
        </div >
    )
}