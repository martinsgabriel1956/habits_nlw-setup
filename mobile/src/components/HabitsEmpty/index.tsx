import { useNavigation } from "@react-navigation/native"
import { Text } from "react-native"

export const HabitsEmpty = () => {
  const { navigate } = useNavigation()

  return (
    <Text
      className="text-base text-zinc-400"
    >
      Você ainda não está monitorando nenhum hábito {" "}

      <Text
        className="text-base underline text-violet-400 active:text-violet-500"
        onPress={() => navigate("new-habit")}
      >
        comece cadastrando um.
      </Text>
    </Text>
  )
}