import cn from 'clsx'
import cls from './PomodoroRounds.module.scss'
import type { IPomodoroRoundResponse } from '@/types/pomodoro.types'
import { ChevronLeft, ChevronRight } from 'lucide-react'


interface IPomodoroRounds {
  rounds: IPomodoroRoundResponse[] | undefined
  nextRoundHandler: () => void
  prevRoundHandler: () => void
  activeRound: IPomodoroRoundResponse | undefined
}
export const PomodoroRounds = ({ rounds, nextRoundHandler, prevRoundHandler, activeRound }: IPomodoroRounds) => {
  const isCanPrevRound = rounds ? rounds.some(round => round.isCompleted) : false
  const isCanNextRound = rounds ? !(rounds[rounds.length - 1].isCompleted) : false

  return (
    <div className={cls.container}>
      <button
        className={cls.button}
        disabled={!isCanPrevRound}
        onClick={() => (isCanPrevRound ? prevRoundHandler() : false)}
      ><ChevronLeft size={23} /></button>

      <div className={cls.roundsContainer}>
        {Boolean(rounds?.length) && rounds?.map((round, index) => {
          return (
            <div
              key={index}
              className={cn(cls.round, {
                [cls.completed]: round.isCompleted,
                [cls.active]: activeRound?.id === round.id && !round.isCompleted
              })}></div>
          )
        })}
      </div>

      <button
        className={cls.button}
        disabled={!isCanNextRound}
        onClick={() => (isCanNextRound ? nextRoundHandler() : false)}
      ><ChevronRight size={23} /></button>
    </div>
  )
}