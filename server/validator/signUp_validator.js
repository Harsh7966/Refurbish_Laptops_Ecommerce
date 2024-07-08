const {z} = require("zod");

const signUp_validator= z.object({
    name: z
    .string({required_error: "Name is required"})
    .trim()
    .min(5, {message: "Name atleast must be of 5 characters"})
    .max(20, {message: "Name must not be more than 20 characters"}),
    email: z
    .string({required_error: "Email is required"})
    .trim()
    .email({message: "Invalid email address"})
    .min(5, {message: "Email must be of atleast 5 characters."})
    .max(50, {message: "Email must not be more than 50 characters"}),
    phone: z
    .string({required_error: "Phone number is required"})
    .trim()
    .min(10, {message: "Phone atleast must be of 10 digits."})
    .max(20, {message: "Phone Number must not be more than 20 digits."}),
    password: z
    .string({message: "Password is required"})
    .trim()
    .min(5, {message: "Password atleast must be of 5 characters"})
    .max(50, {message: "Password must not be more than 50 characters"}),
});

module.exports= signUp_validator;
