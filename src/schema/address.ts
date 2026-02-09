import { z } from "zod";

export const createAddressSchema = z.object({
    lineOne: z.string()
        .min(3, "Line one must be at least 3 characters long")
        .max(50, "Line one must be at most 50 characters long"),
    lineTwo: z.string()
        .min(3, "Line two must be at least 3 characters long")
        .max(50, "Description must be at most 50 characters long"),
    city: z.string()
        .min(3, "City must be at least 3 characters long")
        .max(50, "City must be at most 50 characters long"),
    country: z.string()
        .min(3, "Country must be at least 3 characters long")
        .max(50, "Country must be at most 50 characters long"),
    pincode: z.number(),
});

export const updateAddressSchema = z.object({
    lineOne: z.string()
        .min(3, "Line one must be at least 3 characters long")
        .max(50, "Line one must be at most 50 characters long")
        .optional(),
    lineTwo: z.string()
        .min(3, "Line two must be at least 3 characters long")
        .max(50, "Line two must be at most 50 characters long")
        .optional(),
    city: z.string()
        .min(3, "City must be at least 3 characters long")
        .max(50, "City must be at most 50 characters long")
        .optional(),
    country: z.string()
        .min(3, "Country must be at least 3 characters long")
        .max(50, "Country must be at most 50 characters long")
        .optional(),
    pincode: z.number()
        .optional(),
});
