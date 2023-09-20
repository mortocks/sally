import { useForm, type DeepPartial } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  //role: z.enum(["admin", "user"]),
  //isActive: z.boolean(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;

type UseProfileProps = {
  defaultValues?: DeepPartial<z.infer<typeof profileSchema>>;
};

const useProfileForm = (props?: UseProfileProps) => {
  return useForm({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });
};

export default useProfileForm;
