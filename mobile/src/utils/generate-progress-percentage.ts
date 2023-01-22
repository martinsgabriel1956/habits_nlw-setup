interface generateProgressPercentageProps {
  total: number;
  completed: number;
}

export const generateProgressPercentage = ({
  completed,
  total,
}: generateProgressPercentageProps) => Math.round((completed / total) * 100);
