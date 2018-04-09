<?php
namespace common\models;

use common\models\translationtables\UserParams;
use Yii;
use yii\base\Model;

/**
 * Login form
 */
class ChangepasswordForm extends Model
{


    public $password;
    public $repassword;




    public function rules()
    {
        return [

            [['password', 'repassword'], 'required'],
            [['password'], 'string','min' => 8],
            ['repassword', 'compare', 'compareAttribute' => 'password'],

        ];
    }


    public function attributeLabels()
    {


        $params =UserParams::getList();
        $attr = [];
        foreach ($params as $param){

            $attr[$param->name] = $param->langData['name'];

        }
        return $attr;
    }


    public function change()
    {
        if ($this->validate()) {

            $user = User::findByUsername(\Yii::$app->user->identity->username);
            $user->setPassword($this->password);
            $user->generateAuthKey();
            if ($user->save()) {
                return $user;

            } else {
                return false;
            }
        } else {
            return false;
        }


    }
}