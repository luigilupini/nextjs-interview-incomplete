import Form from "next/form";
import { LimitSelect } from "@/components/limit-select";
import { SearchInput } from "@/components/search-input";
import { ThemeSwitch } from "@/components/theme-switch";

export default function Page() {
	return (
		<header className="z-10 shrink-0 border-b border-base-content/10 bg-base-200">
			<div className="container mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 py-2 px-4">
				<Form action="/" replace className="flex gap-2">
					<SearchInput defaultValue={""} />
					<LimitSelect defaultValue={"20"} />
				</Form>
				<ThemeSwitch />
			</div>
		</header>
	);
}
