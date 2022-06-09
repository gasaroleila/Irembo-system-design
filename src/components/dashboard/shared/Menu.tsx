import {
    BarChartOutlined,
    TeamOutlined,
    ShopOutlined,
    LaptopOutlined,
    ToolOutlined,
    ShoppingOutlined,
    SendOutlined,
    ApartmentOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
    ShareAltOutlined,
    FileOutlined,
    SettingOutlined,
    LogoutOutlined,
    DeploymentUnitOutlined
}

    from '@ant-design/icons'
    import ActiveLink from "./ActiveLink";

import ActiveSpanLink from "./ActiveSpanLink";
import { Logout } from '../authentication/Logout';
import { ERole } from '../../../types/enums';
import { UserContext } from '../authentication/ContextProvider';
import { useContext } from 'react';

export default function Menu(): JSX.Element {
    const {setUser}:any = useContext(UserContext)
    return(
        <div className="">
        <div className="pl-1 md:mb-5 text-gray-600">
            <h1 className="text-gray-400 text-xs px-6 my-3">Main menu</h1>
            <ActiveLink access = {[ERole.SUPER_ADMIN,ERole.ADMIN, ERole.CEO, ERole.EMPLOYEE]} href="/">
                <BarChartOutlined /> Dashboard
            </ActiveLink>


            <ActiveSpanLink access = {[ERole.SUPER_ADMIN,ERole.ADMIN, ERole.CEO, ERole.EMPLOYEE]} tabName="assets" routes = "assets" tab={<><LaptopOutlined /> Assets</>}>
                {/* submenu */}
                <ActiveLink access = {[ERole.SUPER_ADMIN,ERole.ADMIN, ERole.CEO, ERole.EMPLOYEE]} href="/assets">
                    <DeploymentUnitOutlined />All assets
                </ActiveLink>

                <ActiveLink access = {[ERole.SUPER_ADMIN,ERole.ADMIN, ERole.CEO]} href="/assets/types">
                    <FileOutlined /> Asset types
                </ActiveLink>
            </ActiveSpanLink>

            <ActiveSpanLink access = {[ERole.SUPER_ADMIN,ERole.ADMIN, ERole.CEO]} tabName="orders" routes = "orders,vendors" tab={<><ShoppingOutlined /> Orders</>}>
                {/* submenu */}
                <ActiveLink access = {[ERole.SUPER_ADMIN,ERole.ADMIN, ERole.CEO]} href="/orders">
                    <ShoppingOutlined />All orders
                </ActiveLink>

                <ActiveLink access = {[ERole.SUPER_ADMIN,ERole.ADMIN, ERole.CEO]} href="/vendors">
                    <ShopOutlined /> Order vendors
                </ActiveLink>
            </ActiveSpanLink>

            <ActiveSpanLink access = {[ERole.SUPER_ADMIN,ERole.ADMIN, ERole.CEO, ERole.EMPLOYEE]} tabName="movements" routes = "checkouts,checkins,transfers" tab={<><ShareAltOutlined /> Movements</>}>
                {/* submenu */}
                <ActiveLink access = {[ERole.SUPER_ADMIN,ERole.ADMIN, ERole.CEO, ERole.EMPLOYEE]} href="/checkouts">
                    <RotateRightOutlined /> Check Outs
                </ActiveLink>

                <ActiveLink access = {[ERole.SUPER_ADMIN,ERole.ADMIN, ERole.CEO, ERole.EMPLOYEE]} href="/checkins">
                    <RotateLeftOutlined /> Check Ins
                </ActiveLink>
                <ActiveLink access = {[ERole.SUPER_ADMIN,ERole.ADMIN, ERole.CEO]} href="/transfers">
                    <SendOutlined /> Transfers
                </ActiveLink>

            </ActiveSpanLink>

            <ActiveLink access = {[ERole.SUPER_ADMIN,ERole.ADMIN, ERole.CEO]} href="/maintenance">
                <ToolOutlined /> Maintenance
            </ActiveLink>

            <ActiveSpanLink access = {[ERole.SUPER_ADMIN,ERole.ADMIN, ERole.CEO]} tabName="org" routes ="users,organisations" tab={<><ApartmentOutlined /> Organization</>}>
                {/* submenu */}
                <ActiveLink  access = {[ERole.SUPER_ADMIN,ERole.ADMIN, ERole.CEO]}  href="/organisations">
                    <ApartmentOutlined /> Organizations
                </ActiveLink>
                <ActiveLink  access = {[ERole.SUPER_ADMIN,ERole.ADMIN, ERole.CEO]}  href="/users" >
                    <TeamOutlined /> Users
                </ActiveLink>
            </ActiveSpanLink>

            <ActiveLink access = {[ERole.SUPER_ADMIN,ERole.ADMIN, ERole.CEO]} href="/reports">
                <FileOutlined /> Reports
            </ActiveLink>
            <ActiveLink access = {[ERole.SUPER_ADMIN,ERole.ADMIN, ERole.CEO, ERole.EMPLOYEE]} href="/settings">
                <SettingOutlined /> Settings
            </ActiveLink>
        </div>
        {/* logout link */}
        <div className="bottom-0 absolute text-gray-600 pl-1 text-sm">
            <span className=" text-sm px-6 flex items-center gap-2  rounded-sm hover:text-primary my-2 cursor-pointer" 
            onClick={()=>{setUser(null);Logout()}}
            >
                <LogoutOutlined /> Logout
            </span>
        </div>

    </div>
    )
}