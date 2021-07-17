class AddOrderRequestModel {
    constructor(        
        orderId = 0,
        branchId,
        orderDate,
        shippingDate,
        status = "",
        branch = {},
        conversations = [],
        rawproductsinorders = [],
        rawproductsintransfers = []	
){
            this.orderId = orderId,
            this.branchId = branchId,
            this.orderDate = orderDate,
            this.shippingDate = shippingDate,
            this.branch = branch,
            this.status = status,
            this.conversations = conversations,
            this.rawproductsinorders = rawproductsinorders,
            this.rawproductsintransfers = rawproductsintransfers
        }
}

class Rawproductsinorder {
    constructor(
        orderId,
        contactName,
        rawproductId,
        rawProductName,
        rawProductPicture,
        orderAmount,
        weightName,
        orderPrice
    ){
        this.orderId = orderId,
        this.contactName = contactName,
        this.rawproductId = rawproductId,
        this.rawProductName = rawProductName,
        this.rawProductPicture = rawProductPicture,
        this.orderAmount = orderAmount,
        this.weightName = weightName,
        this.orderPrice = orderPrice
    }

}


export {AddOrderRequestModel, Rawproductsinorder}