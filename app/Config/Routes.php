<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('/tictac', 'Tictac::index');

$routes->get('/api/tic_tac_toe/history','Tictac::history');
$routes->post('/api/tic_tac_toe/save','Tictac::save');