import { Bookmark, Star } from "lucide-react";

export function RecipesList({ recipes }: { recipes: any[] }) {
	// Exercise 4: Displaying individual recipe detail
	// Use https://dummyjson.com/docs/recipes#recipes-single to open a single recipe page.
	return (
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
	);
}
