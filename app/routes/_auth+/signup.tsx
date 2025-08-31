import type { Route } from "./+types/signup";
import Button from "~/components/Button";
import Input from "~/components/Input";
import { signUp } from "~/utils/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const signUpForm = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSignUp = async (data: SignUpForm) => {
    const results = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: "/dashboard",
    });

    if (results.error) {
      console.log("Sign up error:", results.error);
    }

    console.log("Sign up:", results);
  };

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Card */}
      <div className="border-brand-7 bg-brand-1 text-brand-2 rounded-lg border shadow-sm">
        {/* Card Header */}
        <div className="space-y-1 p-6 text-center">
          <h3 className="text-2xl leading-none font-semibold tracking-tight">Welcome</h3>
          <p className="text-brand-2 text-sm">Sign in to your account or create a new one</p>
        </div>

        {/* Card Content */}
        <div className="ring-offset-brand-1 focus-visible:ring-brand-12 mt-2 space-y-4 p-6 pt-0 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none">
          <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-4">
            <Input
              label="Full Name"
              id="signup-name"
              type="text"
              placeholder="Enter your full name"
              errorText={signUpForm.formState.errors.name?.message}
              {...signUpForm.register("name")}
            />

            <Input
              label="Email"
              id="signup-email"
              type="email"
              placeholder="Enter your email"
              errorText={signUpForm.formState.errors.email?.message}
              {...signUpForm.register("email")}
            />

            <Input
              label="Password"
              id="signup-password"
              type="password"
              placeholder="Create a password"
              errorText={signUpForm.formState.errors.password?.message}
              {...signUpForm.register("password")}
            />

            <Input
              label="Confirm Password"
              id="signup-confirm-password"
              type="password"
              placeholder="Confirm your password"
              errorText={signUpForm.formState.errors.confirmPassword?.message}
              {...signUpForm.register("confirmPassword")}
            />

            <Button type="submit">Create Account</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
