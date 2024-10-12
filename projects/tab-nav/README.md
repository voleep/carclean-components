# Car Tab Nav Component

**Car Tab Nav** é um componente da biblioteca **CarClean Components**, desenvolvido em Angular, que facilita a navegação entre diferentes páginas da aplicação por meio de abas reutilizáveis, oferecendo uma experiência semelhante à navegação por abas de um navegador.

## Como Funciona

O **Car Tab Nav** utiliza o `MatTabGroup` do Angular Material combinado com a estratégia de reutilização de rotas (`RouteReuseStrategy`). Cada vez que um usuário acessa uma nova rota, uma nova aba é aberta, preservando o estado das páginas previamente acessadas.

Essa abordagem permite uma navegação mais fluida e eficiente dentro da aplicação, já que o usuário pode alternar entre diferentes páginas sem perder os dados ou o estado das páginas anteriores. As abas abertas podem ser fechadas conforme necessário, e o conteúdo associado a cada aba é recuperado de maneira otimizada, sem recarregar a página.

O **Car Tab Nav** foi projetado para ser integrado ao projeto **CarClean Admin**, proporcionando uma navegação intuitiva e aprimorada no gerenciamento de lava-rápidos.

## Licença

Este componente está licenciado sob a [MIT License](./LICENSE).
