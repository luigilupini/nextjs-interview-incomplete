"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

type Pokemon = { name: string; url: string };

type Props = {
	searchParams: Promise<{ q?: string; limit?: string }>;
};

// Solution 1 (client version): fetch in the browser with useEffect
export default function Page({ searchParams }: Props) {
	const params = use(searchParams);
	const { q, limit = "20" } = params;
	const query = q?.trim().toLowerCase() ?? "";

	const [data, setData] = useState<Pokemon[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch the full list once when the page mounts.
	useEffect(() => {
		fetch("https://pokeapi.co/api/v2/pokemon?limit=2000")
			.then((res) => {
				if (!res.ok) throw new Error("Failed to fetch Pokémon");
				return res.json();
			})
			.then((json) => setData(json.results))
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <p>Loading…</p>;
	if (error) return <p className="text-error">{error}</p>;

	const matches = data.filter((p) => p.name.includes(query));
	const results = matches.slice(0, Number(limit));

	if (results.length === 0) {
		return <p className="opacity-70">No Pokémon match “{q}”.</p>;
	}

	return (
		<section className="space-y-4">
			<p className="text-sm opacity-70">
				Showing {results.length} of {matches.length}
			</p>
			<ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
				{results.map((p) => {
					const id = p.url.split("/").filter(Boolean).pop();
					return (
						<li key={p.name}>
							<div className="card cursor-pointer bg-base-100 p-4 capitalize hover:shadow-md">
								#{id} {p.name}
							</div>
						</li>
					);
				})}
			</ul>
		</section>
	);
}
