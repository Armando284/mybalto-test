import PatientCharts from './ui/patientsCharts'
import PatientsTable from './ui/clientPatientsTable'
import { fetchPatients } from './lib/api/client'
import { type PatientsResponse } from './lib/definitions'
import { Suspense } from 'react'

export default async function Page() {
	const data: PatientsResponse = await fetchPatients()

	return (
		<main className="w-full min-h-screen bg-slate-100 text-gray-800">
			{/* Sort / Organize / Group pet data - Show in some simple display */}
			<Suspense fallback={<div>Loading...</div>}>
				<div className="container mx-auto py-8">
					<h1 className="text-2xl font-bold mb-6">Patients</h1>
					<PatientsTable initialData={data} />
				</div>
			</Suspense>
			{/* Show data in a graph / chart */}
			<Suspense fallback={<div>Loading charts...</div>}>
				<div className="container mx-auto py-8">
					<h1 className="text-2xl font-bold mb-6">Patient Charts</h1>
					<PatientCharts initialData={data} />
				</div>
			</Suspense>
		</main>
	)
}
