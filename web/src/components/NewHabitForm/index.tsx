import { FormEvent, useState } from "react";
import { Check } from "phosphor-react"
import * as Checkbox from '@radix-ui/react-checkbox';

import { availableWeekDays } from "../../utils/availableWeekDays";
import { Toast } from "../Toast";
import { api } from "../../lib/axios";

export const NewHabitForm = () => {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function handleCreateNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0) {
      return (
        <Toast />
      );
    }

    await api.post("habits", {
      title,
      weekDays
    })

    alert("Hábito criado com sucesso!");

    setTitle("");
    setWeekDays([]);
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDayIndex = weekDays.filter(day => day !== weekDay);
      setWeekDays(weekDayIndex);
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay];
      setWeekDays(weekDaysWithAddedOne);
    }
  }

  return (
    <form
      onSubmit={handleCreateNewHabit}
      className="flex flex-col w-full mt-6"
    >
      <label htmlFor="title" className="font-semibold leading-tight">Qual seu comprometimento?</label>
      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc..."
        autoFocus
        value={title}
        className="p-4 mt-3 text-white rounded-lg bg-zinc-800 placeholder:text-zinc-400"
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="" className="mt-4 font-semibold leading-tight" >Qual a recorrência?</label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay, index) => (
          <Checkbox.Root
            key={weekDay}
            checked={weekDays.includes(index)}
            className='flex items-center gap-3 group'
            onCheckedChange={() => handleToggleWeekDay(index)}
          >
            <div className="flex items-center justify-center w-8 h-8 border-2 rounded-lg bg-zinc-900 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>
            <span
              className='leading-tight text-white'
            >
              {weekDay}
            </span>
          </Checkbox.Root>
        ))}
      </div>

      <button type="submit" className="flex items-center justify-center gap-3 p-4 mt-6 font-semibold bg-green-600 rounded-lg hover:bg-green-500">
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}