// endpoints
export enum EbackendEndpoints{

    // organisation user

    GET_ONE_ORGANISATION_USER = '/organisation-users/user/',
 
    // statistics

    GET_HIGH_LEVEL_REPORT = "/statistics/general-stats",
    GET_ORGANISATION_STATISTICS = '/statistics/organisation/',



    // notifications

    MARK_NOTIFICATION_READ = '/notifications/'
    
}

export enum EhttpMethod{
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT'
}

export enum Gender{
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export enum MaritialStatus {
    SINGLE = "SINGLE",
    MARRIED = "MARRIED",
    DIVORCED = "DIVORCED",
    WIDOWED = "WIDOWED"

}
export enum EService{
    USERS = 'USERS',
    ORGANISATIONS = 'ORGANISATIONS',
    VENDORS = 'VENDORS',
    ORDERS = 'ORDERS',
    ASSET_TYPES = 'ASSET_TYPES',
    REPORTS = 'REPORTS',
    CHECKOUTS = 'CHECKOUTS',
    CHECKINS = 'CHECKINS',
    TRANSFERS = 'TRANSFERS',
}
export enum ERole{
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    CEO = 'CEO',
    EMPLOYEE = 'EMPLOYEE',
}


export enum EStatus{
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    DELIVERED= 'DELIVERED',
    CANCELLED= "CANCELLED",
    COMPLETED= 'COMPLETED',
}
