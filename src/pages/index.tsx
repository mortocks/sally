import Head from "next/head";
import { api } from "~/utils/api";
import AppLayout from "~/components/layouts/AppLayout";
import Breadcrumbs from "~/components/partials/breadcrumbs";

export default function Home() {
  return (
    <AppLayout>
      <Head>
        <title>Sally: Dashboard</title>
        <meta name="description" content="Sally dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Breadcrumbs crumbs={[{ label: "Dashboard" }]} />
      <h1 className="text-3xl font-bold">Dashboard</h1>
    </AppLayout>
  );
}
