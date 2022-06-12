import React from "react";
import { useNavigate } from "react-router";
import { checkLocalStorage } from "../../util/checkLocalStorage";
import "./navBar.css";

export default function NavBar(): JSX.Element {

  
  const navigate = useNavigate();
  const currentUser = checkLocalStorage("current_user")

  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  console.log('names',currentUser.names)

  const handleShowNotifications = () => {
   
  };
  return (
    <div className="dashboard-navbar flex justify-items-end w-full h-1/6 sticky top-0 z-40">
      <div className="drop-shadow-sm bg-white flex w-full justify-end">
        <div className="nav-middle-section  mr-6 flex-none flex justify-end items-center">
          <svg
            onClick={() => handleShowNotifications()}
            width="21"
            className="mx-4 cursor-pointer"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5174 17.9637C8.47864 17.9637 6.43989 17.64 4.50614 16.9925C3.77114 16.7387 3.21114 16.2225 2.96614 15.5487C2.71239 14.875 2.79989 14.1312 3.20239 13.4662L4.20864 11.795C4.41864 11.445 4.61114 10.745 4.61114 10.3337V7.80499C4.61114 4.54999 7.26239 1.89874 10.5174 1.89874C13.7724 1.89874 16.4236 4.54999 16.4236 7.80499V10.3337C16.4236 10.7362 16.6161 11.445 16.8261 11.8037L17.8236 13.4662C18.1999 14.0962 18.2699 14.8575 18.0161 15.5487C17.7624 16.24 17.2111 16.765 16.5199 16.9925C14.5949 17.64 12.5561 17.9637 10.5174 17.9637ZM10.5174 3.21124C7.98864 3.21124 5.92364 5.26749 5.92364 7.80499V10.3337C5.92364 10.9725 5.66114 11.9175 5.33739 12.4687L4.33114 14.14C4.13864 14.4637 4.08614 14.805 4.19989 15.0937C4.30489 15.3912 4.56739 15.6187 4.92614 15.7412C8.58364 16.9662 12.4599 16.9662 16.1174 15.7412C16.4324 15.6362 16.6774 15.4 16.7911 15.085C16.9049 14.77 16.8786 14.4287 16.7036 14.14L15.6974 12.4687C15.3649 11.9 15.1111 10.9637 15.1111 10.325V7.80499C15.1111 5.26749 13.0549 3.21124 10.5174 3.21124Z"
              fill="#292D32"
            />
            <path
              d="M12.145 3.44747C12.0838 3.44747 12.0225 3.43872 11.9613 3.42122C11.7075 3.35122 11.4625 3.29872 11.2263 3.26372C10.4825 3.16747 9.76504 3.21997 9.09129 3.42122C8.84629 3.49997 8.58379 3.42122 8.41754 3.23747C8.25129 3.05372 8.19879 2.79122 8.29504 2.55497C8.65379 1.63622 9.52879 1.03247 10.5263 1.03247C11.5238 1.03247 12.3988 1.62747 12.7575 2.55497C12.845 2.79122 12.8013 3.05372 12.635 3.23747C12.5038 3.37747 12.32 3.44747 12.145 3.44747Z"
              fill="#292D32"
            />
            <path
              d="M10.5176 19.9587C9.65133 19.9587 8.81133 19.6087 8.19883 18.9962C7.58633 18.3837 7.23633 17.5437 7.23633 16.6775H8.54883C8.54883 17.1937 8.75883 17.7012 9.12633 18.0687C9.49383 18.4362 10.0013 18.6462 10.5176 18.6462C11.6026 18.6462 12.4863 17.7625 12.4863 16.6775H13.7988C13.7988 18.4887 12.3288 19.9587 10.5176 19.9587Z"
              fill="#292D32"
            />
          </svg>

          
        </div>
        <div className="nav-account-section flex justify-center items-center mr-16">
          <img
            className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
            src="/images/bruno-rodrigues-279xIHymPYY-unsplash.jpg"
            alt="current user"
          />
          <div className="current-user-info px-3 mr-8">
            <p className="font-bold mb-0 text-small flex items-center">
              {currentUser?.names}
              {
                currentUser?.status === 'VERIFIED' && 
                <span className="ml-1"><img src="/images/download.png" alt="badge" width={10} height={10}/></span>}
            </p>
            <span className="mt-0 text-[13px] font-medium">
            {currentUser?.email}
            </span>
          </div>
          <svg
            onClick={() => handleLogOut()}
            className="cursor-pointer"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="16" fill="#F9F9FB" />
            <path
              d="M11.3337 22.6667C11.1568 22.6667 10.9873 22.5964 10.8623 22.4714C10.7372 22.3464 10.667 22.1768 10.667 22V10C10.667 9.8232 10.7372 9.65363 10.8623 9.52861C10.9873 9.40358 11.1568 9.33334 11.3337 9.33334H20.667C20.8438 9.33334 21.0134 9.40358 21.1384 9.52861C21.2634 9.65363 21.3337 9.8232 21.3337 10V12H20.0003V10.6667H12.0003V21.3333H20.0003V20H21.3337V22C21.3337 22.1768 21.2634 22.3464 21.1384 22.4714C21.0134 22.5964 20.8438 22.6667 20.667 22.6667H11.3337ZM20.0003 18.6667V16.6667H15.3337V15.3333H20.0003V13.3333L23.3337 16L20.0003 18.6667Z"
              fill="#3F75E7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

