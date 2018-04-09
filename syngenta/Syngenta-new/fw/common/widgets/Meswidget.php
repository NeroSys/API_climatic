<?php
namespace common\widgets;


use app\modules\contacts\models\contacts\Contacts;
use common\models\Messages;


class Meswidget extends \yii\base\Widget
{
    public function run()
    {

        $model_feedback = new Messages();

        $message = '';


        if ($model_feedback->load(\Yii::$app->request->post()) && $model_feedback->validate()) {
            $model_feedback->save();
          //  $contacts = Contacts::getPage();


            $message = \Yii::t('contacts', 'Ваше сообщение отправлено.');

            //\Yii::$app->session->setFlash('message','Success subscribe');
             //\Yii::$app->controller->redirect("/");


        }

        return $this->render('enquiry', ['model_feedback' => $model_feedback, 'message' => $message]);


    }

}
