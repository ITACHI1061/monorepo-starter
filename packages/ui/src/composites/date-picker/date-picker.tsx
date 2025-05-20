'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Calendar } from '@monorepo-starter/ui/components/calendar';
import { Input } from '@monorepo-starter/ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@monorepo-starter/ui/components/popover';
import { calendarOptions } from '@monorepo-starter/ui/composites/date-picker/options';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, XIcon } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function DatePicker({
  name,
  value,
  onChange,
}: {
  name?: string;
  value?: string;
  onChange?: Dispatch<SetStateAction<string>>;
}) {
  const [month, setMonth] = useState<Date | undefined>();
  const [date, setDate] = useState<Date | undefined>(value ? new Date(value) : undefined);
  const [inputValue, setInputValue] = useState(value ? format(new Date(value), 'yyyy-MM-dd') : '');

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue('');
      setDate(undefined);
    } else {
      setDate(date);
      setMonth(date);
      setInputValue(format(date, 'yyyy-MM-dd'));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const parsedDate = new Date(value);
      setDate(parsedDate);
      setMonth(parsedDate);
    } else {
      setDate(undefined);
    }
  };

  const handleClear = () => {
    setInputValue('');
    setDate(undefined);
    onChange?.('');
  };

  useEffect(() => {
    onChange?.(date ? format(date, 'yyyy-MM-dd') : '');
  }, [date]);

  return (
    <div className="relative inline-flex items-center">
      <Input
        className="flex-1 pr-12 [&::-webkit-calendar-picker-indicator]:hidden"
        type="date"
        placeholder="날짜를 선택해주세요"
        value={inputValue}
        onChange={handleInputChange}
        name={name}
      />
      {inputValue && (
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-8 flex h-full w-8 items-center justify-center outline-none transition-[color,box-shadow] focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Clear input"
          onClick={handleClear}
        >
          <XIcon size={16} aria-hidden="true" />
        </button>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'ghost'}
            className={cn(
              'group absolute right-0 justify-between px-3 font-normal outline-none outline-offset-0 hover:bg-transparent focus-visible:outline-[3px]',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon
              size={16}
              className="text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <Calendar
            {...calendarOptions({ month, onMonthChange: setMonth })}
            mode="single"
            selected={date}
            onSelect={handleDayPickerSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
