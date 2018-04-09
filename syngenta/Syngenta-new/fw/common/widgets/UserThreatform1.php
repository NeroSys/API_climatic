<?php
namespace common\widgets;


use app\modules\contacts\models\contacts\Contacts;
use common\models\Fields;
use common\models\Messages;
use common\models\UserThreat1;
use yii\helpers\Url;


class UserThreatform1 extends \yii\base\Widget
{
    public function run()
    {

        $model_feedback = new UserThreat1();

        $message = '';


        if ($model_feedback->load(\Yii::$app->request->post()) && $model_feedback->validate()) {
            if (!empty($model_feedback->user_threat_id)) {
                if (!\yii::$app->user->isGuest) {
                    $model_feedback->user_id = \yii::$app->user->id;

                        $newthreats = new UserThreat1();
                        $threat = $newthreats->find()->where(['id' => $model_feedback->user_threat_id])->one();
                        if (!empty($threat)) {
                            $threat->user_id = $model_feedback->user_id;
                            $threat->field_id = $model_feedback->field_id;
                            $threat->threat_id = $model_feedback->threat_id;
                            $threat->warning_level = $model_feedback->warning_level;
                            $threat->mail_interval = $model_feedback->mail_interval;
                            $threat->time_to_mail = $model_feedback->time_to_mail;
                            $threat->time2 = $model_feedback->time2;
                            $threat->via_sms = $model_feedback->via_sms;


                            if ($threat->validate()) {

                                if (!empty(\yii::$app->session->get('manager_id'))){
                                if ($model_feedback->tomanager == true){
                                    $threat->manager_id = \yii::$app->session->get('manager_id');

                                } else {
                                    $threat->manager_id = null;
                                }
                                }
                                $threat->save();
                            }

                        }



                    //  $contacts = Contacts::getPage();


                    // $message = \Yii::t('new-threat-form', 'Разсылка успешно добавлена');

                    \Yii::$app->response->redirect(Url::toRoute(['/' . \yii::$app->language . '/cabinet','nas' => '1']));


                }

                //\Yii::$app->session->setFlash('message','Success subscribe');
                //\Yii::$app->controller->redirect("/");

            }
        }

        return $this->render('threatform1', ['model_feedback' => $model_feedback, 'message' => $message]);


    }

}
