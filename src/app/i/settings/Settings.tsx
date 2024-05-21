'use client'

import { useInitialData } from './useInitialData'
import { useUpdateSettings } from './useUpdateSettings'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/Button'
import { Field } from '@/components/ui/field/Field'

import { TypeUserForm } from '@/types/auth.types'

export const Settings = () => {
	const { register, handleSubmit, reset } = useForm<TypeUserForm>({
		mode: 'onChange'
	})

	useInitialData(reset)
	const { mutate, isPending } = useUpdateSettings()

	const onSubmit: SubmitHandler<TypeUserForm> = data => {
		const { password, ...rest } = data
		mutate({
			...rest,
			password: password || undefined
		})
	}
	return (
		<div>
			<form
				className='w-2/4'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='grid grid-cols-2 gap-10'>
					<div>
						<Field
							id='email'
							label='Email:'
							type='email'
							extra='mb-4'
							placeholder='Enter email:'
							{...register('email', { required: true })}
						/>

						<Field
							id='name'
							label='Name:'
							extra='mb-4'
							placeholder='Enter name:'
							{...register('name')}
						/>

						<Field
							id='password'
							label='Password:'
							type='password'
							extra='mb-10'
							placeholder='Enter password:'
							{...register('password')}
						/>
					</div>

					<div>
						<Field
							id='workInterval'
							label='Work interval (min.):'
							extra='mb-4'
							isNumber
							placeholder='Enter work interval (min.):'
							{...register('workInterval', { valueAsNumber: true })}
						/>

						<Field
							id='breakInterval'
							label='Break interval (min.):'
							extra='mb-4'
							isNumber
							placeholder='Enter break interval (min.):'
							{...register('breakInterval', { valueAsNumber: true })}
						/>

						<Field
							id='intervalsCount'
							label='Intervals count (max 10):'
							extra='mb-6'
							isNumber
							placeholder='Enter intervals count (max 10):'
							{...register('intervalsCount', { valueAsNumber: true })}
						/>
					</div>
				</div>
				<Button
					type='submit'
					disabled={isPending}
				>
					Save
				</Button>
			</form>
		</div>
	)
}
