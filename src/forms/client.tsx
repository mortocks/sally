import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const clientSchema = z.object({
  name: z.string().min(1, { message: "First name is required" }),
  logo: z.string().optional(),
  notificationFrequency: z.enum(["weekly", "monthly"], {
    errorMap: () => ({ message: "Notification frequency is required" }),
  }),
  contacts: z.array(
    z.object({
      firstName: z.string().min(1, { message: "First name is required" }),
      lastName: z.string().min(1, { message: "Last name is required" }),
      logo: z.string().url().optional(),
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .email("Not an email address"),
      includeInEmails: z.boolean(),
    }),
  ),
});

export type ClientSchema = z.infer<typeof clientSchema>;

type UseClientProps = {
  defaultValues?: Partial<z.infer<typeof clientSchema>>;
};

const useClientProps = (props?: UseClientProps) => {
  const { defaultValues } = props ?? {};
  const { control, ...form } = useForm({
    resolver: zodResolver(clientSchema),
    defaultValues,
    mode: "onSubmit",
  });
  const {
    fields: contacts,
    append: appendContact,
    remove: removeContact,
    ...rest
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "contacts", // unique name for your Field Array
    rules: {
      minLength: 1,
    },
  });

  // eslint-disable--next-line
  return {
    ...form,
    control,
    ...rest,
    contacts,
    appendContact,
    removeContact,
  };
};

export default useClientProps;
