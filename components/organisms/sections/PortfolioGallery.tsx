import { readdir } from 'node:fs/promises';
import path from 'node:path';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
export async function PortfolioGallery() {
const directory = path.join(process.cwd(), 'public', 'Portfolio');

const photos = (await readdir(directory)).filter((file) =>
/\.(jpg|jpeg|png|webp)$/i.test(file)
);

const featured = photos.slice(0, 12);
const remaining = photos.slice(12);

const gallery = (items: string[]) =>
items.map((photo) => (
<a
key={photo}
href={`/Portfolio/${encodeURIComponent(photo)}`}
target="_blank"
rel="noopener noreferrer"
className="group block overflow-hidden rounded-lg border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
>
<div className="relative aspect-[4/3] overflow-hidden bg-muted">
<Image
src={`/Portfolio/${photo}`}
alt="SWS renovation project"
fill
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
className="object-cover transition-transform duration-500 group-hover:scale-105"
/>
</div>

<div className="p-4 sm:p-5">
<h3 className="text-base sm:text-lg font-bold">
<span className="bg-gradient-to-r from-primary to-[#0851a3] bg-clip-text text-transparent">
SWS Project
</span>
</h3>

<p className="mt-1 text-sm text-muted-foreground">
View project
</p>
</div>
</a>
));

return (
<section
id="portfolio"
className="container mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-8 mt-10"
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

<div className="mt-8">
  <Link
    href="/projects"
    className="mx-auto flex w-full max-w-md items-center justify-center rounded-lg border-2 border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
  >
    View all projects
  </Link>
</div>
)}
</section>
);
}
