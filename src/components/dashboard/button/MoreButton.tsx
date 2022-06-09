/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import Button from "../authentication/button";
import { Toast } from "../toasts/Toast";
import { LoadingOutlined, MoreOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import {
  ChangeStatusModalProps,
  DeleteModalProps,
  ModelStatus,
  MoreButtonProps,
} from "../../../types/types";
import { CloseOutlined } from "@ant-design/icons";
import { getService } from "../../../util/getService";
import { ChevronDown, ChevronRight, Slash } from "react-feather";
import { getStatuses } from "../../../util/getStatus";
import { UserContext } from "../authentication/ContextProvider";
import ActiveLink from "../shared/OtherLink";
export default function MoreButton(props: MoreButtonProps): JSX.Element {
  type Action = {
    index: number;
    open: boolean;
  };

  const { user }: any = useContext(UserContext);

  const [actions, setActions] = useState<Action>();
  const [deleteModal, setDeleteModal] = useState<DeleteModalProps>({
    open: false,
    item: "",
    id: "",
    ServiceClass: "",
    path: "",
  });
  const [changeStatusModal, setChangeStatusModal] =
    useState<ChangeStatusModalProps>({
      open: false,
      item: "",
      id: "",
      status: "",
      ServiceClass: "",
      path: "",
    });
  const [statusValue, setStatusValue] = useState(props.status);
  const [selectModal, handleSelectModal] = useState<boolean>(false);

  const [loading, handleLoading] = useState<Boolean>(false);

  const router = useRouter();
  const path = "/" + props.url + "/view?q=" + props.id;
  const editPath = "/" + props.url + "/edit?q=" + props.id;

  // model statuses
  const statuses: ModelStatus[] = getStatuses(props.status);

  function openModal(data: DeleteModalProps) {
    setDeleteModal({
      open: data.open,
      item: data.item,
      id: data.id,
      ServiceClass: data.ServiceClass,
      path: data.path,
    });
  }

  function openChangeStatusModal(data: ChangeStatusModalProps) {
    setChangeStatusModal({
      open: data.open,
      item: data.item,
      id: data.id,
      status: data.status,
      ServiceClass: data.ServiceClass,
      path: data.path,
    });
  }
  const [{ status, message }, handleToast] = useState({
    status: "",
    message: "",
  });

  // delete function
  async function deleteItem(id: string, service: string, path: string) {
    let response;
    handleLoading(true);
    const query = getService(service);
    response = await query.delete(id);
    if (response.success === false) {
      handleToast({ status: "error", message: response.message });
    } else {
      handleToast({ status: "success", message: response.message });
    }

    handleLoading(false);
    setTimeout(() => {
      handleToast({ status: "", message: "" });
      openModal({
        open: false,
        item: props.url,
        id: props.id,
        ServiceClass: props.ServiceClass,
        path: props.path,
      });
    }, 2000);
  }

  async function changeStatus(id: string, service: string, status: string) {
    let response;
    handleLoading(true);
    try {
      const query = getService(service);
      response = await query.updateStatus(id, status);
      if (response.success === false) {
        handleToast({ status: "error", message: response.message });
      } else {
        // handleToast({ status: 'success', message: response.message })
        handleToast({
          status: "success",
          message: "Status updated successfully",
        });
        // updateStatus message
      }
    } catch (e: any) {
      console.log(e.message);
    }

    handleLoading(false);
    setTimeout(() => {
      handleToast({ status: "", message: "" });
      openChangeStatusModal({
        open: false,
        item: props.url,
        id: props.id,
        status: props.status,
        ServiceClass: props.ServiceClass,
        path: props.path,
      });
    }, 2000);
  }

  // delete modal
  const deletePopup = (
    <div className="w-full  flex justify-center">
      {/* toast */}
      {status && <Toast status={status} message={message} />}
      {/* toast ends here */}
      <div className="bg-white p-5 m-3 rounded modal-content md:w-1/2 lg:w-1/3 lg:h-1/2">
        <p className="p-5 text-center">
          Are you sure you want to delete this row?
        </p>
        <br />
        <div className="p-5">
          <div className="grid grid-cols-2 gap-5">
            <button
              className="bg-lightGray p-3 rounded"
              onClick={() => {
                setDeleteModal({
                  open: false,
                  item: props.url,
                  id: props.id,
                  ServiceClass: props.ServiceClass,
                  path: props.path,
                });
              }}
            >
              Cancel
            </button>
            <button
              className={`bg-red-500 p-3 rounded flex items-center gap-1 justify-center text-white hover:opacity-50
                ${loading && "opacity-50"}
                `}
              onClick={() => {
                deleteItem(props.id, props.ServiceClass, props.path);
              }}
            >
              {loading && <LoadingOutlined />}{" "}
              {loading ? " Deleting ..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // change status modal

  const ChangeStatusPopup = (
    <div className="w-full  flex justify-center">
      {/* toast */}
      {status && <Toast status={status} message={message} />}
      {/* toast ends here */}
      <div className="bg-white p-5  md:p-10 m-3 rounded modal-content md:w-1/2 lg:w-1/3 lg:h-1/2">
        <div className="grid grid-cols-2 items-center">
          <div className="">
            <h1 className="items-center font-bold text-lg">Change status</h1>
          </div>
          <div className="flex justify-end items-center">
            <span
              className="hover:bg-gray-50 rounded-full sm-img cursor-pointer flex items-center justify-center"
              onClick={() => {
                setChangeStatusModal({
                  open: false,
                  item: props.url,
                  id: props.id,
                  status: props.status,
                  ServiceClass: props.ServiceClass,
                  path: props.path,
                });
              }}
            >
              <CloseOutlined className="font-bold text-gray-500 text-xs " />
            </span>
          </div>
        </div>

        <div className="flex mt-3">
          {statuses.map((item: ModelStatus, i: number) => {
            return (
              item.status === props.status && (
                <div
                  key={i}
                  className={`text-white px-2 py-1 rounded text-xs text-center
                        bg-${item.color}-500`}
                >
                  {props.status}
                </div>
              )
            );
          })}
        </div>
        <div className="py-5">
          <div className="form-group text-sm">
            <label htmlFor="">Status</label>
            <div>
              <div
                className={`w-full border rounded focus:outline-none p-3 my-3 cursor-pointer flex justify-between ${
                  !user?.signature_file?.path &&
                  " bg-gray-100 cursor-not-allowed"
                }`}
                onClick={() => {
                  return (
                    user?.signature_file?.path &&
                    handleSelectModal(!selectModal)
                  );
                }}
              >
                {statusValue}

                <div className="text-gray-400">
                  {selectModal ? <ChevronDown /> : <ChevronRight />}
                </div>
              </div>
              {selectModal && (
                <div className="shadow-xl my-5 rounded  w-full p-2 text-gray-600 cursor-pointer">
                  <h1 className="mb-3">-- Select --</h1>
                  <hr />
                  <div className="my-3">
                    {statuses.map((item: ModelStatus, i: number) => {
                      return (
                        item.status !== props.status && (
                          <div
                            key={i}
                            className="w-full hover:bg-primary hover:text-white rounded p-2"
                            onClick={() => {
                              setStatusValue(item.status);
                              handleSelectModal(false);
                            }}
                          >
                            {item.status}
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="my-5">
            <h1 className="text-sm">Your Signature for approval</h1>

            <div className="my-3 w-full">
              {user?.signature_file?.path ? (
                <img
                  src={user?.signature_file?.path}
                  alt="Signature"
                  className="w-full rounded-lg h-40 object-cover border"
                />
              ) : (
                <div className="">
                  <div className="flex gap-2 items-center bg-red-100 p-3 font-bold text-sm text-red-500 rounded">
                    <Slash className="w-10 h-10" />
                    <p>
                      It seems you do not have a digital signature saved on your
                      account.
                      Therefore, you cannot take this action without signing.
                    </p>
                  </div>

                  <div className="text-gray-500 my-3 underline">
                    <ActiveLink href="/settings/signature">
                      <span>Upload your signature here</span>
                    </ActiveLink>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <Button title="Change status" loading={loading} loadingTitle="Changing ..." /> */}
          <div className="w-full flex justify-end my-3">
            <button
              className={`bg-primary p-2 rounded flex items-center gap-1 justify-center text-white hover:opacity-50
              ${!user?.signature_file?.path && " opacity-50 cursor-not-allowed"}
                ${loading && "opacity-50"}
                `}
              disabled={!user?.signature_file?.path ? true : false}
              onClick={() => {
                changeStatus(props.id, props.ServiceClass, statusValue);
              }}
            >
              {loading && <LoadingOutlined />}{" "}
              {loading ? " Changing ..." : "Change status"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* delete modal */}
      {deleteModal.open && (
        <div className="modal lg:flex items-center justify-center z-40">
          {deletePopup}
        </div>
      )}
      {/* delete modal ends here */}

      {/* changestatus modal */}
      {changeStatusModal.open && (
        <div className="modal lg:flex items-center justify-center z-40">
          {ChangeStatusPopup}
        </div>
      )}
      {/* changestatus modal ends here */}

      <div
        className="sm-img rounded-full cursor-pointer bg-lightGray flex items-center justify-center"
        onClick={() => {
          setActions({ index: props.index, open: !actions?.open });
        }}
      >
        <MoreOutlined className={actions?.open ? " transform rotate-90" : ""} />
      </div>
      {actions?.index === props.index && actions.open && (
        <div className="bg-white shadow-lg absolute p-3 rounded z-40 right-5">
          <ul className=" cursor-pointer">
            <li
              className=" hover:bg-lightGray p-1 rounded"
              onClick={() => {
                router.push(path);
              }}
            >
              View
            </li>
            <li
              className=" hover:bg-lightGray p-1 rounded"
              onClick={() => {
                router.push(editPath);
              }}
            >
              Edit
            </li>
            <li
              className="hover:bg-lightGray p-1 rounded"
              onClick={() => {
                openModal({
                  open: true,
                  item: props.url,
                  id: props.id,
                  ServiceClass: props.ServiceClass,
                  path: props.path,
                });
                setActions({ index: props.index, open: !actions?.open });
              }}
            >
              Delete
            </li>
            <li
              className="hover:bg-lightGray p-1 rounded"
              onClick={() => {
                openChangeStatusModal({
                  open: true,
                  item: props.url,
                  id: props.id,
                  status: props.status,
                  ServiceClass: props.ServiceClass,
                  path: props.path,
                });
                setActions({ index: props.index, open: !actions?.open });
              }}
            >
              Change status
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
