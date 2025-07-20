// app\ui\serverPatientsTable.tsx
import { fetchPatients } from '../lib/api/client'
import { PatientsResponse } from '../lib/schemas'
import PatientsTable from './clientPatientsTable'

export default async function ServerTable() {
	const data: PatientsResponse = await fetchPatients()

	return <PatientsTable initialData={data} />
}
