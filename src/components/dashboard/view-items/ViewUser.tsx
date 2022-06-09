import { useState, useEffect } from "react"
import { UnorderedListOutlined } from "@ant-design/icons";
import Table from "../tables/Table";
import RedirectButton from "../button/RedirectButton";
import { OrderService } from "../../../pages/api/services/OrderService";
import { UserService } from "../../../pages/api/services/UserService";

/* eslint-disable @next/next/no-img-element */
export default function ViewUser(props: any): JSX.Element {
    const [activeTab, setActiveTab] = useState<string>('userDetails')
    const [user, setUser] = useState<any>({})
    const [orderData,setOrderData] = useState<any>();
    async function getOneUser(id: string) {
        const service = new UserService()
        service.getUser(id,'organisation')
         .then(res=> {
             setUser(res.data[0])
            //  console.log(user)
         }).catch(err=> {
             console.log(err)
         })
    }
    useEffect(() => {
        getOneUser(props.id)
        const loadData = async () => {
            const orderService = new OrderService()
            try{
            const response = await orderService.getAll(1,30)
            setOrderData(response.data.data)
          }catch (error) {
            console.log('Error occured: ',error)
         }
         
          }
          loadData()
    }) 

    let orderActions = {service:'OrderService',redirect:'/orders'}


    const userdata = {
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
    const transferColumns = ['Source Author','Source Organization','Destination author','Destination organization','Transfer date','Received date','Status']
    const orderColumns = ['Order code','Supplier names','Quantity','Amount', 'Order date', 'Delivery date','Organization','Status']

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

    const transferRows:any = [
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
         }
    ]

    const orderRows:any = [
        {
            id:'22121-fqwe23',
            orderCode:'8943TB',
            supplierNames:"Gersh Lento",
            organization:"POSITIVO BGH",
            orderDate:'June,12th,2021',
            deliveryDate:'June,12th,2021',
            quantity:120,
            amount:1200000,
            status:'pending'         
        },
         {
            id:'55121-fqwe23',
            orderCode:'12943B',
            supplierNames:"Gersh Lento",
            organization:"POSITIVO BGH",
            orderDate:'June,12th,2021',
            deliveryDate:'June,12th,2021',
            quantity:120,
            amount:1200000,
            status:'delivered'
         }
    ]

    let transferActions = {service:'TransferService',redirect:'/transfers'}
    let checkinActions = {service:'CheckinService',redirect:'/checkins'}
    let checkoutActions = {service:'CheckoutService',redirect:'/checkouts'}

    return (
        <div className="flex text-sm">
            <div className="bg-white rounded w-full mx-auto p-5 md:p-10">
            
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

                        <div className="text-center">
                            <h1 className="">{user.names}</h1>
                            <h2 className="text-gray-400">{user.role + ', ' + user.organisation}</h2>
                        </div>
                    </div>

                </section>
                <div className="w-full mb-5">
                    {/* tabs */}
                    <div className="lg:w-full md:w-2/3">
                       <div className="overflow-x-auto">
                            <div className='flex gap-5 items-center cursor-pointer font-bold w-max md:w-full'>
                                <div className={`${activeTab === 'userDetails' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('userDetails'); }}>Details</div>
                                <div className={`${activeTab === 'checkins' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('checkins'); }}>Checkins</div>
                                <div className={`${activeTab === 'checkouts' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('checkouts'); }}>Checkouts</div>
                                <div className={`${activeTab === 'transfers' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('transfers'); }}>Transfers</div>
                                <div className={`${activeTab === 'orders' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('orders'); }}>Orders</div>
                                <div className={`${activeTab === 'maintenance' && 'py-2 header--tab-active'}`} onClick={() => { setActiveTab('maintenance'); }}>Maintanance</div>
                            </div>
                           

                        </div>
                        <hr />
                        {/* tabs ends here */}

                        {/* personal info */}
                        {activeTab === 'userDetails' &&
                            <section className="my-5">
                                <div>
                                    <h1 className="my-2">User names: <span className="text-gray-500">{`${user.first_name + user.last_name}`}</span> </h1>
                                    <h1 className="my-2">Organisation: <span className="text-gray-500">{userdata.organisation}</span> </h1>
                                    <h1 className="my-2">Role: <span className="text-gray-500">{userdata.role}</span> </h1>
                                    <h1 className="my-2">Phone: <span className="text-gray-500">{user.phone}</span> </h1>
                                    <h1 className="my-2">Address: <span className="text-gray-500">{user.address}</span> </h1>
                                    <h1 className="my-2">Gender: <span className="text-gray-500">{user.gender}</span> </h1>
                                    <h1 className="my-2">National ID: <span className="text-gray-500">{user.national_id}</span> </h1>

                                </div>

                            </section>
                        }
                        {activeTab === 'checkouts' &&
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
                                 action={checkoutActions}
                                 hasHeader={false}
                                />
                            </div>
                            </section>
                        }

                        {activeTab === 'checkins' &&
                            <section className="my-5 ">
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
                                 action={checkinActions}
                                 hasHeader={false}
                                />
                            </div>
                            </section>
                           }

                            {activeTab === 'transfers' &&
                            <section className="my-5 ">
                            {/* transfers */}
                            <div className="bg-lightGray p-5">
                                <h1 className="text-gray-500">Transfers</h1>

                                <Table
                                 cols= {transferColumns}
                                 rows = {transferRows}
                                 btnTitle=""
                                 addPath=""
                                 searchPlaceholder=""
                                 hasActions={false}
                                 action={transferActions}
                                 hasHeader={false}
                                />
                            </div>
                            </section>
                        }

                         {activeTab === 'orders' &&
                             <section className="my-5 ">
                            {/* orders */}
                            <div className="bg-lightGray p-5">
                                <h1 className="text-gray-500">Orders</h1>

                                <Table
                                 cols= {orderColumns}
                                 rows = {orderData}
                                 btnTitle=""
                                 addPath=""
                                 searchPlaceholder=""
                                 hasActions={false}
                                 action={orderActions}
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