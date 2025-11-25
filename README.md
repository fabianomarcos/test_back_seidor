Olá, para rodar a aplicação rodar os seguintes comandos

npm install 

já deve rodar as migrations, mas qualquer coisa é só dá um 
npx prisma migrate dev

testes - npm run test

npm run dev

.env simples

PORT="3000"
DATABASE_URL='file:./db/database.sqlite'
NODE_ENV="development"

.env.test
DATABASE_URL='file:./db/database_TESTS.sqlite'

Deixei três arquivos na raiz do projeto para testar a aplicação com heet client ou como achatem melhor.

Alguns testes quebraram durante a execução, iria removê-los mas decidir deixá-los. Perdi algum tempo pois tenho mais facilidade com Nest, mas acho que deu pra realizar um bom trabalho.
Dúvidas podem me chamar no zap 31 9 9639 8671
