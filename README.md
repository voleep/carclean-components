# CarClean Components

**CarClean Components** é uma biblioteca Angular desenvolvida como suporte ao projeto [CarClean](#carclean-admin), parte da plataforma **CarClean**, uma solução abrangente para gestão de lava-rápidos. Esta biblioteca atualmente contém o componente **Car Tab Nav**, que facilita a navegação entre páginas da aplicação por meio de abas reutilizáveis, semelhante ao funcionamento de um navegador.

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Instalação](#instalação)
- [Uso do Car Tab Nav](#uso-do-car-tab-nav)
- [Como Contribuir](#como-contribuir)
- [Licença](#licença)

## Sobre o Projeto

O **CarClean Components** foi desenvolvido para fornecer componentes reutilizáveis que auxiliam na construção de interfaces para a gestão de lava-rápidos. A biblioteca está integrada ao **CarClean Admin**, a aplicação administrativa da plataforma **CarClean**.

### O que é CarClean?

O **CarClean** é uma plataforma completa e intuitiva para a gestão de lava-rápidos. Projetada para simplificar o gerenciamento das operações diárias, a solução inclui funcionalidades como:

- Agendamento de serviços
- Controle de estoque
- Gestão de funcionários
- Monitoramento financeiro
- Relatórios de desempenho

Com uma interface amigável e integrações com sistemas de pagamento e comunicação, o **CarClean** ajuda os proprietários de lava-rápidos a otimizar processos, melhorar a eficiência e elevar a satisfação dos clientes.

## Instalação

Para usar o **CarClean Components** no seu projeto Angular, siga os passos abaixo:

### Pré-requisitos

- **Angular 18+**
- **Angular Material**
- **Node.js**

### Passo 1: Instale o pacote

Atualmente, o projeto não está publicado no npm. Para instalar manualmente, clone o repositório e use o comando abaixo:

```bash
npm install <caminho-para-o-carclean-components>
```

### Passo 2: Chame o método na config da sua aplicação

No seu arquivo `app.config.ts`, invoque o método correspondente:

```typescript
import { ApplicationConfig } from "@angular/core";
import { provideTabNav } from "@carclean/tab-nav";

export const appConfig: ApplicationConfig = {
  providers: [provideVoleepTabNav()],
};
```

## Uso do Car Tab Nav

O componente **Car Tab Nav** utiliza o `MatTabGroup` do Angular Material em combinação com a estratégia de reutilização de rotas (`RouteReuseStrategy`) para oferecer uma navegação aprimorada em abas. Ele permite que os usuários naveguem entre diferentes páginas da aplicação sem perder o estado, abrindo uma nova aba para cada página acessada.

### Exemplo de uso:

```html
<car-tab-nav></car-tab-nav>
```

#### Definindo as abas nas rotas

Você pode definir quais rotas serão gerenciadas por tabs adicionando `tabNavLink` no objeto `data`.

```typescript
import { Routes } from "@angular/router";
import UserListComponent from "./containers/user-list/user-list.component";

const routes: Routes = [
  {
    path: "",
    title: "Usuários",
    data: {
      tabNavLink: true,
    },
    component: UserListComponent,
  },
];
```

### Funcionalidades:

- **Navegação em abas**: Cada nova rota acessada abre uma nova aba, semelhante a um navegador web.
- **Reutilização de rotas**: A estratégia de reutilização de rotas permite que o estado das páginas seja mantido enquanto o usuário navega entre abas.
- **Integração com Angular Material**: Utiliza `MatTabGroup` para fornecer uma experiência fluida e consistente com as diretrizes do Angular Material.

## Como Contribuir

Contribuições são bem-vindas! Para começar:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b minha-feature`)
3. Faça commit das suas mudanças (`git commit -m 'Adicionei uma nova feature'`)
4. Faça push para a branch (`git push origin minha-feature`)
5. Abra um Pull Request

## Licença

Este projeto é licenciado sob a [MIT License](./LICENSE).
