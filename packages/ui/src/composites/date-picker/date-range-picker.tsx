'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Calendar } from '@monorepo-starter/ui/components/calendar';
import { Input } from '@monorepo-starter/ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@monorepo-starter/ui/components/popover';
import { calendarOptions } from '@monorepo-starter/ui/composites/date-picker/options';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { compareAsc, format, parse } from 'date-fns';
import { CalendarIcon, MinusIcon, XIcon } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useId, useState } from 'react';
import { type DateRange } from 'react-day-picker';

export default function DateRangePicker({
  value,
  onChange,
}: {
  value?: { from: string; to: string };
  onChange?: Dispatch<SetStateAction<{ from: string; to: string }>>;
}) {
  const id = useId();
  const [date, setDate] = useState<DateRange | undefined>({
    from: value?.from ? new Date(value.from) : undefined,
    to: value?.to ? new Date(value.to) : undefined,
  });
  const [month, setMonth] = useState<Date | undefined>();
  const [inputValue, setInputValue] = useState<[string, string]>([value?.from ?? '', value?.to ?? '']);

  const handleDayPickerSelect = (date: DateRange | undefined) => {
    if (!date) {
      setDate(undefined);
      setInputValue(['', '']);
    } else {
      setDate(date);
      setMonth(date.to ?? date.from);
      setInputValue([date.from ? format(date.from, 'yyyy-MM-dd') : '', date.to ? format(date.to, 'yyyy-MM-dd') : '']);
    }
  };

  const handleFromInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue([value, inputValue[1]]);
    setMonth(parse(value, 'yyyy-MM-dd', new Date()));
  };

  const handleToInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue([inputValue[0], value]);
    setMonth(parse(value, 'yyyy-MM-dd', new Date()));
  };

  const handleInputBlur = () => {
    if (inputValue[0] && inputValue[1]) {
      const dates: [Date, Date] = [
        parse(inputValue[0], 'yyyy-MM-dd', new Date()),
        parse(inputValue[1], 'yyyy-MM-dd', new Date()),
      ];
      dates.sort(compareAsc);

      setDate({ from: dates[0], to: dates[1] });
      setInputValue([format(dates[0], 'yyyy-MM-dd'), format(dates[1], 'yyyy-MM-dd')]);
    }
  };

  useEffect(() => {
    onChange?.({ from: inputValue[0], to: inputValue[1] });
  }, [date]);

  return (
    <div className="relative inline-flex items-center">
      <div className="inline-flex flex-1 items-center rounded-md border pr-12">
        <Input
          type="date"
          className="border-none focus-visible:ring-0 [&::-webkit-calendar-picker-indicator]:hidden"
          value={inputValue[0]}
          onChange={handleFromInputChange}
          onBlur={handleInputBlur}
          placeholder="날짜를 선택해주세요"
        />
        <span>
          <MinusIcon className="text-muted-foreground" size={16} />
        </span>
        <Input
          type="date"
          className="border-none focus-visible:ring-0 [&::-webkit-calendar-picker-indicator]:hidden"
          value={inputValue[1]}
          onChange={handleToInputChange}
          onBlur={handleInputBlur}
          placeholder="날짜를 선택해주세요"
        />
        {(inputValue[0].length > 0 || inputValue[1].length > 0) && (
          <button
            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-8 flex h-full w-8 items-center justify-center outline-none transition-[color,box-shadow] focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Clear input"
            onClick={() => {
              setInputValue(['', '']);
              setDate(undefined);
            }}
          >
            <XIcon size={16} aria-hidden="true" />
          </button>
        )}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant={'ghost'}
            className={cn(
              'border-input group justify-between px-3 font-normal outline-none outline-offset-0 hover:bg-transparent focus-visible:outline-[3px]',
              'absolute right-0',
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
        <PopoverContent className="w-auto p-2" align="center">
          <Calendar
            {...calendarOptions({ month, onMonthChange: setMonth })}
            mode="range"
            numberOfMonths={2}
            selected={date}
            onSelect={handleDayPickerSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
