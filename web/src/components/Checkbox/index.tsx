import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { CheckBoxProps } from './types';

export const CheckBox: React.FC<CheckBoxProps> = ({ text }) => {
  return (
    <Checkbox.Root
      className='flex items-center gap-3 group'
    >
      <div className="flex items-center justify-center w-8 h-8 border-2 rounded-lg bg-zinc-900 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
        <Checkbox.Indicator>
          <Check size={20} className="text-white" />
        </Checkbox.Indicator>
      </div>
      <span
        className='text-xl font-semibold leading-tight text-white group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'
      >
        {text}
      </span>
    </Checkbox.Root>
  )
}