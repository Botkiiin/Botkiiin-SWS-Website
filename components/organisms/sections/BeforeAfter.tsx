'use client';

import Image from 'next/image';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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
const [selected, setSelected] = useState<number | null>(null);

const previous = () => {
if (selected === null) return;

setSelected(
selected === 0 ? transformations.length - 1 : selected - 1
);
};

const next = () => {
if (selected === null) return;

setSelected(
selected === transformations.length - 1 ? 0 : selected + 1
);
};

return (
<>
<section
id="before-after"
className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-full mt-10"
>
<h2 className="text-2xl sm:text-3xl lg:text-4xl w-full font-extrabold tracking-tight mb-3 sm:mb-4 text-left">
Before &{' '}
<span className="bg-gradient-to-r from-primary to-[#0851a3] bg-clip-text text-transparent">
After
</span>
</h2>

<p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-2xl">
See the difference professional restoration and renovation can make.
</p>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
{transformations.map((item, index) => (
<button
key={item.before}
type="button"
onClick={() => setSelected(index)}
className="group text-left rounded-lg shadow overflow-hidden bg-background cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
>
<div className="grid grid-cols-2">
<div className="relative h-[220px] sm:h-[260px] lg:h-[280px] overflow-hidden">
<Image
src={item.before}
alt="Before restoration"
fill
className="object-cover transition-transform duration-500 group-hover:scale-105"
sizes="(max-width: 768px) 50vw, 33vw"
/>

<div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-md">
Before
</div>
</div>

<div className="relative h-[220px] sm:h-[260px] lg:h-[280px] overflow-hidden">
<Image
src={item.after}
alt="After restoration"
fill
className="object-cover transition-transform duration-500 group-hover:scale-105"
sizes="(max-width: 768px) 50vw, 33vw"
/>

<div className="absolute bottom-3 left-3 bg-primary/90 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-md">
After
</div>
</div>
</div>

<div className="p-4 sm:p-5">
<span className="text-sm sm:text-base font-semibold text-primary">
View transformation
</span>
</div>
</button>
))}
</div>
</section>

{selected !== null && (
<div
className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
onClick={() => setSelected(null)}
>
<div
className="relative w-full max-w-6xl max-h-[94vh] bg-background rounded-xl shadow-2xl overflow-hidden"
onClick={(event) => event.stopPropagation()}
>
<button
type="button"
onClick={() => setSelected(null)}
aria-label="Close"
className="absolute right-3 top-3 z-20 h-10 w-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition"
>
<X className="w-5 h-5" />
</button>

<div className="grid grid-cols-1 md:grid-cols-2">
<div className="relative h-[42vh] md:h-[70vh]">
<Image
src={transformations[selected].before}
alt="Before restoration"
fill
className="object-contain bg-black"
sizes="50vw"
/>

<span className="absolute bottom-4 left-4 bg-black/75 text-white px-4 py-2 rounded-md font-semibold">
Before
</span>
</div>

<div className="relative h-[42vh] md:h-[70vh]">
<Image
src={transformations[selected].after}
alt="After restoration"
fill
className="object-contain bg-black"
sizes="50vw"
/>

<span className="absolute bottom-4 left-4 bg-primary text-white px-4 py-2 rounded-md font-semibold">
After
</span>
</div>
</div>

<button
type="button"
onClick={previous}
aria-label="Previous"
className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-foreground flex items-center justify-center shadow hover:bg-white transition"
>
<ChevronLeft className="w-5 h-5" />
</button>

<button
type="button"
onClick={next}
aria-label="Next"
className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-foreground flex items-center justify-center shadow hover:bg-white transition"
>
<ChevronRight className="w-5 h-5" />
</button>
</div>
</div>
)}
</>
);
}
