import Head from "next/head";
import { api } from "~/utils/api";
import AppLayout from "~/components/layouts/AppLayout";
import Breadcrumbs from "~/components/partials/breadcrumbs";
import Link from "next/link";
import Card from "~/components/card";
import Image from "next/image";
import { useRouter } from "next/router";

export default function SingleProject() {
  const {
    query: { slug },
  } = useRouter();

  const id = parseInt(slug as string);
  const { data: client, isLoading } = api.clients.getById.useQuery(id);
  return (
    <AppLayout isLoading={isLoading}>
      <Head>
        <title>Sally: {client?.name}</title>
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
            label: client?.name ?? "",
          },
        ]}
      />
      <header className="mb-8 flex items-center justify-between ">
        <div className="flex items-center space-x-3">
          {client?.logo && (
            <Image
              src={client.logo}
              width={72}
              height={72}
              alt=""
              className="rounded-full bg-gray-200"
            />
          )}
          <div>
            <div className="text-sm font-medium text-gray-500">Projects</div>
            <h1 className="text-4xl font-bold">{client?.name}</h1>
          </div>
        </div>
        <Link className="btn btn-sm" href={`/clients/${client?.id}/edit`}>
          Edit
        </Link>
      </header>
      <Card title="Projects">Projects will load here</Card>
    </AppLayout>
  );
}
