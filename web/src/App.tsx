import { Habit } from './components/Habit';
import './styles/global.css';

export const App: React.FC = () => {
  return (
    <Habit completed={4} />
  )
}