import * as ToastComponent from '@radix-ui/react-toast';
import { X } from 'phosphor-react';
import { useState } from 'react';

export const Toast = () => {
  const [open, setOpen] = useState(false);

  return (
    <ToastComponent.Root open={open} onOpenChange={setOpen} className='fixed top-0 right-0 bg-white w-96'>
      <ToastComponent.Title className='text-bold text-zinc-600 '>
        Error
      </ToastComponent.Title>
      <ToastComponent.Description>
        Preencha todos os campos para cadastrar um novo hábito
      </ToastComponent.Description>
      {/* <ToastComponent.Action /> */}
      <ToastComponent.Close>
        <X size={20} className="text-white" />
      </ToastComponent.Close>
    </ToastComponent.Root>
  )
}