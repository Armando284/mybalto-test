import Link from 'next/link'

export default function Navbar() {
	return (
		<nav className="w-full h-14 flex items-center bg-slate-200 text-gray-800 shadow-slate-300 shadow px-5 relative z-10">
			<ul className="flex justify-start items-center">
				<li>
					<Link
						className="flex items-center h-10 rounded-md px-2 transition-colors ease-in-out duration-300 hover:bg-blue-200 active:bg-blue-500"
						href={'/'}>
						Home
					</Link>
				</li>
				<li>
					<Link
						className="flex items-center h-10 rounded-md px-2 transition-colors ease-in-out duration-300 hover:bg-blue-200 active:bg-blue-500"
						href={'/stories'}>
						Stories
					</Link>
				</li>
			</ul>
		</nav>
	)
}
