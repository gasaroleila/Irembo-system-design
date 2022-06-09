import { UnorderedListOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { RedirectButtonProps } from "../../../types/types";
export default function RedirectButton(props: RedirectButtonProps): JSX.Element {
    const router = useRouter()
    return (
        <button className={`px-10 py-2 text-white bg-primary rounded-full flex justify-center items-center text-sm hover:opacity-50 ${props.float}`}
            onClick={() => { router.push(props.url) }}
        >
            {props.icon} {props.title}
        </button>
    )
}