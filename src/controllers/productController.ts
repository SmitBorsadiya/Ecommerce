import type { RequestHandler } from "express";
import { createProductSchema, updateProductSchema } from "../schema/product.js";
import { prismaClient } from "../config/prisma.js";
import type { Prisma } from "@prisma/client/extension";
import { NotFoundException } from "../exceptions/not-found.js";
import { ErrorCode } from "../exceptions/root.js";

/**
 * Get all products
 * @param req 
 * @param res 
 * @param next 
 * @returns {Promise<Response>}
 */
export const getAllProducts: RequestHandler = async (req, res, next) => {
    const count = await prismaClient.product.count();
    const products = await prismaClient.product.findMany();

    res.status(200).json({ message: "Products fetched successfully", products, count });
}

/**
 * Create product
 * @param req 
 * @param res 
 * @param next 
 * @returns {Promise<Response>}
 */
export const createProduct: RequestHandler = async (req, res, next) => {
    const data = createProductSchema.parse(req.body);

    const product = await prismaClient.product.create({
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            tags: data.tags.join(",")
        }
    });

    res.status(200).json({ message: "Product created successfully", product });
}

/**
 * Get product by id
 * @param req 
 * @param res 
 * @param next 
 * @returns {Promise<Response>}
 */
export const getProductById: RequestHandler = async (req, res, next) => {
    const product = await prismaClient.product.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });

    res.status(200).json({ message: "Product fetched successfully", product });
}

/**
 * Update product
 * @param req 
 * @param res 
 * @param next 
 * @returns {Promise<Response>}
 */
export const updateProduct: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            throw new Error("Invalid product id");
        }

        const product = updateProductSchema.parse(req.body);

        // Build update data, only including defined fields
        const updateData: Record<string, string | number> = {};
        if (product.name !== undefined) updateData.name = product.name;
        if (product.description !== undefined) updateData.description = product.description;
        if (product.price !== undefined) updateData.price = product.price;
        if (product.tags !== undefined) updateData.tags = product.tags.join(",");

        const updatedProduct = await prismaClient.product.update({
            where: { id: id },
            data: updateData
        });

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        throw new NotFoundException("Product not found", ErrorCode.NOT_FOUND);
    }
}

/**
 * Delete product
 * @param req 
 * @param res 
 * @param next 
 * @returns {Promise<Response>}
 */
export const deleteProduct: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            throw new Error("Invalid product id");
        }

        const product = await prismaClient.product.delete({
            where: {
                id: id
            }
        });

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        throw new NotFoundException("Product not found", ErrorCode.NOT_FOUND);
    }
}