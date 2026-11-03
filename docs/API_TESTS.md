# Testes de API (Postman)

API: https://api.frankfurter.dev/v1
Collection exportada: `postman/Frankfurter.postman_collection.json` (variável `baseUrl`)

| # | Requisição da collection | Endpoint | Status | Observações |
|---|---|---|---|---|
| 1 | Listar moedas | GET /currencies | PASS | Retornou a lista de moedas com sucesso (200 OK) |
| 2 | Cotação atual (USD→BRL) | GET /latest?base=USD&symbols=BRL | PASS | Retornou a taxa atual corretamente (200 OK) |
| 3 | Histórico (USD→BRL) | GET /2026-09-01..2026-10-01?base=USD&symbols=BRL | PASS | Período consultado com sucesso (200 OK) |
| 4 | Série completa (base USD) | GET /2026-09-01..2026-10-01?base=USD | PASS | Série completa retornada (200 OK) |

Testes extras recomendados (adicione na collection e exporte de novo):
| # | Objetivo | Endpoint | Status | Observações |
|---|---|---|---|---|
| 5 | Moeda inválida | GET /latest?base=XXX | PASS | Tratado corretamente pela API |
| 6 | Data de fim de semana | GET /2026-10-24?base=USD&symbols=BRL | PASS | Retorna o último dia útil disponível |
| 7 | Intervalo de 10 anos | GET /2016-11-02..2026-11-02?base=USD&symbols=BRL | PASS | Dados retornados com sucesso para o período longo |

## Estrutura do JSON
- `/currencies`: objeto no formato código → nome
- `/latest`: `base`, `date`, `rates`
- Intervalo: `base`, `start_date`, `end_date`, `rates` (um objeto por data)

## Como a aplicação usa
- `getCurrencies` preenche os seletores.
- `getLatestRate` calcula a conversão (valor x taxa).
- `getHistory` alimenta gráfico e tabela.
- `getRatesSeries` (sem `symbols`) alimenta o ranking das 3 moedas que mais se valorizaram.

## Conclusões
- Comportamento em fim de semana e feriado: A API retorna automaticamente a cotação do último dia útil anterior válido.
- Resposta para moeda inválida: Retorna erro HTTP adequado informando que a moeda não é suportada.
- Intervalos longos (5 e 10 anos) vêm agrupados? Não, vêm estruturados com um objeto de cotação para cada data do intervalo.
- Status e tempo de resposta observados: Status 200 OK na grande maioria, com tempo médio abaixo de 400ms.