// app/medical-request/page.tsx
import MedicalForm from '../ui/medicalForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Pet Medical Assistance Request',
}

export default function MedicalRequestPage() {
	return (
		<main className="min-h-screen py-12 bg-gray-50">
			<div className="container mx-auto px-4">
				<MedicalForm />
			</div>
		</main>
	)
}
