import { Hero } from '../../organisms/sections/Hero';
import { Services } from '../../organisms/sections/Services';
import { Trust } from '../../organisms/sections/Trust';
import { About } from '../../organisms/sections/About';
import ModernContactForm from '../../organisms/forms/ModernContactForm';
import { Testimonials } from '../../organisms/sections/Testimonials';
import { contactsConfig } from '@/config/contacts';


export default function HomeComponent() {
  return (
    <>
      <Hero />
      <Services showButton={true} isHomePage={true} titleClassName="uppercase" />
      <Trust titleClassName="uppercase" />
      <About titleClassName="uppercase" />
      <ModernContactForm />
      <Testimonials titleClassName="uppercase" />
      <section className="py-16">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="text-center mb-8">
<h2 className="text-3xl font-bold">Bezoek ons</h2>
<p className="mt-2 text-muted-foreground">
{contactsConfig.address}
</p>
</div>

<div className="overflow-hidden rounded-2xl border border-border shadow-lg">
<iframe
src={`https://www.google.com/maps?q=${encodeURIComponent(contactsConfig.address)}&output=embed`}
width="100%"
height="350"
style={{ border: 0 }}
loading="lazy"
allowFullScreen
referrerPolicy="no-referrer-when-downgrade"
title="Google Maps"
/>
</div>
</div>
</section>
    </>
  );
}
