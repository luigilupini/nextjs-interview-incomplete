# Next.js Interview Exercise: Recipes Browser

A small [Next.js 15](https://nextjs.org/) (App Router, React 19) app that lists recipes from the public [DummyJSON Recipes API](https://dummyjson.com/docs/recipes). The candidate works through a set of exercises to refactor and extend it. Each exercise is marked in the code with `// Exercise N`. Discussion prompts are marked with `// Question: Why is this not optimal?`.

## Getting Started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Other scripts:

| Script                  | Purpose                                                                     |
| ----------------------- | --------------------------------------------------------------------------- |
| `pnpm lint`             | ESLint                                                                      |
| `pnpm typecheck`        | `tsc --noEmit`                                                              |
| `pnpm generate-types`   | Generates TypeScript types from the live API into `lib/types/recipe.ts`     |
| `pnpm generate-schemas` | Generates Zod schemas from the live API into `lib/schemas/recipe.ts`        |

## Tech Stack

- Next.js 15 (App Router, Server Components, `next/form`, parallel routes)
- React 19
- Tailwind CSS v4 + daisyUI 5
- `next-themes` (light/dark switch)
- `zod` (runtime validation)
- `lucide-react` (icons)

## Project Structure

```
app/
  layout.tsx          Root layout (fonts, providers, <main> container)
  page.tsx            Recipes list page            -> Exercises 1, 2
  @header/page.tsx    Parallel-route header slot with the search/limit <Form>
components/
  search-input.tsx    Search box                   -> Exercise 3
  limit-select.tsx    Page size selector           -> Exercise 3
  recipes-list.tsx    Recipe cards                 -> Exercise 4
  theme-switch.tsx    Light/dark toggle
context/providers.tsx ThemeProvider wrapper
lib/types/            Output of `generate-types` (empty to start)
lib/schemas/          Output of `generate-schemas` (empty to start)
```

## The API

Base URL: `https://dummyjson.com`

| Endpoint                         | Use                         | Docs                                                     |
| -------------------------------- | --------------------------- | -------------------------------------------------------- |
| `GET /recipes`                   | All recipes (paginated)     | [recipes-all](https://dummyjson.com/docs/recipes#recipes-all)       |
| `GET /recipes/{id}`              | Single recipe               | [recipes-single](https://dummyjson.com/docs/recipes#recipes-single) |
| `GET /recipes/search?q={query}`  | Search recipes by text      | [recipes-search](https://dummyjson.com/docs/recipes#recipes-search) |
| `GET /recipes?limit={n}&skip={n}`| Limit and skip results      | [recipes-limit](https://dummyjson.com/docs/recipes#recipes-limit)   |

---

## Exercises

### Exercise 1: Convert client-side fetching to server-side

**Where:** `app/page.tsx`

**Current state:** The page is a Client Component (`"use client"`). It fetches in `useEffect` and stores the result in `useState<any>`. It also ignores `searchParams` (it just logs the Promise).

**Goal:**
- Remove `"use client"` and turn the page into an `async` Server Component.
- Fetch recipes on the server from `GET /recipes` (or `/recipes/search` once filters exist).
- Replace `any` with real types. Run `pnpm generate-types` and/or `pnpm generate-schemas` the correct types. Optionally validate the response with Zod.

**Interview questions:**
1. *`useState<any>`: why is this not optimal?*
2. *`useEffect` fetch: why is this not optimal?*
3. Follow-ups:
   - What does `"use client"` actually mean, and where is the boundary?
   - Why is `searchParams` a Promise in Next 15?
   - How does `fetch` caching work in Next 15? Discuss `cache`, `next: { revalidate }` and tags.

---

### Exercise 2: Loading and error states with Suspense and Error Boundaries

**Where:** `app/page.tsx` (the `if (loading)` / `if (error)` branches)

**Goal:**
- Replace the manual branches (`if (loading)` / `if (error)`) with a Suspense and error boundary.

**Interview questions:**
- What is the difference between `loading.tsx` and an inline `<Suspense>`?
- Why must `error.tsx` be a Client Component? What does `reset()` do?
- What happens when you change the search params?
- How would you handle a 404 for a single recipe?

---

### Exercise 3: Search and limit filters

**Where:** `components/search-input.tsx`, `components/limit-select.tsx`, and their usage in `app/@header/page.tsx`

**Current state:** Both inputs are inside a `next/form` `<Form action="/">`, but nothing is submitted.

**Goal:**
- Use the URL as the source of truth: `?q=...&limit=...`.
- Add names `next/form` serializes them into the query string.
- Initialize `defaultValue` from the current search params so the inputs stay in sync after navigation and refresh.
- Submit the limit on change. Optionally debounce search-as-you-type using `useRouter().replace` or `useSearchParams`.
- In the page, call `/recipes/search?q={q}&limit={limit}` (or `/recipes?limit=` when there is no query).

**Interview questions:**
- Why keep filter state in the URL instead of in `useState`?
- How does `next/form` differ from a regular `<form>`?
- How would you debounce, and why should you?
- How do you show pending UI during navigation?
- The layout does not render the `@header` slot. How does it work, and what is needed to show it?

---

### Exercise 4: Recipe detail page

**Where:** `components/recipes-list.tsx` (plus a new route)

**Goal:**
- Create a dynamic route or modal that fetches `GET /recipes/{id}`.
- Show the recipe details: image, ingredients, instructions, times, servings, tags, and so on.

**Interview questions:**
1. *`recipes.map((r, i) => <li key={i}>)`: why is this not optimal?*
2. *`<img src={r.image} ...>`: why is this not optimal?*
3. Follow-ups:
   - Why use `<Link>` over `<a>`?

---

## Bonus / Stretch Topics

- Pagination with `skip` and `limit`, using `total` from the response.
- Caching strategy: `revalidate`, `unstable_cache` / `"use cache"`, tag-based revalidation.
- Tests: what would you unit test vs. e2e test here?
- Type safety end to end: generated types vs. Zod schemas (`z.infer`), and where to validate.
