export const catalogueFiles: Record<string, string> = {
  az: '/catalogue/sabah-towers-catalogue-az.pdf',
  en: '/catalogue/sabah-towers-catalogue-en.pdf',
  ru: '/catalogue/sabah-towers-catalogue-ru.pdf',
};

export function getCatalogueHref(locale: string): string {
  return catalogueFiles[locale] ?? catalogueFiles.az ?? '/catalogue/sabah-towers-catalogue-az.pdf';
}