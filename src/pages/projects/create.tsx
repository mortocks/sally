import AppLayout from "~/components/layouts/AppLayout";
import useProjectForm, { type ProjectSchema } from "~/forms/projects";
import { type SubmitHandler } from "react-hook-form";
import TextInput from "~/components/forms/textInput";
import Select from "~/components/forms/select";
import Card from "~/components/card";
import { api } from "~/utils/api";

const NewProject = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useProjectForm();

  const { mutate } = api.projects.create.useMutation();

  const onSubmit: SubmitHandler<ProjectSchema> = (data) => {
    mutate(data);
  };

  console.log(errors);

  return (
    <AppLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card title="General details">
          <TextInput {...register("projectNumber")} label="Project number" />
          <TextInput {...register("projectTitle")} label="Project title" />
          <Select
            options={[
              {
                label: "Change",
                value: "change",
              },
            ]}
            {...register("type")}
            label="Status"
          />
        </Card>
        <button className="btn btn-primary">Create</button>
      </form>
    </AppLayout>
  );
};
export default NewProject;
