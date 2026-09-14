import { readdir } from 'node:fs/promises';
import path from 'node:path';
import Image from 'next/image';
import Link from 'next/link';
import { FolderOpen } from 'lucide-react';

const categories = [
  {
    slug: 'wood-restoration',
    folder: 'woodworking',
    title: 'Wood Restoration',
    subtitle: 'Houtrestauratie',
  },
  {
    slug: 'bathrooms',
    folder: 'Bathrooms',
    title: 'Bathroom Renovation',
    subtitle: 'Badkamerrenovatie',
  },
  {
    slug: 'kitchens',
    folder: 'Kitchens',
    title: 'Kitchen Renovation',
    subtitle: 'Keukenrenovatie',
  },
  {
    slug: 'stairs',
    folder: 'Stairs',
    title: 'Stairs',
    subtitle: 'Trappen',
  },
  {
    slug: 'painting-finishing',
    folder: 'Painting-Finishing',
    title: 'Painting & Finishing',
    subtitle: 'Schilderwerk & Afwerking',
  },
  {
    slug: 'other-renovation',
    folder: 'Other-Renovation',
    title: 'Other Renovation',
    subtitle: 'Overige Renovatie',
  },
];

export default async function ProjectsPage() {
  const projects = await Promise.all(
    categories.map(async (category) => {
      const directory = path.join(
        process.cwd(),
        'public',
        'services',
        category.folder
      );

      const photos = (await readdir(directory)).filter((file) =>
        /\.(jpg|jpeg|png|webp)$/i.test(file)
      );

      return {
        ...category,
        cover: photos[0] ?? null,
      };
    })
  );

  return (
    <main className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Our{' '}
          <span className="bg-gradient-to-r from-primary to-[#0851a3] bg-clip-text text-transparent">
            Projects
          </span>
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Explore our completed renovation, restoration and finishing projects.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              {project.cover ? (
                <Image
                  src={`/services/${project.folder}/${encodeURIComponent(project.cover)}`}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <FolderOpen className="h-16 w-16 text-primary" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white">
                <FolderOpen className="h-8 w-8" />
                <div>
                  <h2 className="text-lg font-bold sm:text-xl">
                    {project.title}
                  </h2>
                  <p className="text-sm text-white/80">
                    {project.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
