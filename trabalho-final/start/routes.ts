import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index')
Route.get('about', 'HomeController.about')


Route.group(() => {
    Route.resource('rifas', 'RifasController')
    Route.get('/rifas/:id/:bilhete_id/comprado','RifasController.comprado').as('rifas.comprado')
}).middleware('auth')

Route.get('/register', 'AuthController.register').as('auth.register')
Route.post('/register', 'AuthController.store').as('auth.store')
Route.get('/login', 'AuthController.login').as('auth.login')
Route.post('/login', 'AuthController.verify').as('auth.verify')
Route.get('/logout', 'AuthController.logout').as('auth.logout')



