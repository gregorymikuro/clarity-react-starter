import type { Route } from "./+types/index";
import { useNavigate } from "react-router";
import { signOut } from "~/utils/auth-client";

export default function Dashboard({ matches }: Route.ComponentProps) {
  const { user } = matches[0].loaderData;

  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/");
        },
      },
    });
  }

  return (
    <div className="px-20 py-10">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p>Welcome {user!.name}!</p>
      <button
        type="button"
        onClick={handleSignOut}
        className="rounded bg-red-500 px-5 py-1.5 font-bold text-white hover:bg-red-700"
      >
        Sign Out
      </button>
    </div>
  );
}
