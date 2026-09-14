'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@/i18n/routing';
import { MessageCircleIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useLocale } from 'next-intl';

interface Service {
id: string;
title: {
en: string;
nl: string;
};
description: {
en: string;
nl: string;
};
details: {
en: string[];
nl: string[];
};
features: {
en: string[];
nl: string[];
};
images: string[];
}

const serviceData: Service[] = [
{
id: 'wood-restoration',
title: {
en: 'Wood Restoration',
nl: 'Houtrestauratie',
},
description: {
en: 'Professional restoration and repair of wooden windows, doors and other wooden elements.',
nl: 'Professionele restauratie en reparatie van houten ramen, deuren en andere houten elementen.',
},
details: {
en: [
'Wooden window restoration',
'Wooden door restoration',
'Repair of damaged wood',
'Sanding and preparation',
'Protective treatment and finishing',
],
nl: [
'Restauratie van houten ramen',
'Restauratie van houten deuren',
'Reparatie van beschadigd hout',
'Schuren en voorbereiding',
'Bescherming en afwerking',
],
},
features: {
en: [
'Professional craftsmanship',
'Careful restoration',
'Quality materials',
'Long-lasting finish',
],
nl: [
'Professioneel vakmanschap',
'Zorgvuldige restauratie',
'Kwaliteitsmaterialen',
'Duurzame afwerking',
],
},
images: [
/services/woodworking/1.jpeg
],
},

{
id: 'bathrooms',
title: {
en: 'Bathroom Renovation',
nl: 'Badkamerrenovatie',
},
description: {
en: 'Complete bathroom renovation from demolition and preparation to finishing and installation.',
nl: 'Complete badkamerrenovatie van sloop en voorbereiding tot afwerking en installatie.',
},
details: {
en: [
'Complete bathroom renovation',
'Wall and floor finishing',
'Tiles and waterproofing',
'Sanitary installation',
'Custom bathroom solutions',
],
nl: [
'Complete badkamerrenovatie',
'Wand- en vloerafwerking',
'Tegels en waterdichting',
'Sanitair installeren',
'Badkameroplossingen op maat',
],
},
features: {
en: [
'Complete project management',
'Quality materials',
'Precise finishing',
'Clean and professional work',
],
nl: [
'Complete projectbegeleiding',
'Kwaliteitsmaterialen',
'Nauwkeurige afwerking',
'Netjes en professioneel werk',
],
},
images: [
'/services/Bathrooms/0363b908-c029-4b40-89b5-c2780ec96e1f.jpg',
'/services/Bathrooms/0cb9d6c3-e49e-4f9d-abc4-501e993e1301.jpg',
'/services/Bathrooms/120490e2-612d-4af2-b2f3-acb7478a85b1.jpg',
'/services/Bathrooms/1dda8025-ecd6-4bc6-b815-2be6e2ccc9f5.jpg',
'/services/Bathrooms/217477c0-1525-4380-996e-23273e0f0b9c.jpg',
],
},

{
id: 'kitchens',
title: {
en: 'Kitchen Renovation',
nl: 'Keukenrenovatie',
},
description: {
en: 'Kitchen renovation and finishing with attention to practical layout, quality and detail.',
nl: 'Keukenrenovatie en afwerking met aandacht voor praktische indeling, kwaliteit en detail.',
},
details: {
en: [
'Complete kitchen renovation',
'Kitchen installation',
'Walls and flooring',
'Worktops and finishing',
'Custom solutions',
],
nl: [
'Complete keukenrenovatie',
'Keukeninstallatie',
'Wanden en vloeren',
'Werkbladen en afwerking',
'Oplossingen op maat',
],
},
features: {
en: [
'Functional design',
'Precise installation',
'Quality finishing',
'Professional workmanship',
],
nl: [
'Functioneel ontwerp',
'Nauwkeurige installatie',
'Kwalitatieve afwerking',
'Professioneel vakmanschap',
],
},
images: [
'/services/Kitchens/01a97bd4-a7cf-4f11-8d09-afe276e67e1f.jpg',
'/services/Kitchens/3b54c0d8-2f28-4966-982a-980689eab63b.jpg',
'/services/Kitchens/5ba45e0d-b29b-4b1a-9a63-c6846eb9e7ec.jpg',
'/services/Kitchens/6c08c2e5-c3fb-4a06-9555-ac944c2546ee.jpg',
],
},

{
id: 'stairs',
title: {
en: 'Stair Renovation',
nl: 'Traprenovatie',
},
description: {
en: 'Professional stair renovation and finishing to give your staircase a completely renewed appearance.',
nl: 'Professionele traprenovatie en afwerking voor een volledig vernieuwde uitstraling.',
},
details: {
en: [
'Stair restoration',
'Surface preparation',
'Painting and finishing',
'Wood treatment',
'Detailed finishing',
],
nl: [
'Traprestauratie',
'Oppervlaktevoorbereiding',
'Schilderwerk en afwerking',
'Houtbehandeling',
'Gedetailleerde afwerking',
],
},
features: {
en: [
'Careful preparation',
'Durable materials',
'Professional finish',
'Attention to detail',
],
nl: [
'Zorgvuldige voorbereiding',
'Duurzame materialen',
'Professionele afwerking',
'Aandacht voor detail',
],
},
images: [
'/services/Stairs/a707f1a1-edbe-450f-9704-1cb42af9e3d8.jpg',
'/services/Stairs/b2dee429-8c2d-47e4-9951-057c295a8ba9.jpg',
],
},

{
id: 'painting',
title: {
en: 'Painting & Finishing',
nl: 'Schilderwerk & Afwerking',
},
description: {
en: 'Interior and exterior painting with professional preparation and a clean, durable finish.',
nl: 'Binnen- en buitenschilderwerk met professionele voorbereiding en een nette, duurzame afwerking.',
},
details: {
en: [
'Interior painting',
'Exterior painting',
'Wall and ceiling finishing',
'Surface preparation',
'Detailed finishing',
],
nl: [
'Binnenschilderwerk',
'Buitenschilderwerk',
'Wand- en plafondafwerking',
'Oppervlaktevoorbereiding',
'Gedetailleerde afwerking',
],
},
features: {
en: [
'Professional preparation',
'Quality paints',
'Clean execution',
'Long-lasting result',
],
nl: [
'Professionele voorbereiding',
'Kwaliteitsverf',
'Netjes uitgevoerd',
'Duurzaam resultaat',
],
},
images: [
'/services/Painting-Finishing/02898ccc-63f4-470f-bc31-36ffe6131ff4.jpg',
'/services/Painting-Finishing/1d7c992d-622f-4c5d-86f2-62e98c7cfa76.jpg',
'/services/Painting-Finishing/2c1fa940-6f0f-4fad-8cac-a1c00d1cd571.jpg',
'/services/Painting-Finishing/34793da4-1032-40e1-9345-e4c7d4d9d829.jpg',
],
},

{
id: 'other-renovation',
title: {
en: 'Other Renovation',
nl: 'Overige Renovatie',
},
description: {
en: 'Additional renovation and finishing work for homes, apartments and commercial spaces.',
nl: 'Aanvullende renovatie- en afwerkingswerkzaamheden voor woningen, appartementen en bedrijfsruimtes.',
},
details: {
en: [
'Interior renovation',
'Finishing work',
'Repair and improvement',
'General renovation',
'Custom renovation solutions',
],
nl: [
'Interieurrenovatie',
'Afwerkingswerkzaamheden',
'Reparatie en verbetering',
'Algemene renovatie',
'Renovatieoplossingen op maat',
],
},
features: {
en: [
'Flexible solutions',
'Professional execution',
'Quality materials',
'One team for the project',
],
nl: [
'Flexibele oplossingen',
'Professionele uitvoering',
'Kwaliteitsmaterialen',
'Eén team voor het project',
],
},
images: [
'/services/Other-Renovation/1089b020-65dc-418f-a24e-f2b5480165d2.jpg',
'/services/Other-Renovation/20fd7aeb-eae6-442b-85f0-0f0f36eb0404.jpg',
'/services/Other-Renovation/25230b56-87bb-48c7-b2f1-03f110e8e77f.jpg',
'/services/Other-Renovation/53989e38-ad6e-4ddd-816b-2cc3606ba24a.jpg',
'/services/Other-Renovation/641c0597-84c8-457c-92d7-037e677cdc72.jpg',
],
},
];

interface ServicesProps {
showButton?: boolean;
children?: React.ReactNode;
isHomePage?: boolean;
showTitle?: boolean;
asGrid?: boolean;
titleClassName?: string;
}

export function Services({
showButton = false,
children,
isHomePage = false,
showTitle = true,
asGrid = false,
titleClassName = '',
}: ServicesProps) {
const locale = useLocale() === 'nl' ? 'nl' : 'en';
const [selectedService, setSelectedService] = useState<Service | null>(null);
const [currentImage, setCurrentImage] = useState(0);

const openService = (service: Service) => {
setSelectedService(service);
setCurrentImage(0);
};

const closeService = () => {
setSelectedService(null);
setCurrentImage(0);
};

const nextImage = () => {
if (!selectedService) return;

setCurrentImage((current) =>
current === selectedService.images.length - 1 ? 0 : current + 1
);
};

const previousImage = () => {
if (!selectedService) return;

setCurrentImage((current) =>
current === 0 ? selectedService.images.length - 1 : current - 1
);
};

return (
<>
<section
className={`${
isHomePage
? 'container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-full mt-10'
: 'py-8'
}`}
>
{showTitle && (
<h2
id="our-services"
className={`text-2xl sm:text-3xl lg:text-4xl w-full font-extrabold tracking-tight mb-6 sm:mb-8 text-left break-words ${titleClassName}`}
>
Our{' '}
<span className="bg-gradient-to-r from-primary to-[#0851a3] bg-clip-text text-transparent">
Services
</span>
</h2>
)}

<div
className={
asGrid
? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch'
: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'
}
>
{serviceData.map((service) => (
<Card
key={service.id}
onClick={() => openService(service)}
className="rounded-lg shadow overflow-hidden h-full flex flex-col cursor-pointer group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
>
<div className="relative h-[300px] sm:h-[340px] lg:h-[380px] overflow-hidden">
<Image
src={service.images[0]}
alt={service.title[locale]}
fill
className="object-cover transition-transform duration-500 group-hover:scale-105"
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>

<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

<div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
<h3 className="text-xl sm:text-2xl font-bold text-white">
{service.title[locale]}
</h3>

<p className="text-sm text-white/90 mt-1">
{locale === 'nl'
? 'Bekijk onze projecten'
: 'View our projects'}
</p>
</div>
</div>

<CardContent className="p-4 sm:p-5 lg:p-6 flex flex-col flex-1">
<h3 className="text-lg sm:text-xl font-bold mb-2">
<span className="bg-gradient-to-r from-primary to-[#0851a3] bg-clip-text text-transparent">
{service.title[locale]}
</span>
</h3>

<p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
{service.description[locale]}
</p>

<div className="mt-auto">
<button
type="button"
className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors font-medium"
>
{locale === 'nl' ? 'Bekijk dienst' : 'View service'}
</button>
</div>
</CardContent>
</Card>
))}
</div>

{showButton && (
<div className="flex justify-center mt-8">
<Link
href="/services"
className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background hover:bg-foreground/90 rounded-lg font-medium transition-colors"
>
{locale === 'nl' ? 'Alle diensten bekijken' : 'View all services'}
</Link>
</div>
)}

{children}
</section>

{selectedService && (
<div
className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
onClick={closeService}
>
<div
className="relative bg-background rounded-xl shadow-2xl w-full max-w-6xl max-h-[94vh] overflow-y-auto"
onClick={(event) => event.stopPropagation()}
>
<button
type="button"
onClick={closeService}
aria-label="Close"
className="absolute right-3 top-3 z-30 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition"
>
<X className="w-5 h-5" />
</button>

<div className="grid grid-cols-1 lg:grid-cols-2">
<div className="relative h-[360px] sm:h-[500px] lg:h-[620px] bg-black">
<Image
src={selectedService.images[currentImage]}
alt={selectedService.title[locale]}
fill
className="object-contain"
sizes="(max-width: 1024px) 100vw, 50vw"
/>

{selectedService.images.length > 1 && (
<>
<button
type="button"
onClick={previousImage}
className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
>
<ChevronLeft className="w-6 h-6" />
</button>

<button
type="button"
onClick={nextImage}
className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
>
<ChevronRight className="w-6 h-6" />
</button>

<div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
{currentImage + 1} / {selectedService.images.length}
</div>
</>
)}
</div>

<div className="p-5 sm:p-7 lg:p-9">
<h2 className="text-2xl sm:text-3xl font-bold mb-3">
<span className="bg-gradient-to-r from-primary to-[#0851a3] bg-clip-text text-transparent">
{selectedService.title[locale]}
</span>
</h2>

<p className="text-muted-foreground leading-relaxed mb-6">
{selectedService.description[locale]}
</p>

<div className="mb-6">
<h3 className="text-lg font-semibold mb-3">
{locale === 'nl' ? 'Onze diensten' : 'Our services'}
</h3>

<ul className="space-y-2">
{selectedService.details[locale].map((item) => (
<li key={item} className="flex items-start">
<span className="mr-3 mt-1 text-primary">✓</span>
<span className="text-sm sm:text-base text-muted-foreground">
{item}
</span>
</li>
))}
</ul>
</div>

<div className="mb-7">
<h3 className="text-lg font-semibold mb-3">
{locale === 'nl' ? 'Voordelen' : 'Key features'}
</h3>

<ul className="space-y-2">
{selectedService.features[locale].map((item) => (
<li key={item} className="flex items-start">
<span className="mr-3 mt-1 text-primary">✓</span>
<span className="text-sm sm:text-base text-muted-foreground">
{item}
</span>
</li>
))}
</ul>
</div>

<Link
href="/consultation"
onClick={closeService}
className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors font-medium gap-2"
>
<MessageCircleIcon className="w-5 h-5" />
{locale === 'nl'
? 'Afspraak maken'
: 'Book an appointment'}
</Link>
</div>
</div>
</div>
</div>
)}
</>
);
}

export default Services;
