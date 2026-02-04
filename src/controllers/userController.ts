import type { RequestHandler } from "express";
import { createAddressSchema } from "../schema/address.js";
import { prismaClient } from "../config/prisma.js";
import { NotFoundException } from "../exceptions/not-found.js";
import { ErrorCode } from "../exceptions/root.js";

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