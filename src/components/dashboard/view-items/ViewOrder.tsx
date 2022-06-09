import { useState, useEffect } from "react"
import { UnorderedListOutlined } from "@ant-design/icons";
import RedirectButton from "../button/RedirectButton";
import { OrderService } from "../../../pages/api/services/OrderService";
import {useRouter} from "next/router";
import Skeleton from 'react-loading-skeleton'
import Actions from "../cards/Actions";


/* eslint-disable @next/next/no-img-element */
export default function ViewOrder(props: any): JSX.Element {
    const [activeTab, setActiveTab] = useState<string>('orderDetails')
    const [userDataLoader, setUserDataLoader] = useState<boolean>(true)

    let [orderData, setOrderData] = useState<any>();

    const order_id = (String)(useRouter().query.q)
    useEffect(() => {
        const loaduserInfo = async () => {
            const orderService = new OrderService()
            try {
                const response = await orderService.getOne(order_id)
                setOrderData(response.data)
                setUserDataLoader(false)
            } catch (error: any) {
                console.log(error)
            }

        }
        loaduserInfo()
    }, [order_id])
    return (
        <div className="flex text-sm">
            <div className="bg-white rounded w-full mx-auto p-5 md:p-10">

                <RedirectButton
                    url="/orders"
                    icon={<UnorderedListOutlined className="mr-2" />}
                    title='List'
                    float='float-right'

                />

                <section className="flex justify-center w-full">
                    <div className="md:px-5 md:py-10">
                        <h1 className="w-full  text-primary text-2xl">ORDER: {orderData?.code} </h1>

                    </div>

                </section>
                <div className="w-full mb-5">
                    {/* tabs */}
                    <div className="lg:w-full md:w-2/3">
                        <div className="overflow-x-auto">
                            <div className='flex gap-5 items-center cursor-pointer font-bold w-max md:w-full'>
                                <div className={`${activeTab === 'orderDetails' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('orderDetails'); }}>Order Details</div>
                                <div className={`${activeTab === 'actions' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('actions'); }}>Actions</div>

                            </div>


                        </div>
                        <hr />
                        {/* tabs ends here */}

                        {/* order info */}
                        {activeTab === 'orderDetails' &&
                            <section className="my-5">
                                {userDataLoader ?
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
                                            <h1 className="my-2">Code: <span className="text-gray-500">{orderData?.code}</span> </h1>
                                            <h1 className="my-2">Order date: <span className="text-gray-500">{orderData?.order_date}</span> </h1>
                                            <h1 className="my-2">Delivery date: <span className="text-gray-500">{orderData?.delivery_date}</span> </h1>
                                            <h1 className="my-2">Total quantity: <span className="text-gray-500">{orderData?.total_quantity}</span> </h1>
                                            <h1 className="my-2">Total amount: <span className="text-gray-500">{orderData?.total_amount} RWF</span> </h1>
                                            <h1 className="my-2">Status: <span className={`px-3 py-1 rounded-full text-xs font-bold ${orderData?.status === 'PENDING' ? 'bg-yellow-100 text-black' : ''} `}>{orderData?.status}</span> </h1>
                                        </div>
                                        <hr />

                                        {/* Organisation */}
                                        <div className="my-5">
                                            <h1 className="my-2 font-bold"> Organisation </h1>
                                            <div className="ml-5">
                                                <h1 className="my-2">Name: <span className="text-gray-500">{orderData?.organisation.name} </span> </h1>
                                                <h1 className="my-2">Email: <span className="text-gray-500">{orderData?.organisation.contact_email} </span> </h1>
                                                <h1 className="my-2">Phone: <span className="text-gray-500">{orderData?.organisation.contact_phone} </span> </h1>
                                                <h1 className="my-2">Type: <span className="text-gray-500">{orderData?.organisation.type} </span> </h1>
                                                <h1 className="my-2">Address <span className="text-gray-500">{orderData?.organisation.address} </span> </h1>

                                            </div>

                                        </div>
                                        <hr />
                                        {/* vendor */}
                                        <div className="my-5">
                                            <h1 className="my-2 font-bold"> Vendor </h1>
                                            <div className="ml-5">
                                                <h1 className="my-2">Names: <span className="text-gray-500">{orderData?.vendor.names} </span> </h1>
                                                <h1 className="my-2">Email: <span className="text-gray-500">{orderData?.vendor.contact_email} </span> </h1>
                                                <h1 className="my-2">Phone: <span className="text-gray-500">{orderData?.vendor.contact_phone} </span> </h1>
                                                <h1 className="my-2">Type: <span className="text-gray-500">{orderData?.vendor.type} </span> </h1>
                                                <h1 className="my-2">Address <span className="text-gray-500">{orderData?.vendor.address} </span> </h1>

                                            </div>

                                        </div>

                                    </div>
                                }

                            </section>
                        }
                        {activeTab === 'order' &&
                            <section className="my-5 w-full">

                            </section>
                        }

                        {activeTab === 'actions' &&
                            <section className="my-5 ">
                                {/* orders */}
                                <div className="bg-lightGray p-5">
                                    <h1 className="text-gray-500">Actions</h1>
                                    <br />
                                    <Actions index={0} id={orderData?.id} status={orderData?.status} ServiceClass={'OrderService'} path="/orders" url="orders" />

                                </div>

                            </section>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}