import { AddOrderRequestModel } from "./addOrderRequestModel";
import {
    ADD_ORDER_SUPPLIER,
    GET_ALL_PRODUCTS,
    GET_BRANCHES,
    GET_ORDERS,
    GET_PRODUCTS_BY_SUPPLIER_ID,
    GET_SUPPLIERS,
    GET_USERS,
    GET_PRODUCTS_RECOMENDED_AMOUNT,
    GET_BRANCH_BY_USER_ID,
    ADD_TRANSFER,
    GET_ALL_TRANSFERS,
    EDIT_TRANSFER
} from "./serviceApiConstants";


/**
 * Edit trannsfer between branches
 * @returns @see baseFetch()
 */
 const editTransferBetweenBranches = async (transferId, request) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };
    return baseFetch(EDIT_TRANSFER(transferId), requestOptions)
}


/**
 * Add trannsfer between branches
 * @returns @see baseFetch()
 */
const addTransferBetweenBranches = async (fromBranch, toBranch, request) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };
    return baseFetch(ADD_TRANSFER(fromBranch, toBranch), requestOptions)
}

/**
 * Get Branches Transfers
 * @returns @see baseFetch()
 */
 const getAllTransfers = () => {
    return baseFetch(GET_ALL_TRANSFERS)
}

/**
 * Get Products smmart algo
 * @returns @see baseFetch()
 */
const getProductsSmartAlgo = async (branchId) => {
    return baseFetch(GET_PRODUCTS_RECOMENDED_AMOUNT(branchId))
}

/**
 * Get all users orders
 * @returns @see baseFetch()
 */
const getOrders = async () => {
    return baseFetch(GET_ORDERS)
}

/**
 * Get all users
 * @returns @see baseFetch()
 */
const getUsers = async () => {
    return baseFetch(GET_USERS)
}

/**
 * Get all suppliers
 * @returns @see baseFetch()
 */
async function getSuppliers() {
    return baseFetch(GET_SUPPLIERS)
}

/**
 * get all products
 * @returns @see baseFetch()
 */
async function getProducts() {
    return baseFetch(GET_ALL_PRODUCTS)
}

/**
 * get Branche By User Id
 * @returns @see baseFetch()
 */
async function getBrancheByUserId(userId) {
    return baseFetch(GET_BRANCH_BY_USER_ID(userId))
}

/**
 * get all branches
 * @returns @see baseFetch()
 */
async function getBranches() {
    return baseFetch(GET_BRANCHES)
}

/**
 * get product by supplier id
 * @param {Int8Array} id 
 * @returns @see baseFetch()
 */
async function getProductsBySupplierId(id) {
    return baseFetch(GET_PRODUCTS_BY_SUPPLIER_ID(id))
}

/**
 * add order to server
 * @param {AddOrderRequestModel} request 
 * @returns @see baseFetch()
 */
async function addOrder(request) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };
    return baseFetch(ADD_ORDER_SUPPLIER, requestOptions)
}

/**
 * service api base fetch function
 * @param {String} url 
 * @returns Success Object json
 * @returns Error String 
 */
async function baseFetch(url, options = "") {
    // console.log("FETCH URL :" + url)
    try {
        let response = await fetch(url, options);
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error
    }
}

export {
    getUsers,
    getSuppliers,
    getProducts,
    getBranches,
    getProductsBySupplierId,
    addOrder,
    getProductsSmartAlgo,
    getBrancheByUserId,
    addTransferBetweenBranches,
    getAllTransfers,
    editTransferBetweenBranches
}