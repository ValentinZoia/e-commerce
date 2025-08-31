export type Banner = {
  imageUrl: string;
  title: string | null;
  description: string | null;
  redirectUrl: string | null;
};

export class StoreCustomer {
  constructor(
    public readonly id: string | null,
    public readonly nameStore: string,
    public readonly logo: string | null,
    public readonly banners: Banner[]
  ) {}
}
