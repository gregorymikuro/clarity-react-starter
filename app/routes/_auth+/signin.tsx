import type { Route } from "./+types/signin";
import Button from "~/components/Button";
import Input from "~/components/Input";
import { signIn } from "~/utils/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const signInSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function SignIn() {
  const signInForm = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignIn = async (data: SignInForm) => {
    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/dashboard",
      fetchOptions: {},
    });

    if (error) {
      toast.error(error.message || "Sign in failed. Please try again.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="border-brand-7 bg-brand-1 text-brand-2 rounded-lg border shadow-sm">
        <div className="space-y-1 p-6 text-center">
          <h3 className="text-2xl leading-none font-semibold tracking-tight">Welcome</h3>
          <p className="text-brand-2 text-sm">Sign in to your account</p>
        </div>

        <div className="ring-offset-brand-1 focus-visible:ring-brand-12 mt-2 w-full space-y-4 p-6 pt-0 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none">
          <form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              id="signin-email"
              placeholder="Enter your email"
              errorText={signInForm.formState.errors.email?.message}
              {...signInForm.register("email")}
              required
            />
            <Input
              label="Password"
              type="password"
              id="signin-password"
              placeholder="Enter your password"
              errorText={signInForm.formState.errors.password?.message}
              {...signInForm.register("password")}
              required
            />

            <Button type="submit">Sign In</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
