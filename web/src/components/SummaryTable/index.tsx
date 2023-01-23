import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { SummaryData } from './types';
import { api } from '../../lib/axios';
import { weekDays } from "../../utils/weekdays";
import { generateDatesFromYearBeginning } from "../../utils/generate-dates-from-year-beginning";
import { HabitDay } from "../HabitDay";

const summaryDates = generateDatesFromYearBeginning();
const miniumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = miniumSummaryDatesSize - summaryDates.length;

export const SummaryTable = () => {
  const amountOfDaysToFillArray = Array.from({ length: amountOfDaysToFill });
  const { data: summary } = useQuery<SummaryData>({
    queryKey: ["summary"], queryFn: async () => {
      const response = await api.get("summary");
      const summary = response.data;
      return summary;
    },
    staleTime: 10000 * 60 // 10 minutes
  });

  return (
    <div
      className="flex w-full "
    >
      <div
        className="grid grid-flow-row gap-3 grid-rows-7"
      >
        {weekDays.map((weekDay, index) => (
          <div
            key={`${weekDay}-${index}`}
            className="flex items-center justify-center w-10 h-10 text-xl font-bold text-zinc-400"
          >
            {weekDay}
          </div>
        ))}
      </div>
      <div
        className="grid grid-flow-col gap-3 grid-rows-7"
      >
        {summary?.length! > 0 && summaryDates.map(date => {
          const dayInSummary = summary?.find(day => dayjs(date).isSame(day.date, "day"));

          return (
            <HabitDay
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount}
              defaultCompleted={dayInSummary?.completed}
            />
          )
        })}

        {amountOfDaysToFill > 0 && amountOfDaysToFillArray.map((_, index) => (
          <div
            key={index}
            className="w-10 h-10 border-2 rounded-lg cursor-not-allowed bg-zinc-900 border-zinc-800 opacity-40"
          >

          </div>
        ))}
      </div>
    </div>
  )
}