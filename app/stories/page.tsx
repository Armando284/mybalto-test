// app/medical-request/page.tsx
import MedicalForm from '../ui/medicalForm'
import { Metadata } from 'next'
import RotatingExamples from '../ui/rotatingExamples'

export const metadata: Metadata = {
	title: 'Pet Medical Assistance Request',
}

export default function MedicalRequestPage() {
	return (
		<main className="min-h-screen py-12 bg-gray-50">
			{/* Example generated story output */}
			<header className="w-full p-6 mx-auto">
				<RotatingExamples />
			</header>
			{/*  Dynamic Form Creation */}
			<div className="container mx-auto px-4">
				<MedicalForm />
			</div>
		</main>
	)
}
