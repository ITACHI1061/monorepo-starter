import { Button } from '@monorepo-starter/ui/components/button';
import { Calendar } from '@monorepo-starter/ui/components/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@monorepo-starter/ui/components/select';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { DropdownNavProps, DropdownProps } from 'react-day-picker';
import { ko } from 'react-day-picker/locale';

export function calendarOptions({
  mode = 'single',
  month,
  onMonthChange,
}: {
  mode?: 'single' | 'multiple' | 'range';
  month: Date | undefined;
  onMonthChange: (month: Date) => void;
}) {
  const handleCalendarChange = (value: string | number, e: React.ChangeEventHandler<HTMLSelectElement>) => {
    const event = {
      target: {
        value: String(value),
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    e(event);
  };

  return {
    locale: ko,
    mode,
    month,
    onMonthChange,
    // fixedWeeks: true,
    // showWeekNumber: true,
    captionLayout: 'dropdown',
    defaultMonth: new Date(),
    startMonth: new Date(1960, 6),
    // disabled: [
    //   { dayOfWeek: [0, 6] }, // weekdays
    //   { after: new Date() },
    //   { before: new Date(1986, 1) },
    //   { from: new Date('2025-03-01'), to: endOfMonth(new Date('2025-03-01')) },
    // ],
    classNames: {
      // day_button: cn(
      //   `rounded-full`, // all day buttons
      //   `group-[[data-selected]:not(.range-middle)]:bg-blue-600`, // selected day buttons
      // ),
      // month_caption: 'ms-2.5 me-20 justify-start',
      // nav: 'justify-end',
      week: cn(
        `[&_td:nth-child(1):not([data-outside])>button]:text-red-700/80`, // Sunday
        `[&_td:last-child:not([data-outside])>button]:text-blue-700/80`, // Saturday
      ),
    },
    components: {
      DropdownNav: (props: DropdownNavProps) => {
        return (
          <div className="flex w-full flex-row-reverse items-center justify-center gap-2 [&>span]:text-sm [&>span]:font-medium">
            {props.children}
          </div>
        );
      },
      Dropdown: (props: DropdownProps) => {
        const isYearsDropdown = props.className?.includes('years_dropdown');

        return (
          <Select
            value={props.value?.toString()}
            onValueChange={(value) => {
              if (props.onChange) {
                handleCalendarChange(value, props.onChange);
              }
            }}
          >
            <SelectTrigger className="h-8 w-fit font-medium first:grow">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[min(26rem,var(--radix-select-content-available-height))]">
              {props.options?.map((option) => (
                <SelectItem key={option.value} value={String(option.value)} disabled={option.disabled}>
                  {option.label} {isYearsDropdown && ' 년'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      },
    },
    footer: (
      <div>
        <Button variant="outline" size="sm" className="mb-1 mt-2" onClick={() => onMonthChange(new Date())}>
          Current month
        </Button>
      </div>
    ),
  } as Partial<typeof Calendar>;
}
