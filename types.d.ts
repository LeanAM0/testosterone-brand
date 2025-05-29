// React y tipos JSX
import React from 'react';

// Definiciones de tipos para componentes JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
      h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h3: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
      a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
      button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
      img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
      input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
      section: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      br: React.DetailedHTMLProps<React.HTMLAttributes<HTMLBRElement>, HTMLBRElement>;
      link: React.DetailedHTMLProps<React.LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>;
      meta: React.DetailedHTMLProps<React.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>;
      header: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      footer: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      nav: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      ul: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
      li: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
      [elemName: string]: any; // Para cualquier otro elemento HTML que no esté explícitamente definido
    }
  }
}

// Declaraciones para módulos Next.js
declare module 'next/image' {
  import { ImageProps as NextImageProps } from 'next/image';
  export * from 'next/image';
  export default function Image(props: NextImageProps): JSX.Element;
}

declare module 'next/link' {
  import { LinkProps as NextLinkProps } from 'next/link';
  export * from 'next/link';
  export default function Link(props: React.PropsWithChildren<NextLinkProps>): JSX.Element;
}

// Definición de tipos específicos para el proyecto
interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: string;
  category: string;
  // No incluimos key porque es una propiedad especial de React
}

// Declaraciones para otros componentes personalizados
declare module '@/components/hero' {
  export default function Hero(): JSX.Element;
}

declare module '@/components/product-card' {
  export default function ProductCard(props: ProductCardProps): JSX.Element;
}

// Declaraciones para contextos
declare module '@/context/language-context' {
  export function useTranslation(): { t: (key: string) => string };
}

// Declaración para datos
declare module '@/lib/data' {
  export const featuredProducts: Array<ProductCardProps & { key: string }>;
}