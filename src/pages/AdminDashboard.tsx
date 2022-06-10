import VerifyAccount from "../components/dashboard/dashboard/VerifyAccount";
import DashboardWithHeader from "../layouts/DashboardWithHeader";

export default function Dashboard(): JSX.Element {
    return (
        <DashboardWithHeader>
            <VerifyAccount/>
        </DashboardWithHeader>
    )
}