#During implementation, the following commands were used:

./node_modules/bin/sequelize init

./node_modules/.bin/sequelize db:create
#config.json file contains settings that were used to connect to db on a local machine.

./node_modules/.bin/sequelize model:generate --name user --attributes name:string,password:string,email:string
./node_modules/.bin/sequelize model:generate --name product --attributes name:string
./node_modules/.bin/sequelize model:generate --name review --attributes productId:string,description:string

./node_modules/.bin/sequelize db:migrate

./node_modules/.bin/sequelize seed:generate --name users
./node_modules/.bin/sequelize seed:generate --name products
./node_modules/.bin/sequelize seed:generate --name reviews

./node_modules/.bin/sequelize db:seed:all
