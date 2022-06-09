import { useState, useEffect } from "react"
import { UnorderedListOutlined } from "@ant-design/icons";
import Table from "../tables/Table";
import RedirectButton from "../button/RedirectButton";
import { VendorService } from "../../../pages/api/services/VendorService";

/* eslint-disable @next/next/no-img-element */
export default function ViewVendor(props: any): JSX.Element {
    const [activeTab, setActiveTab] = useState<string>('personal')
    const [vendor, setVendor] = useState<any>({})
    async function getOneVendor(id: String) {
        const service = new VendorService()
        service.getOne(id)
        .then(res=> {
            setVendor(res.data)
            console.log(vendor)
         }).catch(err=> {
             console.log(err)
         })
    }

    useEffect(()=> {
        getOneVendor(props.id)
    })
    const user = {
        image: '/user.png',
        names: "Gasaro Leila",
        role: "Secretary",
        phone: 788439834,
        organisation: "SOPYRWA",
        gender: 'Male',
        nationalID: '199941023984329'
    }
    const checkoutColumns = ['Asset name','Serial number','Checkout date','Status']
    const checkinColumns = ['Asset name','Serial number','Checkin date','Status']

    const checkoutRows:any = [
        {
            serialNumber:'PC-2332',
            assetName:'Dell PC',
            checkoutDate:'June,12th,2021',
            status:'Damaged'

        },
        {
            serialNumber:'PC-2332',
            assetName:'Dell PC',
            checkoutDate:'June,12th,2021',
            status:'Damaged'
        }
    ] 
    const checkinRows:any = [
        {
            serialNumber:'PC-2332',
            assetName:'Dell PC',
            checkinDate:'June,12th,2021',
            status:'Damaged'
        },
        {
            serialNumber:'PC-2332',
            assetName:'Dell PC',
            checkinDate:'June,12th,2021',
            status:'Damaged'
        }
    ]
    let actions = {service:'VendorService',redirect:'/vendors'}
   
    return (
        <div className="flex text-sm">
            <div className="bg-white rounded w-full p-5 md:p-10">
            
              <RedirectButton
              url="/users"
              icon = {  <UnorderedListOutlined className="mr-2"/>}
              title = 'List'
              float = 'float-right'

              />

                <section className="flex justify-center w-full">
                    <div className="md:px-5 md:py-10">
                        <div className="w-full flex justify-center">

                            <img src={user.image} alt="" className="md-img rounded-full" />
                        </div>

                        <div className="text-center my-5">
                            <h1 className="">{vendor.names}</h1>
                            <h2 className="text-gray-400">Supplier</h2>
                        </div>
                    </div>

                </section>
                <div className="flex w-full justify-center mb-5">
                    {/* tabs */}
                    <div className="w-full md:w-2/3">
                           <div className="overflow-x-auto">
                            <div className='flex gap-5 items-center cursor-pointer font-bold w-max md:w-full'>
                                <div className={`${activeTab === 'personal' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('personal'); }}>Personal</div>
                                <div className={`${activeTab === 'company' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('company'); }}>Company issues</div>
                                
                            </div>
                           

                        </div>
                        <hr />
                        {/* tabs ends here */}

                        {/* personal info */}
                        {activeTab === 'personal' &&
                            <section className="my-5">
                                <div>
                                    <h1 className="my-2">Phone number: <span className="text-gray-500">{vendor.contact_phone}</span> </h1>
                                    <h1 className="my-2">Email: <span className="text-gray-500">{vendor.contact_email}</span> </h1>
                                    <h1 className="my-2">Address: <span className="text-gray-500">{vendor.address}</span> </h1>
                                    <h1 className="my-2">Type: <span className="text-gray-500">{vendor.type}</span> </h1>
                                    <h1 className="my-2">Status: <span className="text-gray-500">{vendor.status}</span> </h1>
                                </div>

                            </section>
                        }
                        {activeTab === 'company' &&
                        <section className="my-5 ">
                            {/* checkouts */}
                            <div className="bg-lightGray p-5">
                                <h1 className="text-gray-500">Checkouts</h1>

                                <Table
                                 cols= {checkoutColumns}
                                 rows = {checkoutRows}
                                 btnTitle=""
                                 addPath=""
                                 searchPlaceholder=""
                                 hasActions={false}
                                 action={actions}
                                 hasHeader={false}
                                />
                            </div>

                            {/* checkins */}
                            <div className="my-5 bg-lightGray p-5">
                                <h1 className="text-gray-500">Checkins</h1>

                                <Table
                                 cols= {checkinColumns}
                                 rows = {checkinRows}
                                 btnTitle=""
                                 addPath=""
                                 searchPlaceholder=""
                                 hasActions={false}
                                 action={actions}
                                 hasHeader={false}
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