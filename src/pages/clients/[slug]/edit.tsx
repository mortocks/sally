import AppLayout from "~/components/layouts/AppLayout";
import Breadcrumbs from "~/components/partials/breadcrumbs";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import TextInput from "~/components/forms/textInput";
import Select from "~/components/forms/select";
import Card from "~/components/card";
import { useEffect } from "react";
import useClientProps, { type ClientSchema } from "~/forms/client";
import { type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { UploadDropzone } from "~/utils/uploadthing";
import Image from "next/image";

const EditClient = () => {
  const {
    query: { slug },
  } = useRouter();

  const id = parseInt(slug as string);
  const apiUtils = api.useContext();

  const { data: client, isLoading } = api.clients.getById.useQuery(id);
  const { mutate, isSuccess } = api.clients.update.useMutation({
    onSuccess: () => {
      apiUtils.clients.getById.invalidate();
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Client updated", { toastId: "client-update-success" });
    }
  }, [isSuccess]);

  const onSubmit: SubmitHandler<ClientSchema> = (data) => {
    mutate({
      id,
      ...data,
    });
  };

  const {
    register,
    handleSubmit,
    appendContact,
    removeContact,
    contacts,
    reset,
    formState: { errors },
  } = useClientProps({});

  const removeLogo = () => {
    if (!client) return;
    mutate({
      id: client.id,
      name: client.name,
      notificationFrequency: client.notificationFrequency,
      contacts: client.contacts,
    });
  };
  useEffect(() => {
    if (client) {
      reset({
        name: client.name,
        notificationFrequency: client.notificationFrequency,
        contacts: client.contacts,
      });
    }
  }, [reset, client]);

  return (
    <AppLayout isLoading={isLoading}>
      <Breadcrumbs
        crumbs={[
          {
            label: "Clients",
            href: "/clients",
          },
          {
            label: client?.name ?? "",
            href: `/clients/${client?.id}`,
          },
          {
            label: "Edit client",
          },
        ]}
      />

      <div className="mb-6">
        <h1 className="text-4xl font-bold">Edit client</h1>
      </div>

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
            className="max-w-2xl"
          />

          {client?.logo ? (
            <div className="mt-4 flex items-center space-x-3">
              <Image
                src={client.logo}
                className="w-24 rounded-full bg-gray-200"
                alt="Logo"
                width={200}
                height={200}
              />
              <input
                type="hidden"
                {...register("logo")}
                defaultValue={client.logo}
              />
              <button className="btn" onClick={() => removeLogo()}>
                Remove
              </button>
            </div>
          ) : (
            <UploadDropzone
              className="my-4 h-[150px] bg-gray-100 p-4"
              endpoint="imageUploader"
              config={{
                mode: "auto",
              }}
              onClientUploadComplete={(res) => {
                // Do something with the response
                if (res?.[0]?.url && client) {
                  mutate({
                    id: client.id,
                    name: client.name,
                    notificationFrequency: client.notificationFrequency,
                    contacts: client.contacts,
                    logo: res[0].url,
                  });
                }
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          )}
        </Card>
        <Card title="Contacts">
          {contacts.map((contact, index) => {
            return (
              <div key={contact.id} className="mb-8 flex flex-col">
                <label htmlFor="" className="font-bold">
                  {index === 0 ? "Primary Contact " : "Additional Contact "}
                </label>
                <div className="flex space-x-4">
                  <div className="flex w-full max-w-2xl flex-col">
                    <div className="flex  space-x-4">
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
                      <label className="label cursor-pointer justify-start space-x-3">
                        <input
                          type="checkbox"
                          {...register(
                            `contacts.${index}.includeInEmails` as const,
                          )}
                          className="checkbox-primary checkbox"
                        />
                        <span className="label-text font-medium">
                          Include in emails
                        </span>
                      </label>
                    </div>
                  </div>
                  <button
                    className="btn btn-link mt-4"
                    disabled={contacts.length === 1}
                    onClick={() => {
                      removeContact(index);
                    }}
                  >
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.04048 5.29289C6.64996 4.90237 6.01679 4.90237 5.62627 5.29289C5.23574 5.68342 5.23574 6.31658 5.62627 6.70711L10.9192 12L5.6263 17.2929C5.23577 17.6834 5.23577 18.3166 5.6263 18.7071C6.01682 19.0976 6.64999 19.0976 7.04051 18.7071L12.3334 13.4142L17.6263 18.7071C18.0168 19.0976 18.65 19.0976 19.0405 18.7071C19.431 18.3166 19.431 17.6834 19.0405 17.2929L13.7476 12L19.0405 6.70711C19.431 6.31658 19.431 5.68342 19.0405 5.29289C18.65 4.90237 18.0168 4.90237 17.6263 5.29289L12.3334 10.5858L7.04048 5.29289Z"
                        fill="#6F767E"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}

          <div>
            <button
              className="btn"
              type="button"
              onClick={() => {
                appendContact(
                  {
                    firstName: "",
                    lastName: "",
                    email: "",
                    includeInEmails: true,
                  },
                  { shouldFocus: true },
                );
              }}
            >
              Add additional contact
            </button>
          </div>
        </Card>
        <Card title="Notification Frequency">
          <Select
            {...register("notificationFrequency")}
            error={errors.notificationFrequency?.message}
            placeholder="Select a frequency"
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
          Update client
        </button>
      </form>
    </AppLayout>
  );
};

export default EditClient;
