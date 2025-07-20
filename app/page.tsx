import ServerTable from './ui/serverPatientsTable'

export default function Page() {
	return (
		<main className="w-full min-h-screen bg-slate-100 text-gray-800">
			{/* COMPONENTE Mostrar los datos con filtrados y paginación */}
			<div className="container mx-auto py-8">
				<h1 className="text-2xl font-bold mb-6">Patients</h1>
				<ServerTable />
			</div>
			{/* COMPONENTE Mostrar gráficas */}
			{/* COMPONENTE Mostrar formulario de creación de historias con integración a IA */}
		</main>
	)
}
