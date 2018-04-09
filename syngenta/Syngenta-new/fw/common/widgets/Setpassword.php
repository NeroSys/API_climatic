<?php
namespace common\widgets;


use app\modules\contacts\models\contacts\Contacts;
use common\models\ChangepasswordForm;
use common\models\DynamicParams;
use common\models\Messages;
use common\models\translationtables\UserParams;
use common\models\User;
use common\models\UserParamsValue;
use yii\base\DynamicModel;
use yii\helpers\Url;


class Setpassword extends \yii\base\Widget
{
    public function run()
    {
        $message = '';
        $params =UserParams::getList();

        $model = new ChangepasswordForm();





        if ($model->load(\Yii::$app->request->post())  && $this->set_password($model)){

            $message = \Yii::t('set-password', 'Пароль был успешно обновлен.');

        }


        return $this->render('setpassword',['model' =>$model, 'message' => $message, 'params' => $params]  );


    }

    public function set_password($model)
    {
        if ($model->validate() && !\Yii::$app->user->isGuest) {

            $user = User::findByUsername(\Yii::$app->user->identity->username);

            $user->setPassword($model->password);
            $user->generateAuthKey();
            $user->removePasswordResetToken();
            if ($user->save()) {

                return true;
            }


        }

        return false;
    }

}

