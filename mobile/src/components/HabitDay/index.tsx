import { TouchableOpacity } from "react-native";
import { DAY_SIZE } from "../../utils";

export const HabitDay = () => {
  return (
    <TouchableOpacity
      className="m-1 border-2 rounded-lg bg-zinc-900 border-zinc-800"
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
    />
  )
}