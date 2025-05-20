'use client';

import { Checkbox } from '@monorepo-starter/ui/components/checkbox';
import { Input } from '@monorepo-starter/ui/components/input';
import { Label } from '@monorepo-starter/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@monorepo-starter/ui/components/select';
import { useQueryStates } from 'nuqs';
import { useTransition } from 'react';
import { Literal, literals, parsers, urlKeys } from './searchParams';

export function Client() {
  const [isPending, startTransition] = useTransition();
  const [{ str, int, bool, literal, float }, setParams] = useQueryStates(parsers, {
    startTransition,
    shallow: false,
    urlKeys,
  });

  return (
    <div className="not-prose">
      {isPending}
      <div className="max-w-120 flex flex-col gap-2">
        <Input type="text" value={str} onChange={(e) => setParams({ str: e.target.value })} />
        <Input type="number" value={int} onChange={(e) => setParams({ int: Number(e.target.valueAsNumber) })} />
        <div>
          <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
            <Checkbox
              id="toggle-2"
              checked={bool}
              onCheckedChange={(checked) => setParams({ bool: !!checked })}
              className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
            />
            <div className="grid gap-1.5 font-normal">
              <p className="text-sm font-medium leading-none">Enable Checkbox</p>
              <p className="text-muted-foreground text-sm">You can enable or disable checkbox at any time.</p>
            </div>
          </Label>
        </div>
        <Select value={literal} onValueChange={(value) => setParams({ literal: value as Literal })}>
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            {literals.map((literal) => (
              <SelectItem key={literal} value={literal}>
                {literal}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input type="number" value={float} onChange={(e) => setParams({ float: Number(e.target.valueAsNumber) })} />
      </div>
    </div>
  );
}
