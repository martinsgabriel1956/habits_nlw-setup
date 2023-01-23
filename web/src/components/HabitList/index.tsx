import { useEffect, useState } from "react"
import dayjs from "dayjs"
import * as Checkbox from '@radix-ui/react-checkbox';
import { api } from "../../lib/axios"
import { CheckBox } from "../Checkbox"
import { HabitListProps, HabitsInfo } from "./types"
import { Check } from "phosphor-react";

export const HabitList: React.FC<HabitListProps> = ({ date, onCompletedChanged }) => {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  async function getData() {
    const response = await api.get("day", {
      params: {
        date: date.toISOString(),
      }
    })

    const data = response.data;

    setHabitsInfo(data);
    return data;
  }

  useEffect(() => {
    getData();
  }, [])

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`);
    const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId);
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits
    })

    onCompletedChanged(completedHabits.length);
  }

  return (
    <div className="flex flex-col gap-3 mt-6">
      {habitsInfo?.possibleHabits.map(habit => (
        <Checkbox.Root
          key={habit.id}
          defaultChecked={habitsInfo.completedHabits.includes(habit.id)}
          disabled={isDateInPast}
          className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'
          onCheckedChange={() => handleToggleHabit(habit.id)}
        >
          <div
            className="flex items-center justify-center w-8 h-8 border-2 rounded-lg bg-zinc-900 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background"
          >
            <Checkbox.Indicator>
              <Check size={20} className="text-white" />
            </Checkbox.Indicator>
          </div>
          <span
            className='text-xl font-semibold leading-tight text-white group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'
          >
            {habit.title}
          </span>
        </Checkbox.Root>

        // <CheckBox disabled={isDateInPast} defaultChecked={habitsInfo.completedHabits.includes(habit.id)} key={habit.id} text={habit.title} />
      ))}
    </div>
  )
}
