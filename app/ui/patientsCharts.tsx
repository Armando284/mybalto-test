// app/ui/patientsCharts.tsx
'use client'

import {
	PieChart,
	Pie,
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts'
import { Item, PatientsResponse } from '../lib/definitions'
import { processChartData } from '../lib/utils'
import { useQuery } from '@tanstack/react-query'
import { fetchPatients } from '../lib/api/client'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function PatientCharts() {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['patients'],
		queryFn: () => fetchPatients(),
	})

	const patients: Item[] = data?.items || []
	const chartData = processChartData(patients)

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
			<div className="bg-white p-4 rounded-lg shadow">
				<h3 className="text-lg font-semibold mb-4">
					Species distribution
				</h3>
				<ResponsiveContainer
					width="100%"
					height={300}>
					<PieChart>
						<Pie
							data={chartData.species}
							cx="50%"
							cy="50%"
							labelLine={false}
							label={({ name, percent = 0 }) =>
								`${name}: ${(percent * 100).toFixed(0)}%`
							}
							outerRadius={80}
							fill="#8884d8"
							dataKey="value">
							{chartData.species.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Pie>
						<Tooltip />
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>

			<div className="bg-white p-4 rounded-lg shadow">
				<h3 className="text-lg font-semibold mb-4">
					Gender distribution
				</h3>
				<ResponsiveContainer
					width="100%"
					height={300}>
					<BarChart
						data={chartData.gender}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar
							dataKey="value"
							fill="#8884d8"
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>

			<div className="bg-white p-4 rounded-lg shadow">
				<h3 className="text-lg font-semibold mb-4">Patient status</h3>
				<ResponsiveContainer
					width="100%"
					height={300}>
					<PieChart>
						<Pie
							data={chartData.status}
							cx="50%"
							cy="50%"
							innerRadius={60}
							outerRadius={80}
							fill="#8884d8"
							paddingAngle={5}
							dataKey="value"
							label>
							{chartData.status.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Pie>
						<Tooltip />
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>

			<div className="bg-white p-4 rounded-lg shadow">
				<h3 className="text-lg font-semibold mb-4">Age distribution</h3>
				<ResponsiveContainer
					width="100%"
					height={300}>
					<BarChart
						data={createAgeBins(chartData.ages)}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Bar
							dataKey="value"
							fill="#8884d8"
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

// Función auxiliar para crear bins de edad
function createAgeBins(ages: number[]) {
	const bins = [
		{ name: '0-5', min: 0, max: 5, value: 0 },
		{ name: '6-10', min: 6, max: 10, value: 0 },
		{ name: '11-15', min: 11, max: 15, value: 0 },
		{ name: '16-20', min: 16, max: 20, value: 0 },
		{ name: '20+', min: 21, max: Infinity, value: 0 },
	]

	ages.forEach((age) => {
		const bin = bins.find((b) => age >= b.min && age <= b.max)
		if (bin) bin.value++
	})

	return bins
}
