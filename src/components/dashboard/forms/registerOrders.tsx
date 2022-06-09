import Link from "next/link";
import Button from "../authentication/button";

import { useForm, SubmitHandler } from "react-hook-form";
import { Order, Organisation, Vendor } from "../../../types/types";
import {useState } from "react";
import { VendorService } from "../../../pages/api/services/VendorService";
import { OrganisationService } from "../../../pages/api/services/OrganizationService";
import { OrderService } from "../../../pages/api/services/OrderService";
import { Toast } from "../toasts/Toast";
import { EStatus } from "../../../types/enums";
import { useRouter } from "next/router";

export function RegisterOrder(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Order>();
  const [{ status, message }, handleToast] = useState({
    status: "",
    message: "",
  });

  const [loading, handleLoading] = useState<Boolean>(false);
  const [vendors, setVendors] = useState<Vendor[]>();
  const [organisations, setOrganisations] = useState<Organisation[]>();

  const [orderStatus, setOrderStatus] = useState<string>("PENDING");

  //   useEffect(() => {
  const loadVendors = async () => {
    const vendorService = new VendorService();
    try {
      const response = await vendorService.getAll(1, 30);
      setVendors(response.data.data);
    } catch (error) {
      handleToast({ status: "error", message: "Error" });
    }
  };
  const loadOrganisations = async () => {
    const organisationService = new OrganisationService();
    try {
      const response = await organisationService.getAll(1, 30);
      setOrganisations(response.data.data);
    } catch (error) {
      handleToast({ status: "error", message: "Error" });
    }
  };
  //   }, [vendors, organisations]);

  const router = useRouter()

  const registerOrder: SubmitHandler<Order> = async (data) => {
    handleLoading(true);
    const orderService = new OrderService();
    data.status = orderStatus;
    try {
      const response = await orderService.create(data);
      if (response.success === false) {
        let errorResponse = response.message
          ? response.message
          : "Error occured, try again";
        handleToast({ status: "error", message: errorResponse });
      } else {
        handleToast({
          status: "success",
          message: "Order " + data.code + " is registered successfully",
        });
        reset(response);
        router.push('/orders')
      }
      handleLoading(false);
      setTimeout(() => {
        handleToast({ status: "", message: "" });
      }, 3000);
    } catch (error: any) {
      handleToast({
        status: "error",
        message: error.response.data.message
          ? error.response.data.message
          : "Error occured, try again",
      });
      setTimeout(() => {
        handleToast({ status: "", message: "" });
      }, 3000);
      handleLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* toast */}
      {status && <Toast status={status} message={message} />}
      {/* toast ends here */}
      <form
        onSubmit={handleSubmit(registerOrder)}
        className="text-sm w-full -mt-2"
      >
        <div className=" mt-7 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="form-group w-full">
            <label htmlFor="code" className="mb-2 text-sm capitalize block">
              Order code
            </label>
            <input
              type="text"
              id="code"
              className="rounded-sm bg-gray-50 text-gray-600 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
              {...register("code", {
                required: "Please enter an order code",
                minLength: {
                  value: 5,
                  message: "Order code must be atleast 5 characters",
                },
              })}
            />

            <span className="text-red-600 text-xs block mt-2">
              {errors.code?.message}
            </span>
          </div>

          <div className="form-group">
            <label
              htmlFor="productQuantity"
              className="mb-2 text-sm capitalize block"
            >
              Product Quantity
            </label>
            <input
              type="number"
              id="productQuantity"
              className="rounded-sm bg-gray-50 text-gray-600 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
              {...register("total_quantity", {
                required: "Please enter product Quantity",
              })}
            />
            <span className="text-red-600 text-xs block mt-2">
              {errors.total_quantity?.message}
            </span>
          </div>

          <div className="form-group">
            <label
              htmlFor="productUnitPrice"
              className="mb-2 text-sm capitalize block"
            >
              Total Amount
            </label>
            <input
              type="number"
              id="productUnitPrice"
              className="rounded-sm bg-gray-50 text-gray-600 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
              {...register("total_amount", {
                required: "Please enter product Unit Price",
              })}
            />
            <span className="text-red-600 text-xs block mt-2">
              {errors.total_amount?.message}
            </span>
          </div>

          <div className="form-group">
            <label
              htmlFor="orderDate"
              className="mb-2 text-sm capitalize block"
            >
              Order Date
            </label>
            <input
              type="date"
              id="orderDate"
              className="rounded-sm bg-gray-50 text-gray-600 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
              {...register("order_date", {
                required: "Please select the order date",
              })}
            />

            <span className="text-red-600 text-xs block mt-2 w-48">
              {errors.order_date?.message}
            </span>
          </div>

          {orderStatus === EStatus.DELIVERED && (
            <div className="form-group">
              <label
                htmlFor="orderDate"
                className="mb-2 text-sm capitalize block"
              >
                Delivery Date
              </label>
              <input
                type="date"
                id="orderDate"
                className="rounded-sm bg-gray-50 text-gray-600 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                {...register("delivery_date", {
                  required: "Please select the delivery date",
                })}
              />

              <span className="text-red-600 text-xs block mt-2 w-48">
                {errors.delivery_date?.message}
              </span>
            </div>
          )}
        </div>

        <div className=" mt-7 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="form-group">
            <label
              htmlFor="organisation"
              className="mb-2 text-sm capitalize block"
            >
              Organisation
            </label>
            <select
              id="organisation"
              className="rounded-sm bg-gray-50 text-gray-600 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
              {...register("organisation", {
                required: "Please select the organisation",
              })}
              onMouseDown={() => {
                loadOrganisations();
              }}
            >
              <option value="">----</option>
              {!organisations && (
                <option value="">Loading organisations ...</option>
              )}
              {organisations?.map((item: Organisation, i: number) => {
                return (
                  <option value={item.id} key={i}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <span className="text-red-600 text-xs block mt-2 w-48">
              {errors.organisation?.message}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="vendor" className="mb-2 text-sm capitalize block">
              Vendor
            </label>
            <select
              id="vendor"
              className="rounded-sm bg-gray-50 text-gray-600 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
              {...register("vendor", {
                required: "Please select the vendor",
              })}
              onMouseDown={() => {
                loadVendors();
              }}
            >
              <option value="">----</option>
              {!vendors && <option value=""> Loading vendors ...</option>}
              {vendors?.map((item: Vendor, i: number) => {
                return (
                  <option value={item.id} key={i}>
                    {item.names}
                  </option>
                );
              })}
            </select>
            <span className="text-red-600 text-xs block mt-2">
              {errors.vendor?.message}
            </span>
            <div className="text-xs my-5">
              Vendor not registered?{" "}
              <Link href="/vendors/register">
                <a className="text-primary hover:underline">
                  Register vendor here
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* status */}

        <div className="form-group capitalize">
          <label htmlFor="status" className="mb-2 text-sm capitalize block">
            status
          </label>

          <div className="my-3 cursor-pointer text-gray-600 text-sm">
            <div
              className="flex gap-2 items-center"
              onClick={() => {
                setOrderStatus(EStatus.PENDING);
              }}
            >
              <div className="h-5 w-5 rounded-full border flex items-center justify-center">
                {orderStatus === EStatus.PENDING && (
                  <div className="bg-primary rounded-full h-3 w-3"></div>
                )}
              </div>
              <span>pending</span>
            </div>
          </div>

          <div className="my-3 cursor-pointer text-gray-600 text-sm">
            <div
              className="flex gap-2 items-center"
              onClick={() => {
                setOrderStatus(EStatus.DELIVERED);
              }}
            >
              <div className="h-5 w-5 rounded-full border flex items-center justify-center">
                {orderStatus === EStatus.DELIVERED && (
                  <div className="bg-primary rounded-full h-3 w-3"></div>
                )}
              </div>
              <span>delivered</span>
            </div>
          </div>
        </div>

        <Button
          title="Save"
          loading={loading}
          loadingTitle="Saving ..."
          small
        />
      </form>
    </div>
  );
}