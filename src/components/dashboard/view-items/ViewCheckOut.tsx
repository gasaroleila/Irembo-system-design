import React, { useState, useEffect } from "react"
import { UnorderedListOutlined } from "@ant-design/icons";
import RedirectButton from "../button/RedirectButton";
import { CheckoutService } from "../../../pages/api/services/CheckoutService";
import Skeleton from 'react-loading-skeleton'
import { checkStatus } from "../../../util/checkStatus";
import Actions from "../cards/Actions";

/* eslint-disable @next/next/no-img-element */
export default function ViewCheckOut(props: any): JSX.Element {
    const [activeTab, setActiveTab] = useState<string>('checkoutDetails')
    const [checkout, setCheckout] = useState<any>({})
    const [checkoutDataLoader, setCheckoutsDataLoader] = useState<boolean>(true);


    useEffect(() => {
        const loaduserInfo = async () => {
            const checkoutService = new CheckoutService()
            try {
                const response = await checkoutService.getOne(props.id)
                setCheckout(response.data)
                setCheckoutsDataLoader(false)
            } catch (error: any) {
                console.log(error)
            }

        }
        loaduserInfo()
    }, [props.id])



    return (
        <div className="flex text-sm">
            <div className="bg-white rounded w-full mx-auto p-5 md:p-10">

                <RedirectButton
                    url="/checkouts"
                    icon={<UnorderedListOutlined className="mr-2" />}
                    title='List'
                    float='float-right'

                />

                <section className="flex justify-center w-full">
                    <div className="md:px-5 md:py-10">
                        <div className="w-full flex justify-center">
                            <h1 className="w-full  text-primary text-2xl">CHECKOUT{!checkoutDataLoader && ''}</h1>
                        </div>
                    </div>
s
                </section>
                <div className="w-full mb-5">
                    {/* tabs */}
                    <div className="w-full">
                        <div className="overflow-x-auto">
                            <div className='flex gap-5 items-center cursor-pointer font-bold w-max md:w-full'>
                                <div className={`${activeTab === 'checkoutDetails' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('checkoutDetails'); }}>Checkout Details</div>
                                <div className={`${activeTab === 'actions' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('actions'); }}>Actions</div>

                            </div>


                        </div>
                        <hr />
                        {/* tabs ends here */}

                        {/* personal info */}
                        {activeTab === 'checkoutDetails' &&
                            <section className="my-5">
                                <div>
                                    <h1 className="my-2">Employee Names: <span className="text-gray-500">{`${checkout.organisation_user?.user.first_name }`+ ' ' +`${checkout.organisation_user?.user.last_name}`}</span></h1>
                                    <h1 className="my-2">Organization: <span className="text-gray-500">{checkout.organisation_user?.organisation?.name}</span> </h1>
                                    <h1 className="my-2">Checkout Date: <span className="text-gray-500">{checkout.checkout_date}</span> </h1>
                                    <h1 className="my-2">Status: <span className="text-gray-500">{checkout.status}</span> </h1>
                                    <h1 className="my-2 w-1/2">Comment: <span className="text-gray-500">{checkout.comment}</span> </h1>
                                {checkoutDataLoader ?
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
                                        <hr />
                                        <div className="my-5">

                                            <h1 className="my-1 "> <Skeleton width={'25%'} height={20} /></h1>
                                            <h1 className="my-1 ml-5 "> <Skeleton width={'15%'} height={20} /></h1>
                                        </div>
                                    </div>

                                    :
                                    <div>

                                        <div className="my-5">
                                            <h1 className="my-2 font-bold"> Employee Info.</h1>
                                            <div className="ml-5">
                                                <h1 className="my-2">Names: <span className="text-gray-500">{checkout?.organisation_user.user.first_name + ' ' + checkout?.organisation_user.user.last_name}</span> </h1>
                                                <h1 className="my-2">Organisation: <span className="text-gray-500">{checkout?.organisation_user.organisation.name}</span> </h1>
                                                <h1 className="my-2">Status: <span className={`px-3 py-1 rounded-full text-xs font-bold ${checkStatus(checkout?.status) ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} `}>{checkout?.status}</span> </h1>

                                                <h1 className="my-2">Comment: <span className="text-gray-500">{checkout?.comment}</span> </h1>
                                            </div>
                                        </div>
                                        <hr />

                                        {/* Organisation */}
                                        <div className="my-5">
                                            <h1 className="my-2 font-bold"> Asset</h1>
                                            <div className="ml-5">
                                                <h1 className="my-2">Name: <span className="text-gray-500">{checkout?.asset.name} </span> </h1>
                                                <h1 className="my-2">Tag: <span className="text-gray-500">{checkout?.asset.tag} </span> </h1>
                                                <h1 className="my-2">S/N: <span className="text-gray-500">{checkout?.asset.serial_number} </span> </h1>
                                            </div>

                                        </div>
                                        <hr />
                                        {/* vendor */}
                                        <div className="my-5">
                                            <h1 className="my-2 font-bold"> Assigned by: </h1>
                                            <div className="ml-5">
                                                <h1 className="my-2">Names: <span className="text-gray-500">{checkout?.created_by.first_name + ' ' + checkout?.created_by.last_name}</span> </h1>
                                                <h1 className="my-2">Done on: <span className="text-gray-500">{checkout?.checkout_date}</span> </h1>




                                            </div>

                                        </div>


                                    </div>
                                }
                              </div>
                            </section>
                        }

                        {activeTab === 'checkouts' &&
                            <section className="my-5 ">
                                {/* checkouts */}
                                <div className="bg-lightGray p-5">
                                    <h1 className="text-gray-500">Checkouts</h1>


                                </div>
                            </section>
                        }

                        {activeTab === 'checkins' &&
                            <section className="my-5 ">
                                {/* checkins */}
                                <div className="my-5 bg-lightGray p-5">
                                    <h1 className="text-gray-500">Checkins</h1>


                                </div>
                            </section>
                        }


                        {activeTab === 'orders' &&
                            <section className="my-5 ">
                                {/* orders */}
                                <div className="bg-lightGray p-5">
                                    <h1 className="text-gray-500">Orders</h1>


                                </div>

                            </section>
                        }

                        {activeTab === 'actions' &&
                            <section className="my-5 ">
                                {/* orders */}
                                <div className="bg-lightGray p-5">
                                    <h1 className="text-gray-500">Actions</h1>
                                    <br />
                                    <Actions index={0} id={checkout?.id} status={checkout?.status} ServiceClass={'CheckoutService'} path="/checkouts" url="checkouts" />

                                </div>

                            </section>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}