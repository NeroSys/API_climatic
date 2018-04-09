




<?php
use \yii\widgets\ActiveForm;



$form = ActiveForm::begin([
    'enableAjaxValidation' => true,
    'enableClientValidation'=>false,
    'validationUrl' => \yii\helpers\Url::toRoute('/'.\Yii::$app->language.'/contacts/validate/enquiry'),
    'options' => [
        'name'=> "form-send",
        'class' => 'form-send'
    ]

]);
?>


<div class="form-send__group"><span class="form-send__input">
                <?=$form->field($model_feedback,'fio')->textInput(['class'=>"input input_text input_dark",'placeholder' => Yii::t('contacts', 'Имя и Фамилия')])->label(false) ?>
</span>
</div>




<div class="form-send__group"><span class="form-send__input">
                <?=$form->field($model_feedback,'email')->textInput(['class'=>"input input_text input_dark",'placeholder' => 'E-mail'])->label(false) ?>
</span>
</div>



<div class="form-send__group"><span class="form-send__input">
                <?=$form->field($model_feedback,'text')->textarea(['rows' => 3,'class'=>"input input_textarea input_dark", 'placeholder' => \Yii::t('contacts', 'Ваше сообщение')])->label(false) ?>
</span>
</div>

<div class="form-send__button">
    <button type="submit" value="Отправить" class="btn btn_border btn_orange btn_form-send"><?=Yii::t('contacts', 'Отправить')?></button>
</div>

<? if ($message){ ?>


    <div class="form-popup show">
        <div class="form-popup__inner"><span class="form-popup__text"><?=$message?></span><span class="form-popup__close-btn"><a class="btn btn_orange">ОК</a></span></div>
    </div>


<?}?>

<?php
ActiveForm::end();
?>


