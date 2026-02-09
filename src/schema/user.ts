import { z } from "zod";

export const signupSchema = z.object({
    name: z.string()
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name must be at most 50 characters long"),
    email: z.string()
        .email()
        .toLowerCase(),
    role: z.enum(["ADMIN", "USER"]),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .max(50, "Password must be at most 50 characters long"),
});

export const loginSchema = z.object({
    email: z.string()
        .email()
        .toLowerCase(),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .max(50, "Password must be at most 50 characters long"),
});

export const updateUserSchema = z.object({
    name: z.string().optional(),
    defaultBillingAddress: z.number().optional(),
    defaultShippingAddress: z.number().optional(),
})