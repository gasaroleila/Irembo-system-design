import { useRouter } from "next/router";
export default function CancelButton(props: any): JSX.Element {
    return (
        <button className={`ml-2 mt-2 mb-3 px-4 py-1 text-white bg-red-500 flex justify-center items-center float-right rounded-full hover:opacity-50`}
            onClick={() => { props.removeCount() }}
        >
            {props.icon}
        </button>
    )
}