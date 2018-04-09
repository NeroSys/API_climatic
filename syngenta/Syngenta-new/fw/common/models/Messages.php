<?php

namespace common\models;

use app\modules\contacts\models\contacts\Contacts;
use Mailgun\Mailgun;
use Yii;
use yii\base\Model;



class Messages extends \yii\db\ActiveRecord
{


    public static function tableName()
    {
        return 'messages';
    }

    public function rules()
    {
        return [

            [['email','fio','text'], 'required'],
            [['email'], 'filter', 'filter' => 'trim'],
            [['email'], 'email'],



        ];
    }
    public function attributeLabels()
    {

        if (Yii::$app->language == 'uk'){
            Yii::$app->language = 'ua';
        }

        return [

            'fio' => Yii::t('contacts', 'ФИО'),
            'text' => Yii::t('contacts', 'Ваше сообщение'),
            'email' => 'E-mail',


        ];


    }

    public function afterSave(){


        $change = false;
        if (Yii::$app->language == 'uk') {
            Yii::$app->language = 'ua';
            $change = true;
        }

        /*$client = new \Http\Adapter\Guzzle6\Client();
        $mg = new Mailgun("key-3f4faaffd2974f3114896761168af101", $client);
        $domain = "sandbox5377dd21d19c4abeb5a097a2cd9d2fd1.mailgun.org";


        $mg->sendMessage($domain, array('from'    => 'bob@example.com',
            'to'      => 'gannucia@ukr.net',
            'subject' => 'The PHP SDK is awesome!',
          //  'text'    => 'It is so simple to send a message.',
            'html'    => '<html>HTML version <br>of the body</html>'));*/


            Yii::$app->mailer->compose('msg-contact-html', ['model' => $this])
                ->setFrom(['site@sproduccion.com' => 'site@sproduccion.com'])
                ->setTo([Contacts::getPage()->langData['send_to_email']->text => ''])
                ->setSubject(Yii::t('contacts', 'Сообщение с сайта'))
                ->send();


        /*$params ['version'] ="3.0";
        $params ['action'] = "sendSMS";
        $params ['key'] = '639d2ef8c7b72f9b1440d6cb387c67f0'; //you open key
        $params ['sender'] = "Syngenta";
        $params ['phone'] = '380676571760';
        $params ['text'] = '02.05-09.05 Максимальный уровень угрозы "Циркоспорозная пятнистость листьев" болеее "70" составлял: 02.05("71"), 06.05("94"), 07.05("80"), 08.05("100") Поле:"Хуторок1", Культура:"Кукуруза"';
        $params ['sms_lifetime'] = 0;
        $params ['datetime'] = '';

        ksort ($params);
        $sum='';
        foreach ($params as $k=>$v)
        $sum.=$v;
        $sum .= 'dd7a126822e8ad795d8860c7bca20028'; //your private key
        $control_sum =  md5($sum);

        $url = 'http://api.myatompark.com/sms/3.0/'.$params ['action'].'?key='.$params ['key'].'&sum='.$control_sum.'&sender='.$params ['sender'].'&text='.urlencode($params['text']).'&phone='.$params ['phone'].'&datetime='.$params ['datetime'].'&sms_lifetime='.$params ['sms_lifetime'];
        $result = file_get_contents($url);*/

       //  var_dump($result);
       // echo mb_strlen($params ['text']);
       // string(59) "{"error":"Wrong control sum.","code":"-2","result":"false"}"
       // die;


        if (Yii::$app->language == 'ua' && $change) {
            Yii::$app->language = 'uk';
        }

    }







}
