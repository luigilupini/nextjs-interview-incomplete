import { Providers } from "@/context/providers";
import { jetbrains, rubik } from "@/fonts";
import "@/styles/globals.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="h-full" suppressHydrationWarning>
			<body
				className={`${rubik.variable} ${jetbrains.variable} flex h-full flex-col bg-base-200 text-base-content font-sans`}
			>
				<Providers>
					<main className="flex-1 overflow-y-auto">
						<div className="container mx-auto max-w-6xl space-y-8 p-6">
							{children}
						</div>
					</main>
				</Providers>
			</body>
		</html>
	);
}
