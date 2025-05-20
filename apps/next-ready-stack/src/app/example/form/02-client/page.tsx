'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Checkbox } from '@monorepo-starter/ui/components/checkbox';
import { Input } from '@monorepo-starter/ui/components/input';
import { Label } from '@monorepo-starter/ui/components/label';
import { RadioGroup, RadioGroupItem } from '@monorepo-starter/ui/components/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@monorepo-starter/ui/components/select';
import { SelectNative } from '@monorepo-starter/ui/components/select-native';
import { Slider } from '@monorepo-starter/ui/components/slider';
import { Switch } from '@monorepo-starter/ui/components/switch';
import { useActionState } from 'react';
import { action } from './action';
import { type ErrorType } from './schema';

export default function ServerActionClientPage() {
  const [state, formAction, pending] = useActionState<ErrorType, FormData>(action, {});

  return (
    <div>
      <h1>Server Action Basic (Client Components)</h1>
      <p>
        Server Action 기능을 사용한 기본 폼 <br />
        <code>useActionState</code> 훅을 사용한 폼 상태 관리
      </p>

      <form action={formAction} className="flex flex-col gap-4 py-2 *:space-y-2">
        <div>
          <Label htmlFor="input1">Simple input</Label>
          <Input id="input1" placeholder="Text input" name="textInput1" />
          <p className="text-destructive mt-2 text-xs" role="alert" aria-live="polite">
            {state?.textInput1?.map((error, index) => <span key={index}>{error}</span>)}
          </p>
        </div>

        <div>
          <Label htmlFor="input2">Number input</Label>
          <Input placeholder="Number" type="number" inputMode="numeric" name="numberInput1" />
          <p className="text-destructive mt-2 text-xs" role="alert" aria-live="polite">
            {state?.numberInput1?.map((error, index) => <span key={index}>{error}</span>)}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Checkbox name="checkbox1" id="checkbox1" />
            <Label htmlFor="checkbox1">Checkbox 1</Label>
          </div>
          <p className="text-destructive mt-2 w-full text-xs" role="alert" aria-live="polite">
            {state?.checkbox1?.map((error, index) => <span key={index}>{error}</span>)}
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
            {state?.radio1?.map((error, index) => <span key={index}>{error}</span>)}
          </p>
        </RadioGroup>

        <div className="space-y-2">
          <Label htmlFor="nativeSelect1">Simple select (native)</Label>
          <SelectNative id="nativeSelect1" name="nativeSelect1">
            <option value="1">React</option>
            <option value="2">Next.js</option>
            <option value="3">Astro</option>
            <option value="4">Gatsby</option>
          </SelectNative>
          <p className="text-destructive mt-2 w-full text-xs" role="alert" aria-live="polite">
            {state?.nativeSelect1?.map((error, index) => <span key={index}>{error}</span>)}
          </p>
        </div>

        <div className="space-y-2">
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
              {state?.select2?.map((error, index) => <span key={index}>{error}</span>)}
            </p>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Simple slider</Label>
          <Slider name="slider1" defaultValue={[25]} aria-label="Simple slider" />
          <p className="text-destructive mt-2 w-full text-xs" role="alert" aria-live="polite">
            {state?.slider1?.map((error, index) => <span key={index}>{error}</span>)}
          </p>
        </div>

        <div className="">
          <div className="inline-flex items-center gap-2">
            <Switch name="switch1" id="switch1" />
            <Label htmlFor="switch1" className="sr-only">
              Simple switch
            </Label>
          </div>
          <p className="text-destructive mt-2 w-full text-xs" role="alert" aria-live="polite">
            {state?.switch1?.map((error, index) => <span key={index}>{error}</span>)}
          </p>
        </div>

        <Button disabled={pending} type="submit">
          전송
        </Button>
      </form>
    </div>
  );
}
