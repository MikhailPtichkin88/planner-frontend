"use client"
import Loader from "@/components/ui/Loader"
import { useProfile } from "@/hooks/useProfile"

interface IStatisticsProps {

}

export const Statistics = ({ }: IStatisticsProps) => {
  const { data, isLoading } = useProfile()

  if (isLoading) return <Loader />

  return (
    <div className="grid grid-cols-4 gap-12 mt-7">
      {Boolean(data?.statistics?.length) ? data?.statistics.map(({ label, value }) => (
        <div key={label} className="bg-border/5 rounded p-layout text-center hover:-translate-y-3 transition-transform duration-500">

          <div className="text-xl">{label}</div>
          <div className="text-3xl font-semibold">{value}</div>
        </div>
      )) : <div>Statistics not found</div>}
    </div>
  )
}
