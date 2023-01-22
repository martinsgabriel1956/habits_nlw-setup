import { Check } from "phosphor-react"

export const NewHabitForm = () => {
  return (
    <form
      className="flex flex-col w-full mt-6 "
    >
      <label htmlFor="title" className="font-semibold leading-tight">Qual seu comprometimento?</label>
      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc..."
        autoFocus
        className="p-4 mt-3 text-white rounded-lg bg-zinc-800 placeholder:text-zinc-400"
      />

      <label htmlFor="" className="mt-4 font-semibold leading-tight" >Qual a recorrência?</label>

      <button type="submit" className="flex items-center justify-center gap-3 p-4 mt-6 font-semibold bg-green-600 rounded-lg hover:bg-green-500">
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}