const BASE_API = 'https://proj.ruppin.ac.il/bgroup16/test2/api/';

//Suppliers API
export const GET_SUPPLIERS = BASE_API + 'suppliers/GetSuppliers';

//Users API
export const GET_USERS = BASE_API + 'users/GetUsers';
export const GET_USER_BY_ID=(id)=> BASE_API + 'users/GetUser/' + id;;

//Products API
export const GET_ALL_PRODUCTS = BASE_API + 'rawproducts/GetRawProducts';
export const GET_PRODUCTS_BY_SUPPLIER_ID=(id)=> BASE_API + 'rawproducts/GetRawProductsBySupplier/' + id;

//Orders API
export const GET_ORDERS = BASE_API + 'orders/GetOrders';
export const ADD_ORDER_SUPPLIER = BASE_API + 'orders/AddOrder';
export const GET_BRANCH_ORDERS=(id)=> BASE_API + 'orders/GetOrdersByBranch/' + id;


//Dashboard API
export const GET_PRODUCTS_RECOMENDED_AMOUNT=(branchId)=> BASE_API + 'SmartAlgo/GetSmartAlgo/' + branchId;


//Branches API
export const GET_BRANCHES = BASE_API + 'branches/GetBranches';
export const GET_BRANCH_BY_USER_ID=(id)=> BASE_API + 'branches/GetBranch/' + id;

//Transfers
export const ADD_TRANSFER=(fromBranch, toBranch) => BASE_API + 'transfers/AddTransfer/' + fromBranch + '/' + toBranch;
export const EDIT_TRANSFER=(transferId) => BASE_API + 'transfers/EditTransfer/' + transferId;
export const GET_ALL_TRANSFERS = BASE_API + 'transfers/GetAllTransfers';

