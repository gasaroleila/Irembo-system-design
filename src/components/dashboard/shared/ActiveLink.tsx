import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { LinkProps } from '../../../types/types'
import { UserContext } from "../authentication/ContextProvider";

export default function ActiveLink(props: LinkProps): JSX.Element {
    const { user }: any = useContext(UserContext)
    const router = useRouter();
    // let pathName = router.pathname.split('/')[1];
    // let href= props.href.split('/')[1]
    if(props.access?.includes(user?.role)){

        return (
            <Link href={props.href} >
                <a className={`${props.href === router.pathname ? 'text-primary border-l-4 border-primary px-5 ' : 'px-6'} text-sm py-2 flex items-center gap-2 hover:text-primary my-2`}>
                {/* {props.href} {router.pathname} */}
                    {props.children}</a>
            </Link>
        )
    }else return(<></>)
}