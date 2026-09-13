import { readdir } from 'node:fs/promises';
import path from 'node:path';
import Image from 'next/image';

export async function PortfolioGallery() {
const directory = path.join(process.cwd(), 'public', 'Portfolio');

const photos = (await readdir(directory))
.filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));

const featured = photos.slice(0, 12);
const remaining = photos.slice(12);

const gallery = (items: string[]) =>
items.map((photo) => (
<a
key={photo}
href={`/Portfolio/${encodeURIComponent(photo)}`}
target="_blank"
rel="noopener noreferrer"
className="group block overflow-hidden rounded-lg border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
>
<div className="relative aspect-[4/3] overflow-hidden">
<Image
src={`/Portfolio/${photo}`}
alt="SWS renovation project"
fill
sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
className="object-cover transition-transform duration-500 group-hover:scale-105"
/>

<div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
</div>

<div className="px-4 py-3">
<span className="text-sm font-semibold text-primary">
View project
</span>
</div>
</a>
));

return (
<section
id="portfolio"
className="container mx-auto max-w-full px-4 py-8 sm:px-6 lg:px-8 mt-10"
>
<div className="mb-6 sm:mb-8">
<h2 className="text-2xl sm:text-3xl lg:text-4xl w-full font-extrabold tracking-tight text-left">
Our{' '}
<span className="bg-gradient-to-r from-primary to-[#0851a3] bg-clip-text text-transparent">
Work
</span>
</h2>

<p className="mt-2 max-w-2xl text-sm sm:text-base text-muted-foreground">
A selection of our completed restoration, renovation and finishing
projects.
</p>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
{gallery(featured)}
</div>

{remaining.length > 0 && (
<details className="group mt-8">
<summary className="mx-auto flex w-full max-w-md cursor-pointer list-none items-center justify-center rounded-md border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">
<span className="group-open:hidden">
View all projects
</span>

<span className="hidden group-open:inline">
Show less
</span>
</summary>

<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
{gallery(remaining)}
</div>
</details>
)}
</section>
);
}
