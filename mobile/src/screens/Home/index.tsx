import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { api } from "../../lib/axios";
import { DAY_SIZE, weekDays } from "../../utils";
import { generateDatesFromYearBeginning } from "../../utils/generate-dates-from-year-beginning";
import { SummaryProps } from "./types";
import { HabitDay, Header, Loading } from "../../components";

const datesFromYearStart = generateDatesFromYearBeginning();
const miniumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = miniumSummaryDatesSize - datesFromYearStart.length;

export const Home: React.FC = () => {
  const amountOfDaysToFillArray = Array.from({ length: amountOfDaysToFill });

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryProps | null>(null);
  const { navigate } = useNavigation();

  function handleNavigateToHabit(date: string) {
    navigate("habit", {
      date: date
    });
  }

  async function fetchData() {
    try {
      setLoading(false);
      const response = await api.get("summary");
      const data = response.data;
      setSummary(data);
    } catch (error) {
      Alert.alert("Ops", "Não foi possível carregar o sumário de hábitos.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <View
      className="flex-1 px-8 pt-16 bg-background"
    >
      <Header />

      <View
        className="flex-row mt-6 mb-2 "
      >
        {weekDays.map((weekDay, index) => (
          <Text
            key={`${weekDay}-${index}`}
            className="mx-1 text-xl font-bold text-center text-zinc-400"
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {summary && (
          <View
            className="flex-row flex-wrap"
          >
            {datesFromYearStart.map(date => {
              const dayWithHabits = summary?.find(day => dayjs(date).isSame(day.date, "day"));

              console.log(dayWithHabits);

              return (
                <HabitDay
                  key={date.toISOString()}
                  onPress={() => handleNavigateToHabit(date.toISOString())}
                  date={date}
                  amountOfHabits={dayWithHabits?.amount}
                  amountCompleted={dayWithHabits?.completed}
                />
              )
            })}

            {amountOfDaysToFill > 0 && amountOfDaysToFillArray.map((_, index) => (
              <View
                key={index}
                className="m-1 border-2 rounded-lg bg-zinc-900 border-zinc-800 opacity-40"
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  )
}