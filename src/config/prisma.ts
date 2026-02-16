import { PrismaClient } from "../generated/prisma/index.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { DATABASE_URL } from "./secrets.js";

const adapter = new PrismaMariaDb(DATABASE_URL);

export const prismaClient = new PrismaClient({
    adapter,
    log: ["query"],
}).$extends({
    result: {
        address: {
            formattedAddress: {
                needs: {
                    lineOne: true,
                    lineTwo: true,
                    city: true,
                    country: true,
                    pincode: true
                },
                compute: (address) => {
                    return `${address.lineOne}, ${address.lineTwo}, ${address.city}, ${address.country}, ${address.pincode}`
                }
            }
        }
    }
});