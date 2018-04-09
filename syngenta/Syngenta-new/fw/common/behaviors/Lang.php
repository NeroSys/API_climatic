<?php

namespace common\behaviors;

use app\modules\main\models\mainpage\Mainpage;
use common\models\Pages;
use yii;
use yii\base\Behavior;

use common\models\Language;
use yii\web\Controller;

class Lang extends Behavior {

    public function events(){
        return [Controller::EVENT_BEFORE_ACTION => 'setLang'];
    }

    public function setLang()
    {

        $langSlug = Yii::$app->request->get('langSlug');

        $language = new Language();

        if(empty($langSlug)){
            $lang = $language->find()->where(['default_lang' => true])->one();
            Yii::$app->params['language'] = $lang;
            Yii::$app->response->redirect(yii\helpers\Url::to('/'.$lang->slug));
        } else {
            $lang = $language->find()->where(['slug' => $langSlug])->one();
            Yii::$app->params['language'] = $lang;
            Yii::$app->language = $lang->slug;
        }


        Yii::$app->params['menu'] = Pages::findMainMenu();
        Yii::$app->params['social'] = Mainpage::getPage();


    }
}