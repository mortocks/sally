import Head from "next/head";
import { api } from "~/utils/api";
import AppLayout from "~/components/layouts/AppLayout";
import Breadcrumbs from "~/components/partials/breadcrumbs";
import Link from "next/link";
export default function Projects() {
  const { data: projects = [], isLoading } = api.projects.getAll.useQuery();

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
            label: "Projects",
          },
        ]}
      />
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link href="/projects/new" className="btn btn-primary">
          New project
        </Link>
      </div>

      <table>
        {projects.map((project) => (
          <tr
            key={project.id}
            className="rounded-md p-4 even:bg-gray-200 hover:bg-gray-300"
          >
            <td className="w-[40px] p-4">
              <Link href={`/projects/${project.id}`}>
                <div>
                  <div>{project.projectTitle}</div>
                  <div className="text-xs text-gray-500">
                    {project.projectNumber}
                  </div>
                </div>
              </Link>
            </td>
          </tr>
        ))}
      </table>
    </AppLayout>
  );
}
