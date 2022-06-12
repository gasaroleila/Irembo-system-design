import axios from 'axios';
import { checkLocalStorage } from '../../../util/checkLocalStorage';
import { OtherUserInfo, User, UserAuth, userForgotPassword, userLogin, UserRegisterData, userResetPassword, UserVerifyAccount } from '../../../types/types';
export class UserService{

    private token:string =  checkLocalStorage('access_token')
    UserService(){

    }

    async sendLoginLink(body:UserAuth){
        let response = await axios.post(`http://localhost:4000/sendLoginLink`,body)
        return response.data
    }

    async login(code:any, userId: any){
        let response = await axios.post(`http://localhost:4000/login/${userId}/${code}`)
        return response.data
    }

    async register(body: any) {
        console.log('there')
        let response = await axios.post("http://localhost:4000/register",body)
        return response.data
    }

    async verifyEmail(body: UserVerifyAccount) {
        console.log('there')
        let response = await axios.patch("http://localhost:4000/verifyEmail",body)
        return response.data
    }

    async sendResetLink(body:userForgotPassword){
        let response = await axios.post(`http://localhost:4000/forgotPassword/sendResetLink`,body)
        return response.data
    }

    async checkResetLink(code:any, userId:any){
        let response = await axios.post(`http://localhost:4000/forgotPassword/checkResetLink/${userId}/${code}`)
        return response
    }

    async resetPassword(body: userResetPassword, userId: any){
        let response = await axios.patch(`http://localhost:4000/resetPassword/${userId}`,body)
        return response.data
    }

    async addOtherInfo(body:any, userId:String){
        let response = await axios.patch(`http://localhost:4000/updateInfo/${userId}`,body,
        {
            headers:{
                Authorization: `Bearer ${this.token}`
            }
        })
        return response.data
    }

    async verifyAccount(userId:String){
        let response = await axios.patch(`http://localhost:4000/verifyAccount/${userId}`,
        {
            headers:{
                Authorization: `Bearer ${this.token}`
            }
        })
        return response.data
    }

    async getLoggedInUser(){
        let response =  await axios.get(`${process.env.BACKEND_URL}/`,{
            headers:{
                Authorization: `Bearer ${this.token}`
            }
        });
        return response.data
    }

    async getUser(id:string,service:string){
        let response
        if(service === 'organisation'){
           response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/organisation-users/${id}`,{
                headers:{
                    Authorization: `Bearer ${this.token}`
                }
            });
        }else{
            response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/organisation-users/user/${id}`,{
                headers:{
                    Authorization: `Bearer ${this.token}`
                }
            });
        }
            
            return response.data
    }
    async getAll(page:number,size:number){
            let response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/organisation-users/paginated?page=${page}&size=${size}`,{
                headers:{
                    Authorization: `Bearer ${this.token}`
                }
        })
        return response.data
        
    }

    async getByStatus(status:any,page:number,size:number){
        let response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/organisation-users/status/${status}/paginated?page=${page}&size=${size}`,{
            headers:{
                Authorization: `Bearer ${this.token}`
            }
    })
    return response.data
    
    }
    
    async getByOrganisation(id:any){
        let response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/organisation-users/organisation/${id}`,{
            headers:{
                Authorization: `Bearer ${this.token}`
            }
    })
    return response.data
    
   }

   async updatePassword(userId:any, body:any){
        let response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${userId}/change-password`,body,{
            headers:{
                Authorization: `Bearer ${this.token}`
            }
    })
      return response.data

    }

    async delete(id:string){
        let response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${id}`,{
            headers:{
                Authorization: `Bearer ${this.token}`
            }
    })
        return response.data
    }
    async create(body:User){
        console.log('userrr', body)
        let response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/organisation-users`,body,{
            headers:{
                Authorization: `Bearer ${this.token}`
            }
    })
        return response.data
    }

    async update(id:String,body:User){
        let response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/organisation-users/${id}`,body,
        {
            headers:{
                Authorization: `Bearer ${this.token}`
            }
        })
        return response.data
    }

    async updateProfile(body:User, id:String){
        let response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${id}`,body,
        {
            headers:{
                Authorization: `Bearer ${this.token}`
            }
        })
        return response.data
    }

    

    async updateStatus(id:String,status:String){ 
        let response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/organisation-users/${id}/status/${status}`, {},{
            headers:{
                Authorization: `Bearer ${this.token}`
            }
        })
        return response.data
    }
    async uploadSignature(id:string,body:any){
        let response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/organisation-users/${id}/upload-signature`,body,{
            headers:{
                Authorization: `Bearer ${this.token}`
            }
    })
        return response.data
    }

}