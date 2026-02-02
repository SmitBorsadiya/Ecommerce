import { PrismaClient } from "../generated/prisma/index.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { DATABASE_URL } from "./secrets.js";

const adapter = new PrismaMariaDb(DATABASE_URL);

export const prismaClient = new PrismaClient({
    adapter,
    log: ["query"],
});