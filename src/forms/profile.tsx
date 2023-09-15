import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email(),
  role: z.enum(["admin", "user"]),
  isActive: z.boolean(),
});

export type ProfileSchema = z.infer<typeof schema>;

type UseProfileProps = {
  defaultValues?: Partial<z.infer<typeof schema>>;
};

const useProfileForm = (props?: UseProfileProps) => {
  const { defaultValues } = props ?? {};
  return useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });
};

export default useProfileForm;

export { schema };
