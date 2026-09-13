import Image from 'next/image';

const transformations = [
{
before: '/services/before-min.jpeg',
after: '/services/after-min.jpeg',
},
{
before: '/services/before-1-min.jpeg',
after: '/services/after-1-min.jpeg',
},
{
before: '/services/before-2-min.jpeg',
after: '/services/after-2-min.jpeg',
},
];

export function BeforeAfter() {
return (
<section id="before-after" className="bg-white py-24 sm:py-32">
<div className="mx-auto max-w-7xl px-5 sm:px-8">

<div className="mb-12 max-w-2xl">
<p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#a76c3b]">
SWS · Before & After
</p>

<h2 className="font-serif text-4xl tracking-tight text-[#1f2925] sm:text-5xl">
Before & After
</h2>

<p className="mt-4 text-base leading-7 text-[#59625d]">
See the difference professional restoration and renovation can make.
</p>
</div>

<div className="grid gap-8 lg:grid-cols-3">
{transformations.map((item) => (
<article
key={item.before}
className="overflow-hidden rounded-[1.5rem] border border-[#e8e4dc] bg-[#faf9f6]"
>
<div className="grid grid-cols-2">
<figure className="relative aspect-[4/3] overflow-hidden">
<Image
src={item.before}
alt="Before renovation"
fill
sizes="(max-width: 1024px) 50vw, 33vw"
className="object-cover"
/>
<span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
Before
</span>
</figure>

<figure className="relative aspect-[4/3] overflow-hidden">
<Image
src={item.after}
alt="After renovation"
fill
sizes="(max-width: 1024px) 50vw, 33vw"
className="object-cover"
/>
<span className="absolute bottom-3 left-3 rounded-full bg-[#1f2925]/90 px-3 py-1 text-xs font-semibold text-white">
After
</span>
</figure>
</div>
</article>
))}
</div>

</div>
</section>
);
}

