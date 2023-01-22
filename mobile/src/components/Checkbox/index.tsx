import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import colors from "tailwindcss/colors";
import { CheckboxProps } from "./types";

export const Checkbox: React.FC<CheckboxProps> = ({ title, checked = false, ...rest }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row items-center mb-2"
      {...rest}
    >
      {
        checked ? (
          <View className="items-center justify-center w-8 h-8 bg-green-500 rounded-lg">
            <Feather
              name="check"
              size={20}
              color={colors.white}
            />
          </View>

        ) : (
          <View className="items-center justify-center w-8 h-8 rounded-lg bg-zinc-900">

          </View>
        )
      }

      <Text className="ml-3 text-base text-white">
        {title}
      </Text>
    </TouchableOpacity>
  )
}