import { useRouter } from "next/router";
export default function AddButton(props: any): JSX.Element {
    return (
        <button className={`mt-2 px-4 py-2 text-white bg-primary flex justify-center items-center float-right rounded-full hover:opacity-50`}
            onClick={() => { props.setCount() }}
        >
            {props.icon}
        </button>
    )
}