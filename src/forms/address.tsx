import * as z from "zod";
export const addressSchema = z.object({
  streetNumber: z.string(),
  street: z.string(),
  suburb: z.string(),
  city: z.string(),
  postcode: z.string(),
  lotNumbers: z
    .string()
    .refine(
      (value) => /(\d+)[^,]$/.test(value),
      "Should a comma separated list of numbers",
    ),
  unitNumbers: z
    .string()
    .refine(
      (value) => /(\d+)[^,]$/.test(value),
      "Should a comma separated list of numbers",
    ),
  position: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
});
export type AddressSchema = z.infer<typeof addressSchema>;
