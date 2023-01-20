import { ScrollView, Text, View } from "react-native";

import { HabitDay, Header } from "../../components";
import { DAY_SIZE, weekDays } from "../../utils";
import { generateDatesFromYearBeginning } from "../../utils/generate-dates-from-year-beginning";

const datesFromYearStart = generateDatesFromYearBeginning();
const miniumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = miniumSummaryDatesSize - datesFromYearStart.length;

export const Home: React.FC = () => {
  const amountOfDaysToFillArray = Array.from({ length: amountOfDaysToFill });

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
        <View
          className="flex-row flex-wrap"
        >
          {datesFromYearStart.map(date => (
            <HabitDay
              key={date.toISOString()}
            />
          ))}

          {amountOfDaysToFill > 0 && amountOfDaysToFillArray.map((_, index) => (
            <View
              key={index}
              className="m-1 border-2 rounded-lg bg-zinc-900 border-zinc-800 opacity-40"
              style={{ width: DAY_SIZE, height: DAY_SIZE }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}