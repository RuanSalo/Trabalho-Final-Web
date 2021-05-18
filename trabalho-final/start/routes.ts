import Route from '@ioc:Adonis/Core/Route'
import RifasController from 'App/Controllers/Http/RifasController'

Route.get('/','HomeController.index')
Route.get('about','HomeController.about')

Route.resource('rifas','RifasController')