




<?php
use \yii\widgets\ActiveForm;
// use \Yii;



$form = ActiveForm::begin([
    'enableAjaxValidation' => true,
    'enableClientValidation'=>false,
    'validationUrl' => \yii\helpers\Url::toRoute('/'.\Yii::$app->language.'/forecast/validate/field-validate'),
    'options' => [
        'name'=> "form-feild",
        'class' => 'form-feild',
        'id' => "form-feild_1"
    ]

]);
?>



<?/* if ($message){ */?><!--


    <div class="form-popup show">
        <div class="form-popup__inner"><span class="form-popup__text"><?/*=$message*/?></span><span class="form-popup__close-btn"><i class="icon-syngenta icon-syngenta_18"></i></span></div>
    </div>


<?/*}*/?>

-->
 <div class="form-feild__hidden-input">
     <?= $form->field($model_feedback, 'field_id')->hiddenInput(['nameh'=>"fieldId"])->label(false)?>


 </div>

<?php if (empty($model_feedback->field_id)){ ?>
    <div class="form-feild__title">
        <h1 class="title title_form-field"><?=Yii::t('new-field-form', 'Новое поле')?> </h1>
    </div>
<?php } else { ?>
    <div class="form-feild__title">
        <h1 class="title title_form-field"><?=Yii::t('new-field-form', 'Поле')?> </h1>
    </div>

<?php }?>
    <div class="form-feild__group">
    <label class="form-feild__label"><?=Yii::t('new-field-form', 'Имя поля')?>*</label><span class="form-field__input">
                 <?=$form->field($model_feedback,'name')->textInput(['class'=>"input input_name"])->label(false) ?>

        </span>

      </div>
    <div class="form-feild__group">
    <label class="form-feild__label"><?=Yii::t('new-field-form', 'Площадь поля (га)')?></label><span class="form-field__input">
                 <?=$form->field($model_feedback,'sfield')->textInput(['class'=>"input input_name"])->label(false) ?>

        </span>

    </div>
    <div class="form-feild__tabs">
        <div id="tabs_1" class="tabs">
            <ul class="tabs__controls">
                <li class="tabs__controls-item active"><a href="#" class="tabs__controls-link"><?=Yii::t('new-field-form', 'Настройки поля')?></a></li>
            </ul>
            <ul class="tabs__content">
                <li class="tabs__content-item active">
                    <div class="form-feild__group form-feild__group_inline">
                        <label class="form-feild__label"><?=Yii::t('new-field-form', 'Широта')?>*</label><span class="form-field__input">

                            <?=$form->field($model_feedback,'latitude')->textInput(['class'=>"input input_latitude", 'readonly'=>"readonly" ])->label(false) ?>

                        </span>
                    </div>
                    <div class="form-feild__group form-feild__group_inline">
                        <label class="form-feild__label"><?=Yii::t('new-field-form', 'Долгота')?>*</label><span class="form-field__input">

                            <?=$form->field($model_feedback,'longitude')->textInput(['class'=>"input input_longitude", 'readonly'=>"readonly" ])->label(false) ?>



                        </span>
                    </div>
                    <div class="form-feild__select clearfix">
                        <label class="form-feild__select-label"><?=Yii::t('new-field-form', 'Область')?>*</label>
                        <div class="form-feild__select-inner form-feild__select-inner_region">

                            <?php       $item  = new \common\models\translationtables\Areas();

                            $areas  = $item->find()
                                ->where(['visible' => true])
                                ->orderBy('name ASC')
                                ->all();
                            $array_areas['hide'] = \Yii::t('new-field-form','Область');

                            foreach ($areas as $area){
                                $array_areas[$area->place_id] = $area->langData['name'];


                            }

                            ?>

                            <div id="select-block_71" class="select-block select-block_disabled">
                                <select  disabled="disabled" class="select">
                                    <option value="hide">Область</option>
                                   <? foreach ($areas as $area){?>

                                       <option value="<?=$area->place_id?>"><?=$area->langData['name']?></option>

                                  <?  }?>
                                </select>
                            </div>

                            <div style="display:none;" id="select-block_7" class="select-block select-block_disabled">




<!--                                --><?/*= $form->field($model_feedback, 'area_pid')->dropDownList($array_areas,['class'=>"select",'disabled'=>"disabled"])->label(false); */?>
                                <?= $form->field($model_feedback, 'area_pid')->dropDownList($array_areas,['class'=>"select"])->label(false); ?>




                            </div>
                        </div>
                    </div>
                    <div class="form-feild__select clearfix">
                        <label class="form-feild__select-label"><?=Yii::t('new-field-form', 'Район')?>*</label>
                        <div class="form-feild__select-inner form-feild__select-inner_area">

                            <div id="select-block_81" class="select-block select-block_disabled">
                                <select  disabled="disabled" class="select">
                                    <option value="hide">Район</option>

                                </select>
                                </div>



                            <div style="display:none;" id="select-block_8" class="select-block select-block_disabled">

                              <?  $array_regions['hide'] = \Yii::t('new-field-form', 'Район');?>
<!--                                --><?/*= $form->field($model_feedback, 'region_pid')->dropDownList($array_regions,['class'=>"select",'disabled'=>"disabled"])->label(false); */?>
                              <?= $form->field($model_feedback, 'region_pid')->dropDownList($array_regions,['class'=>"select"])->label(false); ?>



                            </div>
                        </div>
                    </div>
                    <div class="form-feild__select clearfix">
                        <label class="form-feild__select-label"><?=Yii::t('new-field-form', 'Культура')?>*</label>
                        <div class="form-feild__select-inner form-feild__select-inner_culture">
                            <div id="select-block_11" class="select-block">
                                <?  $array_cultures['hide'] = Yii::t('new-field-form', 'Культура');?>
                                <?php $list = \common\models\translationtables\Cultures::getList();
                                foreach ($list as $item){
                                    $array_cultures[$item->id] = $item->langData['name'];
                                }
                                ?>
                                <?= $form->field($model_feedback, 'culture_id')->dropDownList($array_cultures,['class'=>"select"])->label(false); ?>



                            </div>
                        </div>
                    </div>
                    <div class="form-feild__select clearfix">
                        <label class="form-feild__select-label"><?=Yii::t('new-field-form', 'Метеостанция')?>*</label>
                        <div class="form-feild__select-inner form-feild__select-inner_meteostation">
                            <div id="select-block_9" class="select-block">
                                <?  $array_stations['hide'] = Yii::t('new-field-form', 'Метеостанция');?>

                                <?= $form->field($model_feedback, 'station1_id')->dropDownList($array_stations,['class'=>"select"])->label(false); ?>



                            </div>
                        </div>
                    </div>
                    <div class="form-feild__select clearfix">
                        <label class="form-feild__select-label"><?=Yii::t('new-field-form', 'Метеостанция')?></label>
                        <div class="form-feild__select-inner form-feild__select-inner_meteostation">
                            <div id="select-block_23" class="select-block">


                                <?= $form->field($model_feedback, 'station2_id')->dropDownList($array_stations,['class'=>"select"])->label(false); ?>

                            </div>
                        </div>
                    </div>
                    <div class="form-feild__select clearfix">
                        <label class="form-feild__select-label"><?=Yii::t('new-field-form', 'Метеостанция')?></label>
                        <div class="form-feild__select-inner form-feild__select-inner_meteostation">
                            <div id="select-block_24" class="select-block">
                                <?= $form->field($model_feedback, 'station3_id')->dropDownList($array_stations,['class'=>"select"])->label(false); ?>
                            </div>
                        </div>
                    </div>
                    <div class="form-field__btn form-field__btn_submit">
                        <input type="submit" value="<?=Yii::t('new-field-form', 'Сохранить')?>" class="btn btn_orange"/>
                    </div>
                </li>
            </ul>
        </div>
    </div>






<?php
ActiveForm::end();
?>





