import Link from "next/link";
import { useRouter } from "next/router";
import { LinkProps } from '../../../types/types'

export default function ActiveLink(props: LinkProps): JSX.Element {
    const router = useRouter();
    return (
        <Link href={props.href} >
            <a className={`${props.href === router.pathname && 'text-primary'} text-sm py-2 flex items-center gap-2  rounded-sm hover:text-primary`}>{props.children}</a>
        </Link>
    )
}