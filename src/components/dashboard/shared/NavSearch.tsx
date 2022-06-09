import { useRouter } from 'next/router'
import React, { useState, useEffect, useContext } from 'react'
import { functionalities } from "../../../util/functionalities"
import {
    SearchOutlined, CloseOutlined
} from '@ant-design/icons'
import { NavSearchTypes } from "../../../types/types"
import { UserContext } from '../authentication/ContextProvider'
export default function NavSearch(): JSX.Element {
    const router = useRouter()
    const { user }: any = useContext(UserContext)
    const [searchBlock, handleSearchBlock] = useState<Boolean>(false)
    const [search, setSearch] = useState<string>('')
    const [foundModules, setFoundModules] = useState<any>()

    useEffect(() => {

        const searchModules = (searchedText: string) => {

            let searchedModule = new RegExp(searchedText, 'i')

            let module = functionalities.filter((el) =>
                el.name.match(searchedModule) || el.description.match(searchedModule) || el.dataSet.match(searchedModule)
            )

            setFoundModules(module)

        }
        searchModules(search)

    }, [search])
    return (
        <>
            <form action="" className="px-5">
                <div className="form-group flex items-center border px-3 py-2 gap-3 rounded-full">
                    <SearchOutlined className="text-gray-500" />
                    <input type="text" name="" id="" className="form-control focus:outline-none w-full text-xs"
                        placeholder="Search dashboard ... "
                        value={search}
                        onChange={(el) => { setSearch(el.target.value); handleSearchBlock(true) }}
                    />


                </div>
            </form>

            {/* search block */}
            {searchBlock && search &&
                <div className="bg-white shadow p-5 absolute rounded mr-2 w-1/2 mt-1">
                    <div className="grid grid-cols-2 w-full">

                        <span className="text-xs text-gray-500 p-3">{foundModules.length === 0 ? 'Service not found' : 'Results'}</span>
                        <div className="flex justify-end items-center">
                            <span className="hover:bg-gray-50 rounded-full sm-img cursor-pointer flex items-center justify-center"
                                onClick={() => { handleSearchBlock(false) }}
                            >
                                <CloseOutlined className="font-bold text-gray-500 text-xs " />
                            </span>
                        </div>
                    </div>
                    <div className=" max-h-96 overflow-y-auto">


                        {foundModules?.map((module: NavSearchTypes, i: number) => {
                            if(module.access.includes(user?.role)){
                            return (
                                <div key={i} className="hover:bg-blue-50 px-3 py-2 cursor-pointer"
                                    onClick={() => { router.push(module.path) }}
                                >
                                    <h1 className="flex gap-1 text-gray-600"> 
                                    {/* <FileOutlined className="text-xs text-primary" /> */}
                                     {module.name}</h1>
                                    <p className="text-gray-400 text-xs">{module.description}</p>
                                </div>
                            )
                            }
                        })}
                    </div>
                </div>
            }
        </>
    )
}