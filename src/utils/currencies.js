import { LANGS } from "../i18n/translations";

// Traduz o nome das moedas (a API devolve só em inglês) usando Intl.DisplayNames
export function localizeCurrencies(currencies, lang) {
  const locale = LANGS.find((l) => l.id === lang)?.locale ?? "en-US";
  let names;
  try {
    names = new Intl.DisplayNames([locale], { type: "currency" });
  } catch {
    return currencies;
  }
  return Object.fromEntries(
    Object.entries(currencies).map(([code, apiName]) => {
      let name;
      try {
        name = names.of(code);
      } catch {
        name = null;
      }
      return [code, name && name !== code ? name : apiName];
    })
  );
}

export function formatError(e, t) {
  if (!e) return null;
  return e.status ? t.common.apiError(e.status) : t.common.networkError;
}
