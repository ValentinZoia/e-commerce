import { CheckoutSession } from "../../domain/entities/CheckoutSession.entity";
import prisma from "../../../shared/infrastructure/database/prismaClient";
import { ICheckoutRepository } from "../../domain/interfaces";
import { Checkout as CheckoutPrisma, Prisma } from "../../../generated/prisma";

export class PrismaCheckoutRepositoryImpl implements ICheckoutRepository {
  async save(session: CheckoutSession): Promise<void> {
    await prisma.checkout.create({
      data: {
        id: session.id,
        userId: session.userId,
        expiresAt: session.expiresAt,
        createdAt: session.createdAt,
      },
    });
  }
  async findById(id: string): Promise<CheckoutSession | null> {
    const checkoutSession = await prisma.checkout.findUnique({
      where: { id },
    });
    if (!checkoutSession) return null;
    return this.mapPrismaToOrder(checkoutSession);
  }

  async delete(id: string): Promise<void> {
    await prisma.checkout.delete({
      where: { id },
    });
  }

  private mapPrismaToOrder(prismaCheckout: CheckoutPrisma): CheckoutSession {
    return new CheckoutSession(
      prismaCheckout.id,
      prismaCheckout.userId,
      prismaCheckout.expiresAt,
      prismaCheckout.createdAt
    );
  }
}
