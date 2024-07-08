const {z} = require("zod");

const updateValidator= z.object({
    
    email: z
    .string({required_error: "Email is required"})
    .trim()
    .email({message: "Invalid email address"})
    .min(5, {message: "Email must be of atleast 5 characters."})
    .max(50, {message: "Email must not be more than 50 characters"}),
    password: z
    .string({message: "Password is required"})
    .trim()
    .min(5, {message: "Password atleast must be of 5 characters"})
    .max(50, {message: "Password must not be more than 50 characters"}),
});

module.exports= updateValidator;
