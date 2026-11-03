# Testes das funções JavaScript

Testes automatizados em `tests/utils.test.js`, executados com `npm test` (Node Test Runner). Resultado: **13 testes, 13 aprovados**.

| Função | Cenário | Resultado |
|---|---|---|
| filterRows | sem filtros retorna tudo | OK |
| filterRows | data inicial e data final | OK |
| filterRows | cotação mínima e máxima | OK |
| filterRows | filtros combinados | OK |
| filterRows | sem resultado | OK |
| sortRows | data crescente e decrescente | OK |
| sortRows | cotação crescente e decrescente | OK |
| sortRows | não altera o array original | OK |
| getTopMovers | ordena pela maior valorização e limita a 3 | OK |
| getTopMovers | menos de 2 datas retorna vazio | OK |
| getRange | datas AAAA-MM-DD com start antes de end | OK |
| PERIODS | 8 períodos | OK |
| exportCsv | lista vazia não exporta | OK |

## Testes manuais
| Funcionalidade | Esperado | Resultado |
|---|---|---|
| Conversão com valor inválido | mensagem de erro | OK. Com valor negativo aparece "Informe um valor válido maior que zero." |
| Moedas iguais | mensagem de erro | OK. Aparece "Escolha moedas diferentes." e o botão de favoritar fica bloqueado |
| Filtro de cotação mínima e máxima | não aceita negativos | OK. Os campos não aceitam números negativos |
| Filtro de data | não aceita data futura | OK. O calendário não deixa escolher datas futuras |
| Filtro de data | limitado a 10 anos | OK. O calendário só vai até 10 anos atrás |
| Inverter moedas | origem e destino trocam | |
| Cada um dos 8 períodos | gráfico e tabela atualizam | |
| Exportar CSV | arquivo com cabeçalho e linhas filtradas | |
| Favoritar e recarregar a página | favorito continua na lista | |
| Trocar idioma, tema e cor | muda e persiste ao recarregar | |
| Falha de API (sem internet) | mensagem de erro | |
| Celular (DevTools) | layout responsivo | |