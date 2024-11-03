<h1>API_NODE_2.0 Documentation</h1>

<h2><a href="https://documenter.getpostman.com/view/9314131/2sA2r824DW">Documentação no Postman</a></h2>


# Documentação da API

## Introdução
A API REST para criação e autenticação de usuários é uma solução robusta e escalável construída com Node.js, projetada para gerenciar o registro e a autenticação de usuários em aplicações web e móveis.

## Endpoints

### 1. Criar Usuário

- **Método**: `POST`
- **URL**: `/user`
- **Corpo da Requisição**:
    ```json
    {
        "name": "admin",
        "email": "admin@admin.com.br",
        "phone": "(45) 9 9953-0899",
        "password": "1994"
    }
    ```

### 2. Obter Todos os Usuários

- **Método**: `GET`
- **URL**: `/user`
- **Autenticação**: Bearer Token
- **Cabeçalho**:
    ```
    Authorization: Bearer <token>
    ```

### 3. Atualizar Usuário

- **Método**: `PATCH`
- **URL**: `/user`
- **Autenticação**: Bearer Token
- **Cabeçalho**:
    ```
    Authorization: Bearer <token>
    ```
- **Corpo da Requisição**:
    ```json
    {
        "name": "user",
        "phone": "",
        "email": "",
        "password": ""
    }
    ```

### 4. Deletar Usuário

- **Método**: `DELETE`
- **URL**: `/user`
- **Corpo da Requisição**:
    ```json
    {
        "id": "2a4b81fe-cec8-4096-a943-8c627291540f"
    }
    ```

### 5. Login com Email

- **Método**: `POST`
- **URL**: `/login/email`
- **Corpo da Requisição**:
    ```json
    {
        "email": "admin@admin.com",
        "password": "admin"
    }
    ```

### 6. Login com Telefone

- **Método**: `POST`
- **URL**: `/login/phone`
- **Corpo da Requisição**:
    ```json
    {
        "phone": "(45) 9 9953-0899",
        "password": "admin"
    }
    ```

## Conclusão
Essa API oferece uma série de endpoints que permitem criar, autenticar e gerenciar usuários de forma segura e eficiente.
