"use client";

import { comment } from "@/action/comment";
import { Button } from "@/components/ui/button";
import {
    Form as BaseForm,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    content: z
        .string({ required_error: "Content is required" })
        .min(2, "Content is too short")
        .max(2500, "Content is too long"),
});

export function Form({ postId }: { postId: string }) {
    const { user } = useUser();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await comment({ clerkId: user!.id, postId, content: values.content });
            toast({
                title: "Success",
                description: "Thanks for your comment!",
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                toast({
                    title: "Error",
                    description: error.message,
                    variant: "destructive",
                });
                return;
            }
            throw error;
        }
    }

    return (
        <BaseForm {...form}>
            <form className="grid space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder="Write your comment here..."
                                    rows={4}
                                    className="p-4"
                                    disabled={form.formState.isSubmitting || !user}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Your comment will be posted publicly.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    variant="secondary"
                    type="submit"
                    className="justify-self-end"
                    disabled={form.formState.isSubmitting || !user}
                >
                    Submit
                </Button>
            </form>
        </BaseForm>
    );
}
