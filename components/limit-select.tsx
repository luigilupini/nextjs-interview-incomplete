"use client";

// Exercise 3: Setup limit filters
// Use https://dummyjson.com/docs/recipes#recipes-limit the API results.
export function LimitSelect({ defaultValue }: { defaultValue: string }) {
	return (
		<select defaultValue={defaultValue} className="select appearance-none w-40">
			<option value="10">Show 10</option>
			<option value="20">Show 20</option>
			<option value="30">Show 30</option>
			<option value="100">Show 100</option>
		</select>
	);
}
