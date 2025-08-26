export class CheckoutSession {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly jwtToken: string,
    public readonly expiresAt: Date,
    public readonly createdAt: Date
  ) {}

  public isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  public isValid(): boolean {
    return !this.isExpired();
  }

  public getRemainingTimeInSeconds(): number {
    const now = new Date().getTime();
    const expiresTime = this.expiresAt.getTime();
    return Math.max(0, Math.floor((expiresTime - now) / 1000));
  }
}
