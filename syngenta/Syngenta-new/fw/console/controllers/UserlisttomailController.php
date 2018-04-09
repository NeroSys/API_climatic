<?

namespace console\controllers;




use common\models\Fields;
use common\models\Language;
use common\models\Mail;
use common\models\StationsThreats;
use common\models\translationtables\Cultures;
use common\models\translationtables\Stations;
use common\models\translationtables\Threats;
use common\models\User;
use common\models\UserParamsValue;
use common\models\UsersThreatsList;
use common\models\UserThreat;
use Mailgun\Mailgun;

class UserlisttomailController extends \yii\console\Controller{





    public function actionIndex(){

        date_default_timezone_set("Europe/Kiev");

        UsersThreatsList::deleteAll('`created_at` < :close_date', [':close_date' => date("Y-m-d H:i:s", time() - 10*24*60*60-300)]);


        /*$client = new \Http\Adapter\Guzzle6\Client();
            $mg = new Mailgun("key-3f4faaffd2974f3114896761168af101", $client);
            $domain = "sandbox5377dd21d19c4abeb5a097a2cd9d2fd1.mailgun.org";


            $mg->sendMessage($domain, array('from'    => 'bob@example.com',
                'to'      => 'gannucia@ukr.net',
                'subject' => 'The PHP SDK is awesome!',
                'text'    => 'It is so simple to send a message.'));*/


        /*$params ['version'] ="3.0";
        $params ['action'] = "sendSMS";
        $params ['key'] = '639d2ef8c7b72f9b1440d6cb387c67f0'; //you open key
        $params ['sender'] = "Syngenta";
        $params ['phone'] = '380505153802';
        $params ['text'] = '02.05-09.05 Максимальный уровень угрозы "Циркоспорозная пятнистость листьев" болеее "80" составлял: 06.05("94"), 07.05("81"), 08.05("100") Поле:"Хуторок1", Культура:"Кукуруза"';
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


        $newuser_conditions = new UserThreat();

        $user_conditions = $newuser_conditions->find()->all();

        foreach ($user_conditions as $user_condition ){

            $newuser_field = new Fields();

            $user_field = $newuser_field->find()->where(['id' => $user_condition->field_id])->one();

            $newthreats = new StationsThreats();

            $threat = $newthreats->find()->where(['threat_id' => $user_condition->threat_id ])
                ->andWhere(['threat_id' => $user_condition->threat_id ])
                ->andWhere(['station_id' => [$user_field->station1_id,$user_field->station2_id,$user_field->station3_id] ])
                ->andWhere(['old' => 0 ])
                ->andWhere('`value` > :val', [':val' => $user_condition->warning_level])
                ->orderBy('value DESC')
                ->one();

            $all_threats = $newthreats->find()->where(['threat_id' => $user_condition->threat_id ])
                ->andWhere(['threat_id' => $user_condition->threat_id ])
                ->andWhere(['station_id' => [$user_field->station1_id,$user_field->station2_id,$user_field->station3_id] ])
                ->andWhere(['old' => 0 ])
                ->andWhere('`value` >= :val', [':val' => 0])
                ->orderBy('value DESC')
                ->all();





            if (!empty($threat)){

                $newthreat12 = new Threats();

                $threat_sens = $newthreat12->find()->where(['id' => $threat->threat_id])->one();

                $newusersthreatslist = new UsersThreatsList();

                $usersthreat = $newusersthreatslist->find()->where(['user_threat_id' => $user_condition->id])
                    ->andWhere('`created_at` > :close_date', [':close_date' => date('Y-m-d H:i:s',time()-$threat_sens->send_sensitivity*24*60*60)])
                    ->andWhere(['is_key' => true])
                ->one();

                if (!empty($usersthreat)) {

                    $newusersthreatslist1 = new UsersThreatsList();

                    $usersthreat1 = $newusersthreatslist1->find()->where(['user_threat_id' => $user_condition->id])

                        ->andWhere(['to_send' => true])
                        ->orderBy('`created_at` DESC')
                        ->one();


                    if ($usersthreat1->threat_value < $threat->value ){
                    $newthreat = new UsersThreatsList();
                    $newthreat->threat_value  = $threat->value;

                        $newthreat->user_threat_id = $user_condition->id;
                        $newthreat->is_key = 0;
                        $newthreat->to_send = 1;

                        $newthreat->station_id = $threat->station_id;
                        $newthreat->threat_id = $threat->threat_id;
                        $newthreat->field_id = $user_condition->field_id;
                        $newthreat->culture_id = $user_field->culture_id;
                        $newthreat->user_id = $user_condition->user_id;
                        $st_i = 1;
                        foreach ($all_threats as $thre){

                            $name_id = 'station'.$st_i.'_id';
                            $name_value = 'station'.$st_i.'_value';
                            $name_distance = 'station'.$st_i.'_distance';
                            $newthreat->$name_id = $thre->station_id;
                            $newthreat->$name_value = $thre->value;

                            $new_station = new Stations();

                            $station = $new_station->find()->where(['id' => $thre->station_id])->one();

                            $R = 6371;
                            $f1 = deg2rad(floatval($user_field->latitude));
                            $f2 = deg2rad(floatval($station->latitude));
                            $df = deg2rad(floatval($station->latitude-$user_field->latitude));
                            $dl = deg2rad(floatval($station->longitude-$user_field->longitude));

                            $a = sin($df/2) * sin($df/2) +
                                cos($f1) * cos($f2) *
                                sin($dl/2) * sin($dl/2);
                            $c = 2 * atan2(sqrt($a), sqrt(1-$a));

                            $distance  = $R * $c;


                            $newthreat->$name_distance = $distance;
                            $st_i++;
                        }


                        $newthreat->save();

                        if (!($user_condition->via_sms == true) ) {

                            $this->SendViaMail($user_condition, $threat->value, false);

                        } else  if ($user_condition->time_to_mail < date('H', time()) && $user_condition->time2 > date('H', time())) {


                            $this->SendViaMail($user_condition, $threat->value, true);

                        }
                    }
                    else {
                        $newthreat = new UsersThreatsList();
                        $newthreat->threat_value  = $threat->value;

                        $newthreat->user_threat_id = $user_condition->id;
                        $newthreat->is_key = 0;
                        $newthreat->to_send = 0;

                        $newthreat->station_id = $threat->station_id;
                        $newthreat->threat_id = $threat->threat_id;
                        $newthreat->field_id = $user_condition->field_id;
                        $newthreat->culture_id = $user_field->culture_id;
                        $newthreat->user_id = $user_condition->user_id;
                        $st_i = 1;
                        foreach ($all_threats as $thre){

                            $name_id = 'station'.$st_i.'_id';
                            $name_value = 'station'.$st_i.'_value';
                            $name_distance = 'station'.$st_i.'_distance';
                            $newthreat->$name_id = $thre->station_id;
                            $newthreat->$name_value = $thre->value;

                            $new_station = new Stations();

                            $station = $new_station->find()->where(['id' => $thre->station_id])->one();


                            $R = 6371;
                            $f1 = deg2rad(floatval($user_field->latitude));
                            $f2 = deg2rad(floatval($station->latitude));
                            $df = deg2rad(floatval($station->latitude-$user_field->latitude));
                            $dl = deg2rad(floatval($station->longitude-$user_field->longitude));

                            $a = sin($df/2) * sin($df/2) +
                                cos($f1) * cos($f2) *
                                sin($dl/2) * sin($dl/2);
                            $c = 2 * atan2(sqrt($a), sqrt(1-$a));

                            $distance  = $R * $c;

                            $newthreat->$name_distance = $distance;
                            $st_i++;
                        }


                        $newthreat->save();



                    }

                } else {
                    $newthreat = new UsersThreatsList();
                    $newthreat->threat_value  = $threat->value;

                    $newthreat->user_threat_id = $user_condition->id;
                    $newthreat->is_key = 1;
                    $newthreat->to_send = 1;

                    $newthreat->station_id = $threat->station_id;
                    $newthreat->threat_id = $threat->threat_id;
                    $newthreat->field_id = $user_condition->field_id;
                    $newthreat->culture_id = $user_field->culture_id;
                    $newthreat->user_id = $user_condition->user_id;
                    $st_i = 1;
                    foreach ($all_threats as $thre){

                        $name_id = 'station'.$st_i.'_id';
                        $name_value = 'station'.$st_i.'_value';
                        $name_distance = 'station'.$st_i.'_distance';
                        $newthreat->$name_id = $thre->station_id;
                        $newthreat->$name_value = $thre->value;

                        $new_station = new Stations();

                        $station = $new_station->find()->where(['id' => $thre->station_id])->one();

                         $R = 6371;
                         $f1 = deg2rad(floatval($user_field->latitude));
                         $f2 = deg2rad(floatval($station->latitude));
                         $df = deg2rad(floatval($station->latitude-$user_field->latitude));
                        $dl = deg2rad(floatval($station->longitude-$user_field->longitude));

                        $a = sin($df/2) * sin($df/2) +
                            cos($f1) * cos($f2) *
                            sin($dl/2) * sin($dl/2);
                        $c = 2 * atan2(sqrt($a), sqrt(1-$a));

                        $distance  = $R * $c;



                       // $distance = 6371*acos(sin(deg2rad(floatval($user_field->longitude)))*sin(deg2rad(floatval($station->longitude))) + cos(deg2rad(floatval($user_field->longitude)))*cos(deg2rad(floatval($station->longitude)))*cos(deg2rad(floatval($user_field->latitude)) - deg2rad(floatval($station->latitude))));
                        $newthreat->$name_distance = $distance;
                        $st_i++;
                    }


                    $newthreat->save();

                    if (!($user_condition->via_sms == true) ) {

                        $this->SendViaMail($user_condition, $threat->value, false);

                    } else

                    if ($user_condition->time_to_mail < date('H', time()) && $user_condition->time2 > date('H', time())) {


                            $this->SendViaMail($user_condition, $threat->value, true);

                    }


                }


            }

            if ( $user_condition->via_sms == true ) {



                if ($user_condition->time_to_mail == date('H', time())) {
                    $newusersthreatslistsms = new UsersThreatsList();

                    $usersthreatsms = $newusersthreatslistsms->find()->where(['user_threat_id' => $user_condition->id])
                        ->andWhere('`created_at` > :close_date', [':close_date' => date('Y-m-d H:i:s', time() - (24-$user_condition->time2+$user_condition->time_to_mail) * 60 * 60 -10*60)])
                        ->andWhere(['to_send' => true])
                        ->orderBy('threat_value DESC')

                        ->one();

                    if (!empty($usersthreatsms)) {


                        $this->SendViaMail($user_condition, $usersthreatsms->threat_value, true);
                    }
                }

            }



        }

    }


    /**
     * @param $user_condition
     * @param $threat
     * @param bool $via_sms
     * @throws \Mailgun\Messages\Exceptions\MissingRequiredMIMEParameters
     */
    public function SendViaMail($user_condition,$threat_val, $via_sms = false){

        $newuser = new User();

        $user = $newuser->find()->where(['id' => $user_condition->user_id])->one();

        $newusermaillang = new UserParamsValue();

        $user_maillang = $newusermaillang->find()->where(['user_param_id' => 13])->andWhere(['user_id' => $user->id])->one();

        $newusername = new UserParamsValue();

        $user_name = $newusername->find()->where(['user_param_id' => 6])->andWhere(['user_id' => $user->id])->one();


        $language = new Language();

        $deflang = $language->find()->where(['default_lang' => true])->one();

        if (empty($user_maillang)){

            \Yii::$app->params['language'] = $deflang;
            \Yii::$app->language = $deflang->slug;

        } else {
            $language1 = new Language();

            $userlang = $language1->find()->where(['id' => $user_maillang->value])->one();

            \Yii::$app->params['language'] = $userlang;
            \Yii::$app->language = $userlang->slug;

        }



        $newuser_field = new Fields();

        $user_field = $newuser_field->find()->where(['id' => $user_condition->field_id])->one();

        $newuser_culture = new Cultures();

        $user_culture = $newuser_culture->find()->where(['id' => $user_field->culture_id])->one();

        $newuser_threat = new Threats();

        $user_threat = $newuser_threat->find()->where(['id' => $user_condition->threat_id])->one();



        $newuserphone = new UserParamsValue();

        $user_phone = $newuserphone->find()->where(['user_param_id' => '12'])->andWhere(['user_id' => $user->id])->one();

        $newrcns = new \common\models\translationtables\Recommendations();
        $rcn =  $newrcns->find()
            ->where(['threat_id' => $user_condition->threat_id])
            ->andWhere('`max_level` >= :level1', [':level1' => $threat_val])
            ->andWhere('`min_level` < :level2', [':level2' => $threat_val])
            ->andWhere(['visible' => true])
            ->one();


        if ($via_sms){

          $sms_text =  Mail::getText()->langData['text-sms']->text;

            $sms_text = str_replace('{{field}}',$user_field->name,$sms_text);
            $sms_text = str_replace('{{culture}}',$user_culture->langData['name'],$sms_text);
            $sms_text = str_replace('{{threat}}',$user_threat->langData['name'],$sms_text);
            $sms_text = str_replace('{{value}}',$threat_val ,$sms_text);
          
            $sms_text = str_replace('{{user}}',$user_name->value ,$sms_text);
            $sms_text = str_replace('{{user_value}}',$user_condition->warning_level ,$sms_text);
            $sms_text = str_replace('{{description}}',$user_threat->langData['description'] ,$sms_text);
            $sms_text = str_replace('{{recommendation}}', !empty($rcn) ?  $rcn->langData['description'] : '' ,$sms_text);






            if (!empty($user_phone) ) {
                $params ['version'] = "3.0";
                $params ['action'] = "sendSMS";
                $params ['key'] = '639d2ef8c7b72f9b1440d6cb387c67f0'; //you open key
                $params ['sender'] = "Syngenta";
                $params ['phone'] = $user_phone->value;
                $params ['text'] = $sms_text ;
                $params ['sms_lifetime'] = 0;
                $params ['datetime'] = '';

                ksort($params);
                $sum = '';
                foreach ($params as $k => $v)
                    $sum .= $v;
                $sum .= 'dd7a126822e8ad795d8860c7bca20028'; //your private key
                $control_sum = md5($sum);

                $url = 'http://api.myatompark.com/sms/3.0/' . $params ['action'] . '?key=' . $params ['key'] . '&sum=' . $control_sum . '&sender=' . $params ['sender'] . '&text=' . urlencode($params['text']) . '&phone=' . $params ['phone'] . '&datetime=' . $params ['datetime'] . '&sms_lifetime=' . $params ['sms_lifetime'];
                $result = file_get_contents($url);
            }

        }else {

            $email_text =  Mail::getText()->langData['text-mail']->text;

            $email_text = str_replace('{{field}}',$user_field->name,$email_text);
            $email_text = str_replace('{{culture}}',$user_culture->langData['name'],$email_text);
            $email_text = str_replace('{{threat}}',$user_threat->langData['name'],$email_text);
            $email_text = str_replace('{{value}}',$threat_val ,$email_text);

           $email_text = str_replace('{{user}}',$user_name->value ,$email_text);
            $email_text = str_replace('{{user_value}}',$user_condition->warning_level ,$email_text);
            $email_text = str_replace('{{description}}',$user_threat->langData['description'] ,$email_text);
            $email_text = str_replace('{{recommendation}}', !empty($rcn) ?  $rcn->langData['description'] : '' ,$email_text);

            $title_text =  Mail::getText()->langData['text-mail-title']->text;

            $title_text = str_replace('{{field}}',$user_field->name,$title_text);
            $title_text = str_replace('{{culture}}',$user_culture->langData['name'],$title_text);
            $title_text = str_replace('{{threat}}',$user_threat->langData['name'],$title_text);
            $title_text = str_replace('{{value}}',$threat_val ,$title_text);

            $title_text = str_replace('{{user}}',$user_name->value ,$title_text);
            $title_text = str_replace('{{user_value}}',$user_condition->warning_level ,$title_text);
            $title_text = str_replace('{{description}}',$user_threat->langData['description'] ,$title_text);
            $title_text = str_replace('{{recommendation}}', !empty($rcn) ?  $rcn->langData['description'] : '' ,$title_text);
            
            $client = new \Http\Adapter\Guzzle6\Client();
            $mg = new Mailgun("key-3f4faaffd2974f3114896761168af101", $client);
            $domain = "sandbox5377dd21d19c4abeb5a097a2cd9d2fd1.mailgun.org";


            $mg->sendMessage($domain, array('from' => Mail::getText()->langData['text-mail-from']->text,
                'to' => $user->email,
                'subject' => $title_text,
                'html' => $email_text));
        }

    }
}