import { useRouter } from "next/router";
import { SpanLinkProps } from "../../../types/types";
import { MenuToggle } from "../../../types/types";
import React, { useContext, useState } from "react";
import { RightOutlined, DownOutlined } from "@ant-design/icons";
import { UserContext } from "../authentication/ContextProvider";

export default function ActiveSpanLink(props: SpanLinkProps): JSX.Element {
  //   const [toggleLink, handleToggleLink] = useState<MenuToggle>();
  const router = useRouter();
  let routes = props.routes.split(",");
  let pathname = router.pathname.split("/")[1];
  const { user, isOpen, openedMenu, setOpenedMenu }: any =
    useContext(UserContext);

  if (props.access?.includes(user?.role)) {
    return (
      <div className="">
        <span
          className={`${
            openedMenu === props.tabName && isOpen && "text-primary"
          } ${
            routes.includes(pathname) && "text-primary"
          } text-sm py-2 px-6 flex items-center gap-2  rounded-sm  w-full cursor-pointer hover:text-primary my-2`}
          onClick={() => {
            setOpenedMenu({
              openedMenu: openedMenu === props.tabName ? "" : props.tabName,
              isOpen: true,
            });
          }}
        >
          {props.tab}
          <div className="w-full">
            {openedMenu === props?.tabName && isOpen ? (
              <DownOutlined className="arrow-icon text-gray-400 float-right" />
            ) : (
              <RightOutlined className="arrow-icon text-gray-400 float-right" />
            )}
          </div>
        </span>
        {/* {toggleLink?.tabName+'__'+props.tabName+'__'+openedMenu} */}
        {openedMenu === props?.tabName && isOpen && (
          <div className="pl-5 bg-lightGray py-1">{props.children}</div>
        )}

        {/* {toggleLink?.tabName === props.tabName && toggleLink?.active && 
            <div className="pl-5 bg-lightGray py-1">
                {props.children}
            </div>
            } */}
      </div>
    );
  } else return <></>;
}
