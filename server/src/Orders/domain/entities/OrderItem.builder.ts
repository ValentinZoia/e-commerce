import { OrderItem } from "./OrderItem.entity";


export class OrderItemBuilder {
    private orderItem : OrderItem;

    constructor(){
        this.orderItem = new OrderItem();
    }
    setId(id: string | null): OrderItemBuilder {
        this.orderItem.id = id;
        return this;
    }
    setOrderId(orderId: string | null): OrderItemBuilder {
        this.orderItem.orderId = orderId;
        return this;
    }
    setProductId(productId: string): OrderItemBuilder {
        this.orderItem.productId = productId;
        return this;
    }
    setProductName(productName: string): OrderItemBuilder {
        this.orderItem.productName = productName;
        return this;
    }
    setQuantity(quantity: number): OrderItemBuilder {
        this.orderItem.quantity = quantity;
        return this;
    }
    setSize(size: string | null): OrderItemBuilder {
        this.orderItem.size = size;
        return this;
    }
    setUnitPrice(unitPrice: number): OrderItemBuilder {
        this.orderItem.unitPrice = unitPrice;
        return this;
    }
    setDiscount(discount: number): OrderItemBuilder {
        this.orderItem.discount = discount;
        return this;
    }
    setImageUrl(imageUrl: string | null): OrderItemBuilder {
        this.orderItem.imageUrl = imageUrl;
        return this;
    }
    build(): OrderItem {
        return this.orderItem;
    }
}