// app/patients/components/Pagination.tsx
'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface PaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) {
	const canGoPrev = currentPage > 1
	const canGoNext = currentPage < totalPages

	return (
		<div className="flex items-center justify-center gap-2">
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={!canGoPrev}
				className={`p-2 rounded ${
					canGoPrev ? 'hover:bg-gray-100' : 'opacity-50'
				}`}>
				<ChevronLeftIcon className="w-4 h-4" />
			</button>

			{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
				let pageNum
				if (totalPages <= 5) {
					pageNum = i + 1
				} else if (currentPage <= 3) {
					pageNum = i + 1
				} else if (currentPage >= totalPages - 2) {
					pageNum = totalPages - 4 + i
				} else {
					pageNum = currentPage - 2 + i
				}

				return (
					<button
						key={pageNum}
						onClick={() => onPageChange(pageNum)}
						className={`w-10 h-10 rounded ${
							currentPage === pageNum
								? 'bg-blue-500 text-white'
								: 'hover:bg-gray-100'
						}`}>
						{pageNum}
					</button>
				)
			})}

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={!canGoNext}
				className={`p-2 rounded ${
					canGoNext ? 'hover:bg-gray-100' : 'opacity-50'
				}`}>
				<ChevronRightIcon className="w-4 h-4" />
			</button>
		</div>
	)
}
