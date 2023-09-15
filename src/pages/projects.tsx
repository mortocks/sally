import Head from "next/head";
import { api } from "~/utils/api";
import AppLayout from "~/components/layouts/AppLayout";
import Breadcrumbs from "~/components/partials/breadcrumbs";

export default function Projects() {
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
            label: "Projects",
          },
        ]}
      />
      <h1 className="text-3xl font-bold">Projects</h1>
    </AppLayout>
  );
}
