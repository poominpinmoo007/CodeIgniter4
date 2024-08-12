<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Tic_tac::index');

$routes->get('/api/tic_tac_toe/history','Tictac_Api::history');
$routes->post('/api/tic_tac_toe/save','Tictac_Api::save');