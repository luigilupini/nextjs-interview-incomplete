import "./globals.css";
import { Inter } from "next/font/google";
import Form from "next/form";
import { LimitSelect } from "../components/limit-select";
import { SearchInput } from "../components/search-input";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} min-h-screen bg-base-200 text-base-content`}
			>
				<header className="container mx-auto max-w-6xl p-6 pb-0">
					<Form action="/" replace className="flex flex-wrap gap-2">
						<SearchInput defaultValue={""} />
						<LimitSelect defaultValue={"20"} />
					</Form>
				</header>
				<main className="container mx-auto max-w-6xl space-y-8 p-6">
					{children}
				</main>
			</body>
		</html>
	);
}
