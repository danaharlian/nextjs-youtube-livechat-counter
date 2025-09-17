"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  videoId: z.string().min(10, {
    error: "Not Valid Video ID or URL",
  }),
  teams: z.string().min(2, {
    error: "This field is required",
  }),
});

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      videoId: "",
      teams: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="lg:w-2/3 space-y-6"
      >
        <FormField
          control={form.control}
          name="videoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>YouTube Video ID atau URL:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Contoh: 7ckAatSwXSQ atau https://www.youtube.com/watch?v=7ckAatSwXSQ"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teams"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kata Kunci Team (pisahkan dengan koma):</FormLabel>
              <FormControl>
                <Input placeholder="RRQ. ONIC. atau rrq, onic" {...field} />
              </FormControl>
              <FormDescription>
                Setiap kata akan dihitung terpisah per team. Gunakan variasi
                untuk akurasi lebih baik.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-4">
          <Button type="submit">Mulai Monitoring</Button>
          <Button type="submit" variant="secondary">
            Reset Counter
          </Button>
        </div>
      </form>
    </Form>
  );
}
