import { prismaClient } from "../config/prisma.js";
import type { RequestHandler } from "express";
import { addItemToCartSchema, changeQuantitySchema } from "../schema/cart.js";
import { NotFoundException } from "../exceptions/not-found.js";
import { ErrorCode } from "../exceptions/root.js";

/**
 * Add item to cart
 * @param req 
 * @param res 
 * @returns {Promise<void>}
 */
export const addItemToCart: RequestHandler = async (req, res) => {
    const validated = addItemToCartSchema.parse(req.body);

    let product = null;
    try {
        product = await prismaClient.product.findFirstOrThrow({
            where: {
                id: validated.productId,
            }
        })
    }
    catch (error) {
        throw new NotFoundException("Product not found", ErrorCode.NOT_FOUND);
    }

    // If the item is already in the cart, update the quantity
    const existingCartItem = await prismaClient.cartItem.findFirst({
        where: {
            userId: (req as any).user.id,
            productId: validated.productId,
        }
    })

    if (existingCartItem) {
        await prismaClient.cartItem.update({
            where: {
                id: existingCartItem.id
            },
            data: {
                quantity: existingCartItem.quantity + validated.quantity
            }
        })
        return res.json({ success: true, message: "Item quantity updated successfully" });
    }

    const userId = (req as any).user.id;
    const cartItem = await prismaClient.cartItem.create({
        data: {
            userId: userId,
            ...validated
        }
    })

    res.json({ success: true, message: "Item added to cart successfully" });
}

/**
 * Get cart items
 * @param req 
 * @param res 
 * @returns {Promise<void>}
 */
export const getCart: RequestHandler = async (req, res) => {
    const userId = (req as any).user.id;
    const cartItems = await prismaClient.cartItem.findMany({
        where: {
            userId
        },
        include: {
            product: true
        }
    })

    res.json({ success: true, cartItems });
}

/**
 * Delete cart item
 * @param req 
 * @param res 
 * @returns {Promise<void>}
 */
export const deleteCartItem: RequestHandler = async (req, res) => {
    const cartItemId = Number(req.params.id);

    await prismaClient.cartItem.delete({
        where: {
            id: cartItemId,
            userId: (req as any).user.id
        }
    })

    res.json({ success: true, message: "Item deleted successfully" });
}

/**
 * Change item quantity
 * @param req 
 * @param res 
 * @returns {Promise<void>}
 */
export const changeItemQuantity: RequestHandler = async (req, res) => {
    const validated = changeQuantitySchema.parse(req.body);

    await prismaClient.cartItem.update({
        where: {
            id: Number(req.params.id),
            userId: (req as any).user.id
        },
        data: {
            quantity: validated.quantity
        }
    })

    res.json({ success: true, message: "Item quantity updated successfully" });
}