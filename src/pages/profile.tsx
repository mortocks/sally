import Head from "next/head";
import { api } from "~/utils/api";
import AppLayout from "~/components/layouts/AppLayout";
import Breadcrumbs from "~/components/partials/breadcrumbs";
import useProfileForm, { ProfileSchema } from "~/forms/profile";
import TextInput from "~/components/forms/textInput";
import Select from "~/components/forms/select";
import { type SubmitHandler } from "react-hook-form";

export default function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useProfileForm({
    defaultValues: {
      role: "user",
      isActive: false,
    },
  });

  const onSubmit: SubmitHandler<ProfileSchema> = (d) => console.log(d);
  console.log(errors);
  return (
    <AppLayout>
      <Head>
        <title>Sally: Dashboard</title>
        <meta name="description" content="Sally dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Breadcrumbs crumbs={[{ label: "Profile" }]} />

      <h1 className="text-3xl font-bold">Profile</h1>
      <form
        className="flex max-w-sm flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          label="First name"
          placeholder="Sally"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <TextInput
          label="Last name"
          placeholder="Smith"
          {...register("lastName")}
          error={errors.lastName?.message}
        />
        <TextInput
          label="Email"
          placeholder="sally@email.com"
          type="email"
          {...register("email")}
          autoComplete="email"
          error={errors.email?.message}
        />
        <Select
          {...register("role")}
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
              className="toggle toggle-primary"
              {...register("isActive")}
            />
          </label>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </AppLayout>
  );
}
