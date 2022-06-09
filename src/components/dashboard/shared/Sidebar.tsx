import { useContext } from "react";
import { OrganisationUser } from "../../../types/types";
import { UserContext } from "../authentication/ContextProvider";
import Menu from "./Menu";

/* eslint-disable @next/next/no-img-element */
export function Sidebar(): JSX.Element {
  const { user }: OrganisationUser = useContext(UserContext);
  let title: string | any = user?.organisation
    ? user.organisation.name
    : user?.role;
    if(title?.includes("_")){
        title = title.replace("_", " ");

    }

  return (
    <div className="bg-white md:h-screen overflow-y-auto top-0 md:sticky w-full">
      <div className="hidden lg:block">
        <h1 className="uppercase top-0 sticky bg-white pl-7 py-3 flex gap-2 items-center text-sm font-bold">
          <img src="/logo.png" alt="" />
          {title}
        </h1>
        <Menu />
      </div>
    </div>
  );
}
