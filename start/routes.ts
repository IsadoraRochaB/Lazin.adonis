/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'Isadora' }
})


Route.post("/register", "AuthController.register")
Route.post("/login", "AuthController.login")
Route.get("/cadastros", "CadastrosController.index")
Route.get("/cadastros/:id", "CadastrosController.show")
Route.get("/animais", "AnimaisController.index")
Route.get("/animais/:id", "AnimaisController.show")
Route.group (() => {
  Route.resource("cadastros", 'CadastrosController').apiOnly().except(['index', 'show'])
  Route.resource("animais", "AnimaisController").apiOnly().except (["index", "show"])
}).middleware ('auth')


