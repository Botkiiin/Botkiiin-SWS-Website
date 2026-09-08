export interface CustomLink {
  id?: string;
  name: string;
  href: string;
  target?: string;
  rel?: string;
}

export interface FooterLink {
  title: string;
  links: CustomLink[];
}
