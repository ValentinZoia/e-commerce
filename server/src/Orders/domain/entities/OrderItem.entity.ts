export class OrderItem {
    constructor(
        public id: string | null = null,
        public orderId: string | null = null,
        public productId: string = '',
        public productName: string = '',
        public quantity: number = 1,
        public size: string | null = null,
        public unitPrice: number = 0,
        public discount: number = 0,
        public imageUrl: string | null = null
    ) {}
}