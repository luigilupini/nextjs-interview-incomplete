"use client";

// Exercise 3: Setup search filters
// Use https://dummyjson.com/docs/recipes#recipes-search the API results.
export function SearchInput({ defaultValue }: { defaultValue: string }) {
	return (
		<input
			type="search"
			defaultValue={defaultValue}
			placeholder="Search here"
			className="input input-bordered max-w-xs"
		/>
	);
}
