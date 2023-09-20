import Head from "next/head";
import { api } from "~/utils/api";
import AppLayout from "~/components/layouts/AppLayout";
import Breadcrumbs from "~/components/partials/breadcrumbs";
import useProfileForm, { type ProfileSchema } from "~/forms/profile";
import TextInput from "~/components/forms/textInput";
import Select from "~/components/forms/select";
import { type SubmitHandler, FieldValues } from "react-hook-form";
import Card from "~/components/card";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useProfileForm({
    defaultValues: {
      role: "user",
      isActive: false,
    },
  });

  const { data: profile, isLoading } = api.profile.get.useQuery();
  const { mutate, isSuccess } = api.profile.update.useMutation();

  useEffect(() => {
    if (isSuccess) {
      toast("Profile updated");
    }
  }, [isSuccess]);

  const onSubmit: SubmitHandler<ProfileSchema> = (d) => mutate(d);
  console.log(errors);

  useEffect(() => {
    reset({
      name: profile?.name || "",
      email: profile?.email || "",
    });
  }, [profile, reset]);

  // const onSubmit = handleSubmit(
  //   async () =>
  //     await mutate({
  //       name: "Foo",
  //     }),
  // );

  return (
    <AppLayout isLoading={isLoading}>
      <Head>
        <title>Sally: Dashboard</title>
        <meta name="description" content="Sally dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Breadcrumbs crumbs={[{ label: "Profile" }]} />

      <h1 className="mb-8 text-3xl font-bold">Edit profile</h1>
      <Card title="User information" className="max-w-xl">
        <form
          className="flex  flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            label="Name"
            placeholder="Your name"
            {...register("name")}
            error={errors.name?.message}
            data-1p-ignore
          />
          <TextInput
            label="Email"
            placeholder="sally@email.com"
            type="email"
            {...register("email")}
            autoComplete="email"
            error={errors.email?.message}
            data-1p-ignore
          />
          <Select
            {...register("role")}
            disabled
            options={[
              {
                label: "Admin",
                value: "admin",
              },
              {
                label: "User",
                value: "user",
              },
            ]}
          />
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Is Active</span>
              <input
                type="checkbox"
                disabled
                className="toggle toggle-primary"
                {...register("isActive")}
              />
            </label>
          </div>
          <div>
            <button className="btn btn-primary" type="submit">
              Save profile
            </button>
          </div>
        </form>
      </Card>
    </AppLayout>
  );
}
