<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

//version info
$router->get('/', function () use ($router) {
    return $router->app->version();
});


//unprotected routes
$router->post('/register', 'AuthController@register');
$router->post('/login', 'AuthController@login');

$router->get('/user/{id}/chatBubbleApps',  ['uses' => 'ChatBubbleController@showUserChatBubbleApps']);
$router->post('/chat',  ['uses' => 'ChatBubbleController@createMessage']);

//email test
//$router->post('email/send/v1', 'MailgunController@emailTest');


//protected routes
$router->group(['middleware' => 'auth'], function () use ($router) {
    $router->get('/me', 'UserController@profile');
    $router->post('/logout', 'UserController@logout');   
    $router->post('/chatBubbleApp',  ['uses' => 'ChatBubbleController@createChatBubbleApp']); 
});