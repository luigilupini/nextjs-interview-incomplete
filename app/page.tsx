"use client";

import { Bookmark, Star } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
	searchParams: Promise<{ q?: string; limit?: string }>;
};

// Exercise 1: Convert client-side to server-side
// Use https://dummyjson.com/docs/recipes#recipes-all for the list of all recipes.
export default function Page({ searchParams }: Props) {
	console.log(searchParams);

	// Question: Why is this not optimal?
	// Use the local package.json generated types script.
	const [recipes, setRecipes] = useState<any>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Question: Why is this not optimal?
	useEffect(() => {
		fetch("https://dummyjson.com/recipes/search")
			.then((res) => {
				if (!res.ok) throw new Error("Failed to fetch recipes");
				return res.json();
			})
			.then((json) => setRecipes(json.recipes))
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, []);

	// Exercise 2: Handle loading with suspense boundary
	if (loading) return <p>Loading...</p>;
	// Exercise 2: Handle errors with error boundary
	if (error) return <p className="text-error">{error}</p>;

	// Exercise 4: Displaying individual recipe detail
	// Use https://dummyjson.com/docs/recipes#recipes-single to open a single recipe page.
	return (
		<section className="space-y-4">
			{/* <p className="text-sm opacity-70 px-1">
				Showing {recipes.length} of {total}
			</p> */}

			{/* Question: Can we make this responsive? */}
			<ul className="grid grid-cols-1 gap-4">
				{/* Question: Why is this not optimal? */}
				{recipes.map((r, i) => (
					<li key={i}>
						<a className="card h-full bg-base-100 hover:shadow-xs ring-1 ring-inset ring-base-content/10 overflow-hidden">
							<div className="flex items-center justify-between gap-2 p-2">
								<div className="flex flex-col justify-between size-full">
									<div className="flex flex-col gap-0">
										<h2 className="card-title text-sm">{r.name}</h2>
										<p className="text-xs opacity-70">
											Difficulty: {r.difficulty}
										</p>
									</div>
									<div className="flex items-center gap-2 text-xs">
										<span className="badge badge-primary badge-ghost text-xs badge-sm rounded-md gap-1 px-2">
											<Star className="w-3 h-3" />
											<span>{r.rating}</span>
										</span>
										<span className="badge badge-primary badge-ghost text-xs badge-sm rounded-md gap-1 px-2">
											<Bookmark className="w-3 h-3" />
											<span>{r.reviewCount}</span>
										</span>
									</div>
								</div>

								{/* Question: Why is this not optimal? */}
								<img
									src={r.image}
									alt={r.name}
									width={200}
									height={200}
									className="aspect-square object-cover size-20 rounded-md"
								/>
							</div>
						</a>
					</li>
				))}
			</ul>
		</section>
	);
}
