# Componentes - Currency Exchange App

O `App` guarda os estados principais (moedas, par selecionado e período) e repassa por props aos componentes filhos (lifting state up). Todos os textos chegam pela prop `t`, escolhida conforme o idioma.

```
App
├── SettingsBar
├── Converter
├── Favorites
├── TopMovers
├── PeriodSelector
├── RateChart
└── RateTable
```

## Componentes
| Componente | Responsabilidade | JSX | CSS Module | Principais props | Estados |
|---|---|---|---|---|---|
| App | Orquestra a aplicação e chama os hooks | `src/App.jsx` | `src/App.module.css` | - | currencies, from, to, days |
| SettingsBar | Tema, cor de destaque e idioma | `src/components/SettingsBar.jsx` | `SettingsBar.module.css` | t, theme, accent, lang, onTheme, onAccent, onLang | - |
| Converter | Formulário de conversão, validação e resultado | `src/components/Converter.jsx` | `Converter.module.css` | t, currencies, from, to, onFromChange, onToChange, onSwap | amount, result, error |
| Favorites | Lista de conversões favoritas | `src/components/Favorites.jsx` | `Favorites.module.css` | t, favorites, onSelect, onRemove | - |
| TopMovers | Top 3 moedas em que a origem mais se valorizou | `src/components/TopMovers.jsx` | `TopMovers.module.css` | t, base, movers, loading, error, currencies, onSelect | - |
| PeriodSelector | Botões de período do histórico | `src/components/PeriodSelector.jsx` | `PeriodSelector.module.css` | t, days, onChange | - |
| RateChart | Gráfico de linha do histórico (Recharts) | `src/components/RateChart.jsx` | - | t, data | - |
| RateTable | Tabela, filtros, ordenação, contador, recolher e CSV | `src/components/RateTable.jsx` | `RateTable.module.css` | t, rows | filters, sortField, sortDir |

## Hooks customizados
| Hook | Arquivo | Responsabilidade |
|---|---|---|
| useHistory(from, to, days) | `src/hooks/useHistory.js` | Consulta o histórico na API; retorna data, loading e error |
| useTopMovers(base) | `src/hooks/useTopMovers.js` | Busca 30 dias de todas as moedas e calcula o top 3; retorna movers, loading e error |
| useFavorites() | `src/hooks/useFavorites.js` | Favoritos com localStorage; retorna favorites, isFavorite e toggleFavorite |
| useSettings() | `src/hooks/useSettings.js` | Tema, cor e idioma com localStorage |

## Services, utils e i18n
| Arquivo | Responsabilidade |
|---|---|
| `src/services/frankfurter.js` | getCurrencies, getLatestRate, getHistory, getRatesSeries |
| `src/utils/dates.js` | PERIODS e getRange |
| `src/utils/tableUtils.js` | filterRows (filtros combinados) e sortRows (ordenação) |
| `src/utils/exportCsv.js` | Gera e baixa o CSV no navegador |
| `src/utils/topMovers.js` | getTopMovers (variação percentual) |
| `src/utils/currencies.js` | localizeCurrencies (nomes por idioma) e formatError |
| `src/i18n/translations.js` | Textos em PT, EN e ES |

## Relação entre componentes
- O `App` chama `useHistory`, `useFavorites`, `useTopMovers` e `useSettings`.
- `Converter` e `TopMovers` alteram o par por callbacks; `Favorites` define origem e destino juntos.
- `RateChart` e `RateTable` recebem os dados do histórico; o `RateTable` usa `filterRows`, `sortRows` e `exportCsv`.
- `SettingsBar` altera o tema, a cor e o idioma, que se refletem em toda a interface.
