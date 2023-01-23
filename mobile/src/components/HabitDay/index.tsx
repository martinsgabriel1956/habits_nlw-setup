import { TouchableOpacity } from "react-native";
import clsx from "clsx";
import dayjs from "dayjs";

import { HabitDayProps } from "./types";
import { DAY_SIZE } from "../../utils";
import { generateProgressPercentage } from "../../utils/generate-progress-percentage";

export const HabitDay: React.FC<HabitDayProps> = ({ amountOfHabits = 0, amountCompleted = 0, date, ...rest }) => {
  const amountAccomplishedPercentage = amountOfHabits > 0 ? generateProgressPercentage({ total: amountOfHabits, completed: amountCompleted }) : 0;
  const today = dayjs().startOf("day").toDate();
  const isCurrentDay = dayjs(date).isSame(today);

  return (
    <TouchableOpacity
      className={clsx("m-1 border-2 rounded-lg", {
        ['bg-zinc-900 border-zinc-800']: amountAccomplishedPercentage === 0,
        ['bg-violet-900 border-violet-700']: amountAccomplishedPercentage > 0 && amountAccomplishedPercentage < 20,
        ['bg-violet-800 border-violet-600']: amountAccomplishedPercentage >= 20 && amountAccomplishedPercentage < 40,
        ['bg-violet-700 border-violet-500']: amountAccomplishedPercentage >= 40 && amountAccomplishedPercentage < 60,
        ['bg-violet-600 border-violet-500']: amountAccomplishedPercentage >= 60 && amountAccomplishedPercentage < 80,
        ['bg-violet-500 border-violet-400']: amountAccomplishedPercentage >= 80,
        ["border-white border-4"]: isCurrentDay

      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
      {...rest}
    />
  )
}