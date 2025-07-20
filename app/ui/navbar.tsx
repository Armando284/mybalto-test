import Link from 'next/link'

export default function Navbar() {
	return (
		<nav className="w-full h-14 bg-slate-200 text-gray-800 shadow-slate-300 shadow flex items-center px-5 relative z-10">
			<ul>
				<li>
					<Link
						className="flex items-center h-10 rounded-md px-2 transition-colors ease-in-out duration-300 hover:bg-blue-200 active:bg-blue-500"
						href={'/'}>
						Home
					</Link>
				</li>
			</ul>
		</nav>
	)
}
