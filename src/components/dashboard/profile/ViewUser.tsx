import { useEffect, useState } from "react"
import { UnorderedListOutlined } from "@ant-design/icons";
import Table from "../tables/Table";
import RedirectButton from "../button/RedirectButton";
import { UserService } from "../../../pages/api/services/UserService";
import {useRouter} from "next/router";
import { OrganisationUser } from "../../../types/types";
import Skeleton from 'react-loading-skeleton'
import Pagination from "../../../components/dashboard/tables/Pagination";
import { checkLocalStorage } from "../../../util/checkLocalStorage";
import { CheckoutService } from "../../../pages/api/services/CheckoutService";
import { EService } from "../../../types/enums";
import { CheckinService } from "../../../pages/api/services/CheckinService";

/* eslint-disable @next/next/no-img-element */
export default function ViewUser(props: any): JSX.Element {
    const [activeTab, setActiveTab] = useState<string>('personal')
    const [userDataLoader, setUserDataLoader] = useState<boolean>(true)
    const user = {
        image: '/user.png',
    }

    const checkoutColumns = ['Names', 'Organisation','Asset','Checkout Date','Status']
    const checkinColumns = ['Asset name', 'Serial number', 'Checkin date', 'Status']


    let [userInfo, setuserInfo] = useState<OrganisationUser>();
    const user_id = (String)(useRouter().query.q)
    useEffect(() => {
        const loaduserInfo = async () => {
            const userService = new UserService()
            try {
                const response = await userService.getUser(user_id,'organisation')
                setuserInfo(response.data)
                setUserDataLoader(false)
            } catch (error: any) {
                console.log(error)
            }

        }
        loaduserInfo()
    }, [userInfo, user_id, userDataLoader])
    
    let [checkoutData,setcheckoutData] = useState<any>();
    let [checkinData,setcheckinData] = useState<any>();
    let pageInfo: any = checkLocalStorage('pageInfo')
    useEffect(() => {
        const loadData = async () => {
            const checkoutService = new CheckoutService()
            const checkinService = new CheckinService()
            try{
            let response
            if (pageInfo.service === EService.CHECKOUTS) {
                response = await checkoutService.getByOrganisationUser(user_id,parseInt(pageInfo.page), parseInt(pageInfo.rows))

            } else {
                response = await checkoutService.getByOrganisationUser(user_id,1, 5)
            }
            setcheckoutData(response.data)
          }catch (error) {
            console.log('Error occured: ',error)
         }
         try{
            let response
            if (pageInfo.service === EService.CHECKINS) {
                response = await checkinService.getByOrganisationUser(user_id,parseInt(pageInfo.page), parseInt(pageInfo.rows))

            } else {
                response = await checkinService.getByOrganisationUser(user_id,1, 5)
            }
            setcheckinData(response.data)
          }catch (error) {
            console.log('Error occured: ',error)
         }
          }
          loadData()
        }, [user_id,checkoutData, pageInfo.service, pageInfo.page, pageInfo.rows])
    
    
    
        let actions = {service:'CheckoutService',redirect:'/checkouts'}

    return (
        <div className="flex text-sm">
            <div className="bg-white rounded w-full p-5 md:p-10">

                <RedirectButton
                    url="/users"
                    icon={<UnorderedListOutlined className="mr-2" />}
                    title='List'
                    float='float-right'

                />

                <section className="flex justify-center w-full">
                    <div className="md:px-5 md:py-10 md:w-1/3">
                        <div className="w-full flex justify-center">

                            <img src={user.image} alt="" className="md-img rounded-full" />
                        </div>


                        {userDataLoader ?
                            <div className="text-center my-5">
                                <h1 className="">   <Skeleton width={'80%'} height={20} /></h1>
                                <h2 className="grid grid-cols-2 gap-2">   <Skeleton width={'100%'} height={20} /><Skeleton width={'100%'} height={20} /> </h2>
                            </div>

                            :
                            <div className="text-center my-5">
                                <h1 className="">{userInfo?.user?.first_name + ' ' + userInfo?.user?.last_name}</h1>
                                <h2 className="text-gray-400">{userInfo?.role + ', ' + userInfo?.organisation?.name}</h2>
                            </div>
                        }

                    </div>

                </section>
                <div className="flex w-full justify-center mb-5">
                    {/* tabs */}
                    <div className="w-full md:w-full">
                           <div className="overflow-x-auto">
                            <div className='flex gap-5 items-center cursor-pointer font-bold w-max md:w-full'>
                                <div className={`${activeTab === 'personal' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('personal'); }}>Personal Information</div>
                                <div className={`${activeTab === 'checkouts' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('checkouts'); }}>Checkouts</div>
                                <div className={`${activeTab === 'checkins' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('checkins'); }}>Checkins</div>

                            </div>


                        </div>
                        <hr />
                        {/* tabs ends here */}

                        {/* personal info */}
                        {activeTab === 'personal' &&
                            <section className="my-5">
                                {userDataLoader ?
                                    <div>
                                        <h1 className="my-1 grid grid-cols-2 gap-2"> <Skeleton width={'50%'} height={20} /></h1>
                                        <h1 className="my-1 grid grid-cols-2 gap-2"> <Skeleton width={'40%'} height={20} /></h1>
                                        <h1 className="my-1 grid grid-cols-2 gap-2"> <Skeleton width={'60%'} height={20} /></h1>
                                        <h1 className="my-1 grid grid-cols-2 gap-2"> <Skeleton width={'70%'} height={20} /></h1>                        
                                                 </div>

                                    :
                                    <div>
                                        <h1 className="my-2">Gender: <span className="text-gray-500">{userInfo?.user?.gender}</span> </h1>
                                        <h1 className="my-2">Phone number: <span className="text-gray-500">{userInfo?.user?.phone}</span> </h1>
                                        <h1 className="my-2">National ID: <span className="text-gray-500">{userInfo?.user?.national_id}</span> </h1>
                                        <h1 className="my-2">Address: <span className="text-gray-500">{userInfo?.user?.address}</span> </h1>
                                    </div>
                                }

                            </section>
                        }
                        {activeTab === 'checkouts' &&
                            <section className="my-5 ">
                                {/* checkouts */}
                                <div className="bg-lightGray p-5">
                                    <h1 className="text-gray-500">Checkouts</h1>

                                    <Table
                                        cols={checkoutColumns}
                                        rows={checkoutData?.data}
                                        btnTitle=""
                                        addPath="/checkouts"
                                        searchPlaceholder=""
                                        hasActions={true}
                                        action={actions}
                                        hasHeader={false}
                                    />
                                          <Pagination
                                            pages={checkoutData?.links}
                                            service= {EService.CHECKOUTS}
                                        />
                                </div>

                            </section>
                        }
                           {activeTab === 'checkins' &&
                            <section className="my-5 ">
                                {/* checkouts */}
                                <div className="bg-lightGray p-5">
                                    <h1 className="text-gray-500">Checkins</h1>

                                    <Table
                                        cols={checkinColumns}
                                        rows={checkinData?.data}
                                        btnTitle=""
                                        addPath="/checkins"
                                        searchPlaceholder=""
                                        hasActions={true}
                                        action={actions}
                                        hasHeader={false}
                                    />
                                      <Pagination
                                            pages={checkoutData?.links}
                                            service= {EService.CHECKOUTS}
                                        />
                                </div>

                            </section>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}