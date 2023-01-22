import { TouchableOpacityProps } from "react-native";

export interface HabitDayProps extends TouchableOpacityProps {
  amountOfHabits?: number;
  amountCompleted?: number;
  date: Date;
}
