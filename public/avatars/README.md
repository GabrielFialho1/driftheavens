# Avatares

Esta pasta contém as imagens de avatar dos usuários.

## Estrutura

Os arquivos devem ser nomeados com números correspondentes ao ID do avatar no banco de dados:

- `1.png` - Avatar padrão 1
- `2.png` - Avatar padrão 2
- `3.png` - Avatar padrão 3
- ...

## Como usar

O sistema busca automaticamente as imagens usando o número do avatar armazenado no banco de dados:

```
/avatars/{user.avatar}.png
```

Se a imagem não for encontrada, o sistema exibirá a primeira letra do nome do usuário.
