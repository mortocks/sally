import { signIn, getProviders } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { authOptions } from "../../server/auth";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="container flex h-screen grow flex-col items-center justify-center">
      <div className="mx-auto w-full max-w-md">
        <h2 className="mb-8 text-3xl">Welcome to Sally</h2>
        <h1 className="mb-8 text-4xl">Sign in</h1>

        <hr className="my-12" />

        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="btn btn-primary btn-block"
              // eslint-disable-next-line
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
