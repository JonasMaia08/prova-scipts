para testar a aplicaçao seram necessários alguns passos pois se trata de uma aplicação de servidor local

Criar um database para usar
Em primeiro lugar abra o mysql workbench ou o xammp para criar um database e uma tabela

entre no mysql workbench ou xammp e crie um database nomeado estoque depois dentro deste db crie uma tabela nomeada produtos com as seguintes colunas:

id (int)
nome (varchar)
descricao (varchar)
preco (float)
quantidade (int)
categoria (varchar)
apos ter criado>>

setar o servidor para rodar localmente
abrir um novo sql file e colar e rodar o seguinte comando:

ALTER USER 'root'@'localhost' IDENTIFIED BY '12345'; ou alternativamente ALTER USER 'root'@'localhost' IDENTIFIED BY mysql_native_password BY'12345';

ou substitua a senha da file db.js que esta dentro da pasta api para a senha que atualmente utiliza ¨

insgtalar as dependencias
instalar as dependencias necessarias para a aplicação rodar comandos entre no terminal Atalho: ctrl + " então entre na pasta api: cd api e rode npm i

faça o mesmo para a pasta frontend saia com cd.. então entre na pasta frontend: cd frontend e digite npm i

rodar aplicação
apos isso dentro do caminho frontend rode o programa npm start

crie um novo terminal no + em cima e entre na pasta api cd api e digite o comando npm start
