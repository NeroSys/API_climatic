<?php
use \yii\widgets\ActiveForm;

$form = \yii\widgets\ActiveForm::begin([
    'enableAjaxValidation' => true,
    'enableClientValidation'=>false,
    'validationUrl' => \yii\helpers\Url::toRoute('/'.\Yii::$app->language.'/main/validate/edit'),
    'options' => [
        'name'=> "form-reg",
        'class' => 'form-reg',
        'id' => 'form-reg_1'

    ]

]);
?>
<?
    $language = new \common\models\Language();


    $list = $language->find()->where(['enable' => true])->orderBy('default_lang DESC')->all();
    foreach ($list as $item){
    $array_lang[$item->id] = $item->name;
    }
    ?>

<? foreach ($params as $param){?>
    <?if (!($param->name == 'password' || $param->name == 'repassword' || $param->name == 'email'|| $param->name == 'maillang' || $param->name == 'area' || $param->name == 'region')){?>




        <div class="form-reg__group"><span class="form-reg__input">
                    <?=$form->field($model,$param->name)->textInput(['class'=>"input input_text input_dark",'placeholder' => $param->name == 'phone' ?  \Yii::t('edit-user-params', 'В формате 0507778899  - 10 цифр')  : ''])->label($param->langData['name'],['style' => 'font-size: 0.875rem;']) ?>
                   </span></div>

    <?}?>

    <?if (($param->name == 'maillang')){    ?>




        <div class="form-reg__group"><span class="form-reg__input">
                    <?=$form->field($model,$param->name)->dropDownList($array_lang,['class'=>"input input_text input_dark"])->label($param->langData['name'],['style' => 'font-size: 0.875rem;']) ?>
                   </span></div>

    <?}?>



<?}?>





    <div class="form-reg__button">
        <button type="submit" value="Обновить" class="btn btn_border btn_orange btn_form-reg"><?=\Yii::t('edit-user-params', 'Обновить')?></button>
    </div>


<? if ($message){ ?>

    <div class="form-popup show">
        <div class="form-popup__inner"><span class="form-popup__text"><?=$message?></span><span class="form-popup__close-btn"><a onClick="location.href='<?= yii\helpers\Url::toRoute(['/'.\Yii::$app->language.'/cabinet']);?>'"  class="btn btn_orange">ОК</a></span></div>
    </div>


<?}?>

<?php
ActiveForm::end();
?>