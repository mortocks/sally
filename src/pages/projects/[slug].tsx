import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import AppLayout from "~/components/layouts/AppLayout";
import Breadcrumbs from "~/components/partials/breadcrumbs";
import { GoogleMap } from "@react-google-maps/api";
import { useCallback } from "react";

export default function SingleProject() {
  const {
    query: { slug },
  } = useRouter();

  const id = parseInt(slug as string);
  const { data: project, isLoading } = api.projects.getById.useQuery(id);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const pos = new window.google.maps.LatLng({
      lat: 40.73061,
      lng: -73.935242,
    });
    map.setCenter(pos);
  }, []);

  return (
    <AppLayout isLoading={isLoading}>
      <Head>
        <title>Sally: Project</title>
        <meta name="description" content="Sally dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Breadcrumbs
        crumbs={[
          {
            label: "Projects",
            href: "/projects",
          },
          {
            label: project?.projectTitle ?? "Edit project",
          },
        ]}
      />

      <div className="relative flex h-[244px] w-full rounded-xl bg-[#221E46]">
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "244px",
            mixBlendMode: "overlay",
            position: "absolute",
            top: 0,
            left: 0,
            filter: "grayscale(100%) brightness(70%) contrast(150%)",
          }}
          zoom={17}
          onLoad={onLoad}
          options={{
            fullscreenControl: false,
            zoomControl: false,
            disableDefaultUI: true,
          }}
        ></GoogleMap>
        <div className="absolute z-10 flex h-[244px] w-full items-center justify-between p-8 text-white">
          <div>
            <div className="mb-1 font-medium">
              <div className="flex items-center space-x-2 text-sm">
                <div>123456</div>
                <div className="mr-2 rounded-md bg-green-200 px-2 py-1 text-sm text-black">
                  DA
                </div>
              </div>
            </div>
            <h1 className="mb-1 text-4xl font-bold">{project?.projectTitle}</h1>
            <h2 className="font-medium">Client name</h2>
          </div>
          <button className="btn btn-primary rounded-none">Share plan</button>
        </div>
      </div>

      <progress
        className="progress progress-success mb-6 mt-12 w-full"
        value="30"
        max="100"
      ></progress>
    </AppLayout>
  );
}
