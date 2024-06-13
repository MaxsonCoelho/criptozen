# Cryptozen

## Configuração Inicial

1. Renomeie o arquivo `.env.example` para `.env`.
2. Instale as dependências do projeto utilizando o comando `yarn start` ou `npm start`.
3. Para gerar o APK do projeto, utilize o comando `./gradlew assembleRelease`.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

- **assets**: Contém as imagens, fontes e outros recursos estáticos do projeto.
- **components**: Contém os componentes reutilizáveis da aplicação.
- **contexts**: Contém os contextos React para gerenciamento de estado global.
- **navigation**: Contém as definições de navegação da aplicação.
- **pages**: Contém as páginas principais da aplicação.
- **services**: Contém os serviços utilizados pela aplicação, como chamadas à API e WebSocket.
- **styles**: Contém os estilos globais e temas da aplicação.
- **types**: Contém as definições de tipos TypeScript utilizadas na aplicação.

## Componentes

### `App.tsx`

Este é o componente principal da aplicação, que configura a navegação, o tema e os contextos de conexão e moeda.

### `components/ChartComponent.tsx`

Este componente exibe gráficos para as criptomoedas, com opções de linha, área e barra. Os dados são filtrados por tempo e exibidos com base nas configurações selecionadas pelo usuário.

### `components/CurrencyList.tsx`

Este componente exibe a lista de criptomoedas disponíveis, com seus preços e variações. Os dados são atualizados dinamicamente e exibidos em uma lista horizontal.

### `components/ButtonGeneric.tsx`

Este componente exibe um botão genérico que pode ser reutilizado em diferentes partes da aplicação. Ele suporta ícones, diferentes cores e tamanhos.

### `components/GenericLoading.tsx`

Este componente exibe um indicador de carregamento genérico que pode ser utilizado enquanto dados estão sendo carregados.

## Contextos

### `contexts/currency.tsx`

- **CurrencyProvider**: Provedor do contexto de moeda, que gerencia a moeda selecionada.
- **useCurrency**: Hook para acessar o contexto de moeda.

### `contexts/infoConnection.tsx`

- **InfoConnectionProvider**: Provedor do contexto de conexão, que gerencia o estado de conexão da aplicação.
- **useConnection**: Hook para acessar o contexto de conexão.
- **monitoringConnection**: Função para monitorar o estado da conexão.
- **updateIsConnected**: Função para atualizar o estado da conexão.
- **isConnectedToWifi**: Função para verificar se está conectado ao Wi-Fi.
- **checkConnectionSpeed**: Função para verificar a velocidade da conexão.

### `contexts/theme.tsx`

- **ThemeProviderStyle**: Provedor do contexto de tema, que gerencia o tema da aplicação.
- **useThemeStyle**: Hook para acessar o contexto de tema.
- **toggleTheme**: Função para alternar entre os temas.
- **saveTheme**: Função para salvar o tema no armazenamento persistente.
- **loadTheme**: Função para carregar o tema do armazenamento persistente.

## WebSocket Service

### `services/websocketService.ts`

- **connectWebSocket**: Função para conectar ao servidor WebSocket e gerenciar mensagens recebidas.
- **formatPriceData**: Função para formatar dados de preços recebidos do WebSocket.
- **formatTradeData**: Função para formatar dados de trade recebidos do WebSocket.

## Navegação

### `navigation/BottomTabs.tsx`

Este arquivo define a navegação por abas na parte inferior da aplicação, com ícones animados para cada aba.

## Conclusão

Este projeto é uma aplicação completa para monitoramento de criptomoedas, com gráficos dinâmicos, atualização em tempo real e navegação intuitiva. A arquitetura do projeto foi projetada para ser escalável e de fácil manutenção, utilizando os melhores padrões e práticas de desenvolvimento.


OBS: Se faz necessária uma api websocket privada ao invés dessa gratuita, limitada e que tem muitos acessos globalmente. 
Isso foi analisado para melhor obtenção de dados com o intuito de alcançar uma performance de excelência na exibição e no controle dos mesmos, garantindo maior performance e estabilidade do app.

Websocket gratuito ultilizado da binance
PRICE_WS_URL=wss://stream.binance.com:9443/ws/!ticker@arr
TRADES_WS_URL=wss://stream.binance.com:9443/ws/btcusdt@trade
