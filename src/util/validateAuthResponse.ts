export function validateAuth(response:string):boolean{
    if(response === 'Request failed with status code 401'
    || response === 'Request failed with status code 404'
    ){
        return false
    } return true
}