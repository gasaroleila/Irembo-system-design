import { useNavigate } from "react-router";
import VerifyAccount from "../components/dashboard/dashboard/VerifyAccount";
import DashboardWithHeader from "../layouts/DashboardWithHeader";
import { checkLocalStorage } from "../util/checkLocalStorage";

export default function Dashboard(): JSX.Element {
    let token = checkLocalStorage('access_token')
    const navigate = useNavigate()
    if (!token) {
        navigate('/login')
    } 
        return (
            <DashboardWithHeader>
                <VerifyAccount />
            </DashboardWithHeader>
        )
    
}