<?php

namespace App\Controllers;

class Tic_tac extends BaseController
{
    public function index(): string
    {
        return view('tic_tac_toe');
    }
}
