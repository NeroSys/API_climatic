<?php
namespace common\widgets;



use common\models\Resumes;
use yii\web\UploadedFile;


class Vacwidget extends \yii\base\Widget
{
    public function run()
    {

        $model_feedback = new Resumes();

        $message = '';


        if ($model_feedback->load(\Yii::$app->request->post()) && $model_feedback->validate()) {

            if($model_feedback->save()) {

                $fileinsance = UploadedFile::getInstance($model_feedback, 'fileinfo');
                if ($fileinsance) {

                    $model_feedback->file = $model_feedback->saveFile($fileinsance);
                    $model_feedback->save();
                }


                //  $body = 'Имя'. $model_feedback->fio .'. ';
                //  $body .= 'Email:'.$model_feedback->email .'. ';
                //  $body .= 'текст:'.$model_feedback->text .'. ';

                //  $model_feedback->sendMail('werwer@tert.net','тест',$body);

                $message = 'Ваше резюме отправлено.';

                //\Yii::$app->session->setFlash('message','Success subscribe');
                //\Yii::$app->controller->redirect("/");
            }


        }

        return $this->render('vacancy', ['model_feedback' => $model_feedback, 'message' => $message]);


    }

}
