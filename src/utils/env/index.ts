import "dotenv/config";
import z from "zod";

const envSchema = z.object({ GOOGLE_API_KEY: z.string() });

const env = envSchema.parse(process.env);

export { env };
