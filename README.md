
# BoardBuddy API

BoardBuddy é uma plataforma que visa conectar uma vasta comunidade de entusiastas de jogos, permitindo que compartilhem e peguem emprestado uma ampla variedade de jogos.

## Instalação

```bash
  npm install 
```

## Execução

```bash
  npm start 
```
Acessar: http://localhost:8000/docs/

## Desenvolvimento

```bash
  npm run dev 
```

#### Atualizar routes

```bash
npx tsoa routes
```
#### Issue com Swagger & Tsoa
Swagger está indo sem a definição do securitySchemes. Adicionar na mão.

```bash
"securitySchemes": {
  "jwt": {
    "type": "apiKey",
    "name": "x-access-token",
    "in": "header",
    "description": "JWT Authorization header using the x-access-token scheme"
  }
}
```

## Testes

```bash
npx jest
```

## Autores

- [@alinecristinapinto](https://github.com/alinecristinapinto)
- [@1LucasVictor](https://github.com/1LucasVictor)
- [@ViniciusGabrielSF](https://github.com/ViniciusGabrielSF)