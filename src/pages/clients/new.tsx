import Head from "next/head";
import { api } from "~/utils/api";
import AppLayout from "~/components/layouts/AppLayout";
import Breadcrumbs from "~/components/partials/breadcrumbs";
import Link from "next/link";
export default function NewClients() {
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
            href: "/clients",
          },
          {
            label: "New Client",
          },
        ]}
      />
      <h1 className="text-3xl font-bold">New Client</h1>
    </AppLayout>
  );
}
