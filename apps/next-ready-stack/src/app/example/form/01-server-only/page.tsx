import { Button } from '@monorepo-starter/ui/components/button';
import { Checkbox } from '@monorepo-starter/ui/components/checkbox';
import { Input } from '@monorepo-starter/ui/components/input';
import { Label } from '@monorepo-starter/ui/components/label';
import { RadioGroup, RadioGroupItem } from '@monorepo-starter/ui/components/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@monorepo-starter/ui/components/select';
import { SelectNative } from '@monorepo-starter/ui/components/select-native';
import { Slider } from '@monorepo-starter/ui/components/slider';
import { Switch } from '@monorepo-starter/ui/components/switch';
import { devLog } from '@monorepo-starter/utils/console';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';

const schema = z.object({
  textInput1: z.string().min(1),
  numberInput1: z.number().min(1),
  checkbox1: z.boolean(),
  radio1: z.enum(['1', '2', '3']),
  nativeSelect1: z.enum(['2', '3', '4']),
  select2: z.enum(['nextjs', 'astro', 'gatsby']),
  slider1: z.coerce.number().min(40),
  switch1: z.boolean(),
});

export default async function FormServerOnlyPage() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('server_action_basic_error');
  const errorMessages = cookie ? JSON.parse(cookie.value) : null;

  async function submitAction(formData: FormData) {
    'use server';

    const cookieStore = await cookies();
    const data = Object.fromEntries(formData);
    const isValid = schema.safeParse(data);

    if (!isValid.success) {
      const errorMessages = isValid.error.format();

      const textInput1 = errorMessages.textInput1?._errors?.join(', ');
      const numberInput1 = errorMessages.numberInput1?._errors?.join(', ');
      const checkbox1 = errorMessages.checkbox1?._errors?.join(', ');
      const radio1 = errorMessages.radio1?._errors?.join(', ');
      const nativeSelect1 = errorMessages.nativeSelect1?._errors?.join(', ');
      const select2 = errorMessages.select2?._errors?.join(', ');
      const slider1 = errorMessages.slider1?._errors?.join(', ');
      const switch1 = errorMessages.switch1?._errors?.join(', ');

      devLog(
        'info',
        JSON.stringify({ textInput1, numberInput1, checkbox1, radio1, nativeSelect1, select2, slider1, switch1 }),
      );

      cookieStore.set(
        'server_action_basic_error',
        JSON.stringify({ textInput1, numberInput1, checkbox1, radio1, nativeSelect1, select2, slider1, switch1 }),
      );
    } else {
      cookieStore.delete('server_action_basic_error');
    }

    revalidatePath('/example/form/01-server');
  }

  return (
    <div>
      <h1>Server Action Basic (Server Components Only)</h1>
      <p>
        Server Action 기능을 사용한 기본 폼
        <br />
        Validation 은 서버 쿠키에서 지정(임시쿠키 - 세션)
      </p>

      <form action={submitAction} className="flex flex-col gap-4 *:space-y-2">
        <div>
          <Label htmlFor="input1">Simple input</Label>
          <Input id="input1" placeholder="Text input" name="textInput1" />
          <p className="text-destructive mt-2 text-xs" role="alert" aria-live="polite">
            {errorMessages?.textInput1}
          </p>
        </div>

        <div>
          <Label htmlFor="input2">Number input</Label>
          <Input placeholder="Number" type="number" inputMode="numeric" name="numberInput1" />
          <p className="text-destructive mt-2 text-xs" role="alert" aria-live="polite">
            {errorMessages?.numberInput1}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Checkbox name="checkbox1" id="checkbox1" />
            <Label htmlFor="checkbox1">Checkbox 1</Label>
          </div>
          <p className="text-destructive mt-2 w-full text-xs" role="alert" aria-live="polite">
            {errorMessages?.checkbox1}
          </p>
        </div>

        <RadioGroup defaultValue="4" name="radio1">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="1" id="radio_value1" />
            <Label htmlFor="radio_value1">Option 1</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="2" id="radio_value2" />
            <Label htmlFor="radio_value2">Option 2</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="3" id="radio_value3" />
            <Label htmlFor="radio_value3">Option 3</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="4" id="radio_value4" />
            <Label htmlFor="radio_value4">Option 4</Label>
          </div>
          <p className="text-destructive mt-2 w-full text-xs" role="alert" aria-live="polite">
            {errorMessages?.radio1}
          </p>
        </RadioGroup>

        <div>
          <Label htmlFor="nativeSelect1">Simple select (native)</Label>
          <SelectNative id="nativeSelect1" name="nativeSelect1">
            <option value="1">React</option>
            <option value="2">Next.js</option>
            <option value="3">Astro</option>
            <option value="4">Gatsby</option>
          </SelectNative>
          <p className="text-destructive mt-2 w-full text-xs" role="alert" aria-live="polite">
            {errorMessages?.nativeSelect1}
          </p>
        </div>

        <div>
          <Label htmlFor="select2">Simple select with default value</Label>
          <Select defaultValue="react" name="select2">
            <SelectTrigger id="select2">
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="nextjs">Next.js</SelectItem>
              <SelectItem value="astro">Astro</SelectItem>
              <SelectItem value="gatsby">Gatsby</SelectItem>
            </SelectContent>
            <p className="text-destructive mt-2 w-full text-xs" role="alert" aria-live="polite">
              {errorMessages?.select2}
            </p>
          </Select>
        </div>

        <div>
          <Label>Simple slider</Label>
          <Slider name="slider1" defaultValue={[25]} aria-label="Simple slider" />
          <p className="text-destructive mt-2 w-full text-xs" role="alert" aria-live="polite">
            {errorMessages?.slider1}
          </p>
        </div>

        <div>
          <div className="inline-flex items-center gap-2">
            <Switch name="switch1" id="switch1" />
            <Label htmlFor="switch1" className="sr-only">
              Simple switch
            </Label>
          </div>
          <p className="text-destructive mt-2 w-full text-xs" role="alert" aria-live="polite">
            {errorMessages?.switch1}
          </p>
        </div>

        <div className="bg-background sticky bottom-0 flex justify-center gap-2 py-2">
          <Button type="submit">Submit</Button>
          <Button type="reset" variant="outline">
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
