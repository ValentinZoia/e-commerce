export type Installment = {
    quantity: number;
    amount: number;
}

export type Size = {
    name:string;
    stock: number;
}

export class Product {
    constructor(
        public id: string | null,
        public name: string,
        public description: string | null = null,
        public price: number,
        public discountPercentage: number | null,
        public cashPrice: number | null = null,
        public cashDiscountPercentage: number | null,
        public stock: number = 0,
        public sizes: Size[] = [],
        public currentSize: string | null = null,
        public freeShippingThreshold: number | null = null,
        public isFreeShipping: boolean = false,
        public isFeatured: boolean = false,
        public isPromotion: boolean = false,
        public isNew: boolean = false,
        public categoryId: string,
        public installments: Installment[] = [],
        public images: string[],
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {}
}