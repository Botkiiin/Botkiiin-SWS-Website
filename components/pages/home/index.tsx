import { Hero } from '../../organisms/sections/Hero';
import { Services } from '../../organisms/sections/Services';
import { Trust } from '../../organisms/sections/Trust';
import { About } from '../../organisms/sections/About';
import ModernContactForm from '../../organisms/forms/ModernContactForm';
import { Testimonials } from '../../organisms/sections/Testimonials';

export default function HomeComponent() {
  return (
    <>
      <Hero />
      <Services showButton={true} isHomePage={true} titleClassName="uppercase" />
      <Trust titleClassName="uppercase" />
      <About titleClassName="uppercase" />
      <ModernContactForm />
      <Testimonials titleClassName="uppercase" />
    </>
  );
}
