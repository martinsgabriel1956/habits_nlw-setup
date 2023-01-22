import { useRoute } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";
import dayjs from "dayjs";

import { BackButton } from "../../components/BackButton";
import { Params } from "./types";
import { ProgressBar } from "../../components/ProgressBar";
import { Checkbox } from "../../components/Checkbox";

export const Habit = () => {
  const { params } = useRoute();
  const { date } = params as Params;

  const parseDate = dayjs(date);
  const dayOfWeek = parseDate.format("dddd");
  const dayAndMonth = parseDate.format("DD/MM");

  return (
    <View className="flex-1 px-8 pt-16 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-base font-semibold lowercase text-zinc-400">
          {dayOfWeek}
        </Text>

        <Text className="text-3xl font-extrabold text-white">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={30} />

        <View className="mt-6">
          <Checkbox title="Beber 2l de água" checked={false} />
          <Checkbox title="Caminhar" checked />
        </View>
      </ScrollView>
    </View>
  )
}