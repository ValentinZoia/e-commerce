export class Category {
    constructor(
        public id: string | null,
        public name: string,
        public slug: string,
        public description: string | null = null,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {}
}