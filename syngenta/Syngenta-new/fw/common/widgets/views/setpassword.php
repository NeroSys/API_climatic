<?php
use \yii\widgets\ActiveForm;

$form = \yii\widgets\ActiveForm::begin([
    'enableAjaxValidation' => true,
    'enableClientValidation'=>false,
    'validationUrl' => \yii\helpers\Url::toRoute('/'.\Yii::$app->language.'/main/validate/setpassword'),
    'options' => [
        'name'=> "form-reg",
        'class' => 'form-reg',
        'id' => 'form-reg_1'

    ]

]);
?>
<? foreach ($params as $param){?>
    <?if ($param->name == 'password'){?>

    <div class="form-reg__group"><span class="form-reg__input">
                    <?=$form->field($model,$param->name)->passwordInput(['class'=>"input input_text input_dark",'placeholder' => \yii::t('setpassword','Новый пароль')])->label() ?>
                   </span></div>

        <div class="form-reg__group"><span class="form-reg__input">
        <input type="hidden"  value="">
        </span></div>

    <?} elseif ($param->name == 'repassword'){?>
        <div class="form-reg__group"><span class="form-reg__input">
                    <?=$form->field($model,$param->name)->passwordInput(['class'=>"input input_text input_dark",'placeholder' => \yii::t('setpassword','Повторите новый пароль')])->label(false) ?>
                   </span></div>
        <?}?>
<?}?>





    <div class="form-reg__button">
        <button type="submit" value="Обновить пароль" class="btn btn_border btn_orange btn_form-reg"><?=\Yii::t('set-password', 'Обновить пароль')?></button>
    </div>




<? if ($message){ ?>

    <div class="form-popup show">
        <div class="form-popup__inner"><span class="form-popup__text"><?=$message?>.</span><span class="form-popup__close-btn"><a onClick="location.href='<?= yii\helpers\Url::toRoute(['/'.\Yii::$app->language.'/main','signin' => '1']);?>'" class="btn btn_orange">ОК</a></span></div>
    </div>


<?}?>

<?php
ActiveForm::end();
?>