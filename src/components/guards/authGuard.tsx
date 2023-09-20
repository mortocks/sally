import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else if (status === "unauthenticated") {
    // eslint-disable-next-line
    router.push("/auth/sign-in");
    return null;
  } else {
    return <>{children}</>;
  }
};

export default AuthGuard;
