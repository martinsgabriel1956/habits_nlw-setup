import * as Progress from '@radix-ui/react-progress';
import React from 'react';
import { ProgressBarProps } from './types';

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <Progress.Root className="w-full h-3 mt-4 rounded-xl bg-zinc-700" value={progress}>
      <Progress.Indicator
        className="h-3 transition-all rounded-xl bg-violet-600"
        style={{ width: `${progress}%` }}
      />
    </Progress.Root>
  )
}