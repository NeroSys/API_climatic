<?php
namespace common\widgets;


use app\modules\contacts\models\contacts\Contacts;
use common\models\Fields;
use common\models\Messages;
use common\models\UserThreat;
use yii\helpers\Url;


class UserThreatform extends \yii\base\Widget
{
    public function run()
    {

        $model_feedback = new UserThreat();

        $message = '';


        if ($model_feedback->load(\Yii::$app->request->post()) && $model_feedback->validate()) {
            if (empty($model_feedback->user_threat_id)) {
                if (!\yii::$app->user->isGuest) {
                    $model_feedback->user_id = \yii::$app->user->id;
                    if ($model_feedback->via_sms != 1){
                        $model_feedback->time_to_mail = 9;
                        $model_feedback->time2 =  18;
                    }

                        $model_feedback->save();



                    \Yii::$app->response->redirect(Url::toRoute(['/' . \yii::$app->language . '/cabinet','nas' => '1']));


                }



            }
        }

        return $this->render('threatform', ['model_feedback' => $model_feedback, 'message' => $message]);


    }

}
