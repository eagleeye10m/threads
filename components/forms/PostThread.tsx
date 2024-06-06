"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { threadValidation } from "@/lib/validations/thread";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useOrganization } from "@clerk/nextjs";
import { Textarea } from "../ui/textarea";
//import { updateUser } from "@/lib/actions/user.action";
import { usePathname, useRouter } from "next/navigation";
import { createThread } from "@/lib/actions/thread.actions";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const {organization}=useOrganization();

  const form = useForm<z.infer<typeof threadValidation>>({
    resolver: zodResolver(threadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof threadValidation>) => {

    const timestamp = Date.now();
console.log(timestamp); // Outputs something like: 1624376400000

const date = new Date(timestamp);
console.log(date.toUTCString()); // Outputs something like: Tue, 22 Jun 2021 14:00:00 GMT
console.log(date.toISOString()); // Outputs something like: 2021-06-22T14:00:00.000Z

        await createThread({
          text: values.thread,
          author: userId,
          communityId: organization ? organization.id : null,
          path: pathname,
        });
      
   


    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          Post thread
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
