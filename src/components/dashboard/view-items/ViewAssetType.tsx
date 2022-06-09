import { UnorderedListOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton";
import { AssetTypeService } from "../../../pages/api/services/AssetTypeService"
import RedirectButton from "../button/RedirectButton";
import { checkStatus } from "../../../util/checkStatus";
import Actions from "../cards/Actions";




export default function ViewAsset(props: string | any): JSX.Element {
    const [activeTab, setActiveTab] = useState<string>('assetTypeDetails')
    const [assetType, setAssetType] = useState<any>()
    const [assetTypeDataLoader, setAssetTypeDataLoader] = useState<boolean>(true);
    useEffect(() => {
        const loadAsseTypeInfo = async () => {
            const assetTypeService = new AssetTypeService()
            try {
                const response = await assetTypeService.getOne(props.id)
                setAssetType(response.data)
                setAssetTypeDataLoader(false)
            } catch (error: any) {
                console.log(error)
            }

        }

        loadAsseTypeInfo()
    })
    return (
        <div className="flex text-sm">
            <div className="bg-white rounded w-full mx-auto p-5 md:p-10">

                <RedirectButton
                    url="/assets/types"
                    icon={<UnorderedListOutlined className="mr-2" />}
                    title='List'
                    float='float-right'

                />

                <section className="flex justify-center w-full">
                    <div className="md:px-5 md:py-10">
                        <div className="w-full flex justify-center">
                            <h1 className="w-full  text-primary text-2xl">ASSET TYPE{!assetTypeDataLoader && (': ' + assetType?.name)}</h1>
                        </div>
                    </div>

                </section>
                <div className="w-full mb-5">
                    {/* tabs */}
                    <div className="w-full">
                        <div className="overflow-x-auto">
                            <div className='flex gap-5 items-center cursor-pointer font-bold w-max md:w-full'>
                                <div className={`${activeTab === 'assetTypeDetails' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('assetTypeDetails'); }}>Asset Type Details</div>
                                <div className={`${activeTab === 'actions' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('actions'); }}>Actions</div>

                            </div>


                        </div>
                        <hr />
                        {/* tabs ends here */}

                        {/* personal info */}
                        {activeTab === 'assetTypeDetails' &&
                            <section className="my-5">
                                {assetTypeDataLoader ?
                                    <div>
                                        <div className="my-5">
                                            <h1 className="my-1 "> <Skeleton width={'25%'} height={20} /></h1>
                                            <h1 className="my-1 ml-5 "> <Skeleton width={'15%'} height={20} /></h1>
                                            <h1 className="my-1 ml-5 "> <Skeleton width={'20%'} height={20} /></h1>
                                            <h1 className="my-1 ml-5 "> <Skeleton width={'13%'} height={20} /></h1>
                                        </div>
                                    </div>

                                    :
                                    <div>
                                        <div className="ml-5">
                                            <h1 className="my-2">Name: <span className="text-gray-500">{assetType?.name}</span> </h1>
                                            <h1 className="my-2">Type: <span className="text-gray-500">{assetType?.type}</span> </h1>
                                            <h1 className="my-2">Created By: <span className="text-gray-500">{assetType?.created_by?.first_name + ' '+ assetType?.created_by?.last_name}</span> </h1>
                                            <h1 className="my-2">Status: <span className={`px-3 py-1 rounded-full text-xs font-bold ${checkStatus(assetType?.status) ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} `}>{assetType?.status}</span> </h1>

                                        
                                        </div>
                                        </div>
                                }

                            </section>
                                }
                                
                                {/* actions tab */}
                                {activeTab === 'actions' &&
                             <section className="my-5 ">
                                <div className="bg-lightGray p-5">
                                    <h1 className="text-gray-500">Actions</h1>
                                    <br />
                                    <Actions index={0} id={assetType?.id} status={assetType?.status} ServiceClass={'AssetService'} path="/assets" url="assets" />

                                </div>

                            </section>
                             }

                    </div>
                </div>
            </div>
            </div>

    )
}