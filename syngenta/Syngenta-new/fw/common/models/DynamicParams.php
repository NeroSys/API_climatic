<?php

namespace common\models;

use common\models\translationtables\UserParams;
use Yii;
use yii\base\DynamicModel;

/**
 * This is the model class for table "site".
 *
 * @property integer $id
 * @property string $domain
 * @property string $name
 * @property integer $sort
 * @property integer $default_lang
 * @property integer $default_domain
 * @property integer $enable
 *
 * @property Pages[] $pages
 * @property Language $defaultLang
 */
class DynamicParams extends  DynamicModel
{

public function generateAttributeLabel($name){

    $params =UserParams::getList();

    foreach ($params as $param){
        if ($param->name == $name){

            if (isset(Yii::$app->params['language'])) {
                return $param->langData['name'];
            } else {
                return $param->ruLangData['name'];
            }
        }
    }

    /*if ($name == 'agree'){

        if (Yii::$app->language == 'uk'){
            Yii::$app->language = 'ua';
        }

      $result =  \Yii::t('s-usloviyami-soglasen', 'C условиями согласен');

        if (Yii::$app->language == 'ua'){
            Yii::$app->language = 'uk';
        }

        return  $result;

    }*/

    return $name;

}

    public function IsNumber($attribute, $params)
    {

        if(!preg_match('/^\d+$/',$this->$attribute)){

            $this->addError($attribute, \Yii::t('register', 'Ошибка'));

        }




    }

    public function UniqueParam($attribute, $params)
    {


            $paramsnew = new UserParams();
            $parameter = $paramsnew->find()
                ->where(['visible' => true])
                ->andWhere(['name' => $attribute])
                ->one();



            if (!empty($parameter)) {
                $paramsnewval = new UserParamsValue();
                if (!\yii::$app->user->isGuest){
                $exist = $paramsnewval->find()
                    ->where(['user_param_id' => $parameter->id])
                    ->andWhere(['value' => $this->$attribute])
                    ->andWhere(['<>','user_id',\yii::$app->user->id])
                    ->one();
                }else {
                    $exist = $paramsnewval->find()
                        ->where(['user_param_id' => $parameter->id])
                        ->andWhere(['value' => $this->$attribute])
                        ->one();

                }

                if (!empty($exist)) {
                    $this->addError($attribute, \Yii::t('register', 'Такое значение уже используется'));
                }
            }
        }

    public function UniqueParamAdmin($attribute, $params)
    {


        $paramsnew = new UserParams();
        $parameter = $paramsnew->find()
            ->where(['visible' => true])
            ->andWhere(['name' => $attribute])
            ->one();



        if (!empty($parameter)) {
            $paramsnewval = new UserParamsValue();

                $exist = $paramsnewval->find()
                    ->where(['user_param_id' => $parameter->id])
                    ->andWhere(['value' => $this->$attribute])
                    ->one();



            if (!empty($exist)) {
                $this->addError($attribute, \Yii::t('register', 'Такое значение уже используется'));
            }
        }
    }




}