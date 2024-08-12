<?php

namespace App\Controllers;
use CodeIgniter\Controller;
use App\Models\TictacModel;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;

class Tictac_Api extends ResourceController
{
    protected $modelName = 'App\Models\TictacModel';
    protected $format = 'json';
    protected $tac_tac;
    protected $request;

    public function __construct(){
        $this -> tac_tac = new TictacModel();
        $this -> request = \Config\Services::request();
    }
    
    public function history(){
        $data["code"] ="" ;
        $data["message"] = "";
        $historys =$this->tac_tac->findAll();
        if($historys){
            $data["code"] = 200;
            $data["message"] = "success";
            $data["data"] = $historys;
        }else{
            $data["code"] = 404;
            $data["message"] = "not found";
        }
       
        return $this->respond($data);
    }

    public function save(){
        $history = $this-> request->getJSON();
        $tac_tac = $this-> tac_tac->insert($history);
        if($tac_tac){
            $data["code"] = 200;
            $data["message"] = "success";           
        }else{
            $data["code"] = 404;
            $data["message"] = "not found";
        }
       
        return $this->respond($data);
    }
}
