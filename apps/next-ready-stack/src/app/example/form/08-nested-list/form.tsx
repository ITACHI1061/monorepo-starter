'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Checkbox } from '@monorepo-starter/ui/components/checkbox';
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
import { devLog } from '@monorepo-starter/utils/console';
import { faker } from '@faker-js/faker/locale/ko';
import { zodResolver } from '@hookform/resolvers/zod';
import { GripVerticalIcon, Plus, Trash2 } from 'lucide-react';
import { FieldErrors, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { formTestAction } from './actions';
import { schema, type Schema } from './schema';
import VirtualSortable from './virtual-sortable';
import SortableItem from './virtual-sortable-item';

export default function NestedListForm({ data: initialData }: { data: Schema }) {
  const maxItemLength = schema.shape.items._def.maxLength?.value || 1000;

  // 1. Define form
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  // 2. Define field array
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  // 3. Define submit handler
  const onSubmit: SubmitHandler<Schema> = async (data, event) => {
    const formData = new FormData(event?.target as HTMLFormElement);
    formTestAction(data, formData);
  };

  // 4. Define error handler
  const onError = (errors: FieldErrors<Schema>) => {
    devLog('error', 'errors', errors);
  };

  // 5. create new item handler
  const onNewItem = () => {
    if (fields.length >= maxItemLength) {
      toast.error(`최대 ${maxItemLength}개의 아이템만 추가할 수 있습니다.`);
      return;
    }

    const name = faker.person.fullName();
    const age = faker.number.int({ min: 17, max: 99 });
    append({ name, age, status: 'active', id: faker.string.uuid() });
  };

  return (
    <div className="not-prose">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">
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

          <VirtualSortable
            estimateSize={() => 62}
            className="max-h-[50vh]"
            ids={fields.map((item) => item.id)}
            onMove={(from, to) => {
              move(from, to);
            }}
            renderItem={(id, index) => {
              const field = fields[index];
              if (!field) return null;

              return (
                <SortableItem id={id} key={field.id} className="">
                  <FormField
                    control={form.control}
                    name={`items.${index}.name`}
                    render={({ field }) => (
                      <FormItem key={field.name} className="flex-1">
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`items.${index}.age`}
                    render={({ field }) => (
                      <FormItem key={field.name} className="w-25">
                        <FormControl>
                          <Input type="number" placeholder="19" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`items.${index}.status`}
                    render={({ field }) => (
                      <FormItem key={field.name}>
                        <FormControl>
                          <Checkbox
                            checked={field.value === 'active'}
                            onCheckedChange={(checked) => {
                              return checked ? field.onChange('active') : field.onChange('inactive');
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="button" variant="outline" onClick={() => remove(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </SortableItem>
              );
            }}
            renderOverlay={(_id, index) => {
              return (
                <div
                  className="flex w-full items-center gap-4 rounded-md border border-gray-200 bg-amber-50 p-2 shadow-md"
                  style={{ height: 56 }}
                >
                  <GripVerticalIcon className="size-4" />
                  <Input readOnly value={fields[index]?.name} className="flex-1" />
                  <Input readOnly value={fields[index]?.age} className="w-25" />
                  <Checkbox checked={fields[index]?.status === 'active'} />
                  <Button type="button" variant="outline" disabled>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            }}
          />
          <div className="mt-4">
            <Button type="button" variant="outline" className="w-full" onClick={onNewItem}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
