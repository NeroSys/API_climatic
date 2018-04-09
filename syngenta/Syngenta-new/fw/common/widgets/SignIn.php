<?php
namespace common\widgets;


use app\modules\contacts\models\contacts\Contacts;
use common\models\DynamicParams;
use common\models\LoginForm;
use common\models\Messages;
use common\models\translationtables\UserParams;
use common\models\User;
use common\models\UserParamsValue;

use yii\base\DynamicModel;
use yii\helpers\Url;


class SignIn extends \yii\base\Widget
{
    public function run()
    {
        $model = new LoginForm();

        $current_user=\Yii::$app->user->id;
        \Yii::$app->session['userView'.$current_user.'returnURL']=\Yii::$app->request->Url;

        if ($model->load(\Yii::$app->request->post()) && $model->login()){

           // $cont = new \yii\web\Controller;
           // $cont->goHome();
             \Yii::$app->response->redirect(\Yii::$app->session['userView'.$current_user.'returnURL']);

        }

        return $this->render('signin',['model'=>$model]);



    }




}

