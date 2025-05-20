'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@monorepo-starter/ui/components/form';
import { Input } from '@monorepo-starter/ui/components/input';
import DatePicker from '@monorepo-starter/ui/composites/date-picker/date-picker';
import DatePickerMultiple from '@monorepo-starter/ui/composites/date-picker/date-picker-multiple';
import DateRangePicker from '@monorepo-starter/ui/composites/date-picker/date-range-picker';
import { devLog } from '@monorepo-starter/utils/console';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { action } from './action';
import { schema, type Schema } from './schema';

export default function FormDatePickerPage() {
  // 1. Define form
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      dateInput: '',
      datePickerSingle: '',
      datePickerMultiple: ['2024-01-01', '2024-01-02'],
      datePickerRange: {
        from: '',
        to: '',
      },
    },
  });

  // 2. Define submit handler
  const onSubmit: SubmitHandler<Schema> = async (data, event) => {
    devLog('info', data);
    devLog('info', event);

    const formData = new FormData(event?.target as HTMLFormElement);
    await action(data, formData);
  };

  return (
    <div>
      <h1>Date Picker Form</h1>
      <p>React Hook Form, Zod, Shadcn/UI, Next Server Action with Date Picker</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => devLog('error', errors))}
          className="not-prose space-y-8"
        >
          <FormField
            control={form.control}
            name="dateInput"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Default Date Input</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="[&::-webkit-calendar-picker-indicator]:hidden"
                    placeholder="2024-01-01"
                    {...field}
                  />
                </FormControl>
                <FormDescription>기본 Date Input 입니다</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="datePickerSingle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Picker Single</FormLabel>
                <FormControl>
                  <DatePicker value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription>날짜 선택 피커 입니다</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="datePickerMultiple"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Picker Multiple</FormLabel>
                <FormControl>
                  <DatePickerMultiple value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription>날짜 선택 피커 여러개 입니다</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="datePickerRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Range Picker</FormLabel>
                <FormControl>
                  <DateRangePicker value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription>날짜 범위 선택 피커 입니다</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
