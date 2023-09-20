import Head from "next/head";
import AppLayout from "~/components/layouts/AppLayout";
import Breadcrumbs from "~/components/partials/breadcrumbs";
import useClientProps, { type ClientSchema } from "~/forms/client";
import { type SubmitHandler } from "react-hook-form";
import TextInput from "~/components/forms/textInput";
import Select from "~/components/forms/select";
import Card from "~/components/card";
import { api } from "~/utils/api";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function NewClients() {
  const router = useRouter();
  const {
    mutate: createClient,
    error,
    data: newClient,
  } = api.clients.create.useMutation();

  const onSubmit: SubmitHandler<ClientSchema> = (data) => {
    console.log(data);
    createClient({
      name: data.name,
      notificationFrequency: data.notificationFrequency,
      contacts: data.contacts,
    });
  };

  useEffect(() => {
    if (newClient) {
      router.push(`/clients/${newClient[0]?.id}`);
    }
  }, [newClient, router]);

  console.log("error", error);
  const {
    register,
    handleSubmit,
    appendContact,
    removeContact,
    contacts,
    formState: { errors },
  } = useClientProps({
    defaultValues: {
      notificationFrequency: "weekly",
      contacts: [
        {
          firstName: "",
          lastName: "",
          email: "",
          includeInEmails: true,
        },
      ],
    },
  });

  console.log(errors);

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
      <h1 className="mb-8 text-3xl font-bold">New Client</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container max-w-5xl space-y-4"
      >
        <Card title="General Details">
          <TextInput
            {...register("name")}
            label="Company Name"
            placeholder="Company name"
            autoComplete="off"
            error={errors.name?.message}
          />
        </Card>
        <Card title="Contacts">
          {contacts.map((contact, index) => {
            return (
              <div key={contact.id} className="flex flex-col">
                <label htmlFor="" className="font-bold">
                  {index === 0 ? "Primary Contact " : "Additional Contact "}
                </label>
                <div className="flex space-x-4">
                  <div className="flex w-full flex-col ">
                    <div className="flex space-x-4">
                      <TextInput
                        {...register(`contacts.${index}.firstName` as const)}
                        error={errors.contacts?.[index]?.firstName?.message}
                        placeholder="First name"
                        autoFocus
                        autoComplete="off"
                        data-1p-ignore
                      />
                      <TextInput
                        {...register(`contacts.${index}.lastName` as const)}
                        error={errors.contacts?.[index]?.lastName?.message}
                        placeholder="Last name"
                        autoComplete="off"
                        data-1p-ignore
                      />
                    </div>
                    <TextInput
                      {...register(`contacts.${index}.email` as const)}
                      error={errors.contacts?.[index]?.email?.message}
                      placeholder="Email name"
                      autoComplete="off"
                      data-1p-ignore
                    />
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input
                          type="checkbox"
                          checked
                          className="checkbox-primary checkbox"
                        />
                        <span className="label-text">Include in emails</span>
                      </label>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary mt-4"
                    disabled={contacts.length === 1}
                    onClick={() => {
                      removeContact(index);
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            );
          })}

          <button
            className="btn btn-primary"
            onClick={() => {
              appendContact(
                {
                  firstName: "",
                  lastName: "",
                  email: "",
                  includeInEmail: true,
                },
                { shouldFocus: true },
              );
            }}
          >
            Add additional contact
          </button>
        </Card>
        <Card title="Notification Frequency">
          <Select
            {...register("notificationFrequency")}
            options={[
              {
                label: "Weekly",
                value: "weekly",
              },
              {
                label: "Monthly",
                value: "monthly",
              },
            ]}
          />
        </Card>
        <button className="btn btn-primary" type="submit">
          Create client
        </button>
      </form>
    </AppLayout>
  );
}
