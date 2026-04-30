export interface ContactInfo {
  contactTitle: string;
  email: string;
  whatsapp: string;
  whatsappLink: string;
  footerInfo: {
    company: string;
    cnpj: string;
    service: string;
    phone: string;
  };
}

export interface SocialLink {
  platform: string;
  handle: string;
  followers: string;
  href: string;
}

export interface ContentConfig {
  brand: {
    logo: string;
    logoImage?: string;
    name: string;
    checkoutUrl: string;
  };
  nav: Array<{ label: string; href: string }>;
  hero: {
    title: string;
    oldPrice: string;
    newPrice: string;
    priceNumeric: number;
    shipping: string;
    cta: string;
    bookImage: string;
    discountPercent: string;
  };
  synopsis: {
    label: string;
    title: string;
    paragraphs: string[];
    videoPlaceholder: string;
    videoUrl: string;
    language: string;
  };
  origin: {
    label: string;
    title: string;
    paragraphs: string[];
    cta: string;
    deliveryLabel: string;
    deliveryDate: string;
    image: string;
  };
  manoValter: {
    label: string;
    title: string;
    paragraphs: string[];
    cta: string;
    deliveryDate: string;
    image: string;
  };
  peopleContent: {
    title: string;
    paragraphs: string[];
    cta: string;
    deliveryDate: string;
    image: string;
  };
  author: {
    label: string;
    title: string;
    name: string;
    bio: string[];
    image: string;
    cta: string;
    deliveryDate: string;
  };
  mission: {
    title: string;
    paragraphs: string[];
    cta: string;
    deliveryDate: string;
    image: string;
  };
  extraTopic?: {
    label?: string;
    title: string;
    paragraphs: string[];
    cta: string;
    deliveryDate: string;
    image: string;
  };
  footerCta: {
    title: string;
    subtitle: string;
    price: string;
    discountPercent: string;
    cta: string;
  };
  socials: {
    title: string;
    subtitle: string;
    description: string;
    links: SocialLink[];
  };
  contact: ContactInfo;
}
