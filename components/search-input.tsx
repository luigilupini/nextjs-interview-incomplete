"use client";

export function SearchInput({ defaultValue }: { defaultValue: string }) {
	return (
		<input
			type="search"
			name="q"
			value={defaultValue}
			placeholder="Search Pokémon..."
			className="input input-bordered w-full max-w-xs"
		/>
	);
}
