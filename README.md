# 💱 Currency Exchange (Câmbio de Moedas)

Aplicação web moderna e responsiva desenvolvida em **React + Vite** para consulta de taxas de câmbio, conversão de moedas em tempo real, visualização de gráficos históricos e acompanhamento das moedas que mais se valorizaram.

---

## ✨ Funcionalidades

- **Conversor Rápido:** Converta valores entre diversas moedas globais com dados atualizados e opção de inverter moedas instantaneamente.
- **Gráficos de Histórico:** Acompanhe a variação das taxas de câmbio ao longo de diferentes períodos (de 7 dias até 10 anos) de forma visual com `Recharts`.
- **Moedas em Destaque (Top Movers):** Descubra quais moedas mais se valorizaram nos últimos 30 dias com indicadores visuais de alta e baixa.
- **Conversões Favoritas:** Salve seus pares de moedas favoritos utilizando o `localStorage` para acesso rápido.
- **Tabela Avançada de Cotações:** 
  - Filtros por intervalo de datas (com bloqueio de datas futuras) e limites de cotação mínima/máxima.
  - Ordenação por data ou valor da cotação.
  - Opção de recolher/expandir (minimizar) a tabela.
  - **Exportação para CSV** dos dados filtrados.
- **Internacionalización (i18n):** Suporte completo a múltiplos idiomas (**Português**, **Inglês** e **Espanhol**) com formatação de datas padronizada (`DD/MM/AA`).
- **Personalização de Tema:** Alternância entre modo Claro/Escuro e seletor dinâmico de cores de destaque (`--accent`).

---

## 🛠️ Tecnologias Utilizadas

- **React** (com Hooks customizados)
- **Vite**
- **CSS Modules** para estilização modular e limpa
- **Recharts** para renderização de gráficos interativos
- **Frankfurter API** para dados de câmbio públicos e confiáveis

---

## 🚀 Como Executar o Projeto

Certifique-se de ter o **Node.js** instalado na sua máquina.

1. Clone o repositório ou abra a pasta do projeto no seu terminal.
2. Instale as dependências:
   ```bash
   npm install

   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse o endereço exibido no terminal (normalmente http://localhost:5173).

Outros comandos: `npm run build`, `npm run lint` e `npm test`.

---

## 🧱 Arquitetura

```
src/
  components/   Converter, Favorites, TopMovers, PeriodSelector, RateChart, RateTable, SettingsBar
  hooks/        useHistory, useTopMovers, useFavorites, useSettings
  services/     frankfurter.js
  utils/        dates, tableUtils, exportCsv, topMovers, currencies
  i18n/         translations.js
  App.jsx
tests/          testes das funções utilitárias
postman/        collection exportada
docs/           documentação do projeto
```

Os estados principais (moedas, par e período) ficam no `App` e descem por props (lifting state up).

## 📚 Documentação

- [Requisitos](docs/REQUIREMENTS.md)
- [Componentes](docs/COMPONENTS.md)
- [Figma](docs/FIGMA.md)
- [Testes de API](docs/API_TESTS.md)
- [Testes de funções](docs/FUNCTION_TESTS.md)
- [Uso de IA](docs/AI_USAGE.md)

## 🖼️ Imagens

![Desktop](docs/img/desktop.png)
![Mobile](docs/img/mobile.png)

## 👩‍💻 Autora

Laís Lívia
