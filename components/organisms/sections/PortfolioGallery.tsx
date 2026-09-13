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
<figure
key={photo}
className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#e8e4dc]"
>
<Image
src={`/Portfolio/${photo}`}
alt="SWS renovation project"
fill
sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
className="object-cover transition duration-700 group-hover:scale-105"
/>

<div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/10" />
</figure>
));

return (
<section id="portfolio" className="bg-[#18241f] py-24 text-white sm:py-32">
<div className="mx-auto max-w-7xl px-5 sm:px-8">

<div className="mb-12 max-w-2xl">
<p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#c9a27e]">
SWS · Portfolio
</p>

<h2 className="font-serif text-4xl tracking-tight sm:text-5xl">
Our work
</h2>

<p className="mt-4 text-base leading-7 text-white/65">
A selection of completed restoration, renovation and finishing
projects.
</p>
</div>

<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
{gallery(featured)}
</div>

{remaining.length > 0 && (
<details className="group mt-8">
<summary className="cursor-pointer list-none rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold transition hover:bg-white/10">
<span className="group-open:hidden">
View all projects
</span>

<span className="hidden group-open:inline">
Show less
</span>
</summary>

<div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
{gallery(remaining)}
</div>
</details>
)}

</div>
</section>
);
}

