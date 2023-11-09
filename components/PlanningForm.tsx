import Input from '@/theme/Input'
import { useState } from 'react'
import Router from 'next/router'
import { Planning } from '@/types/planning'
import { useRegistration } from '@/context/planning'
import ButtonDouble from '@/theme/button-double'
import planningService from '@/services/planning'
import Avatar from '@/theme/avatar'

export default function PlanningForm({ onClose }: any) {
	const [planningName, setPlanningName] = useState('')
	const { user } = useRegistration()

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (!planningName) return console.log('Please fill out all fields')

		const payload: Planning = {
			hostId: user.id,
			participants: [{ ...user, vote: 0 }],
			host: user.name,
			average: 0,
			name: planningName,
			votingSystem: 'fibonacci',
		}

		planningService.createDocument(payload).then((response: any) => Router.push(`/planning/${response.id}`))
	}

	return (
		<form onSubmit={handleSubmit} className='flex flex-col justify-between h-full w-full max-w-xs mx-auto'>
			<div className='flex flex-col gap-8 items-center'>
				<Avatar type={user.avatar} name={user.name} />
				<h1 className='font-medium text-gray-600 text-lg'>Let's create a planning</h1>
				<Input
					label='Planning Name'
					placeholder='Enter a planning name'
					value={planningName}
					onChange={(e) => setPlanningName(e.target.value)}
				/>
			</div>
			<ButtonDouble labelPrimary='Create' labelSecondary='Cancel' disabled={!planningName} onClickSecondary={onClose} />
		</form>
	)
}
