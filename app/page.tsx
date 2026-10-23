"use client";

import { useEffect, useState } from "react";
import { RecipesList } from "@/components/recipes-list";

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

	return (
		<section className="space-y-4">
			{/* <p className="text-sm opacity-70 px-1">
				Showing {recipes.length} of {total}
			</p> */}

			<RecipesList recipes={recipes} />
		</section>
	);
}
