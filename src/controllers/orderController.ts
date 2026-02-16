import type { Request, Response, RequestHandler } from "express";
import { prismaClient } from "../config/prisma.js";

/**
 * Create order
 * @param req 
 * @param res 
 * @returns 
 */
export const createOrder: RequestHandler = async (req: Request, res: Response) => {
    return await prismaClient.$transaction(async (tx) => {
        // Get all cart items of user
        const cartItems = await tx.cartItem.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                product: true
            }
        })

        if (cartItems.length === 0) {
            return res.json({ message: "Cart is empty" })
        }

        // Calculate total price
        const price = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

        // Get shipping address
        const address = await tx.address.findFirst({
            where: {
                id: req.user.defaultShippingAddress
            }
        })

        // Create order
        const order = await tx.order.create({
            data: {
                userId: req.user.id,
                netAmount: price,
                address: address!.formattedAddress,
                products: {
                    create: cartItems.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity
                    }))
                }
            }
        })

        // Create order event
        const orderEvent = await tx.orderEvent.create({
            data: {
                orderId: order.id,
            }
        })

        // Delete all cart items of user
        await tx.cartItem.deleteMany({
            where: {
                userId: req.user.id
            }
        })

        return res.json({ message: "Order created successfully" })
    })
}

/**
 * List all orders
 * @param req 
 * @param res 
 * @returns 
 */
export const listOrder: RequestHandler = async (req: Request, res: Response) => {
    const orders = await prismaClient.order.findMany({
        where: {
            userId: req.user.id
        }
    })

    return res.json(orders)
}

/**
 * Cancel order
 * @param req 
 * @param res 
 * @returns 
 */
export const cancelOrder: RequestHandler = async (req: Request, res: Response) => {
    try {
        await prismaClient.$transaction(async (tx) => {
            // find order
            const order = await tx.order.findFirstOrThrow({
                where: {
                    id: Number(req.params.id),
                    userId: req.user.id
                }
            })

            if (!order) {
                return res.json({ message: "Order not found" })
            }

            // update order status
            await tx.order.update({
                where: {
                    id: order.id
                },
                data: {
                    status: 'CANCELLED'
                }
            })

            // update order event
            await tx.orderEvent.create({
                data: {
                    orderId: order.id,
                    status: 'CANCELLED'
                }
            })
        })

        return res.json({ message: "Order cancelled successfully" })
    } catch (error) {
        return res.json({ message: "Order not found" })
    }
}

/**
 * Get order by id
 * @param req 
 * @param res 
 * @returns 
 */
export const getOrder: RequestHandler = async (req: Request, res: Response) => {
    try {
        const order = await prismaClient.order.findFirstOrThrow({
            where: {
                id: Number(req.params.id),
                userId: req.user.id
            },
            include: {
                products: true,
                events: true
            }
        })

        return res.json(order)
    } catch (error) {
        return res.json({ message: "Order not found" })
    }
}
