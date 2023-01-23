export interface Params {
  date: string;
}

export interface DayInfoData {
  completedHabits: string[];
  possibleHabits: {
    id: string;
    title: string;
  }[];
}
