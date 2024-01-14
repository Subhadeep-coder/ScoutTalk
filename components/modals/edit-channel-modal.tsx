"use client";

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FileUpload from '../file-upload';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';
import { ChannelType } from '@prisma/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import qs from 'query-string';

type Props = {}

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Channel name is required"
    }).refine(
        name => name !== "general",
        {
            message: `Channel name can't be 'general'`
        }
    ),
    type: z.nativeEnum(ChannelType),
});

const EditChannelModal = (props: Props) => {

    const { isOpen, onClose, type, data } = useModal((state) => state);
    const { channel, server } = data;
    const router = useRouter();

    const isModalOpen = isOpen && type === "editChannel";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: channel?.type || ChannelType.TEXT,
        }
    });
    useEffect(() => {
        if (channel) {
            form.setValue("name", channel.name);
            form.setValue("type", channel.type);
        }
    }, [channel, form])


    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id
                }
            });
            await axios.patch(url, values);

            form.reset();
            router.refresh();
            onClose();
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-bold'>
                        Edit Channel
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <div className="px-6 space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-xs uppercase font-bold text-zinc-500 dark:text-secondary/70'>
                                            Channel name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                                                placeholder='Enter channel name..'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Channel Type</FormLabel>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="bg-zinc-300/50 border-0 text-black focus:ring-0 ring-offset-0 capitalize outline-none focus:ring-offset-0">
                                                    <SelectValue placeholder="Select a channel type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    Object.values(ChannelType).map((channel) => (
                                                        <SelectItem
                                                            key={channel}
                                                            value={channel}
                                                            className="capitalize"
                                                        >
                                                            {channel.toLowerCase()}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className='bg-gray-100 px-6 py-4'>
                            <Button variant="primary" disabled={isLoading}>
                                Update
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default EditChannelModal