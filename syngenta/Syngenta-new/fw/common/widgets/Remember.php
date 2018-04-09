<?php
namespace common\widgets;


use app\modules\contacts\models\contacts\Contacts;
use common\models\DynamicParams;
use common\models\Messages;
use common\models\RememberForm;
use common\models\translationtables\UserParams;
use common\models\User;
use common\models\UserParamsValue;
use yii\base\DynamicModel;
use yii\helpers\Url;
use yii\web\Controller;


class Remember extends \yii\base\Widget
{
    public function run()
    {
        $message = '';

       $model = new RememberForm();



        if ($model->load(\Yii::$app->request->post())  && $model->send()){

           // Controller::redirect(Url::toRoute(['/'.\yii::$app->language.'/main/validate/popup-remember']));
            \Yii::$app->response->redirect(Url::toRoute(['/'.\yii::$app->language.'/main/validate/popup-remember']));


        }


        return $this->render('remember',['model' =>$model, 'message' => $message]  );


    }



}

