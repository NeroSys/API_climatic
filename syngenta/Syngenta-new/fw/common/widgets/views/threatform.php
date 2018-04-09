








<?php
use \yii\widgets\ActiveForm;

$form = ActiveForm::begin([
'enableAjaxValidation' => true,
    'enableClientValidation'=>false,
'validationUrl' => \yii\helpers\Url::toRoute('/'.\Yii::$app->language.'/cabinet/validate/threat-validate'),
'options' => [
'name'=> "notifyings",
'class' => 'set-notifyings set-notifyings_bg_grey',
'id' => "notifyings_1"
]

]);
?>

    <h2 class="set-notifyings__title"><?=\Yii::t('cabinet-threat-form', 'Нове повідомлення')?></h2>

    <div class="set-notifyings__filter-form">
        <div class="filter-form">
            <ul class="list-filter">
                <li class="list-filter__item">
                    <div id="select-block_28" class="select-block select-block_editor">

                        <?  $array_fields['hide'] = 'Поле';?>
                        <?php  $newfields = new \common\models\Fields();
                        $fid = \yii::$app->request->get('fid');
                        //$model_feedback->field_id = $fid;

                        $list = $newfields->find()->where(['user_id' => \yii::$app->user->id])->all();



                        foreach ($list as $item){
                            $array_fields[$item->id] = $item->name;
                        }
                        ?>
                        <?= $form->field($model_feedback, 'field_id')->dropDownList($array_fields,['class'=>"select select-hidden"])->label(false); ?>





                    </div>
                </li>
                <li class="list-filter__item">
                    <div id="select-block_29" class="select-block select-block_editor select-block_disabled">
                        <select name="cultures" disabled="disabled" class="select select-hidden">
                            <option value="hide">Культура</option>

                        </select>

                    </div>
                </li>
                <li class="list-filter__item">
                    <div id="select-block_30" class="select-block select-block_editor">
                        <?  $array_threats['hide'] = \Yii::t('cabinet-threat-form', 'Угроза') ;?>
                        <?= $form->field($model_feedback, 'threat_id')->dropDownList($array_threats,['class'=>"select select-hidden",'nameh'=>"dangers"])->label(false); ?>



                    </div>
                </li>
                <li class="list-filter__item"><a href="#" class="btn btn_filter_reset">Сброс всех селекторов</a></li>
            </ul>
        </div>
    </div>


    <div class="set-notifyings__form-notify">
        <div class="form-notify">
            <div class="form-notify__table form-notify__table_1">
                <h1 class="form-notify__table-title"><?=\Yii::t('cabinet-threat-form', 'Уровень угрозы')?></h1>
                <table class="danger-level">
                    <tbody><tr>
                    </tr>
                    <tr>
                        <td> <span><?=\Yii::t('cabinet-threat-form', 'Более')?></span></td>
                        <td>
                            <div id="select-block_33" class="select-block">

                                <?  $array_percents['hide'] =  \Yii::t('cabinet-threat-form', 'Уровень');
                                $array_percents['10'] = '10';
                                $array_percents['20'] = '20';
                                $array_percents['30'] = '30';
                                $array_percents['40'] = '40';
                                $array_percents['50'] = '50';
                                $array_percents['60'] = '60';
                                $array_percents['70'] = '70';
                                $array_percents['80'] = '80';
                                $array_percents['90'] = '90';

                                ?>
                                <?= $form->field($model_feedback, 'warning_level')->dropDownList($array_percents,['class'=>"select select-hidden",'nameh'=>"persent"])->label(false); ?>



                            </div>
                        </td>
                        <td>
                            <div id="select-block_34" class="select-block">
                                <?  $array_notify['hide'] = \Yii::t('cabinet-threat-form', 'Тип оповещения') ;
                                $array_notify['0'] = \Yii::t('cabinet-threat-form', 'E-mail оповещение');
                                $array_notify['1'] = \Yii::t('cabinet-threat-form', 'SMS оповещение');


                                ?>
                                <?= $form->field($model_feedback, 'via_sms')->dropDownList($array_notify,['class'=>"select select-hidden",'nameh'=>"notify"])->label(false); ?>



                            </div>
                        </td>
                    </tr>
                    </tbody></table>
            </div>


           <!-- <div style="display:none" class="form-notify__table form-notify__table_2">
                <h1 class="form-notify__table-title">Частота</h1>
                <table class="frequency">
                    <tbody><tr>
                        <td>
                            <div  class="select-block">

                                <?/*  $array_count['hide'] = 'Частота';
                                $array_count['1'] = \Yii::t('cabinet-threat-form', 'Раз в день');
                                $array_count['2'] = \Yii::t('cabinet-threat-form', 'Раз в два дня');
                                $array_count['7'] = \Yii::t('cabinet-threat-form', 'Раз в неделю');
                                */?>

                                <?/*= $form->field($model_feedback, 'mail_interval')->dropDownList($array_count,['class'=>"select select-hidden",'nameh'=>"count"])->label(false); */?>


                            </div>
                        </td>
                    </tr>
                    </tbody></table>
            </div>-->


            <div class="form-notify__table form-notify__table_3">
                <h1 class="form-notify__table-title"><?=\Yii::t('cabinet-threat-form', 'Время');?></h1>
                <table class="time">
                    <tbody><tr>
                        <td>
                            <div id="select-block_39" class="select-block">



                                <?  $array_time['hide'] = '0 : 00';

                                for ($i= 0; $i<24; $i++) {
                                    $i1 =$i+1;
                                    $array_time[$i] = $i. ' : 00';
                                }

                                ?>

                                <?= $form->field($model_feedback, 'time_to_mail')->dropDownList($array_time,['class'=>"select select-hidden",'nameh'=>"time1"])->label(false); ?>




                            </div>
                        </td>
                        <td>
                            <div id="select-block_40" class="select-block">



                                <?  $array_time['hide'] = '0 : 00';

                                for ($i= 0; $i<24; $i++) {
                                    $i1 =$i+1;
                                    $array_time[$i] = $i. ' : 00';
                                }

                                ?>

                                <?= $form->field($model_feedback, 'time2')->dropDownList($array_time,['class'=>"select select-hidden",'nameh'=>"time2"])->label(false); ?>




                            </div>
                        </td>
                    </tr>
                    </tbody></table>
            </div>





        </div>
    </div>
    <div class="set-notifyings__send-button">

        <input type="submit" value="<?=\Yii::t('cabinet-threat-form', 'Задать уведомление');?>" class="btn btn_orange">

    </div>

<?php
ActiveForm::end();
?>

