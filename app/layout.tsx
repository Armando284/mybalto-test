import '@/app/ui/global.css'
import { ReactQueryProviders } from './providers'
import Navbar from './ui/navbar'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>
				<Navbar />
				<ReactQueryProviders>{children}</ReactQueryProviders>
			</body>
		</html>
	)
}
