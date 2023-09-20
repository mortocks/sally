import Head from "next/head";
import { api } from "~/utils/api";
import AppLayout from "~/components/layouts/AppLayout";
import Breadcrumbs from "~/components/partials/breadcrumbs";
import Link from "next/link";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Address from "~/components/forms/address";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema, type AddressSchema } from "~/forms/address";
import Card from "~/components/card";
const AddressDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
  });
  const onSubmit = (d) => console.log(d);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex w-screen  items-center justify-center bg-[rgba(0,0,0,0.1)] p-4 font-sans transition-all">
        <Dialog.Panel>
          <Card title="Add a new lot" className="h-[577px] w-screen max-w-5xl">
            <Dialog.Title>Deactivate account</Dialog.Title>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Address register={register} errors={errors} />
              <input type="submit" />
            </form>
          </Card>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
export default function NewClients() {
  const [open, setOpen] = useState(false);
  return (
    <AppLayout>
      <Head>
        <title>Sally: New project</title>
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
            label: "New Project",
          },
        ]}
      />
      <h1 className="text-3xl font-bold">New Project</h1>
      <AddressDialog isOpen={open} onClose={() => setOpen(false)} />
      <button onClick={() => setOpen(true)}>Open</button>
    </AppLayout>
  );
}
