import z from "zod";

export const signinInput = z.object({
  email: z.string().email({ message: "Should be of valid email format!" }),
  password: z
    .string()
    .min(5, { message: "password should be atleast 5 characters" })
    .max(20, { message: "password too long" }),
});

export type signinType = z.infer<typeof signinInput>;

export const signupInput = z.object({
  email: z.string().email({ message: "Should be of valid email format!" }),
  password: z
    .string()
    .min(5, { message: "password should be atleast 5 characters" })
    .max(20, { message: "password too long" }),
});

export type signupType = z.infer<typeof signupInput>;

export const createPostInput = z.object({
  title: z.string().min(5, { message: "title too short must be 5 characters" }),
  content: z
    .string()
    .min(5, { message: "content should be atleast 5 characters" }),
});

export type createPostType = z.infer<typeof createPostInput>;

export const updatePostInput = z.object({
  id: z.string().min(3),
  title: z
    .string()
    .min(5, { message: "title too short must be 5 characters" })
    .optional(),
  content: z
    .string()
    .min(5, { message: "content should be atleast 5 characters" })
    .optional(),
});

export type updatePostType = z.infer<typeof updatePostInput>;

export type postType = {
  authorId: string;
  content: string;
  id: string;
  published: boolean;
  title: string;
};
