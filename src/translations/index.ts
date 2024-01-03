import { browser } from '$app/environment';
import { subString } from "@shared";
import { writable } from 'svelte/store';
import i18n from 'sveltekit-i18n';

export interface LangOption {
  name: string;
  code: string;
  direction: string;
}

const translations = import.meta.glob(`./data/*.json`, { eager: true })

const fileNames: string[] = []
const list: LangOption[] = [];

Object.entries(translations).map(([path, value]) => {
  const item = (value as any).default;
  list.push({ name: item.__name, code: item.__code, direction: item.__direction })

  const localeFileName = subString(path, "/data/", ".json")

  fileNames.push(localeFileName)
})

const loaders = fileNames.map(name => ({
  locale: name,
  key: 'lang',
  loader: async () => (await import(`./data/${name}.json`)).default,
}))

export const { t, locale, locales, setLocale, loading, loadTranslations } = new i18n({ loaders });

export const langOption = writable(list)

export async function initLang() {
  let lang = 'en'
  if (browser) {
    lang = localStorage.getItem("lang") || lang
  }

  setLang(lang)
}

export async function setLang(lang: string) {
  if (!fileNames.includes) return null

  await loadTranslations(lang)

  if (browser) {
    localStorage.setItem("lang", lang)
    document.documentElement.setAttribute("lang", lang)
  }

  // document.documentElement.setAttribute("dir", translations[`${path}/${lang}.json`]["__direction"])
}
