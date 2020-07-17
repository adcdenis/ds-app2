# ds-app2

migrando tudo que fiz para um novo template material ui

A Fazer:
Multi usuário - Em andamento -> IMPLEMENTAR BACK END DO PLANO E SERVIDORES, FEITO DO CLIENTE
Testar api de formatação e máscara de input
Criar componente de botões para utilizar em todas as páginas.
Criar rodapé ?

Feito:
criar botao renovar a 30 dias OK - Rever regra
Transição leve entre páginas OK em teste
contador de itens vencidos no sino OK
Vencimento na primeira coluna - clique nessa coluna OK
Clicar para editar ok
Mudar ordem dos botões OK
Fazer deploy frontend ok
mudar o avatar pra um avatar fixo - ninja ok
Eliminar páginas de exemplo ok
Criar ambiente de deploy ok
Fazer deploy backend ok
Icone do whats e disparo de msg padrão ok
count qnt pra vencer em 3 dias e colocar no dashboard ok
Página que mostra somente a vencer em 3 dias ok
Fazer página mostrar apenas vencidos ok



-----------deploy back
$ npm install -g heroku-cli
$ heroku --version
$ heroku login
heroku create cod3r-my-money-app-backend
$ heroku buildpacks:set heroku/nodejs
$ heroku git:remote -a cod3r-my-money-app-backend
Add-on do mLab
Adicionar usuário do MongoDB
# URL_MONGO é mais ou menos assim: mongodb://<dbuser>:<dbpassword>@ds053794.mlab.com:53794/heroku_6lb871t5
$ heroku config:set MONGOLAB_URI=<URL_MONGO>
# Gere o seu próprio AUTH_SECRET
$ heroku config:set AUTH_SECRET=4bc12841b901f1716f71ab76b99699d6

mongodb://dstv:dstv78@ds053794.mlab.com:53794/heroku_6lb871t5
heroku config:set MONGOLAB_URI=mongodb://dstv:dstv78@ds053794.mlab.com:53794/heroku_6lb871t5
heroku config:set AUTH_SECRET=4bc128hgjgughh#$#@#$$@$f71ab76b99699d6

heroku git:remote -a dstv-backend
git subtree push --prefix backend  heroku master
heroku logs --tail

----------------------------------------------------------
DEPLOY HEROKU FRONTEND


heroku create dstv-frontend

heroku git:remote -a dstv-frontend

git add .
$ git commit -am "Ajustando URLs do backend"

git subtree push --prefix frontend  heroku master

heroku logs --tail