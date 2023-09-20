import Head from "next/head";
import { api } from "~/utils/api";
import AppLayout from "~/components/layouts/AppLayout";
import Breadcrumbs from "~/components/partials/breadcrumbs";
import Link from "next/link";
import Card from "~/components/card";
import Image from "next/image";

export default function Clients() {
  const { data: clients = [], isLoading } = api.clients.getAll.useQuery();

  return (
    <AppLayout isLoading={isLoading}>
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
        <div className="mb-6">
          <h1 className="text-4xl font-bold">Clients</h1>
        </div>
        <Link href="/clients/new" className="btn btn-primary">
          New client
        </Link>
      </div>

      <Card>
        <table>
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
          </tr>
          {clients.map((client) => (
            <tr
              key={client.id}
              className="rounded-md p-4 odd:bg-gray-200 hover:bg-gray-300"
            >
              <td className="w-[40px] px-4">
                {client.logo ? (
                  <Link href={`/clients/${client.id}`}>
                    <Image
                      src={client.logo}
                      width={40}
                      height={40}
                      alt=""
                      className="h-[40px] w-[40px] rounded-full bg-gray-300"
                    />
                  </Link>
                ) : (
                  <div className="h-[40px] w-[40px] rounded-full bg-gray-300" />
                )}
              </td>
              <td className="rounded-md py-4 text-left" key={client.id}>
                <Link
                  className="text-left text-primary"
                  href={`/clients/${client.id}`}
                >
                  {client.name}
                </Link>
              </td>
              <td className="text-align-right w-[120px]">
                {client.isActive ? (
                  <div className="badge badge-success gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-4 w-4 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                    Active
                  </div>
                ) : (
                  <div className="badge badge-error gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-4 w-4 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                    Archived
                  </div>
                )}
              </td>
            </tr>
          ))}
        </table>
      </Card>
    </AppLayout>
  );
}
