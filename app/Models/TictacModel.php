<?php

namespace App\Models;

use CodeIgniter\Model;

class TictacModel extends Model {

    protected $table = "history" ;
    protected $primaryKey="id";

    protected $useAutoIncrement = true;
    protected $allowedFields    = [
        'id',
        'history',
        'date',
        'size',
        'step',
        'winner'
    ];

    protected $useSoftDeletes = false;
}