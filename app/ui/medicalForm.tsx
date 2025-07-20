// app/components/medical-form/MedicalForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { fetchPatients } from '../lib/api/client'
import { Item } from '../lib/definitions'
import { MedicalFormData, medicalFormSchema } from '../lib/schemas'
import { useState } from 'react'

export default function MedicalForm() {
	const [selectedPet, setSelectedPet] = useState<Item | null>(null)

	// Fetch pets from React Query cache
	const { data: petsData } = useQuery({
		queryKey: ['patients'],
		queryFn: fetchPatients,
		staleTime: 1000 * 60 * 5, // 5 minutes
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<MedicalFormData>({
		resolver: zodResolver(medicalFormSchema),
		mode: 'onChange',
	})

	const onSubmit = (data: MedicalFormData) => {
		console.log('Form submitted:', data)
		alert('Form submitted successfully!')
	}

	const handlePetSelect = (petId: number) => {
		const pet = petsData?.items.find((p) => p.id === petId)
		setSelectedPet(pet || null)
	}

	return (
		<div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
			<h1 className="text-2xl font-bold text-center mb-6">
				Pet Medical Assistance Request
			</h1>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-8">
				{/* Section 1: Pet Selection */}
				<div className="space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
					<h2 className="text-xl font-semibold text-blue-600 border-b pb-2 mb-4">
						1. Select Your Pet
					</h2>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Search for your pet
						</label>
						<select
							{...register('petId', {
								onChange: (e) =>
									handlePetSelect(Number(e.target.value)),
							})}
							className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
							<option value="">Select a pet...</option>
							{petsData?.items.map((pet) => (
								<option
									key={pet.id}
									value={pet.id}>
									{pet.Name} ({pet.SpeciesDescription},{' '}
									{pet.BreedDescription})
								</option>
							))}
						</select>
						{errors.petId && (
							<p className="text-red-500 text-sm mt-1">
								{errors.petId.message}
							</p>
						)}
					</div>

					{selectedPet && (
						<div className="p-4 border rounded-md bg-white">
							<h3 className="font-medium text-gray-800">
								Selected Pet Information
							</h3>
							<div className="grid grid-cols-2 gap-2 mt-2 text-sm">
								<div>
									<span className="text-gray-500">Name:</span>{' '}
									{selectedPet.Name}
								</div>
								<div>
									<span className="text-gray-500">
										Species:
									</span>{' '}
									{selectedPet.SpeciesDescription}
								</div>
								<div>
									<span className="text-gray-500">
										Breed:
									</span>{' '}
									{selectedPet.BreedDescription}
								</div>
								<div>
									<span className="text-gray-500">Age:</span>{' '}
									{selectedPet.DateOfBirth
										? `${
												new Date().getFullYear() -
												new Date(
													selectedPet.DateOfBirth
												).getFullYear()
										  } years`
										: 'Unknown'}
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Section 2: Medical Situation */}
				<div className="space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
					<h2 className="text-xl font-semibold text-blue-600 border-b pb-2 mb-4">
						2. Medical Situation
					</h2>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							What medical condition/emergency does your pet have?
						</label>
						<textarea
							{...register('condition')}
							rows={3}
							className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							placeholder="Describe the condition in detail..."
						/>
						{errors.condition && (
							<p className="text-red-500 text-sm mt-1">
								{errors.condition.message}
							</p>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								When did this condition start?
							</label>
							<input
								type="date"
								{...register('conditionStartDate', {
									valueAsDate: true,
								})}
								className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
							{errors.conditionStartDate && (
								<p className="text-red-500 text-sm mt-1">
									{errors.conditionStartDate.message}
								</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Estimated cost of treatment ($)
							</label>
							<input
								type="number"
								step="0.01"
								{...register('estimatedCost', {
									valueAsNumber: true,
								})}
								className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="0.00"
							/>
							{errors.estimatedCost && (
								<p className="text-red-500 text-sm mt-1">
									{errors.estimatedCost.message}
								</p>
							)}
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							What is the recommended treatment?
						</label>
						<textarea
							{...register('recommendedTreatment')}
							rows={3}
							className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							placeholder="Describe the recommended treatment..."
						/>
						{errors.recommendedTreatment && (
							<p className="text-red-500 text-sm mt-1">
								{errors.recommendedTreatment.message}
							</p>
						)}
					</div>
				</div>

				{/* Section 3: Pet's Story */}
				<div className="space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
					<h2 className="text-xl font-semibold text-blue-600 border-b pb-2 mb-4">
						3. Your Pet's Story
					</h2>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							How long have you had your pet?
						</label>
						<input
							{...register('ownershipDuration')}
							className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							placeholder="e.g., 5 years, since 2018"
						/>
						{errors.ownershipDuration && (
							<p className="text-red-500 text-sm mt-1">
								{errors.ownershipDuration.message}
							</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							What makes your pet special to your family?
						</label>
						<textarea
							{...register('specialMeaning')}
							rows={3}
							className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							placeholder="Tell us what makes your pet unique..."
						/>
						{errors.specialMeaning && (
							<p className="text-red-500 text-sm mt-1">
								{errors.specialMeaning.message}
							</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Share a favorite memory with your pet
						</label>
						<textarea
							{...register('favoriteMemory')}
							rows={3}
							className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							placeholder="Describe a special moment you shared..."
						/>
						{errors.favoriteMemory && (
							<p className="text-red-500 text-sm mt-1">
								{errors.favoriteMemory.message}
							</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							How has this situation affected your family?
						</label>
						<textarea
							{...register('familyImpact')}
							rows={3}
							className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							placeholder="Describe the impact on your family..."
						/>
						{errors.familyImpact && (
							<p className="text-red-500 text-sm mt-1">
								{errors.familyImpact.message}
							</p>
						)}
					</div>
				</div>

				{/* Section 4: Financial Need */}
				<div className="space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
					<h2 className="text-xl font-semibold text-blue-600 border-b pb-2 mb-4">
						4. Financial Need
					</h2>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Have you already spent money on initial treatment?
							How much? ($)
						</label>
						<input
							type="number"
							step="0.01"
							{...register('initialTreatmentCost', {
								valueAsNumber: true,
							})}
							className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							placeholder="0.00"
						/>
						{errors.initialTreatmentCost && (
							<p className="text-red-500 text-sm mt-1">
								{errors.initialTreatmentCost.message}
							</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							What other financial hardships are you facing?
						</label>
						<textarea
							{...register('otherHardships')}
							rows={3}
							className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							placeholder="Describe any other financial challenges..."
						/>
						{errors.otherHardships && (
							<p className="text-red-500 text-sm mt-1">
								{errors.otherHardships.message}
							</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							By when do you need the funds?
						</label>
						<input
							type="date"
							{...register('fundingDeadline', {
								valueAsDate: true,
							})}
							className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
						{errors.fundingDeadline && (
							<p className="text-red-500 text-sm mt-1">
								{errors.fundingDeadline.message}
							</p>
						)}
					</div>
				</div>

				{/* Submit Button */}
				<div className="flex justify-center pt-4">
					<button
						type="submit"
						className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
						Submit Request
					</button>
				</div>
			</form>
		</div>
	)
}
