import NavBar from "../components/dashboard/navBar";

export default function DashboardWithHeader(props: any): JSX.Element {
    return (
        <div className="w-full">
            <NavBar />
            <div>{props.children}</div>
        </div>
    )
}