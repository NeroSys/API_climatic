<?php

namespace common\models;

use Yii;
use yii\base\Model;


class Useradminform extends Model
{

    public $password;
    public $fio;
    public $director_region;
    public $manager_region;
    public $username;
    public $phone;
    public $phone_for_user;
    public $role;
    public $email;
    public $fileinfo;
    public $crop_info;
    public $id;


    public function rules()
    {
        return [
            [['password', 'fio', 'role', 'username'], 'required'],
            [['fileinfo','id','crop_info','email','phone','phone_for_user','director_region', 'manager_region'], 'safe'],
            [['email'], 'filter', 'filter' => 'trim'],
            [['email'], 'email'],
            [['fileinfo'], 'file','extensions' => ['jpg']],
        ];
    }



}
