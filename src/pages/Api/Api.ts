import axios from 'axios';
import { EbackendEndpoints, EhttpMethod } from '../../types/enums';
import { checkLocalStorage } from '../../util/checkLocalStorage';
export class Api{

    private token = checkLocalStorage('access_token')
    public async connect(
        endpoint:EbackendEndpoints | string,
        method:EhttpMethod,
        body?:any
    ): Promise<any>{
        const url = 'https://irembo-system-design-backend.herokuapp.com/'+endpoint;
        const content_type = endpoint.includes("upload")?'multipart/form-data':'application/json'
        const headers =  {
            'Content-Type': content_type,
            Accept: 'application/json',
            Authorization: 'Bearer '+this.token,
   
        }
        try{
            const request = await axios({
                url,
                method,
                headers,
                data:body
            })

            if(request.status.toString().startsWith('4') || request.status.toString().startsWith('5')){
                // console.error(` error returned by the API: ${request.statusText}`)
                return({status:false,message:request.statusText})
                // throw new Error(request.statusText)
            }
            return request.data

        }catch(e:any) {
            // console.log(`There was an error connecting to the API: ${e.message}`)
            return { status: false, message: e.message?e.message:e.response.data.message };
        }
    }
}
export const UseApi = new Api()
