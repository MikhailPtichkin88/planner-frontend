import type { TypeTimeBlockFormState } from "@/types/time-block.types"
import { Controller, SubmitHandler, useFormContext } from "react-hook-form"
import { useUpdateTimeBlock } from "./useUpdateTimeBlock"
import { useCreateTimeBlock } from "./useCreateTimeBlock"
import { COLORS } from "./colors.data"
import { Field } from "@/components/ui/field/Field"
import { SingleSelect } from "@/components/ui/task-edit/SingleSelect"
import { Button } from "@/components/ui/button/Button"

interface ITimeBlockingFormProps {

}

export const TimeBlockingForm = ({ }: ITimeBlockingFormProps) => {
  const { register, control, watch, reset, handleSubmit, getValues } = useFormContext<TypeTimeBlockFormState>()

  const existId = watch('id')
  const { updateTimeBlock, isUpdatePending } = useUpdateTimeBlock()
  const { createTimeBlock, isPending } = useCreateTimeBlock()


  const onSubmit: SubmitHandler<TypeTimeBlockFormState> = data => {
    const { color, id, ...rest } = data
    const dto = { ...rest, color: color || undefined }

    if (id) {
      updateTimeBlock({ id, data: dto })
    } else {
      createTimeBlock(dto)
    }

    reset({
      color: COLORS[COLORS.length - 1],
      duration: 0,
      name: '',
      id: undefined,
      order: 1
    })

  }


  return <form onSubmit={handleSubmit(onSubmit)} className="w-3/5">

    <Field
      {...register('name', { required: true })}
      id="name"
      label="Enter name:"
      placeholder="Enter name:"
      extra="mb-4"
    />

    <Field
      {...register("duration", { required: true, valueAsNumber: true })}
      id="duration"
      label="Enter duration:"
      placeholder="Enter duration:"
      isNumber
      extra="mb-4"
    />

    <div>
      <span className="inline-block mb-1.5">Color:</span>
      <Controller
        control={control}
        name="color"
        render={({ field: { value, onChange } }) => (
          <SingleSelect
            data={COLORS.map(item => ({ value: item, label: item }))}
            onChange={onChange}
            value={value || COLORS[COLORS.length - 1]}
            isColorSelect
          />
        )}
      />
    </div>
    <Button type="submit" disabled={isPending || isUpdatePending} className="mt-6">{existId ? 'Update' : 'Create'}</Button>
  </form>
}
