/**
 * Barrel export para componentes de artículos
 *
 * Componentes específicos para páginas de artículos scrollytelling.
 */

// Hero y Navegación
export { HeroSection } from './HeroSection';
export type { HeroSectionProps } from './HeroSection';

export { NavigationPill } from './NavigationPill';
export type { NavigationItem, NavigationPillProps, AccentColor } from './NavigationPill';

// Títulos y Textos
export { SectionTitle } from './SectionTitle';
export type { SectionTitleProps, TitleSize, TitleAlignment } from './SectionTitle';

export { SectionSubtitle } from './SectionSubtitle';
export type { SectionSubtitleProps } from './SectionSubtitle';

// Contenido
export * from './ContentCard';
export { CuriositiesSection } from './CuriositiesSection';
export type { CuriositiesSectionProps, CuriosityItem } from './CuriositiesSection';
