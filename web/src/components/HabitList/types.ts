export interface HabitListProps {
  date: Date;
  onCompletedChanged: (completed: number) => void;
}

export interface HabitsInfo {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[];
}
