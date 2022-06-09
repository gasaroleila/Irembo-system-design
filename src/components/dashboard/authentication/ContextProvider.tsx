import { createContext, useEffect, useState } from "react";
import { UserService } from "../../../pages/Api/services/UserService";
import { checkErrorCode } from "../../../util/checkErrorCode";
import { checkLocalStorage } from "../../../util/checkLocalStorage";
import { decodeToken } from "../../../util/decodeToken";
import {
  Asset,
  AssetType,
  CheckIn,
  CheckOut,
  Order,
  Organisation,
  OrganisationUser,
  Transfer, 
  User,
  Vendor,
} from "../../../types/types";
import { validateAuth } from "../../../util/validateAuthResponse";
import { Logout } from "./Logout";
import { Api } from "../../../pages/Api/Api";
import { EbackendEndpoints, EhttpMethod, ERole } from "../../../types/enums";
const UserContext = createContext({});

export interface IAppContext {
  user?: OrganisationUser;
  setUser?: (value: OrganisationUser) => void;
  users?: User | any;
  setUsers?: (value: User | any) => void;
  organisations?: Organisation | any;
  setOrganisations?: (value: Organisation | any) => void;

  checkouts?: CheckOut | any;
  setCheckouts?: (value: CheckOut | any) => void;

  checkins?: CheckIn | any;
  setCheckins?: (value: CheckIn | any) => void;

  transfers?: Transfer | any;
  setTransfers?: (value: Transfer | any) => void;

  orders?: Order | any;
  setOrders?: (value: Order | any) => void;

  vendors?: Vendor | any;
  setVendors?: (value: Vendor | any) => void;

  assets?: Asset | any;
  setAssets?: (value: Asset | any) => void;

  assetTypes?: AssetType | any;
  setAssetTypes?: (value: AssetType | any) => void;

  isOpen?: boolean
  openedMenu?: string;
  setOpenedMenu?: (value: string) => void;

  userInfo?: any;
  setUserBasicInfo?: (value: OrganisationUser) => void;
}

export function ContextProvider({ children }: any): JSX.Element {
  const [user, setUser] = useState<OrganisationUser>();
  // const [orgUser, setOrgUser] = useState<any>()
  const [users, setUsers] = useState<User | any>();
  const [organisations, setOrganisations] = useState<User | any>();
  const [checkouts, setCheckouts] = useState<CheckOut | any>();
  const [checkins, setCheckins] = useState<CheckIn | any>();
  const [transfers, setTransfers] = useState<Transfer | any>();
  const [orders, setOrders] = useState<Order | any>();
  const [vendors, setVendors] = useState<Vendor | any>();
  const [assets, setAssets] = useState<Vendor | any>();
  const [assetTypes, setAssetTypes] = useState<Vendor | any>();

  // control sidebar menu 
  const [{ openedMenu, isOpen }, setOpenedMenu] = useState({ openedMenu: '', isOpen: false })

  const [authError, setAuthError] = useState<string>(""); // get token
  let token: string = checkLocalStorage("access_token");
  let userBasicInfo: any;
  let u_id: string = "";

  if (token) {
    let tokenPayload = decodeToken(token);
    let user_id: string = JSON.stringify(tokenPayload?.sub);
    user_id = JSON.parse(user_id);
    u_id = user_id;
    const loadUsers = async () => {
      try {
        const userService = new UserService();
        const response = await userService.getLoggedInUser();
        setUser(response.data);
        await new Api()
          .connect(
            EbackendEndpoints.GET_ONE_ORGANISATION_USER + response.data.id,
            EhttpMethod.GET
          )
          .then((res) => {
            // setOrgUser(res.data);
            let { signature_file, organisation, id } = res.data;
            let org_user_id: string = id;
            let newUser: any = {
              ...response.data,
              org_user_id,
              signature_file,
              organisation,
            };
            setUser(newUser);
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (error: any) {
        console.log(error);
      }
    };

    if (!user) {
      loadUsers();
    }
    // else {
    //     setUser(user)
    // }
  }
  if (!user?.role)
    user && setUser(Object.assign(user, { role: ERole.SUPER_ADMIN }));

  let darkmode: any = checkLocalStorage("darkmode");
  const [mode, setDarkMode] = useState<boolean>(darkmode);
  const setMode = () => {
    if (mode) {
      localStorage.setItem("darkmode", "false");
      setDarkMode(false);
    } else {
      localStorage.setItem("darkmode", "true");
      setDarkMode(true);
    }

    darkmode = checkLocalStorage("darkmode");
  };

  useEffect(() => {
    // validate the auth expiration
    async function loadAuthValidity() {
      try {
        const userService = new UserService();
        await userService.getLoggedInUser();
      } catch (error: any) {
        setAuthError(error.message);
        if (!validateAuth(error.message)) Logout();

        // check the errorcode
        setAuthError(checkErrorCode(error.message));
      }
    }
    loadAuthValidity();
  }, [u_id]);
  // check the errorcode

  // console.log('user', user)
  return (
    <UserContext.Provider
      value={{
        userBasicInfo,
        setMode,
        mode,
        authError,
        user,
        setUser,
        users,
        setUsers,
        organisations,
        setOrganisations,

        checkouts,
        setCheckouts,
        checkins,
        setCheckins,
        transfers,
        setTransfers,
        orders,
        setOrders,
        vendors,
        setVendors,
        assets,
        setAssets,
        assetTypes,
        setAssetTypes,
        isOpen,
        openedMenu,
        setOpenedMenu,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export { UserContext };
