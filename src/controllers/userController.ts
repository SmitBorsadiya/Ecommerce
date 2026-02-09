import type { RequestHandler } from "express";
import { createAddressSchema } from "../schema/address.js";
import { prismaClient } from "../config/prisma.js";
import { NotFoundException } from "../exceptions/not-found.js";
import { ErrorCode } from "../exceptions/root.js";
import { updateUserSchema } from "../schema/user.js";
import { BadRequestException } from "../exceptions/bad-request.js";

/**
 * Create a new address
 * @param req 
 * @param res 
 * @returns {Promise<void>}
 */
export const createAddress: RequestHandler = async (req, res) => {
    createAddressSchema.parse(req.body);

    await prismaClient.address.create({
        data: {
            ...req.body,
            userId: (req as any).user.id,
        },
    });
    res.json("Address created successfully");
}

/**
 * Delete an address
 * @param req 
 * @param res 
 * @returns {Promise<void>}
 */
export const deleteAddress: RequestHandler = async (req, res) => {
    try {
        await prismaClient.address.delete({
            where: {
                id: Number(req.params.id),
            },
        });
        res.json("Address deleted successfully");
    } catch (error) {
        throw new NotFoundException("Address not found", ErrorCode.NOT_FOUND);
    }
}

/**
 * List all addresses
 * @param req 
 * @param res 
 * @returns {Promise<void>}
 */
export const listAddress: RequestHandler = async (req, res) => {
    const addresses = await prismaClient.address.findMany({
        where: {
            userId: (req as any).user.id,
        },
    });
    res.json(addresses);
}

/**
 * Update user information
 * @param req 
 * @param res 
 * @returns {Promise<void>}
 */
export const updateUser: RequestHandler = async (req, res) => {
    const validated = updateUserSchema.parse(req.body);

    let defaultAddress = null;
    let billingAddress = null;
    if (validated.defaultShippingAddress) {
        try {
            defaultAddress = await prismaClient.address.findFirstOrThrow({
                where: {
                    id: validated.defaultShippingAddress,
                },
            })
        } catch (error) {
            throw new NotFoundException("Address not found", ErrorCode.NOT_FOUND);
        }
        if (defaultAddress.userId !== (req as any).user.id) {
            throw new BadRequestException("Address not found", ErrorCode.NOT_FOUND);
        }
    }

    if (validated.defaultBillingAddress) {
        try {
            billingAddress = await prismaClient.address.findFirstOrThrow({
                where: {
                    id: validated.defaultBillingAddress
                },
            })
        } catch (error) {
            throw new NotFoundException("Address not found", ErrorCode.NOT_FOUND);
        }
        if (billingAddress.userId !== (req as any).user.id) {
            throw new BadRequestException("Address not found", ErrorCode.NOT_FOUND);
        }
    }

    const updatedUser = await prismaClient.user.update({
        where: {
            id: (req as any).user.id,
        },
        data: validated as any
    })
    res.json(updatedUser);
}