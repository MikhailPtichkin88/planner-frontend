import { ITimeBlockResponse } from "@/types/time-block.types";

export function calcHoursLeft(items: ITimeBlockResponse[] | undefined) {
  const totalMinutes = items?.reduce((acc, el) => acc + el.duration, 0) || 0
  const totalHours = Math.floor(totalMinutes / 60)
  const hoursLeft = 24 - totalHours
  return { hoursLeft }

}