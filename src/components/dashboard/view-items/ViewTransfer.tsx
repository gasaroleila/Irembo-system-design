import { useState, useEffect } from "react"
import { UnorderedListOutlined } from "@ant-design/icons";
import Table from "../tables/Table";
import RedirectButton from "../button/RedirectButton";
import { Transferservice } from "../../../pages/api/services/TransferService";
import { useRouter } from "next/router";



/* eslint-disable @next/next/no-img-element */
export default function ViewTransfer(props: any): JSX.Element {
    const [activeTab, setActiveTab] = useState<string>('transfer')
    const [transferData, setTransferData] = useState<any>()
    const [transferDataLoader, setTransferDataLoader] = useState<boolean>(true)
    const router = useRouter()
    let id: string | any = router.query.q
    
    const transferDetails = [
        {
            id:1,
            assetName: 'computer',
             quantity: 12
        }
    ]

    // const transfer_id = (String)(useRouter().query.q)
    useEffect(() => {
        const loaduserInfo = async () => {
            const transferService = new Transferservice()
            try {
                const response = await transferService.getOne(id)
                setTransferData(response.data[0])
                setTransferDataLoader(false)
            } catch (error: any) {
                console.log(error)
            }

        }
        loaduserInfo()
    }, [id])

    console.log(transferData)
    let assetActions = {service:'AssetService',redirect:'/assets'}

    return (
        <div className="flex text-sm">
            <div className="bg-white rounded w-full mx-auto p-5 md:p-10">
            
              <RedirectButton
              url="/transfers"
              icon = {  <UnorderedListOutlined className="mr-2"/>}
              title = 'List'
              float = 'float-right'

              />

                <section className="flex justify-center w-full">
                    <div className="md:px-5 md:py-10">
                        <h1 className="w-full  text-primary text-2xl">TRANFER OF {`${transferData?.asset.name}`}</h1>

                    </div>

                </section>
                <div className="w-full mb-5">
                    {/* tabs */}
                    <div className="lg:w-full md:w-2/3">
                           <div className="overflow-x-auto">
                            <div className='flex gap-5 items-center cursor-pointer font-bold w-max md:w-full'>
                                <div className={`${activeTab === 'transfer' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('transfer'); }}>Details</div>
                                <div className={`${activeTab === 'assetsInvolved' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('assetsInvolved'); }}>Assets Involved</div>
                            </div>
                           

                        </div>
                        <hr />
                        {/* tabs ends here */}

                        {/* personal info */}
                        {activeTab === 'transfer' &&
                            <section className="my-5">
                                <div>
                                    <h1 className="my-2">Source Author: <span className="text-gray-500">{`${transferData?.source_initiator.user.first_name} `+ `${transferData?.source_initiator.user.last_name}`}</span> </h1>
                                    <h1 className="my-2">Source Organisation: <span className="text-gray-500">{transferData?.source_organisation.name}</span> </h1>
                                    <h1 className="my-2">Destination Organisation: <span className="text-gray-500">{transferData?.destination_organisation.name}</span> </h1>
                                    <h1 className="my-2">Tranfer Date: <span className="text-gray-500">{transferData?.date_of_transfer}</span> </h1>
                                    <h1 className="my-2 w-1/2">Comment: <span className="text-gray-500">{transferData?.comment}</span> </h1>
                                </div>

                            </section>
                        }

                        
                         {activeTab === 'assetsInvolved' &&(
                          <section className="my-5 w-full">
                         {
                            transferDetails.map((tranferDetail:any)=> {
                             return (
                            <div key={tranferDetail.id} className="bg-lightGray p-5 flex mb-6 w-4/12">
                                <h1 className="mr-6">{`${tranferDetail.id}.`}</h1>
                                <div>
                                <h1 className="my-2">Asset name: <span className="text-gray-500">{tranferDetail.assetName}</span> </h1>
                                <h1 className="my-2">Quantity: <span className="text-gray-500">{tranferDetail.quantity}</span> </h1>
                                </div>
                                
                            </div>
                            )})
            
                             }
                        </section>
                        ) } 

                        {/* {activeTab === 'assetDetails' &&
                         <section className="my-5 "> */}
                         {/* assets */}
                         {/* <div className="bg-lightGray p-5">
                             <h1 className="text-gray-500">Assets</h1>

                             <Table
                              cols= {assetColumns}
                              rows = {assetRows}
                              btnTitle=""
                              addPath=""
                              searchPlaceholder=""
                              hasActions={false}
                              action={assetActions}
                              hasHeader={false}
                             />
                         </div>
                         </section>
                       } */}
                    </div>
                </div>
            </div>

        </div>
    )
                    }