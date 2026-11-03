# Testes de API (Postman)

API: https://api.frankfurter.dev/v1
Collection exportada: `postman/Frankfurter.postman_collection.json` (variável `baseUrl`)

| # | Requisição da collection | Endpoint | Status | Observações |
|---|---|---|---|---|
| 1 | Listar moedas | GET /currencies | | |
| 2 | Cotação atual (USD→BRL) | GET /latest?base=USD&symbols=BRL | | |
| 3 | Histórico (USD→BRL) | GET /2026-09-01..2026-10-01?base=USD&symbols=BRL | | |
| 4 | Série completa (base USD) | GET /2026-09-01..2026-10-01?base=USD | | |

Testes extras recomendados (adicione na collection e exporte de novo):
| # | Objetivo | Endpoint | Status | Observações |
|---|---|---|---|---|
| 5 | Moeda inválida | GET /latest?base=XXX | | |
| 6 | Data de fim de semana | GET /2026-10-24?base=USD&symbols=BRL | | |
| 7 | Intervalo de 10 anos | GET /2016-11-02..2026-11-02?base=USD&symbols=BRL | | |

## Estrutura do JSON
- `/currencies`: objeto no formato código → nome
- `/latest`: `base`, `date`, `rates`
- Intervalo: `base`, `start_date`, `end_date`, `rates` (um objeto por data)

## Como a aplicação usa
- `getCurrencies` preenche os seletores.
- `getLatestRate` calcula a conversão (valor x taxa).
- `getHistory` alimenta gráfico e tabela.
- `getRatesSeries` (sem `symbols`) alimenta o ranking das 3 moedas que mais se valorizaram.

## Conclusões (preencher depois de rodar)
- Comportamento em fim de semana e feriado:
- Resposta para moeda inválida:
- Intervalos longos (5 e 10 anos) vêm agrupados?
- Status e tempo de resposta observados:
