import {Gender, MaritialStatus } from "./enums";
export interface UserAuth {
  email: string;
  password: string;
}

export interface UserRegisterData {
  fname: string,
  lname: string,
  gender: Gender,
  age: number,
  dob: string,
  maritialStatus: MaritialStatus,
  nationality: string
}

export interface userForgotPassword {
  email: string;
}

export interface userResetPassword {
  email: string;
  code: number;
  newPassword: string;
  confirmPassword: string;
}

export interface DashboardProps {
  path: string;
  children: object;
}
export interface DashboardWithHeaderProps {
  path: string;
  headers: object;
  children: object;
}

export interface NavbarProps {
  names: string;
  email: string;
  image: string;
}
export interface LinkProps {
  href: string;
  children: object;
  access?: string[];
}
export interface SpanLinkProps {
  tab: object;
  tabName: string;
  children: object;
  routes: string;
  access?: string[];
}

export type MenuToggle = {
  tabName: string;
  active: boolean;
};

export interface Organisation {
  id: string;
  name: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  type: string;
  // organisation:Organisation
}
export interface IOrganisation {
  id: string;
  name: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  type: string;
  user: User;
  organisation: Organisation;
}
export interface Vendor {
  id: string;
  names: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  type: string;
}

export interface OrganisationUser {
  id?: string;
  role?: string;
  user?: User;
  organisation?: Organisation;
}

export interface User {
  id?: string;
  first_name: string;
  last_name: string;
  national_id: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  password: string;
  role: string;
  organisation: Organisation;
}

// export interface Vendor {
//   name: string
//   email: string
//   phone: string
//   address: string
//   type: string
// }

export interface AssetType {
  id: string;
  name: string;
  type: string;
}

export interface Asset {
  id: string;
  tag: string;
  name: string;
  model: string;
  brand: string;
  serial_number: string;
  asset_type: AssetType;
  unit_price: number;
  status: string;
  purchase_order: Order;
  description: string;
}

export interface Order {
  id: string;
  code: string;
  vendor: string;
  order_date: string;
  delivery_date: string;
  organisation: string;
  total_quantity: number;
  total_amount: number;
  status: string;
}

export interface CheckOut {
  id: string;
  organisation_user: string | any;
  asset: Asset | any;
  checkout_date: string;
  comment: string;
}
export interface ICheckOut {
  id: string;
  asset: Asset | any;
  checkout_date: string;
  organisation_user: IOrganisation | any;
  comment: string;
}

export interface CheckIn {
  asset_checkout: string | any;
  checkin_date: string;
  reason: string;
  comment: string;
}

export interface Transfer {
  source_organisation: string;
  source_initiator: string;
  destination_organisation: string;
  date_of_transfer: string;
  asset: string;
  comment: string;
}

export interface PasswordChangeProps {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface ToastProps {
  status: string;
  message: string;
}

export interface CardProps {
  title?: string;
  total?: number;
  comment?: string;
  percentile?: object;
}
export interface ReportCardProps {
  id: string;
  title: string;
  description: string;
}

export interface HeaderTabProps {
  title: { status: string; total: number };
  path: string;
  query: string;
  circleColor: string;
}

export interface MoreButtonProps {
  id: string;
  index: number;
  status: any;
  url: string;
  ServiceClass: string;
  path: string;
}

export interface TableProps {
  cols: string[];
  rows: [
    {
      // global var
      id?: string;
      status?: string;
      // asset
      tag?: string;
      asset: Asset;
      asset_checkout: ICheckOut;
      // organization
      name: string;
      contact_email: string;
      contact_phone: number;
      address: string;

      model?: string;
      serial_number?: string;
      asset_type?: AssetType;
      brand?: string;
      unit_price?: string;
      organisation_user: IOrganisation;

      //orders
      code: string;
      order_date: string;
      delivery_date: string;
      total_quantity: number;
      total_amount: number;
      vendor: Vendor;
      organisation: Organisation;

      // vendors
      names: string;
      type: string;
      supplierNames: string;

      // user
      user: User;

      // transfer
      source_initiator: any;
      source_organisation: any;
      destination_organisation: any;
      date_of_transfer: string;

      // dates
      checkout_date: string;
      checkin_date: string;
    }
  ];

  // delete modal
  action: { service: string; redirect: string };

  btnTitle: string;
  addPath: string;
  searchPlaceholder: string;
  hasActions: boolean;
  hasHeader: boolean;
}
export interface RedirectButtonProps {
  url: string;
  icon: object;
  title: string;
  float?: string;
}

export interface DeleteModalProps {
  id: string;
  item: string;
  ServiceClass: string;
  path: string;
}

// navsearch

export interface NavSearchTypes {
  name: string;
  path: string;
  description: string;
  dataSet: string;
  access: string[];
}
export interface LoadingBgProps {
  operationTitle: string;
}

export interface Password {
  old_password: string;
  new_password: string;
}

export interface  IPagination {
  url: string;
  label: object;
  active: boolean;
}
export interface PaginationProps {
  pages: IPagination[];
  service: string;
}

export interface IPaginationButton {
  service: string;
  page: number;
  rows: number;
}

export interface DeleteModalProps {
  open: boolean;
  item: string;
  id: string;
  ServiceClass: string;
  path: string;
}
export interface ChangeStatusModalProps {
  open: boolean;
  item: string;
  id: string;
  status: string;
  ServiceClass: string;
  path: string;
}

type StatOrganisation = {
  HEAD_OFFICE?: number;
  JOINT_VENDOR?: number;
  SUBSIDIARY?: number;
  total?: number;
};

type StatOrganisationUsers = {
  ADMIN: number;
  CEO: number;
  EMPLOYEE: number;
  total: number;
};

export type StatisticalReport = {
  organisations?: StatOrganisation;
  organisation_users?: StatOrganisationUsers;
  assets?: { total: number };
};

export type ModelStatus = {
  status: string;
  color: string;
  parent?: string;
};


