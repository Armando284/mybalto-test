// app/components/story-examples/RotatingExamples.tsx
'use client'

import { useEffect, useState } from 'react'
import { MOCK_STORY_EXAMPLES } from '../lib/placeholder-data'

const ROTATION_INTERVAL = 3 * 60 * 1000

export default function RotatingExamples() {
	const [currentExampleIndex, setCurrentExampleIndex] = useState(0)

	useEffect(() => {
		// Set up rotation interval
		const interval = setInterval(() => {
			setCurrentExampleIndex(
				(prev) => (prev + 1) % MOCK_STORY_EXAMPLES.length
			)
		}, ROTATION_INTERVAL)

		return () => clearInterval(interval)
	}, [])

	const currentExample = MOCK_STORY_EXAMPLES[currentExampleIndex]

	return (
		<div className="w-full h-[75dvh] bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between items-center">
			<h3 className="text-xl font-semibold mb-4 text-blue-600">
				Example Pet Stories
			</h3>

			<div className="mb-4 max-w-[75ch] overflow-y-scroll">
				<p>{currentExample}</p>
			</div>

			<div className="flex justify-center mt-4 space-x-2">
				{MOCK_STORY_EXAMPLES.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentExampleIndex(index)}
						className={`w-3 h-3 rounded-full ${
							currentExampleIndex === index
								? 'bg-blue-600'
								: 'bg-gray-300'
						}`}
						aria-label={`View example ${index + 1}`}
					/>
				))}
			</div>
		</div>
	)
}
