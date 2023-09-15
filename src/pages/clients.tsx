import Head from "next/head";
import { api } from "~/utils/api";
import AppLayout from "~/components/layouts/AppLayout";
import Breadcrumbs from "~/components/partials/breadcrumbs";
import Link from "next/link";
export default function Clients() {
  return (
    <AppLayout>
      <Head>
        <title>Sally: Projects</title>
        <meta name="description" content="Sally dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Breadcrumbs
        crumbs={[
          {
            label: "Clients",
          },
        ]}
      />
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Clients</h1>
        <Link href="/clients/new" className="btn btn-primary">
          New client
        </Link>
      </div>
    </AppLayout>
  );
}
