<?php
namespace common\widgets;


use app\modules\contacts\models\contacts\Contacts;
use common\models\Fields;
use common\models\Messages;
use common\models\translationtables\Cultures;
use common\models\translationtables\Threats;
use common\models\UserThreat;
use yii\helpers\Url;
use yii\widgets\ActiveForm;


class Fieldeditform extends \yii\base\Widget
{
    public function run()
    {

        $model_feedback = new Fields();

        $message = '';


        if ($model_feedback->load(\Yii::$app->request->post()) && $model_feedback->validate()) {

           if (!\yii::$app->user->isGuest) {
               $model_feedback->user_id = \yii::$app->user->id;


             if (!empty($model_feedback->field_id)) {

                 $newfields = new Fields();
                 $field = $newfields->find()->where(['id' => $model_feedback->field_id])->one();
                 if (!empty($field)){
                     $field->sfield = $model_feedback->sfield;
                     $field->name = $model_feedback->name;
                     $field->culture_id = $model_feedback->culture_id ;
                     $field->area_pid = $model_feedback->area_pid ;
                     $field->region_pid = $model_feedback->region_pid ;
                     $field->station1_id = $model_feedback->station1_id ;
                     $field->station2_id = $model_feedback->station2_id ;
                     $field->station3_id = $model_feedback->station3_id ;
                     $field->latitude = $model_feedback->latitude ;
                     $field->longitude = $model_feedback->longitude ;
                     if ($field->validate()){
                         $field->save();

                     }

                 }


             }else {


                 $saved =  $model_feedback->save();

                 if ($saved){

                     $userid = \yii::$app->user->id;
                     $cultureid = $model_feedback->culture_id;
                     $culture = Cultures::find()->where(['visible'=> true, 'id' => $cultureid])->one();

                     $c_threats = Threats::find()->where(['visible'=> true, 'culture_id' => $cultureid])->all();

                     foreach ($c_threats as $c_threat){

                         $u_threat = new UserThreat();

                         $u_threat->user_id = $userid;
                         $u_threat->field_id = $model_feedback->id;
                         $u_threat->threat_id = $c_threat->id;
                         if (!empty($c_threat->default_percent)){
                             $u_threat->warning_level = $c_threat->default_percent;}
                         else if (!empty($culture->default_percent)){
                             $u_threat->warning_level = $culture->default_percent;}
                         else {

                             $u_threat->warning_level = 50;}

                         $u_threat->time_to_mail = 9;
                         $u_threat->time2 = 18;
                         $u_threat->via_sms = 0;
                         $u_threat->save();

                     }



                 }
             }
               //  $contacts = Contacts::getPage();


             //  $message = \Yii::t('new-field-form', 'Поле успешно добавлено');

                   \Yii::$app->response->redirect(Url::toRoute(['/' . \yii::$app->language . '/cabinet','nas' => '1']));


           }else{
              // $message = \Yii::t('new-field-form', 'Что-бы добавить поле нужно зарегистрироваться.');
           }

            //\Yii::$app->session->setFlash('message','Success subscribe');
             //\Yii::$app->controller->redirect("/");


        }

        return $this->render('fieldform', ['model_feedback' => $model_feedback, 'message' => $message]);


    }

}
