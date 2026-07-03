import { z } from "zod";

export const SERVICE_CATEGORIES = [
  "Remodeling & Renovation",
  "Handyman & General Repairs",
  "MEP Services (Plumbing & Electrical)",
  "Exterior & Outdoor Structures",
] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(30)
    .regex(/^[+()\-\s\d]+$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(255),
  project_description: z.string().trim().min(2).max(500),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const projectSchema = z.object({
  title: z.string().trim().min(2).max(120),
  category: z.string().trim().min(2).max(80),
  description: z.string().trim().max(1000).default(""),
  image_url: z.string().trim().url("Must be a full image URL").max(500),
  location: z.string().trim().max(120).default(""),
});

export type ProjectInput = z.infer<typeof projectSchema>;
