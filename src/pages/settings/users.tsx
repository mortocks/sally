import Head from "next/head";
import { api } from "~/utils/api";
import AppLayout from "~/components/layouts/AppLayout";
import Breadcrumbs from "~/components/partials/breadcrumbs";
import Link from "next/link";
export default function Settings() {
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
            label: "Settings",
          },
        ]}
      />
      <h1 className="text-3xl font-bold">Users</h1>
      <div className="flex w-full justify-end">
        <div className="tabs tabs-boxed">
          <Link href="/settings" className="tab">
            Organization
          </Link>
          <span className="tab tab-active">Users</span>
        </div>
      </div>
    </AppLayout>
  );
}
