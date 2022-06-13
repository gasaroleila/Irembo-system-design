import axios from 'axios';
import { checkLocalStorage } from '../../../util/checkLocalStorage';
import { OtherUserInfo, User, UserAuth, userForgotPassword, userLogin, UserRegisterData, userResetPassword, UserVerifyAccount } from '../../../types/types';
export class UserService{

    private token:string =  checkLocalStorage('access_token')
    UserService(){

    }

    async sendLoginLink(body:UserAuth){
        let response = await axios.post(`https://irembo-system-design-backend.herokuapp.com/sendLoginLink`,body)
        return response.data
    }

    async login(code:any, userId: any){
        let response = await axios.post(`https://irembo-system-design-backend.herokuapp.com/login/${userId}/${code}`)
        return response.data
    }

    async register(body: any) {
        console.log('there')
        let response = await axios.post("https://irembo-system-design-backend.herokuapp.com/register",body)
        return response.data
    }

    async verifyEmail(body: UserVerifyAccount) {
        console.log('there')
        let response = await axios.patch("https://irembo-system-design-backend.herokuapp.com/verifyEmail",body)
        return response.data
    }

    async sendResetLink(body:userForgotPassword){
        let response = await axios.post(`https://irembo-system-design-backend.herokuapp.com/forgotPassword/sendResetLink`,body)
        return response.data
    }

    async checkResetLink(code:any, userId:any){
        let response = await axios.post(`https://irembo-system-design-backend.herokuapp.com/forgotPassword/checkResetLink/${userId}/${code}`)
        return response
    }

    async resetPassword(body: userResetPassword, userId: any){
        let response = await axios.patch(`https://irembo-system-design-backend.herokuapp.com/resetPassword/${userId}`,body)
        return response.data
    }

    async addOtherInfo(body:any, userId:String){
        let response = await axios.patch(`https://irembo-system-design-backend.herokuapp.com/updateInfo/${userId}`,body,
        {
            headers:{
                Authorization: `Bearer ${this.token}`
            }
        })
        return response.data
    }

    async verifyAccount(userId:String){
        let response = await axios.patch(`https://irembo-system-design-backend.herokuapp.com/verifyAccount/${userId}`,
        {
            headers:{
                Authorization: `Bearer ${this.token}`
            }
        })
        return response.data
    }

    async checkCanReset(userId: any) {
        
        let response =  await axios.get(`https://irembo-system-design-backend.herokuapp.com/checkCanReset/${userId}`);
        return response.data
    }

    async getUser(userId: any) {
        try {
            let response = await axios.get(`https://irembo-system-design-backend.herokuapp.com/user/profile/${userId}`);
            return response.data
        } catch (err) {
            console.log("errrr",err)
        }
    }
   

}