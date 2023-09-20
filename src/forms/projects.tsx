import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addressSchema } from "./address";

export const projectSchema = z.object({
  projectNumber: z.string().min(1, { message: "Project number is required" }),
  projectTitle: z.string(),
  description: z.string().optional(),
  type: z.enum(["change"], {
    errorMap: () => ({ message: "Project type is required" }),
  }),
  propertyAddresses: z.array(addressSchema),
  councilReference: z.string().optional(),
  councilApplicationUrl: z.string().optional(),
  //properlyMadeDate: z.date().optional(),
});

export type ProjectSchema = z.infer<typeof projectSchema>;

type UseProjectProps = {
  defaultValues?: Partial<z.infer<typeof projectSchema>>;
};

const useProjectForm = (props?: UseProjectProps) => {
  const { defaultValues } = props ?? {};
  const { control, ...form } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues,
    mode: "onSubmit",
  });
  const {
    fields: propertyAddresses,
    append: appendAddress,
    remove: removeAddress,
    ...rest
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "propertyAddresses", // unique name for your Field Array
    rules: {
      minLength: 1,
    },
  });

  // eslint-disable--next-line
  return {
    ...form,
    control,
    ...rest,
    propertyAddresses,
    appendAddress,
    removeAddress,
  };
};

export default useProjectForm;
