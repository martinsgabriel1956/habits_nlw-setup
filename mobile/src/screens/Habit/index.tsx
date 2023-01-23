import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Alert, ScrollView, Text, View } from "react-native";
import dayjs from "dayjs";
import { api } from "../../lib/axios";
import { DayInfoData, Params } from "./types";
import { BackButton, Checkbox, HabitsEmpty, Loading, ProgressBar } from "../../components";
import { generateProgressPercentage } from "../../utils/generate-progress-percentage";
import clsx from "clsx";

export const Habit = () => {
  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoData | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);
  const { params } = useRoute();
  const { date } = params as Params;

  const parseDate = dayjs(date);
  const isDateInPast = parseDate.endOf("day").isBefore(new Date());
  const dayOfWeek = parseDate.format("dddd");
  const dayAndMonth = parseDate.format("DD/MM");

  const habitsProgress = dayInfo?.possibleHabits.length ? generateProgressPercentage({ completed: completedHabits.length, total: dayInfo.possibleHabits.length }) : 0

  async function getHabits() {
    try {
      setLoading(true);
      const response = await api.get("day", { params: { date } });
      const habits = response.data;

      console.log(date);
      setDayInfo(habits);
      setCompletedHabits(habits.completedHabits);
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possível carregar as informações dos hábitos.");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleHabit(habitId: string) {
    try {
      await api.patch(`/habits/${habitId}/toggle`);

    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possível atualizar o status do hábito.");
    }

    if (completedHabits.includes(habitId)) {
      setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId));
    } else {
      setCompletedHabits(prevState => [...prevState, habitId]);
    }
  }

  useEffect(() => {
    getHabits();
  }, [])

  if (loading) {
    return <Loading />
  }

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

        <ProgressBar progress={habitsProgress} />

        <View className={clsx("mt-6", {
          ["opacity-40"]: isDateInPast
        })}>
          {
            dayInfo?.possibleHabits ? dayInfo?.possibleHabits.map(habit => (
              <Checkbox
                key={habit.id}
                title={habit.title}
                checked={completedHabits.includes(habit.id)}
                disabled={isDateInPast}
                onPress={() => handleToggleHabit(habit.id)}
              />
            )) : <HabitsEmpty />
          }
        </View>
        {
          isDateInPast && (
            <Text className="mt-10 text-center text-white">
              Você não pode editarr hábitos de uma data passada
            </Text>
          )
        }
      </ScrollView>
    </View>
  )
}