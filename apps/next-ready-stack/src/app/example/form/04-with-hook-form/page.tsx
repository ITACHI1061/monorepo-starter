'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { languages, schema, Schema } from './schema';

import { Button } from '@monorepo-starter/ui/components/button';
import { Calendar } from '@monorepo-starter/ui/components/calendar';
import { Checkbox } from '@monorepo-starter/ui/components/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@monorepo-starter/ui/components/command';
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
import { Label } from '@monorepo-starter/ui/components/label';
import { Popover, PopoverContent, PopoverTrigger } from '@monorepo-starter/ui/components/popover';
import { RadioGroup, RadioGroupItem } from '@monorepo-starter/ui/components/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@monorepo-starter/ui/components/select';
import { Switch } from '@monorepo-starter/ui/components/switch';
import { Textarea } from '@monorepo-starter/ui/components/textarea';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { devLog } from '@monorepo-starter/utils/console';
import { action } from './action';

export default function NextServerActionClientWithHookFormPage() {
  // 1. Define form
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      textInput1: '',
      checkbox1: false,
    },
  });

  // 2. Define submit handler
  const onSubmit: SubmitHandler<Schema> = async (data, event) => {
    devLog('info', 'data', data);
    devLog('info', 'event', event);

    const formData = new FormData(event?.target as HTMLFormElement);
    devLog('info', 'formData', formData);
    await action(data, formData);
  };

  return (
    <div>
      <h1>Next Server Action with Hook Form</h1>
      <p>
        <code>React Hook Form</code>, <code>Zod</code>, <code>Shadcn/UI</code>, <code>Next Server Action</code> with{' '}
        <code>File Upload</code>
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => devLog('error', 'errors', errors))}
          className="not-prose space-y-6"
        >
          {/* TextInput */}
          <FormField
            control={form.control}
            name="textInput1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Checkbox */}
          <FormField
            control={form.control}
            name="checkbox1"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>Checkbox Label</FormLabel>
                </div>
                <FormDescription>체크박스 예제 입니다.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DateInput */}
          <FormField
            control={form.control}
            name="dateInput1"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? format(field.value, 'yyyy-MM-dd') : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value as Date}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Your date of birth is used to calculate your age.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* RadioGroup */}
          <FormField
            control={form.control}
            name="radioGroup1"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>알림 유형</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="all" />
                      </FormControl>
                      <FormLabel className="font-normal">All new messages</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="mentions" />
                      </FormControl>
                      <FormLabel className="font-normal">Direct messages and mentions</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="none" />
                      </FormControl>
                      <FormLabel className="font-normal">Nothing</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Select */}
          <FormField
            control={form.control}
            name="select1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>이메일을 선택하시오.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="switch1"
            render={({ field }) => (
              <div className="">
                <FormItem>
                  <FormLabel>기본 스위치</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Switch id={field.name} checked={field.value} onCheckedChange={field.onChange} />
                      <Label htmlFor={field.name}>{field.name}</Label>
                    </div>
                  </FormControl>
                </FormItem>
                <FormMessage />
              </div>
            )}
          />

          {/* Switch */}
          <FormField
            control={form.control}
            name="switch2"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>박스 스위치</FormLabel>
                <Label className="flex items-center gap-6 rounded-lg border p-4 has-[[data-state=checked]]:border-blue-600">
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">Share across devices</div>
                    <div className="text-muted-foreground text-sm font-normal">
                      Focus is shared across devices, and turns off when you leave the app.
                    </div>
                  </div>
                  <Switch
                    id={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-600"
                  />
                </Label>
              </FormItem>
            )}
          />

          {/* Textarea */}
          <FormField
            control={form.control}
            name="textarea1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us a little bit about yourself" className="resize-none" {...field} />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Combobox */}
          <FormField
            control={form.control}
            name="combobox1"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Language</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
                      >
                        {field.value
                          ? languages.find((language) => language.value === field.value)?.label
                          : 'Select language'}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search framework..." className="h-9" />
                      <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {languages.map((language) => (
                            <CommandItem
                              value={language.label}
                              key={language.value}
                              onSelect={() => {
                                form.setValue('combobox1', language.value);
                              }}
                            >
                              {language.label}
                              <Check
                                className={cn('ml-auto', language.value === field.value ? 'opacity-100' : 'opacity-0')}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>This is the language that will be used in the dashboard.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="file1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File</FormLabel>
                <FormControl>
                  <Input
                    name={field.name}
                    type="file"
                    multiple
                    onChange={(e) => form.setValue('file1', Array.from(e.target.files ?? []))}
                  />
                </FormControl>
                <FormDescription>파일을 선택하시오.</FormDescription>
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
