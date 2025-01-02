Seja bem vindo!


O KoutApp é um aplicativo desenvolvido para o registro de planos de treino de academia, foi desenvolvido na plataforma Appsmith, uma plataforma low-code de criação de aplicativos.

A camada de dados do aplicativo foi construída em PostgreSQL, utilizando o serviço Supabase para o host.

A estrutura do Projeto é a seguinte:

```
KoutApp
│
├── datasources
│
└── pages
│   │
│   ├── Equipamentos
│   │   │
│   │   ├── jsobjects/EquipmentDTO
│   │   ├── queries
│   │   ├── widgets
│   │   └── Equipamentos.json
│   │
│   ├── Exercícios
│   │   │
│   │   ├── jsobjects/EquipmentDTO
│   │   ├── queries
│   │   ├── widgets
│   │   └── Exercicios.json
│   │
│   ├── Home Page
│   │   │
│   │   ├── jsobjects/EquipmentDTO
│   │   ├── queries
│   │   ├── widgets
│   │   └── Home Page.json
│   │
│   └── Treinos
│       │
│       ├── jsobjects/EquipmentDTO
│       ├── queries
│       ├── widgets
│       └── Treinos.json
│
├── README.md
├── application.json
├── metadata.json
├── dump.sql
└── theme.json

```

#### Conteúdo da Estrutura:
- **Datasources**:
Armazena as diferentes fontes de dados usadas pelo projeto como um todo. no nosso caso apenas uma fonte de dados é utilizada, o Postgres.

- **Pages**:
Cada Página criada no appsmith possui a sua própria subdivisão, com queries e objetos javascript independentes.
A estrutrua de pastas sempre vai seguir o formato a seguir:

> -  **jsobjects/*** Cada objeto javascript criado no Appsmith, possuirá uma pasta com o seu nome. Nesta pasta ficam armazenados o script javascript, além de um arquivo de metadados.

> -  **queries** Nesta pasta ficam armazenadas os templates de queries parametrizadas, no formato TXT, também junto de um arquivo de metados. 

> -  **widgets** Nesta pasta ficam armazenados objetos json que configuram os componentes visuais do frontend do Appsmith. Grupos de objetos são colocados em pastas. modais também são agrupados em pastas.

- **application.json**:
É o objeto de nível mais alto de toda a hierarquia do app, armazena informações como o nome do app e suas configurações básicas

- **metadata.json**:
Guarda metadados sobre a aplicação como um todo.

- **dump.sql**:
Um dump do banco de dados representando o estado atual de configuração de todas as tabelas e funções.

- **theme.json**:
Guarda configurações de exibição do tema do aplicativo como cor de destaque, fonte e assim por diante.


#Observação: Todas as alterações no projeto são realizadas via Appsmith, exeto no banco de dados, onde a configuração foi realizada diretamente no PostgreSQL.