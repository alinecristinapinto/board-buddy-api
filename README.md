
# BoardBuddy API

BoardBuddy é uma plataforma visa conectar uma vasta comunidade de entusiastas de jogos, permitindo que compartilhem e peguem emprestado uma ampla variedade de jogos. [TODO]

## Instalação

```bash
  npm install 
```

## Execução

```bash
  npm start 
```
Acessar: http://localhost:3000/docs/

## Desenvolvimento

```bash
  npm run dev 
```

#### Atualizar routes

```bash
npx tsoa spec && tsoa routes
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
[TODO]

## Arquitetura
[TODO]
#### Autenticação e Autorização
- https://supabase.com/docs/guides/auth/architecture
- https://supabase.com/docs/guides/auth/passwords?queryGroups=language&language=js

## Autores

- [@alinecristinapinto](https://github.com/alinecristinapinto)
- [@1LucasVictor](https://github.com/1LucasVictor)
- [@ViniciusGabrielSF](https://github.com/ViniciusGabrielSF)