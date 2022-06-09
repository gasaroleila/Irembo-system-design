import { useState } from "react";
import { OrganisationService } from "../../../pages/api/services/OrganizationService";
import { DeleteModalProps } from "../../../types/types";

export default function DeleteModal(props:DeleteModalProps):JSX.Element {

    function closeModal(){
        localStorage.removeItem('deleteModal')
    }

   async function deleteItem(id:string, service:string,path:string){
        let queryService
        let response
       if(service === 'OrganisationService'){
           queryService = new OrganisationService()
           response = await queryService.delete(id)
           console.log(response.message)

       }
    }

    return(
        <div className="w-full  flex justify-center">
            <div className="bg-white p-5 m-3 rounded modal-content md:w-1/2 lg:w-1/3 lg:h-1/2">
                <p className="p-5 text-center">Confirm the operation of deletion id: {props.id}</p> 
                <br />
                <div className="p-5">
                    <div className="grid grid-cols-2 gap-10">
                        <button className="bg-lightGray p-3 rounded" onClick={() =>{closeModal()}}>Cancel</button>
                        <button className="bg-red-500 p-3 rounded text-white hover:opacity-50" onClick={() =>{deleteItem(props.id,props.ServiceClass,props.path)}}>Delete</button>
                    </div>
                </div>
            </div>

        </div>
    )
}