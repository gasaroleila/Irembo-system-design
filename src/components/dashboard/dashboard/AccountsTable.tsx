import Pagination from "../Table/Pagination";
import Table from "../Table/Table";

const rawData = [
    
]
export default function AccountTable(): JSX.Element {
    return (
        <div className="">
            {/* <Table
                  model="Booking"
                  cols={cols}
                  rows={rawData}
                  actions={["viewTenant"]}
                  hide={["created_by", "__v", "_id"]}
                  populate={[{ model: "", attributes: [""] }]}
                  actionPath="/dashboard/booking/"
                  loading={rawData ? false : true}
                  // reload={() => handleReload()}
                />
                <Pagination pages={rawData?.links} service={"CHECKOUTS"} /> */}
        </div>
    )
}