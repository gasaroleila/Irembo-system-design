import Button from '../authentication/button'

import { useForm, SubmitHandler } from 'react-hook-form'
import { AssetType } from '../../../types/types'
import { useState } from 'react'
import { Toast } from '../toasts/Toast'
import { AssetTypeService } from '../../../pages/api/services/AssetTypeService'
import { useRouter } from 'next/router'

export function RegisterAssetType(): JSX.Element {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AssetType>()
  const [{ status, message }, handleToast] = useState({ status: '', message: '' })
  const [loading, handleLoading] = useState<Boolean>(false)

  const router = useRouter()

  const registerAssetType: SubmitHandler<AssetType> = async (data) => {
    handleLoading(true)
    const assetService = new AssetTypeService()
    try {
      const response = await assetService.create(data)
      if (response.success === false) {
        let errorResponse = response.message ? response.message : 'Error occured, try again'
        handleToast({ status: 'error', message: errorResponse })
      } else {
        handleToast({ status: 'success', message: data.name + ' is registered successfully' })
        reset(response)
        router.push('/assets/types')
      }
      handleLoading(false)
      setTimeout(() => {
        handleToast({ status: '', message: '' })
      }, 3000)


    } catch (error: any) {
      handleToast({ status: 'error', message: error.response.data.message ? error.response.data.message : 'Error occured, try again' })
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
      <form onSubmit={handleSubmit(registerAssetType)}>
        <div className="text-sm w-full grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 my-5">
          <div className="w-full">
            <label htmlFor="name" className="mb-2 text-sm capitalize block">Type Name</label>
            <input
              type="name"
              id="name"
              className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
              {...register('name',
                {
                  required: "Please enter asset type name",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters"
                  }
                })}
            />

            <span className="text-red-600 text-xs block mt-2">{errors.name?.message}</span>

          </div>

          <div className="w-full">
            <label htmlFor="type" className="mb-2 text-sm capitalize block">Type</label>
            <select id="type" required className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
           {...register('type',
            {
               required: "Please select asset type"
            })}
            >
              <option>----</option>
              <option value="HARDWARE">HARDWARE</option>
              <option value="SOFTWARE">SOFTWARE</option>
            </select>
            <span className="text-red-600 text-xs block mt-2">{errors.type?.message}</span>
          
          </div>
        </div>

        <Button title="Register" loading={loading} loadingTitle="Registering ..." small />

      </form >
    </div >
  )
}