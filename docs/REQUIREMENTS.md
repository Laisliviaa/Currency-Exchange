# Requisitos - Currency Exchange App

## Contexto
Uma empresa de tecnologia financeira quer centralizar a consulta de cotações, a conversão de valores e a análise histórica de moedas em uma única aplicação web. Hoje os usuários consultam vários sites, convertem valores manualmente e copiam dados para planilhas.

## Público-alvo
Pessoas que consultam câmbio com frequência (viajantes, freelancers, pequenos empresários, estudantes) e analistas que precisam exportar dados para planilhas.

## Objetivo
Permitir converter valores entre moedas, acompanhar o histórico de um par, favoritar conversões, descobrir as moedas que mais se valorizaram e exportar os dados filtrados em CSV.

## Escopo
**Dentro:** conversor, histórico com gráfico, tabela com filtros e ordenação, exportação CSV, favoritos, ranking de valorização, tema, cor de destaque e idiomas.
**Fora:** autenticação, cadastro de usuários, back-end próprio, banco de dados, pagamentos, compra e venda real de moedas.

## Requisitos funcionais
| ID | Requisito |
|----|-----------|
| RF01 | Selecionar moeda de origem e de destino. |
| RF02 | Informar um valor e ver o valor convertido. |
| RF03 | Exibir a taxa utilizada e a data da cotação. |
| RF04 | Inverter as moedas. |
| RF05 | Validar entradas inválidas. |
| RF06 | Escolher o período: 7, 15, 30 dias, 3, 6 meses, 1, 5 ou 10 anos. |
| RF07 | Atualizar o gráfico ao mudar o par de moedas ou o período. |
| RF08 | Mostrar tabela com data, moeda de origem, moeda de destino e cotação. |
| RF09 | Filtrar por intervalo de datas e por cotação mínima e máxima, de forma combinada. |
| RF10 | Limpar os filtros. |
| RF11 | Ordenar por data e por cotação. |
| RF12 | Exibir a quantidade de registros encontrados. |
| RF13 | Exportar em CSV apenas os registros filtrados. |
| RF14 | Favoritar e remover conversões; clicar em uma favorita seleciona o par. |
| RF15 | Exibir as 3 moedas em que a moeda de origem mais se valorizou nos últimos 30 dias; clicar define o destino. |
| RF16 | Alternar tema claro/escuro, escolher a cor de destaque (7 opções) e o idioma (PT, EN, ES). |
| RF17 | Recolher e expandir a tabela. |

## Requisitos não funcionais
| ID | Requisito |
|----|-----------|
| RNF01 | SPA com React, JavaScript e Vite. |
| RNF02 | Dados obtidos da API pública Frankfurter. |
| RNF03 | Estilos organizados com CSS Modules. |
| RNF04 | Interface responsiva (desktop e celular). |
| RNF05 | Exibir estados de loading, erro e ausência de dados. |
| RNF06 | Código organizado em components, hooks, services, utils e i18n. |
| RNF07 | Versionamento com Git e GitHub. |
| RNF08 | Favoritos e configurações (tema, cor e idioma) persistidos no localStorage. |

## Regras de negócio
- RN01: o valor informado deve ser um número maior que zero.
- RN02: a moeda de origem deve ser diferente da moeda de destino.
- RN03: a conversão é feita pela aplicação (valor x taxa obtida da API).
- RN04: a data exibida é a data efetiva da cotação retornada pela API, que pode diferir de hoje (fins de semana e feriados).
- RN05: o CSV contém somente os registros visíveis após os filtros, com cabeçalho.
- RN06: a exportação é bloqueada quando não há registros.
- RN07: os filtros são combinados (lógica E) e a ordenação é aplicada sobre os registros filtrados.
- RN08: não é possível favoritar um par com moedas iguais.
- RN09: a valorização é a variação percentual entre a primeira e a última cotação dos últimos 30 dias.
- RN10: o filtro de data não aceita datas futuras.

## Critérios de aceite
- CA01: converter 100 USD para BRL mostra valor convertido, taxa e data da cotação.
- CA02: valor vazio, zero, negativo ou moedas iguais mostram mensagem de erro e não chamam a API.
- CA03: o botão de inverter troca origem e destino.
- CA04: cada um dos 8 períodos atualiza gráfico e tabela.
- CA05: os filtros de data e de cotação reduzem a tabela e o contador acompanha.
- CA06: "Limpar filtros" restaura todos os registros.
- CA07: clicar em Data e em Cotação alterna a ordem crescente e decrescente.
- CA08: o CSV baixado tem cabeçalho e somente as linhas visíveis.
- CA09: com a tabela vazia, a exportação fica bloqueada.
- CA10: se a API falhar, aparece mensagem de erro; durante a consulta aparece o loading.
- CA11: favoritar um par o adiciona à lista e recarregar a página mantém a lista.
- CA12: o ranking mostra até 3 moedas com variação percentual e atualiza ao mudar a origem.
- CA13: trocar tema, cor e idioma altera a interface e é lembrado ao recarregar.
