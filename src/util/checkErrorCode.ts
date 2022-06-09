export function checkErrorCode(error:string){
    let errorCode:number = parseInt(error.split(' ')[5])
    let message:string=''
    if(errorCode === 404){
        message = "User acccount no longer around to access the services"
    }

    else if(errorCode === 401){
        message = "User acccount not authorized to access services"
    }

    return message;
}