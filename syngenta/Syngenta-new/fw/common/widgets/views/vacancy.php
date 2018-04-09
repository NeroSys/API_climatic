
<?php
use \yii\widgets\ActiveForm;



$form = ActiveForm::begin([
    'enableAjaxValidation' => true,
    'validationUrl' =>\yii\helpers\Url::toRoute('/'.\Yii::$app->language.'/cooperation/validate/vacancy'),
    'options' => [
        'enctype' => 'multipart/form-data',
        'name'=> "enter-form",
        'class' => 'form-vacancy',
        'id' => 'form-vacancy_1'
    ]

]);
?>





        <div class="form-vacancy__group"><span class="form-vacancy__input">
                <?=$form->field($model_feedback,'email')->textInput(['class'=>"input input_textarea input_dark input_border", 'placeholder' => 'E-mail'])->label(false) ?>
               </span>
        </div>
        <div class="form-vacancy__group"><span class="form-vacancy__input">
              <?=$form->field($model_feedback,'phone')->textInput(['class'=>"input input_textarea input_dark input_border", 'placeholder' => \Yii::t('resume-phone', 'Телефон')])->label(false) ?>
                </span>
        </div>
        <div class="form-vacancy__group"><span class="form-vacancy__input">

              <?=$form->field($model_feedback,'name')->textInput(['class'=>"input input_textarea input_dark input_border", 'placeholder' => \Yii::t('resume-name', 'Имя')])->label(false) ?>
                </span>
        </div>


<div class="form-vacancy__group"><span class="form-vacancy__input">

         <?=$form->field($model_feedback,'surname')->textInput(['class'=>"input input_textarea input_dark input_border", 'placeholder' => \Yii::t('resume-surname', 'Фамилия')])->label(false) ?>



       </span>
        </div>


       <div class="form-vacancy__group">
            <label for="input-file" class="label-upload"> <span class="label-upload__text"><?=\Yii::t('resume-prikrepit', 'Прикрепить резюме')?>:</span><span class="label-upload__btn"><?=\Yii::t('resume-vibirete-file', 'Выберите файл')?></span>


                <?=$form->field($model_feedback,'fileinfo')->fileinput(['id' => "input-file",'class'=>"label-upload__input-file"])->label(false) ?>

            </label>


            <p class="form-vacancy__group-text">

                <?=\Yii::t('resume-formaty', 'Поддерживаются форматы')?>: doc, docs, rtf, txt, odt, pdf, <br/>(1 мб максимум)
            </p>
        </div>





        <div class="form-vacancy__group"><span class="form-vacancy__input">

                    <?=$form->field($model_feedback,'text_resume')->textarea(['rows' => 3,'class'=>"input input_textarea input_dark input_border", 'placeholder' => \Yii::t('resume-pismo', 'Сопроводительное письмо')])->label(false) ?>


                </span>
        </div>





        <div class="form-vacancy__button">
            <button type="submit" value="Отправить" class="btn btn_border btn_orange btn_form-vacancy"><?=\Yii::t('resume-otpravit', 'Отправить')?></button>
        </div>




        <div class="form-vacancy__close-btn"><i class="icon-vesti icon-vesti_16"></i></div>





        <?php
        ActiveForm::end();
        ?>


<? if ($message){ ?>

    <div class="form-popup show">
        <div class="form-popup__inner"><span class="form-popup__text"><?=$message?></span><span class="form-popup__close-btn"><i class="icon-vesti icon-vesti_16" onClick="location.href'<?=\yii\helpers\Url::to() ?>'"></i></span></div>
    </div>


<?}?>












