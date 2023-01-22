import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from '@expo/vector-icons';
import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";

import Logo from '../../assets/logo.svg';

export const Header = () => {
  const { navigate } = useNavigation();

  function handleNavigateToNewHabit() {
    navigate("new-habit");
  }

  return (
    <View
      className="flex-row items-center justify-between w-full"
    >
      <Logo />

      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row items-center px-4 border rounded-lg h-11 border-violet-500"
        onPress={handleNavigateToNewHabit}
      >
        <Feather
          name="plus"
          color={colors.violet[500]}
          size={20}
        />
        <Text
          className="ml-3 text-base font-semibold text-white "
        >
          Novo
        </Text>
      </TouchableOpacity>
    </View>
  )
}