


<?php
use \yii\widgets\ActiveForm;

$form = ActiveForm::begin([
    'enableAjaxValidation' => true,
    'enableClientValidation'=>false,
    'validationUrl' => \yii\helpers\Url::toRoute('/'.\Yii::$app->language.'/cabinet/validate/threat-val'),
    'options' => [
        'name'=> "notifyings-edit",
        'class' => 'set-notifyings',
        'id' => "notifyings_2"
    ]

]);
?>


    <div class="set-notifyings__input">
        <label class="set-notifyings__inpu-label"></label>
        <?= $form->field($model_feedback, 'user_threat_id')->hiddenInput(['nameh'=>"notifyId"])->label(false)?>
        <?= $form->field($model_feedback, 'field_id')->hiddenInput(['nameh'=>"fieldId"])->label(false)?>
        <?= $form->field($model_feedback, 'threat_id')->hiddenInput(['nameh'=>"dangerId"])->label(false)?>

    </div>
    <div class="set-notifyings__form-notify">
        <div class="form-notify">
            <div class="form-notify__table form-notify__table_1">
                <h1 class="form-notify__table-title"><?=\Yii::t('cabinet-threat-form', 'Уровень угрозы')?> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<?=\Yii::t('cabinet-threat-form', 'Тип оповещения')?></h1>
                <table class="danger-level">
                    <tr>
                        <td> <span><?=\Yii::t('cabinet-threat-form', 'Более')?></span></td>
                        <td>
                            <div id="select-block_54" class="select-block">
                                <?  $array_percents['hide'] = \Yii::t('cabinet-threat-form', 'Уровень');
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
                            <div id="select-block_55" class="select-block">
                                <?  $array_notify['hide'] = \Yii::t('cabinet-threat-form', 'Тип оповещения') ;
                                $array_notify['0'] = \Yii::t('cabinet-threat-form', 'E-mail оповещение');
                                $array_notify['1'] = \Yii::t('cabinet-threat-form', 'SMS оповещение');


                                ?>
                                <?= $form->field($model_feedback, 'via_sms')->dropDownList($array_notify,['class'=>"select ",'nameh'=>"notify"])->label(false); ?>

                            </div>
                        </td>
                    </tr>
                </table>
            </div>
           <!-- <div style="display:none" class="form-notify__table form-notify__table_2">
                <h1 class="form-notify__table-title">Частота</h1>
                <table class="frequency">
                    <tr>
                        <td>
                            <div  class="select-block">
                                <?/*  $array_count['hide'] = 'Частота';
                                $array_count['1'] = \Yii::t('cabinet-threat-form', 'Раз в день');
                                $array_count['2'] = \Yii::t('cabinet-threat-form', 'Раз в два дня');
                                $array_count['7'] = \Yii::t('cabinet-threat-form', 'Раз в неделю');
                                */?>

                                <?/*= $form->field($model_feedback, 'mail_interval')->dropDownList($array_count,['class'=>"select ",'nameh'=>"count"])->label(false); */?>

                            </div>
                        </td>
                    </tr>
                </table>
            </div>-->
            <div class="form-notify__table form-notify__table_3">
                <h1 class="form-notify__table-title"><?=\Yii::t('cabinet-threat-form', 'Время');?></h1>
                <table class="time">
                    <tbody><tr>
                        <td>
                            <div id="select-block_57" class="select-block">



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
                            <div id="select-block_56" class="select-block">



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
            <?php if (!empty(\yii::$app->session->get('manager_id'))){ ?>


                    <div style="font-size: 15px;">
                        <table class="time">
                            <tbody><tr>
                         <td>
                             <?= $form->field($model_feedback, 'tomanager')->checkBox(['label'=>'Дублировать'])->label(false); ?>
                        </td>

                        </tr>
                        </tbody></table>

                    </div>

            <?php } ?>


        </div>
    </div>
    <div class="set-notifyings__send-button">
        <input type="submit" value="<?=\Yii::t('cabinet-threat-form', 'Сохранить');?>" class="btn btn_orange"/>
    </div>
<?php
ActiveForm::end();
?>

