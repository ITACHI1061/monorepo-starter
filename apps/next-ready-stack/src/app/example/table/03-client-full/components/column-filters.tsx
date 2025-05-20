'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@monorepo-starter/ui/components/drawer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@monorepo-starter/ui/components/form';
import { Input } from '@monorepo-starter/ui/components/input';
import { RadioGroup, RadioGroupItem } from '@monorepo-starter/ui/components/radio-group';
import DatePicker from '@monorepo-starter/ui/composites/date-picker/date-picker';
import DateRangePicker from '@monorepo-starter/ui/composites/date-picker/date-range-picker';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { devLog } from '@monorepo-starter/utils/console';
import { zodResolver } from '@hookform/resolvers/zod';
import { Table } from '@tanstack/react-table';
import { FilterIcon, Mars, Venus, X } from 'lucide-react';
import { SubmitErrorHandler, type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Data } from './columns';

export const schema = z.object({
  loginId: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  gender: z.enum(['male', 'female', 'all']).optional(),
  birth: z.string().optional(),
  createdAt: z
    .object({
      from: z.string(),
      to: z.string(),
    })
    .optional(),
  updatedAt: z
    .object({
      from: z.string(),
      to: z.string(),
    })
    .optional(),
});

export type Schema = z.infer<typeof schema>;

export default function TableFilters({ table }: { table: Table<Data> }) {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      loginId: '',
      name: '',
      email: '',
      gender: undefined,
      birth: undefined,
      createdAt: {
        from: '',
        to: '',
      },
      updatedAt: {
        from: '',
        to: '',
      },
    },
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    if (data.createdAt) {
      devLog('info', `[FILTER]`, data.createdAt);
    }

    const filters = [];

    if (data.loginId) {
      filters.push({ id: 'loginId', value: data.loginId });
    }

    if (data.name) {
      filters.push({ id: 'name', value: data.name });
    }

    if (data.email) {
      filters.push({ id: 'email', value: data.email });
    }

    if (data.gender) {
      filters.push({ id: 'gender', value: data.gender === 'all' ? undefined : data.gender });
    }

    if (data.birth) {
      filters.push({ id: 'birth', value: data.birth });
    }

    if (data.createdAt) {
      filters.push({
        id: 'createdAt',
        value: { from: new Date(data.createdAt.from).getTime(), to: new Date(data.createdAt.to).getTime() },
      });
    }

    if (data.updatedAt) {
      filters.push({
        id: 'updatedAt',
        value: { from: new Date(data.updatedAt.from).getTime(), to: new Date(data.updatedAt.to).getTime() },
      });
    }

    table.setColumnFilters(filters);
  };

  const onError: SubmitErrorHandler<Schema> = (errors) => {
    devLog('error', `[FILTER]`, errors);
  };

  const onReset = () => {
    form.reset();
    table.resetColumnFilters();
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      devLog('info', `[FILTER]`, 'open');
      setTimeout(() => {
        form.setFocus('loginId');
      }, 300);
    }
  };

  return (
    <Drawer direction="right" onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant={table.getState().columnFilters.length === 0 ? 'outline' : undefined}
          className={cn(table.getState().columnFilters.length > 0 && 'theme-green')}
        >
          <FilterIcon />
          Filters
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)}>
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
              <DrawerDescription>Set your filters.</DrawerDescription>
            </DrawerHeader>

            <div className="overflow-y-auto px-4 text-sm">
              <div className="flex flex-col gap-4 pb-2">
                <FormField
                  control={form.control}
                  name="loginId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>아이디</FormLabel>
                      <FormControl>
                        <Input placeholder="Login ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>성별</FormLabel>
                      <FormControl>
                        <RadioGroup className="grid-cols-3" defaultValue={field.value} onValueChange={field.onChange}>
                          <div className="border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 shadow-xs has-focus-visible:ring-[3px] relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center outline-none transition-[color,box-shadow]">
                            <RadioGroupItem id="gender-male" value="male" className="sr-only" />
                            <Mars className="opacity-60" size={20} aria-hidden="true" />
                            <label
                              htmlFor="gender-male"
                              className="text-foreground cursor-pointer text-xs font-medium leading-none after:absolute after:inset-0"
                            >
                              남자
                            </label>
                          </div>
                          <div className="border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 shadow-xs has-focus-visible:ring-[3px] relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center outline-none transition-[color,box-shadow]">
                            <RadioGroupItem id="gender-female" value="female" className="sr-only" />
                            <Venus className="opacity-60" size={20} aria-hidden="true" />
                            <label
                              htmlFor="gender-female"
                              className="text-foreground cursor-pointer text-xs font-medium leading-none after:absolute after:inset-0"
                            >
                              여자
                            </label>
                          </div>
                          <div className="border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 shadow-xs has-focus-visible:ring-[3px] relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center outline-none transition-[color,box-shadow]">
                            <RadioGroupItem id="gender-all" value="all" className="sr-only" />
                            <X className="opacity-60" size={20} aria-hidden="true" />
                            <label
                              htmlFor="gender-all"
                              className="text-foreground cursor-pointer text-xs font-medium leading-none after:absolute after:inset-0"
                            >
                              전체
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>생년월일 - Date 이후 출생자 검색</FormLabel>
                      <FormControl>
                        <DatePicker value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="createdAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>생성일시</FormLabel>
                      <FormControl>
                        <DateRangePicker value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DrawerFooter>
              <Button type="submit">Apply</Button>
              <Button type="reset" variant="outline" onClick={onReset}>
                Clear
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
