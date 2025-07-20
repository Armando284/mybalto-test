// app/patients/components/PatientGrid/ClientGrid.tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import { PatientsResponse } from '../lib/definitions'
import { fetchPatients } from '../lib/api/client'
import Pagination from '../ui/pagination'
import { useState, useMemo } from 'react'
import {
	Gender,
	GenderDescription,
	Species,
	SpeciesDescription,
	CurrentWeightUnit,
} from '../lib/definitions'
import {
	FunnelIcon,
	XMarkIcon,
	ArrowPathIcon,
} from '@heroicons/react/24/outline'

export default function ClientGrid({
	initialData,
}: {
	initialData: PatientsResponse
}) {
	const [localPage, setLocalPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(12)

	const [filters, setFilters] = useState({
		species: '' as Species | '',
		gender: '' as Gender | '',
		isDeceased: null as boolean | null,
		searchQuery: '',
	})
	const [showFilters, setShowFilters] = useState(false)

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['patients'],
		queryFn: () => fetchPatients(),
		initialData,
	})

	const filteredItems = useMemo(() => {
		return (
			data?.items?.filter((patient) => {
				return (
					(filters.species === '' ||
						patient.Species === filters.species) &&
					(filters.gender === '' ||
						patient.Gender === filters.gender) &&
					(filters.isDeceased === null ||
						patient.IsDeceased === filters.isDeceased) &&
					(filters.searchQuery === '' ||
						patient.Name.toLowerCase().includes(
							filters.searchQuery.toLowerCase()
						) ||
						patient.BreedDescription.toLowerCase().includes(
							filters.searchQuery.toLowerCase()
						) ||
						patient.covetrusId
							.toLowerCase()
							.includes(filters.searchQuery.toLowerCase()))
				)
			}) || []
		)
	}, [data?.items, filters])

	const startIdx = (localPage - 1) * itemsPerPage
	const endIdx = startIdx + itemsPerPage
	const paginatedItems = filteredItems?.slice(startIdx, endIdx)
	const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

	const resetFilters = () => {
		setFilters({
			species: '',
			gender: '',
			isDeceased: null,
			searchQuery: '',
		})
		setLocalPage(1)
	}

	const getStatusColor = (patient: {
		IsDeceased: boolean
		Inactive: boolean
	}) => {
		if (patient.IsDeceased) return 'bg-red-100 text-red-800'
		if (patient.Inactive) return 'bg-yellow-100 text-yellow-800'
		return 'bg-green-100 text-green-800'
	}

	const speciesOptions: { value: Species; label: SpeciesDescription }[] = [
		{ value: 'FELINE', label: 'Feline' },
		{ value: 'CANINE', label: 'Canine' },
		{ value: 'AVIAN', label: 'Avian' },
		{ value: 'RODENT', label: 'Rodent' },
		{ value: 'REPTILE', label: 'Reptile' },
		{ value: 'RABBIT', label: 'Rabbit' },
		{ value: 'UNKNOWN', label: 'Unknown' },
	]

	const genderOptions: { value: Gender; label: GenderDescription }[] = [
		{ value: 'F', label: 'Female' },
		{ value: 'M', label: 'Male' },
		{ value: 'N', label: 'Neutered' },
		{ value: 'S', label: 'Spayed' },
	]

	return (
		<div className="space-y-6">
			<div className="bg-white p-4 rounded-lg shadow-sm">
				<div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
					<div className="relative w-full md:w-64">
						<input
							type="text"
							placeholder="Search..."
							value={filters.searchQuery}
							onChange={(e) => {
								setFilters({
									...filters,
									searchQuery: e.target.value,
								})
								setLocalPage(1)
							}}
							className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<div className="absolute left-3 top-2.5 text-gray-400">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</div>
					</div>

					<div className="flex gap-2 w-full md:w-auto">
						<button
							onClick={() => setShowFilters(!showFilters)}
							className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
							<FunnelIcon className="h-5 w-5 text-gray-600" />
							<span>Filters</span>
							{Object.values(filters).some(
								(val) => val !== '' && val !== null
							) && (
								<span className="h-2 w-2 rounded-full bg-blue-500"></span>
							)}
						</button>

						<button
							onClick={resetFilters}
							className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
							<ArrowPathIcon className="h-5 w-5 text-gray-600" />
							<span>Reset</span>
						</button>
					</div>
				</div>

				{showFilters && (
					<div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Specie
							</label>
							<select
								value={filters.species}
								onChange={(e) => {
									setFilters({
										...filters,
										species: e.target.value as Species | '',
									})
									setLocalPage(1)
								}}
								className="w-full border rounded-md p-2 text-sm">
								<option value="">All species</option>
								{speciesOptions.map((option) => (
									<option
										key={option.value}
										value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Gender
							</label>
							<select
								value={filters.gender}
								onChange={(e) => {
									setFilters({
										...filters,
										gender: e.target.value as Gender | '',
									})
									setLocalPage(1)
								}}
								className="w-full border rounded-md p-2 text-sm">
								<option value="">All genders</option>
								{genderOptions.map((option) => (
									<option
										key={option.value}
										value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								State
							</label>
							<select
								value={
									filters.isDeceased === null
										? ''
										: filters.isDeceased
										? 'true'
										: 'false'
								}
								onChange={(e) => {
									const value = e.target.value
									setFilters({
										...filters,
										isDeceased:
											value === ''
												? null
												: value === 'true',
									})
									setLocalPage(1)
								}}
								className="w-full border rounded-md p-2 text-sm">
								<option value="">Any state</option>
								<option value="false">Live</option>
								<option value="true">Deceased</option>
							</select>
						</div>
					</div>
				)}
			</div>

			<div className="text-sm text-gray-600">
				Showing {paginatedItems.length} of {filteredItems.length}{' '}
				patients
				{filteredItems.length !== data.items.length &&
					` (filtrados de ${data.items.length} totales)`}
			</div>

			{isLoading ? (
				<div className="flex justify-center items-center h-64">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
				</div>
			) : (
				<>
					{paginatedItems.length === 0 ? (
						<div className="bg-white rounded-lg p-8 text-center">
							<XMarkIcon className="mx-auto h-12 w-12 text-gray-400" />
							<h3 className="mt-2 text-lg font-medium text-gray-900">
								No patients found
							</h3>
							<p className="mt-1 text-sm text-gray-500">
								Try adjusting your search filters.
							</p>
							<button
								onClick={resetFilters}
								className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
								Reset filters
							</button>
						</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
							{paginatedItems.map((patient) => (
								<div
									key={patient.id}
									className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
									<div className="p-4 border-b">
										<div className="flex justify-between items-start">
											<h3 className="font-semibold text-lg truncate">
												{patient.Name}
											</h3>
											<span
												className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
													patient
												)}`}>
												{patient.IsDeceased
													? 'Deceased'
													: patient.Inactive
													? 'Inactive'
													: 'Active'}
											</span>
										</div>
										<p className="text-sm text-gray-500">
											{patient.SpeciesDescription}
										</p>
									</div>

									<div className="p-4 space-y-2">
										<div className="grid grid-cols-2 gap-2 text-sm">
											<div>
												<p className="text-gray-500">
													ID
												</p>
												<p className="truncate">
													{patient.covetrusId ||
														patient.PmsId}
												</p>
											</div>
											<div>
												<p className="text-gray-500">
													Gender
												</p>
												<p>
													{patient.GenderDescription}
												</p>
											</div>
											<div>
												<p className="text-gray-500">
													Breed
												</p>
												<p className="truncate">
													{patient.BreedDescription}
												</p>
											</div>
											<div>
												<p className="text-gray-500">
													Age
												</p>
												<p>
													{patient.DateOfBirth
														? new Date().getFullYear() -
														  new Date(
																patient.DateOfBirth
														  ).getFullYear() +
														  ' años'
														: 'Desconocida'}
												</p>
											</div>
											<div>
												<p className="text-gray-500">
													Weight
												</p>
												<p>
													{patient.CurrentWeight}{' '}
													{patient.CurrentWeightUnit}
												</p>
											</div>
											<div>
												<p className="text-gray-500">
													Color
												</p>
												<p>
													{patient.ColorDescription ||
														'Desconocido'}
												</p>
											</div>
										</div>

										<div className="pt-2 mt-2 border-t text-xs space-y-1">
											{patient.DateOfBirth && (
												<p>
													<span className="text-gray-500">
														Birth:
													</span>{' '}
													{new Date(
														patient.DateOfBirth
													).toLocaleDateString()}
												</p>
											)}
											{patient.DateOfDeath && (
												<p>
													<span className="text-gray-500">
														Death:
													</span>{' '}
													{new Date(
														patient.DateOfDeath
													).toLocaleDateString()}
												</p>
											)}
											<p>
												<span className="text-gray-500">
													Register:
												</span>{' '}
												{new Date(
													patient.EnteredDate
												).toLocaleDateString()}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</>
			)}

			{filteredItems.length > 0 && (
				<div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
					<div className="text-sm text-gray-600">
						Page {localPage} of {totalPages}
					</div>
					<Pagination
						currentPage={localPage}
						totalPages={totalPages}
						onPageChange={setLocalPage}
					/>
				</div>
			)}
		</div>
	)
}
