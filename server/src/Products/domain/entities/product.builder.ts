import { Product, Size, Installment } from "./product.entity";


export class ProductBuilder{
    private product: Product
    constructor(){
        this.product = new Product()
    }
    setId(id: string | null): ProductBuilder {
        this.product.id = id;
        return this;
    }

    setName(name: string): ProductBuilder {
        this.product.name = name;
        return this;
    }

    setDescription(description: string | null): ProductBuilder {
        this.product.description = description;
        return this;
    }

    setPrice(price: number): ProductBuilder {
        this.product.price = price;
        return this;
    }

    setDiscountPercentage(discountPercentage: number | null): ProductBuilder {
        this.product.discountPercentage = discountPercentage;
        return this;
    }

    setCashPrice(cashPrice: number | null): ProductBuilder {
        this.product.cashPrice = cashPrice;
        return this;
    }

    setCashDiscountPercentage(cashDiscountPercentage: number | null): ProductBuilder {
        this.product.cashDiscountPercentage = cashDiscountPercentage;
        return this;
    }

    setStock(stock: number): ProductBuilder {
        this.product.stock = stock;
        return this;
    }

    setSizes(sizes: Size[]): ProductBuilder {
        this.product.sizes = sizes;
        return this;
    }

    addSize(size: Size): ProductBuilder {
        this.product.sizes.push(size);
        return this;
    }

    setCurrentSize(currentSize: string | null): ProductBuilder {
        this.product.currentSize = currentSize;
        return this;
    }

    setFreeShippingThreshold(threshold: number | null): ProductBuilder {
        this.product.freeShippingThreshold = threshold;
        return this;
    }

    setIsFreeShipping(isFreeShipping: boolean): ProductBuilder {
        this.product.isFreeShipping = isFreeShipping;
        return this;
    }

    setIsFeatured(isFeatured: boolean): ProductBuilder {
        this.product.isFeatured = isFeatured;
        return this;
    }

    setIsPromotion(isPromotion: boolean): ProductBuilder {
        this.product.isPromotion = isPromotion;
        return this;
    }

    setIsNew(isNew: boolean): ProductBuilder {
        this.product.isNew = isNew;
        return this;
    }

    setCategoryId(categoryId: string): ProductBuilder {
        this.product.categoryId = categoryId;
        return this;
    }

    setInstallments(installments: Installment[]): ProductBuilder {
        this.product.installments = installments;
        return this;
    }

    addInstallment(installment: Installment): ProductBuilder {
        this.product.installments.push(installment);
        return this;
    }

    setImages(images: string[]): ProductBuilder {
        this.product.images = images;
        return this;
    }

    addImage(image: string): ProductBuilder {
        this.product.images.push(image);
        return this;
    }

    setCreatedAt(createdAt: Date): ProductBuilder {
        this.product.createdAt = createdAt;
        return this;
    }

    setUpdatedAt(updatedAt: Date): ProductBuilder {
        this.product.updatedAt = updatedAt;
        return this;
    }

    // Métodos de conveniencia para configuraciones comunes
    setAsFeatured(): ProductBuilder {
        this.product.isFeatured = true;
        return this;
    }

    setAsPromotion(discountPercentage: number): ProductBuilder {
        this.product.isPromotion = true;
        this.product.discountPercentage = discountPercentage;
        return this;
    }

    setAsNew(): ProductBuilder {
        this.product.isNew = true;
        return this;
    }

    enableFreeShipping(threshold?: number): ProductBuilder {
        this.product.isFreeShipping = true;
        if (threshold) {
            this.product.freeShippingThreshold = threshold;
        }
        return this;
    }
    build(): Product {
        
        return this.product;
    }
}

