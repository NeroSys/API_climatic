<?php
namespace common\widgets;


use app\modules\contacts\models\contacts\Contacts;
use common\models\DynamicParams;
use common\models\Messages;
use common\models\translationtables\UserParams;
use common\models\User;
use common\models\UserParamsValue;
use yii\base\DynamicModel;
use yii\helpers\Url;
use Yii;


class Edit extends \yii\base\Widget
{
    public function run()
    {
        $message = '';
        $params =UserParams::getList();






        foreach ($params as $param){
            if (!($param->name == 'password' || $param->name == 'repassword' || $param->name == 'email' || $param->name == 'area' || $param->name == 'region')) {
                $data[] = $param->name;
            }


        }

        $model = new DynamicParams($data);




        foreach ($params as $param){
            if (!($param->name == 'password' || $param->name == 'repassword' || $param->name == 'email' || $param->name == 'area' || $param->name == 'region')) {
                $safe = true;

                if ($param->name == 'edrpou'){
                    $model->addRule('edrpou', 'string', ['min' => 8, 'max'=>8]);
                }
                if ($param->name == 'phone'){
                    $model->addRule('phone', 'string', ['min' => 12, 'max'=>12]);
                }

                if ($param->required) {
                    $safe = false;

                    $model->addRule($param->name, 'required');
                    if ($param->name == 'edrpou'){

                    }
                }
                if ($param->unique_param) {
                    $safe = false;

                    if ($param->name == 'email'){
                        $model->addRule('email', 'unique', ['targetAttribute' => 'username','targetClass' => '\common\models\User']);
                    } else {
                        $model->addRule($param->name, 'UniqueParam');
                    }
                }
                if ($param->email) {
                    $safe = false;

                    $model->addRule($param->name, 'filter', ['filter' => 'trim']);

                    $model->addRule($param->name, 'email');
                }
                if ($param->is_number) {
                    $safe = false;


                    $change = false; if (Yii::$app->language == 'uk') { Yii::$app->language = 'ua'; $change = true;}

                    $model->addRule($param->name, 'integer',['message' => \Yii::t('register', 'Ошибка')]);

                    if (Yii::$app->language == 'ua' && $change) { Yii::$app->language = 'uk';}
                }

                if ($safe) {
                    $model->addRule($param->name, 'safe');
                }

                $param_value = new UserParamsValue();
                $user_param_value = $param_value->find()
                    ->where(['user_param_id' => $param->id])
                    ->andWhere(['user_id' => \yii::$app->user->id])
                    ->one();

                if (!empty($user_param_value)) {
                    $name = $param->name;
                    $model->$name = $user_param_value->value;
                }
            }


        }










        if ($model->load(\Yii::$app->request->post())  && $this->signup($model,$params)){

            $message = \Yii::t('edit-user-params', 'Изменения были успешно внесены.') ;
            // Yii::$app->session->setFlash('successregister','Вы успешно зарегистрированы');

            //  return $this->redirect(['/']);
        }


        return $this->render('edit',['model' =>$model, 'message' => $message, 'params' => $params]  );


    }

    public function signup($model,$params)
    {
        if ($model->validate()) {

            $user = User::findByUsername(\yii::$app->user->identity->username);
           // $user->username = $model->email;
            $user->email = $model->sendemail;
            /*$user->setPassword($model->password);

            $user->generateAuthKey();

            $user->activation_key = sha1(mt_rand(10000, 1000000).mt_rand(50, 1000000));

            $auth = \Yii::$app->getSession()->get('user_eauth_id');
            if ($auth){


                $socialname = key($auth);
                $user->$socialname = $auth[key($auth)];
            }*/

            $flag1 = $user->save();

          //  $activation_url = Url::toRoute(['/'.\yii::$app->language.'/main/validate/mail','socket'=> $user->id,'key' => $user->activation_key],true);


            $flag2 = true;
            foreach ($params as $param){
                if (!($param->name == 'password' || $param->name == 'repassword' || $param->name == 'email' || $param->name == 'area' || $param->name == 'region')) {
                    $param_value1 = new UserParamsValue();
                    $param_value = $param_value1->find()

                        ->where(['user_param_id' => $param->id])
                        ->andWhere(['user_id' => \yii::$app->user->id])
                        ->one();

               /* $param_value->user_id = $user->id;
                $param_value->user_param_id =$param->id;*/
                   if (!empty($param_value)){
                    $name = $param->name;
                $param_value->value = $model->$name;
                   } else{
                       $param_value = new UserParamsValue();
                       $param_value->user_id = \yii::$app->user->id;
                       $param_value->user_param_id =$param->id;
                       $name = $param->name;
                       $param_value->value = $model->$name;
                   }

                $flag2 = $flag2 && $param_value->save();
               }
            }

/*
           $flag3 = \Yii::$app->mailer->compose('activation', ['activation_url'=>$activation_url])
                ->setFrom(['site@sproduccion.com' => 'site@sproduccion.com'])
                ->setTo([$user->email => ''])
                ->setSubject('Активация учетной записи Syngenta')
                ->send();*/

            $flag3= true;

            if ($flag1  && $flag2 && $flag3) {
                return true;
            }


        }

        return false;
    }

}

