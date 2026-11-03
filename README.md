# ⚜ Galeria de Fotos e Vídeos – Grupos Escoteiros

Uma plataforma web para organizar, visualizar e compartilhar registros fotográficos e vídeos de atividades, eventos, acampamentos e encontros escoteiros.

Desenvolvida com **Google Apps Script, Google Drive e Google Sheets**, a aplicação oferece uma galeria pública e um painel administrativo para gerenciamento dos álbuns, sem necessidade de contratar hospedagem ou manter um servidor próprio.

---

## 📸 Sobre o projeto

A Galeria de Fotos e Vídeos foi desenvolvida para facilitar a organização e o compartilhamento de registros de atividades escoteiras.

A aplicação utiliza o Google Drive como armazenamento das mídias e o Google Sheets como banco de dados dos álbuns.

O administrador cadastra as pastas do Google Drive através de um painel administrativo. A aplicação identifica automaticamente as fotos e os vídeos existentes nessas pastas e os apresenta em uma interface organizada, moderna e responsiva.

O projeto pode ser adaptado por qualquer Grupo Escoteiro, Distrito Escoteiro ou instituição que queira disponibilizar seus registros fotográficos na internet.

## ✨ Funcionalidades

### Galeria pública

- Organização dos álbuns por ano.
- Exibição de capas e informações dos eventos.
- Navegação entre diferentes álbuns.
- Visualização de fotos e vídeos.
- Pesquisa por nome do evento ou localização.
- Ordenação dos álbuns por data ou ordem alfabética.
- Interface responsiva para computadores, tablets e celulares.

### Visualização de mídias

- Grade de fotos configurável entre 3 e 8 colunas.
- Filtros para visualizar somente fotos ou vídeos.
- Ordenação das mídias por data ou nome.
- Visualizador em tela cheia (Lightbox).
- Navegação entre imagens.
- Miniaturas laterais para facilitar a navegação.
- Suporte à navegação pelo teclado e gestos em dispositivos móveis.
- Download de fotografias.
- Compartilhamento de álbuns e fotografias pelo WhatsApp.
- Cópia de links individuais.

### Favoritos

- Marcação de fotografias favoritas.
- Filtro para visualizar somente as imagens favoritas.
- Armazenamento dos favoritos no navegador utilizando LocalStorage.

### Painel administrativo

- Acesso protegido por senha.
- Cadastro de novos álbuns.
- Edição de informações dos eventos.
- Exclusão de álbuns.
- Definição de título, local e data.
- Identificação automática do ano pela data do evento.
- Definição manual da imagem de capa.
- Opção para ocultar álbuns da galeria pública.
- Contagem automática de fotografias e vídeos.
- Atualização da contagem de mídias.
- Geração de links diretos para os álbuns.

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| Google Apps Script | Backend e execução da aplicação |
| Google Drive | Armazenamento de fotos e vídeos |
| Google Sheets | Banco de dados dos álbuns |
| HTML5 | Estrutura das páginas |
| CSS3 | Estilização e responsividade |
| JavaScript | Interatividade e funcionalidades |
| Google Drive API v2 | Consulta dos arquivos armazenados no Drive |
| LocalStorage | Armazenamento local das preferências e favoritos |

---

## 📋 Requisitos

Antes de iniciar a instalação, você precisará de:

1. Uma conta Google.
2. Acesso ao Google Drive.
3. Acesso ao Google Apps Script.
4. Conhecimentos básicos de navegação e edição de arquivos.

**Não é necessário:**

- Contratar hospedagem.
- Comprar domínio.
- Instalar banco de dados.
- Configurar servidor Linux ou Windows.
- Instalar Node.js ou outras ferramentas de desenvolvimento.

Toda a aplicação é executada na infraestrutura do Google.

---

# 🚀 Instalação e configuração

A seguir está o procedimento para instalar sua própria versão da aplicação.

## 1. Criar um projeto no Google Apps Script

Acesse:

https://script.google.com/

1. Faça login com sua conta Google.
2. Clique em **Novo projeto**.
3. Defina um nome para o projeto, por exemplo: `Galeria de Fotos - Meu Grupo Escoteiro`.

## 2. Adicionar os arquivos da aplicação

O projeto precisa conter quatro arquivos:

| Arquivo | Tipo | Finalidade |
|---|---|---|
| Code.gs | Script | Backend, banco de dados e funções |
| Gallery.html | HTML | Interface pública da galeria |
| Admin.html | HTML | Painel administrativo |
| appsscript.json | Manifesto | Configurações do projeto e serviços |

### Criando o arquivo Code.gs

O Google Apps Script cria automaticamente um arquivo chamado `Código.gs` ou `Code.gs`.

1. Abra o arquivo criado.
2. Apague o conteúdo existente.
3. Copie o código disponível neste repositório.
4. Cole no editor.
5. Salve o projeto.

### Criando o arquivo Gallery.html

1. No menu lateral, clique no botão de adicionar arquivo (+).
2. Selecione **HTML**.
3. Informe o nome `Gallery`.
4. Cole o conteúdo do arquivo `Gallery.html` deste repositório.
5. Salve.

### Criando o arquivo Admin.html

1. Clique novamente no botão de adicionar arquivo (+).
2. Selecione **HTML**.
3. Informe o nome `Admin`.
4. Cole o conteúdo do arquivo `Admin.html`.
5. Salve.

**Importante:** os nomes devem ser exatamente `Gallery` e `Admin`, sem adicionar a extensão `.html` no campo de criação do Google Apps Script.

## 3. Configurar o manifesto appsscript.json

O manifesto contém as configurações necessárias para a execução da aplicação.

Para visualizar e editar:

1. No editor do Google Apps Script, clique em **Configurações do projeto** (ícone de engrenagem).
2. Localize a opção para exibir o arquivo de manifesto `appsscript.json` no editor.
3. Ative essa opção.
4. Abra o arquivo `appsscript.json`.
5. Substitua seu conteúdo pelo código abaixo:

```json
{
  "timeZone": "America/Sao_Paulo",
  "dependencies": {
    "enabledAdvancedServices": [
      {
        "userSymbol": "Drive",
        "version": "v2",
        "serviceId": "drive"
      }
    ]
  },
  "webapp": {
    "executeAs": "USER_DEPLOYING",
    "access": "ANYONE_ANONYMOUS"
  },
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8"
}
```

Salve as alterações.

## 4. Ativar a API do Google Drive

A aplicação utiliza o serviço avançado do Google Drive para localizar fotografias e vídeos dentro das pastas cadastradas.

Para habilitar:

1. No editor do Google Apps Script, acesse **Serviços**.
2. Clique em **Adicionar um serviço** (+).
3. Procure por **Drive API**.
4. Selecione a versão **v2**.
5. Clique em **Adicionar**.

Caso o projeto solicite a ativação da API no Google Cloud, siga o link apresentado e habilite também a Google Drive API no projeto associado.

## 5. Executar a configuração inicial

Agora vamos preparar o banco de dados da aplicação.

1. Volte ao editor do Google Apps Script.
2. Selecione a função `configurar` na lista de funções.
3. Clique em **Executar**.
4. Na primeira execução, o Google solicitará autorização para acessar os serviços necessários.
5. Autorize o acesso utilizando sua conta Google.

Após a execução, a aplicação irá:

- Criar automaticamente uma planilha no Google Sheets.
- Criar a aba `Albuns`.
- Configurar os cabeçalhos do banco de dados.
- Registrar o identificador da planilha nas propriedades do projeto.
- Definir a senha inicial do administrador, caso ainda não exista.

### Banco de dados

A planilha será criada automaticamente com o nome:

`Galeria Escoteiros - Banco de dados`

Não é necessário criar uma planilha manualmente.

### Senha inicial do administrador

A senha padrão definida no código é:

`senha123`

**ATENÇÃO:** altere essa senha antes de disponibilizar a aplicação publicamente.

Para isso:

1. Acesse **Configurações do projeto**.
2. Localize **Propriedades do script**.
3. Procure a propriedade `ADMIN_PASSWORD`.
4. Altere seu valor para uma senha forte.
5. Salve.

A senha é armazenada nas propriedades do script, não na planilha.

---

# 🌐 Publicação da aplicação

Após concluir as configurações, chegou a hora de publicar sua galeria na internet.

## 1. Criar uma implantação

No Google Apps Script:

1. Clique em **Implantar**.
2. Selecione **Nova implantação**.
3. Clique no ícone de engrenagem.
4. Escolha **Aplicativo da Web**.

Configure as opções:

| Configuração | Valor |
|---|---|
| Executar como | Eu (sua conta Google) |
| Quem pode acessar | Qualquer pessoa |

A aplicação precisa dessas configurações para disponibilizar a galeria publicamente.

5. Clique em **Implantar**.
6. Autorize as permissões solicitadas, caso necessário.
7. Copie o endereço gerado.

Esse será o endereço público da sua galeria.

**Exemplo:**

`https://script.google.com/macros/s/SEU_ID_DE_IMPLANTACAO/exec`

## 2. Acessar a galeria pública

Basta abrir o endereço gerado na implantação.

Como ainda não existem álbuns cadastrados, a galeria estará vazia.

## 3. Acessar o painel administrativo

Para acessar o painel de gerenciamento, adicione o parâmetro `?page=admin` ao endereço da aplicação.

**Exemplo:**

`https://script.google.com/macros/s/SEU_ID_DE_IMPLANTACAO/exec?page=admin`

Informe a senha configurada anteriormente.

---

# 📁 Como cadastrar um álbum

Com a aplicação publicada, você já pode começar a adicionar seus eventos.

## 1. Preparar uma pasta no Google Drive

1. Acesse o Google Drive.
2. Crie uma pasta para o evento.
3. Adicione as fotografias e os vídeos desejados.
4. Clique com o botão direito na pasta.
5. Selecione **Compartilhar**.
6. Altere o acesso geral para **Qualquer pessoa com o link**.
7. Configure a permissão como **Leitor**.
8. Copie o link da pasta.

**Importante:** para que a galeria consiga exibir as mídias, os arquivos também precisam estar acessíveis para visualização pública.

## 2. Cadastrar o álbum no painel

Acesse o painel administrativo e preencha:

| Campo | Descrição |
|---|---|
| Título do álbum | Nome do evento ou atividade |
| Localização | Cidade ou local onde aconteceu |
| Data do evento | Data de realização |
| Ano | Opcional, preenchido automaticamente pela data |
| Visível ao público? | Define se o álbum aparecerá na galeria |
| Link da pasta do Google Drive | Endereço da pasta com as mídias |
| Foto de capa | Opcional; utiliza a primeira foto quando não informado |

Clique em **Salvar álbum**.

A aplicação irá consultar a pasta do Drive, identificar as mídias e registrar as informações na planilha.

Pronto! O álbum estará disponível na galeria pública, desde que esteja marcado como visível.

## 3. Atualizar as fotografias

Quando novas fotografias ou vídeos forem adicionados à pasta do Google Drive, acesse o painel administrativo e utilize a opção **Recontar** no álbum correspondente.

Essa operação atualiza a contagem de mídias e limpa o cache utilizado na consulta daquela pasta.

---

# 🔄 Estrutura do projeto

```text
Galeria-Escoteiros/
│
├── appsscript.json
│
├── Code.gs
│
├── Gallery.html
│
├── Admin.html
│
└── README.md
```

### Responsabilidade de cada arquivo

**Code.gs**

Contém as funções responsáveis pela aplicação:

- Configuração inicial.
- Criação e leitura do banco de dados.
- Consulta das mídias no Google Drive.
- Autenticação administrativa.
- Cadastro, edição e exclusão de álbuns.
- Atualização da contagem de mídias.
- Comunicação entre o frontend e o backend.

**Gallery.html**

Responsável pela interface pública:

- Listagem de álbuns.
- Filtros e pesquisa.
- Exibição de fotografias e vídeos.
- Visualizador de mídias.
- Favoritos.
- Compartilhamento e download.

**Admin.html**

Responsável pelo painel administrativo:

- Login.
- Cadastro de álbuns.
- Edição e exclusão.
- Gerenciamento de visibilidade.
- Atualização das mídias.

**appsscript.json**

Define as configurações de execução, fuso horário, versão do ambiente e serviços avançados utilizados.

---

# 🔐 Segurança e privacidade

Alguns cuidados são importantes antes de disponibilizar a aplicação.

1. **Altere a senha padrão:** nunca mantenha `senha123` em produção.
2. **Proteja sua conta Google:** a aplicação é executada utilizando a conta responsável pela implantação.
3. **Compartilhamento público:** as pastas e mídias configuradas para acesso público poderão ser visualizadas por pessoas que tenham acesso aos links.
4. **Dados pessoais:** evite publicar fotografias ou vídeos sem as autorizações necessárias, especialmente quando envolver crianças e adolescentes.
5. **Código-fonte:** não publique senhas, tokens ou informações privadas no GitHub.
6. **Acesso administrativo:** o painel é protegido por senha, mas não possui autenticação individual por usuário. Compartilhe a senha somente com pessoas autorizadas.

**Atenção:** ocultar um álbum impede sua listagem na galeria pública, mas não substitui as permissões de acesso configuradas no Google Drive.

---

# ⚙️ Manutenção e atualização

Sempre que realizar alterações no código:

1. Abra o projeto no Google Apps Script.
2. Atualize os arquivos necessários.
3. Salve as alterações.
4. Acesse **Implantar → Gerenciar implantações**.
5. Edite a implantação existente.
6. Selecione uma nova versão.
7. Clique em **Implantar**.

O endereço da aplicação poderá continuar o mesmo quando você atualizar a implantação existente.

---

# ❓ Perguntas frequentes

**Preciso pagar por hospedagem?**

Não. A aplicação utiliza a infraestrutura do Google Apps Script, Google Drive e Google Sheets. Entretanto, os serviços estão sujeitos às cotas e limites de utilização da conta Google.

**Preciso criar um banco de dados?**

Não. A planilha utilizada como banco de dados é criada automaticamente na primeira execução da função `configurar()`.

**Posso utilizar minha própria conta Google?**

Sim. Cada pessoa pode instalar sua própria versão utilizando sua conta Google.

**Posso cadastrar quantos eventos quiser?**

A aplicação permite cadastrar múltiplos álbuns. O volume de utilização também estará sujeito aos limites dos serviços Google.

**As fotografias são armazenadas no Google Apps Script?**

Não. As fotografias e os vídeos permanecem no Google Drive. A aplicação apenas consulta e apresenta as mídias cadastradas.

**Posso utilizar para outros tipos de eventos?**

Sim. Apesar de ter sido desenvolvida com foco no Escotismo, pode ser utilizada por escolas, instituições, associações, projetos e organizações em geral.

**Os favoritos ficam salvos para todos os visitantes?**

Não. Os favoritos são armazenados no LocalStorage do navegador de cada visitante.

---

# 🤝 Contribuições

Sugestões, melhorias e contribuições são bem-vindas!

---

# 📄 Licença

Este projeto está disponibilizado para estudo, utilização e adaptação.

---

**Desenvolvido com o objetivo de facilitar a organização, preservação e compartilhamento das memórias do Movimento Escoteiro.**

⚜ Sempre Alerta!
