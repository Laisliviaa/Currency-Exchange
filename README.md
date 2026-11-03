# 💱 Currency Exchange (Câmbio de Moedas)

Aplicação web moderna e responsiva desenvolvida em **React + Vite** para consulta de taxas de câmbio, conversão de moedas em tempo real, visualização de gráficos históricos e acompanhamento das moedas que mais se valorizaram.

---

## ✨ Funcionalidades

- **Conversor Rápido:** Converta valores entre diversas moedas globais com dados atualizados e opção de inverter moedas instantaneamente[cite: 12].
- **Gráficos de Histórico:** Acompanhe a variação das taxas de câmbio ao longo de diferentes períodos (de 7 dias até 10 anos) de forma visual com `Recharts`[cite: 4, 15].
- **Moedas em Destaque (Top Movers):** Descubra quais moedas mais se valorizaram nos últimos 30 dias com indicadores visuais de alta e baixa[cite: 9, 17].
- **Conversões Favoritas:** Salve seus pares de moedas favoritos utilizando o `localStorage` para acesso rápido[cite: 11, 14].
- **Tabela Avançada de Cotações:** 
  - Filtros por intervalo de datas (com bloqueio de datas futuras) e limites de cotação mínima/máxima[cite: 5, 23].
  - Ordenação por data ou valor da cotação[cite: 5, 23].
  - Opção de recolher/expandir (minimizar) a tabela[cite: 5].
  - **Exportação para CSV** dos dados filtrados[cite: 5, 22].
- **Internacionalización (i18n):** Suporte completo a múltiplos idiomas (**Português**, **Inglês** e **Espanhol**) com formatação de datas padronizada (`DD/MM/AA`)[cite: 8, 18].
- **Personalização de Tema:** Alternância entre modo Claro/Escuro e seletor dinâmico de cores de destaque (`--accent`)[cite: 7, 16].

---

## 🛠️ Tecnologias Utilizadas

- **React** (com Hooks customizados)[cite: 14, 15, 16, 17, 26]
- **Vite**[cite: 26]
- **CSS Modules** para estilização modular e limpa[cite: 1, 3, 6, 8, 10, 13]
- **Recharts** para renderização de gráficos interativos[cite: 4]
- **Frankfurter API** para dados de câmbio públicos e confiáveis[cite: 19]

---

## 🚀 Como Executar o Projeto

Certifique-se de ter o **Node.js** instalado na sua máquina.

1. Clone o repositório ou abra a pasta do projeto no seu terminal.
2. Instale as dependências:
   ```bash
   npm install
