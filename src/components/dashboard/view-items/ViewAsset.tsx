import React, { useState, useEffect } from "react"
import { UnorderedListOutlined } from "@ant-design/icons";
import RedirectButton from "../button/RedirectButton";
import { AssetService } from "../../../pages/api/services/AssetService";
import Skeleton from 'react-loading-skeleton'
import { checkStatus } from "../../../util/checkStatus";
import MoreButton from "../button/MoreButton";
import Actions from "../cards/Actions";
import { CheckoutService } from "../../../pages/api/services/CheckoutService";
import { EService } from "../../../types/enums";
import { checkLocalStorage } from "../../../util/checkLocalStorage";
import Table from "../tables/Table";
import Pagination from "../tables/Pagination";
import { CheckinService } from "../../../pages/api/services/CheckinService";
import { OrderService } from "../../../pages/api/services/OrderService";


/* eslint-disable @next/next/no-img-element */
export default function ViewAsset(props: string | any): JSX.Element {
    const [activeTab, setActiveTab] = useState<string>('assetDetails')
    const [asset, setAsset] = useState<any>()
    const [assetDataLoader, setAssetDataLoader] = useState<boolean>(true);

    let pageInfo: any = checkLocalStorage('pageInfo');
    //checkout table
    const checkoutColumns = ['Employee names', 'Organisation', 'Asset', 'Checkout Date', 'Status']
    let [checkoutData, setCheckOutData] = useState<any>();
    let checkoutActions = { service: 'CheckoutService', redirect: '/checkouts' }

    //checkin table
    const checkinColumns = ['Asset','Employee names','Organisation','Checkin Date','Status']
    let [checkinData,setCheckInData] = useState<any>();
    let checkinActions = { service: 'CheckinService', redirect: '/checkins' }
    
    //transfers table
    const transferColumns = ['Source Author', 'Source Organization', 'Destination author', 'Destination organization', 'Transfer date', 'Received date', 'Status']
    const transferData:any = [
        {
            id:'121-fqwe23',
            sourceAuthor:"Gersh Lento",
            sourceOrganization:"SOPYRWA",
            destinationAuthor:"Jean Bosco Niyo",
            destinationOrganization:"CONSTRUCTION Ltd",
            transferDate:"June,12th,2021",
            receivedDate:"April,1st, 2022",
            status:"pending"
         },
         {
            id:'121-fqwe23',
            sourceAuthor:"Gersh Lento",
            sourceOrganization:"SOPYRWA",
            destinationAuthor:"Jean Bosco Niyo",
            destinationOrganization:"CONSTRUCTION Ltd",
            transferDate:"June,12th,2021",
            receivedDate:"April,1st, 2022",
            status:"approved"
         },
    ]
    let transferActions = { service: 'TransferService', redirect: '/transfers' }
    
    //orders table
    const orderColumns = ['Order code','Quantity','Amount', 'Order date', 'Delivery date','Organization','Supplier names','Status']
    let [orderData, setOrderData] = useState<any>();
    let orderActions = { service: 'OrderService', redirect: '/orders' }
    
    useEffect(() => {
        const loadAssetInfo = async () => {
            const assetService = new AssetService()
            try {
                const response = await assetService.getOne(props.id)
                setAsset(response.data)
                setAssetDataLoader(false)
                console.log('asset', asset)
            } catch (error: any) {
                console.log(error)
            }

        }

        const loadCheckOutData = async () => {
            const checkoutService = new CheckoutService()
            try {
                let response:any
                if (pageInfo.service === EService.CHECKOUTS) {
                    console.log(asset.id)
                    response = await checkoutService.getByAsset(props.id, parseInt(pageInfo.page), parseInt(pageInfo.rows))

                } else {
                    response = await checkoutService.getByAsset(props.id, 1, 5)
                }
                console.log('response' + response)
                setCheckOutData(response.data)
            } catch (error) {
                console.log('Error occured: ', error)
            }

        }

        const loadCheckInData = async () => {
            const checkinService = new CheckinService()
            try{
            let response
            if (pageInfo.service === EService.CHECKINS) {
                response = await checkinService.getByAsset(props.id,parseInt(pageInfo.page), parseInt(pageInfo.rows))

            } else {
                response = await checkinService.getByAsset(props.id,1, 5)
            }
            setCheckInData(response.data)
          }catch (error) {
            console.log('Error occured: ',error)
         }
         
        }
        
        const loadOrderData = async () => {
            const orderService = new OrderService()
            try{
            let response
            if (pageInfo.service === EService.ORDERS) {
              response = await orderService.getByAsset(asset?.id,parseInt(pageInfo.page), parseInt(pageInfo.rows))
            } else {
              response = await orderService.getByAsset(asset?.id,1, 5)
            }
            setOrderData(response.data)
          }catch (error) {
            console.log('Error occured: ',error)
         }
         
          }
        loadAssetInfo()
        loadCheckOutData()
        loadCheckInData()
        loadOrderData()
    }, [props.id, pageInfo.service, pageInfo.page, pageInfo.rows, asset])





    return (
        <div className="flex text-sm">
            <div className="bg-white rounded w-full mx-auto p-5 md:p-10">

                <RedirectButton
                    url="/assets"
                    icon={<UnorderedListOutlined className="mr-2" />}
                    title='List'
                    float='float-right'

                />

                <section className="flex justify-center w-full">
                    <div className="md:px-5 md:py-10">
                        <div className="w-full flex justify-center">
                            <h1 className="w-full  text-primary text-2xl">ASSET{!assetDataLoader && (': ' + asset?.name + ', ' + asset?.serial_number)}</h1>
                        </div>
                    </div>

                </section>
                <div className="w-full mb-5">
                    {/* tabs */}
                    <div className="w-full">
                        <div className="overflow-x-auto">
                            <div className='flex gap-5 items-center cursor-pointer font-bold w-max md:w-full'>
                                <div className={`${activeTab === 'assetDetails' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('assetDetails'); }}>Asset Details</div>
                                <div className={`${activeTab === 'checkins' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('checkins'); }}>Checkins</div>
                                <div className={`${activeTab === 'checkouts' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('checkouts'); }}>Checkouts</div>
                                <div className={`${activeTab === 'transfers' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('transfers'); }}>Transfers</div>
                                <div className={`${activeTab === 'orders' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('orders'); }}>Order</div>
                                <div className={`${activeTab === 'maintenance' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('maintenance'); }}>Maintanance</div>
                                <div className={`${activeTab === 'actions' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('actions'); }}>Actions</div>

                            </div>


                        </div>
                        <hr />
                        {/* tabs ends here */}

                        {/* personal info */}
                        {activeTab === 'assetDetails' &&
                            <section className="my-5">
                                {assetDataLoader ?
                                    <div>
                                        <div className="my-5">
                                            <h1 className="my-1 "> <Skeleton width={'25%'} height={20} /></h1>
                                            <h1 className="my-1 ml-5 "> <Skeleton width={'15%'} height={20} /></h1>
                                            <h1 className="my-1 ml-5 "> <Skeleton width={'20%'} height={20} /></h1>
                                            <h1 className="my-1 ml-5 "> <Skeleton width={'13%'} height={20} /></h1>
                                        </div>
                                        <hr />
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
                                            <h1 className="my-2">Tag: <span className="text-gray-500">{asset?.tag}</span> </h1>
                                            <h1 className="my-2">Name: <span className="text-gray-500">{asset?.name}</span> </h1>
                                            <h1 className="my-2">Creator organisation: <span className="text-gray-500">{asset?.current_organisation?.name}</span> </h1>
                                            <h1 className="my-2">Serial number (S/N): <span className="text-gray-500">{asset?.serial_number}</span> </h1>
                                            <h1 className="my-2">Model: <span className="text-gray-500">{asset?.model}</span> </h1>
                                            <h1 className="my-2">Brand: <span className="text-gray-500">{asset?.brand}</span> </h1>
                                            <h1 className="my-2">Status: <span className={`px-3 py-1 rounded-full text-xs font-bold ${checkStatus(asset?.status) ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} `}>{asset?.status}</span> </h1>

                                            <h1 className="my-2">Description: <span className="text-gray-500">{asset?.description}</span> </h1> </div>
                                        <hr />

                                        {/* Organisation */}
                                        <div className="my-5">
                                            <h1 className="my-2 font-bold"> Asset type </h1>
                                            <div className="ml-5">
                                                <h1 className="my-2">Name: <span className="text-gray-500">{asset?.asset_type.name} </span> </h1>
                                                <h1 className="my-2">Type: <span className="text-gray-500">{asset?.asset_type.type} </span> </h1>

                                            </div>

                                        </div>
                                        {/* <hr /> */}
                                        {/* vendor */}
                                        {/* <div className="my-5">
                                            <h1 className="my-2 font-bold"> Purchase Order </h1>
                                            <div className="ml-5">
                                                <h1 className="my-2">Names: <span className="text-gray-500">{asset?.purchase_order.code} </span> </h1>


                                            </div>

                                        </div>
                                        <hr />
                                        <div className="my-5">
                                            <h1 className="my-2 font-bold">Vendor </h1>
                                            <div className="ml-5">
                                                <h1 className="my-2">Names: <span className="text-gray-500">{asset?.purchase_order.vendor.names} </span> </h1>


                                            </div>

                                        </div> */}

                                    </div>
                                }

                            </section>
                        }

                        {activeTab === 'checkouts' &&
                            <section className="my-5 ">
                                {/* checkouts */}
                                <div className="bg-lightGray p-5">
                                    <h1 className="text-gray-500">Checkouts</h1>
                                    <div>
                                        <Table
                                            cols={checkoutColumns}
                                            rows={checkoutData?.data}
                                            btnTitle="Add checkout"
                                            addPath="/checkouts/register"
                                            searchPlaceholder="checkout"
                                            hasActions={true}
                                            action={checkoutActions}
                                            hasHeader={false}

                                        />

                                        <Pagination
                                            pages={checkoutData?.links}
                                            service={EService.CHECKOUTS}
                                        />
                                    </div>
                                </div>
                            </section>
                        }

                        {activeTab === 'checkins' &&
                            
                            <section className="my-5 ">
                                {/* checkins */}
                                <div className="my-5 bg-lightGray p-5">
                                    <h1 className="text-gray-500">Checkins</h1>
                                    <div>
                                    <Table
                                    cols= {checkinColumns}
                                    rows = {checkinData?.data}
                                    btnTitle="Add checkin"
                                    addPath="/checkins/register"
                                    searchPlaceholder="checkin"
                                    hasActions={true}
                                    action = {checkinActions}
                                    hasHeader={true}
                                    
                                    />
                                    <Pagination
                                        pages={checkinData?.links}
                                        service={EService.CHECKINS}
                                    />  
                                
                                </div> 
 
                                </div>
                            </section>
                        }


                        {activeTab === 'orders' &&
                            <section className="my-5 ">
                                {/* orders */}
                                <div>
                                        <div className="ml-5">
                                            <h1 className="my-2">Code: <span className="text-gray-500">{asset?.purchase_order?.code}</span> </h1>
                                            <h1 className="my-2">Order date: <span className="text-gray-500">{asset?.purchase_order?.order_date}</span> </h1>
                                            <h1 className="my-2">Delivery date: <span className="text-gray-500">{asset?.purchase_order?.delivery_date}</span> </h1>
                                            <h1 className="my-2">Total quantity: <span className="text-gray-500">{asset?.purchase_order?.total_quantity}</span> </h1>
                                            <h1 className="my-2">Total amount: <span className="text-gray-500">{asset?.purchase_order?.total_amount} RWF</span> </h1>
                                            <h1 className="my-2">Status: <span className={`px-3 py-1 rounded-full text-xs font-bold ${asset?.purchase_order?.status === 'PENDING' ? 'bg-yellow-100 text-black' : 'bg-green-500 text-white'} `}>{asset?.purchase_order?.status}</span> </h1>
                                        </div>
                                        <hr />

                                        {/* Organisation */}
                                        <div className="my-5">
                                            <h1 className="my-2 font-bold"> Organisation </h1>
                                            <div className="ml-5">
                                                <h1 className="my-2">Name: <span className="text-gray-500">{asset?.purchase_order?.organisation.name} </span> </h1>
                                                <h1 className="my-2">Email: <span className="text-gray-500">{asset?.purchase_order?.organisation.contact_email} </span> </h1>
                                                <h1 className="my-2">Phone: <span className="text-gray-500">{asset?.purchase_order?.organisation.contact_phone} </span> </h1>
                                                <h1 className="my-2">Type: <span className="text-gray-500">{asset?.purchase_order?.organisation.type} </span> </h1>
                                                <h1 className="my-2">Address <span className="text-gray-500">{asset?.purchase_order?.organisation.address} </span> </h1>

                                            </div>

                                        </div>
                                        <hr />
                                        {/* vendor */}
                                        <div className="my-5">
                                            <h1 className="my-2 font-bold"> Vendor </h1>
                                            <div className="ml-5">
                                                <h1 className="my-2">Names: <span className="text-gray-500">{asset?.purchase_order?.vendor.names} </span> </h1>
                                                <h1 className="my-2">Email: <span className="text-gray-500">{asset?.purchase_order?.vendor.contact_email} </span> </h1>
                                                <h1 className="my-2">Phone: <span className="text-gray-500">{asset?.purchase_order?.vendor.contact_phone} </span> </h1>
                                                <h1 className="my-2">Type: <span className="text-gray-500">{asset?.purchase_order?.vendor.type} </span> </h1>
                                                <h1 className="my-2">Address <span className="text-gray-500">{asset?.purchase_order?.vendor.address} </span> </h1>

                                            </div>

                                        </div>

                                    </div>
                            </section>
                        }

                        {activeTab === 'actions' &&
                            <section className="my-5 ">
                                <div className="bg-lightGray p-5">
                                    <h1 className="text-gray-500">Actions</h1>
                                    <br />
                                    <Actions index={0} id={asset?.id} status={asset?.status} ServiceClass={'AssetService'} path="/assets" url="assets" />

                                </div>

                            </section>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}