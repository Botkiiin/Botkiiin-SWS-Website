import { readdir } from 'node:fs/promises';
import path from 'node:path';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';

const categories = {
  'wood-restoration': {
    folder: 'woodworking',
    title: 'Wood Restoration',
    subtitle: 'Houtrestauratie',
  },
  bathrooms: {
    folder: 'Bathrooms',
    title: 'Bathroom Renovation',
    subtitle: 'Badkamerrenovatie',
  },
  kitchens: {
    folder: 'Kitchens',
    title: 'Kitchen Renovation',
    subtitle: 'Keukenrenovatie',
  },
  stairs: {
    folder: 'Stairs',
    title: 'Stairs',
    subtitle: 'Trappen',
  },
  'painting-finishing': {
    folder: 'Painting-Finishing',
    title: 'Painting & Finishing',
    subtitle: 'Schilderwerk & Afwerking',
  },
  'other-renovation': {
    folder: 'Other-Renovation',
    title: 'Other Renovation',
    subtitle: 'Overige Renovatie',
  },
} as const;

type CategorySlug = keyof typeof categories;

export default async function ProjectCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!(slug in categories)) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Project category not found</h1>

        <Link
          href="/projects"
          className="mt-6 inline-flex items-center gap-2 rounded-lg border-2 border-primary px-5 py-3 font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>
      </main>
    );
  }

  const category = categories[slug as CategorySlug];

  const directory = path.join(
    process.cwd(),
    'public',
    'services',
    category.folder
  );

  const photos = (await readdir(directory)).filter((file) =>
    /\.(jpg|jpeg|png|webp)$/i.test(file)
  );

  return (
    <main className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/projects"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-80"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {category.title}
        </h1>

        <p className="mt-2 text-base text-muted-foreground">
          {category.subtitle}
        </p>
      </div>

      {photos.length === 0 ? (
        <div className="rounded-xl border border-border p-10 text-center text-muted-foreground">
          No photos available yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <a
              key={photo}
              href={`/services/${category.folder}/${encodeURIComponent(photo)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={`/services/${category.folder}/${encodeURIComponent(photo)}`}
                  alt={category.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
