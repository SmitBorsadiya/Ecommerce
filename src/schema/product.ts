import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string()
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name must be at most 50 characters long"),
    description: z.string()
        .min(3, "Description must be at least 3 characters long")
        .max(50, "Description must be at most 50 characters long"),
    price: z.number()
        .min(0, "Price must be at least 0")
        .max(1000000, "Price must be at most 1000000"),
    tags: z.array(z.string())
        .min(1, "Tags must be at least 1")
        .max(10, "Tags must be at most 10"),
});

export const updateProductSchema = z.object({
    name: z.string()
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name must be at most 50 characters long")
        .optional(),
    description: z.string()
        .min(3, "Description must be at least 3 characters long")
        .max(50, "Description must be at most 50 characters long")
        .optional(),
    price: z.number()
        .min(0, "Price must be at least 0")
        .max(1000000, "Price must be at most 1000000")
        .optional(),
    tags: z.array(z.string())
        .min(1, "Tags must be at least 1")
        .max(10, "Tags must be at most 10")
        .optional(),
});
