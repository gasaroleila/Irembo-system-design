/* eslint-disable @next/next/no-img-element */
import { NavbarProps, OrganisationUser } from "../../../types/types";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  MenuOutlined,
  CloseOutlined,
  UserOutlined,
  EyeOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  CheckOutlined,
  WindowsFilled,
} from "@ant-design/icons";
import Menu from "./Menu";
import NavSearch from "./NavSearch";
import { Logout } from "../authentication/Logout";
import { UserContext } from "../authentication/ContextProvider";
import LoadingBackground from "../loaders/LoadingBackground";
import { checkLocalStorage } from "../../../util/checkLocalStorage";
import { getNamesLabel } from "../../../util/getNamesLabel";
import { NotificationService } from "../../../pages/api/services/NotificationService";
import { Eye, Moon, Sun, User } from "react-feather";
import { Api } from "../../../pages/api/Api";
import { EbackendEndpoints, EhttpMethod } from "../../../types/enums";
import { pathRoles } from "../../../util/functionalities";

export function Navbar(): JSX.Element {
  const { setMode, user, setUser }: any = useContext(UserContext);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [notificationToggle, setNotificationToggle] = useState<boolean>(false);
  const [settingsToggle, setSettingsToggle] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any>([]);

  const router = useRouter();
  const { mode }: any = useContext(UserContext);

  // setting the theme

  const [dark, setDark] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const service = new NotificationService();

  useEffect(() => {
    let darkmode: any = checkLocalStorage("darkmode");
    setDark(darkmode);
    const loadNotifications = async () => {
      if (user?.org_user_id) {
        let response = await service.getUserNotifications(
          user?.org_user_id,
          "UNREAD"
        );
        setNotifications(response.data);
      }
    };

    const checkUserAccessibility = (path: any, role: any) => {
      if (!pathRoles(path)?.includes(role)) {
            window.location.href = '/'
      }
  }

    // checkUserAccessibility(router.pathname, "EMPLOYEE");
    loadNotifications();

  }, [mode, service, user?.org_user_id]);

  const handleNotificationClick = (ntf: any) => {
    switch (ntf.title) {
      case "Asset Checkins":
        router.push("/checkins");
        break;
      case "Asset Checkouts":
        router.push("/checkouts");
        break;
      case "Asset Transfers":
        router.push("/transfers");
        break;
    }
  };

  const handleClearNotifications = async () => {
    if (notifications.length > 0) {
      for (let i = 0; i < notifications.length; i++) {
        await new Api()
        .connect(
          EbackendEndpoints.MARK_NOTIFICATION_READ +
          notifications[i].id +
            "/mark-as/READ",
          EhttpMethod.PUT
        )
        .then((response) => {
          if (response.success) {
           alert(response.message);
          }
        })
        .catch((error) => {
         throw new Error(error)
        });
      }
      
    }
  };

  if (typeof user?.first_name === "undefined") {
    return <LoadingBackground operationTitle="Loading services ..." />;
  } else
    return (
      <div className="bg-white py-2 w-full grid grid-cols-1 lg:grid-cols-2 gap-5 text-sm items-center top-0 sticky z-40">
        {/* mobile view */}
        <div className="block lg:hidden">
          <div className="bg-white p-3 flex justify-between items-center">
            <h1 className="flex gap-3 uppercase items-center font-bold w-full justify-center">
              <img src="/logo.png" alt="" />
              horizon inventory mis
            </h1>

            <MenuOutlined
              className="text-lg"
              onClick={() => setOpenSidebar(true)}
            />
          </div>
        </div>
        {openSidebar && (
          <div className="modal z-50 block lg:hidden">
            <div className="">
              <div className="modal-content bg-white float-right min-h-screen w-2/3">
                <div className="w-full my-3">
                  <CloseOutlined
                    onClick={() => setOpenSidebar(false)}
                    className="float-right m-3"
                  />
                </div>
                <Menu />
              </div>
            </div>
          </div>
        )}
        {/* mobile view ends here */}

        <div className="hidden lg:block">
          <NavSearch />
        </div>

        <div className="cursor-pointer">
          <div className="flex items-center sm:justify-center lg:float-right px-10 relative">
            <div
              className={`${
                notificationToggle && "md:bg-blue-50"
              } rounded-full sm-img flex justify-center items-center`}
              onClick={() => {
                setSettingsToggle(false);
                setNotificationToggle(!notificationToggle);
              }}
            >
              <div>
                <BellOutlined className="text-primary" />
                {notifications.length>0 && (
                  <span className="absolute bg-red-500 p-1 rounded-full -ml-2"></span>
                )}

                {/* notification block */}
                {notificationToggle && (
                  <div className="transition w-74 bg-white shadow p-5 h-auto absolute rounded mr-2 mt-5 text-xs text-gray-600">
                    <div className="flex justify-between mb-5 items-center">
                      <h1 className="text-primary text-sm">
                        Notifications
                      </h1>
                      <div
                        className="flex"
                        onClick={() => handleClearNotifications()}
                      >
                        <p className="text-primary">Mark all as read</p>
                      </div>
                    </div>
                    <div className="block w-full">
                      {notifications.length > 0 &&
                        notifications?.map((notification: any, i: number) => {
                          return (
                              <div
                                className="my-2 hover:text-primary flex gap-2 items-center py-2 border-b border-gray-200"
                                key={i}
                                onClick={() =>
                                  handleNotificationClick(notification)
                                }
                              >
                                <BellOutlined />
                                {notification.message}
                                
                              {/* <hr /> */}
                              </div>
                          );
                        })}

                      {!notifications ||
                        (notifications.length == 0 && (
                          <span className="text-gray-500 text-center">
                            No notifications available
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              className={`${
                settingsToggle && "md:bg-blue-50"
              } rounded-full sm-img flex justify-center items-center`}
              onClick={() => {
                setNotificationToggle(false);
                setSettingsToggle(!settingsToggle);
              }}
            >
              <div>
                <div className="flex items-center">
                  <SettingOutlined className="text-primary" />
                </div>
                {/* notification block */}
                {settingsToggle && (
                  <div className="transition bg-white shadow p-5 absolute rounded mr-2 mt-5 text-xs text-gray-600">
                    <h1 className="text-primary text-sm mb-5">Settings</h1>
                    <ul>
                      <li
                        className="my-2 hover:text-primary flex gap-2 items-center"
                        onClick={() => router.push("/settings")}
                      >
                        <User className="w-4 h-4"/>
                        Profile settings
                      </li>
                      <li
                        className="my-2 hover:text-primary flex gap-2 items-center"
                        onClick={() => router.push("/settings/changepassword")}
                      >
                        <Eye className="w-4 h-4"/>
                        Change password
                      </li>
                      <li
                        className="my-2 hover:text-primary flex gap-2 items-center"
                        onClick={() => setMode()}
                      >
                        {dark ? (
                          <>
                          <Sun className="w-4 h-4"/>
                            Light mode
                          </>
                        ) : (
                          <>
                            <Moon className="w-4 h-4"/>
                            Dark mode
                          </>
                        )}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex ml-2 gap-5 items-center">
              <div
                className="w-10 h-10 rounded-full bg-gray-100"
                onClick={() => {
                  setNotificationToggle(false);
                  setSettingsToggle(!settingsToggle);
                }}
              >
                {/* <img src={props.image} alt="" className="w-10 h-10 rounded-full"
                                onClick={() => { setNotificationToggle(false); setSettingsToggle(!settingsToggle) }}
                            /> */}
                <div className="bg-primary w-10 h-10 rounded-full text-white flex items-center justify-center font-bold">
                  {getNamesLabel(user?.first_name, user?.last_name)}
                </div>
              </div>
              <div
                className="block"
                onClick={() => {
                  setNotificationToggle(false);
                  setSettingsToggle(!settingsToggle);
                }}
              >
                <h1 className="font-bold">
                  {user?.first_name + " " + user?.last_name}
                </h1>
                <h2 className="text-gray-500 text-xs">{user?.email}</h2>
              </div>
              <div>
                <div
                  className="sm-img rounded-full lg:bg-lightGray md:hover:bg-blue-50 flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    setUser(null);
                    Logout();
                  }}
                >
                  <LogoutOutlined className="text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
