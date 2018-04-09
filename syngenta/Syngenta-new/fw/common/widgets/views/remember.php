

<?php
$form = \yii\bootstrap\ActiveForm::begin([
    'enableAjaxValidation' => true,
     'enableClientValidation' => false,
    // 'validateOnSubmit' => true,
    'validationUrl' => \yii\helpers\Url::toRoute('/'.\Yii::$app->language.'/main/validate/email'),
    'options' => [
        'name'=> "form-remember",
        'class' => 'form-enter form-enter_remember',

    ]]);
?>

<div class="form-enter__group"><span class="form-enter__input">
        <?=$form->field($model,'email')->textInput(['class'=>"input input_text input_dark",'placeholder' => 'E-mail'])->label(false) ?>
        </span></div>

<div class="form-enter__button">
    <button type="submit" value="Напомнить" class="btn btn_border btn_orange btn_form-enter"><?=\Yii::t('remember', 'Напомнить')?></button>
</div>



<?php
\yii\bootstrap\ActiveForm::end(); ?>