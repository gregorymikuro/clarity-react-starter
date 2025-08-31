import type { Route } from "./+types/index";
import { Link, href } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Clarity React Starter" }];
}

export default function Home() {
  return (
    <div className="grid h-full place-items-center">
      <div className="space-y-5">
        <h1 className="text-center text-4xl font-bold">Hi Cousins!</h1>
        <div className="flex items-center justify-center gap-5 border-t px-10 pt-5">
          <Link
            to={href("/signin")}
            className="font-semibold underline decoration-blue-600 decoration-wavy"
          >
            Sign In
          </Link>
          <Link
            to={href("/signup")}
            className="font-semibold underline decoration-blue-600 decoration-wavy"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
