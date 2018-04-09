<?php
use \yii\widgets\ActiveForm;

$form = \yii\widgets\ActiveForm::begin([
    'enableAjaxValidation' => true,
    'enableClientValidation'=>false,
    'validationUrl' => \yii\helpers\Url::toRoute('/'.\Yii::$app->language.'/main/validate/register'),
    'options' => [
        'name'=> "form-reg",
        'class' => 'form-reg',
        'id' => 'form-reg_1'

    ]

]);
?>

<?php
$arr_area= [null=>\yii::t('register-form','Выберите область') ];

$item  = new \common\models\translationtables\Areas();

$areas  = $item->find()
    ->where(['visible' => true])
    ->orderBy('name ASC')
    ->all();

foreach ($areas as $area){

    $arr_area[$area->id] = $area->langData['name'];

}

?>






<? foreach ($params as $param){?>
    <?if ($param->name == 'password' || $param->name == 'repassword'){?>

    <div class="form-reg__group"><span class="form-reg__input">
                    <?=$form->field($model,$param->name)->passwordInput(['class'=>"input input_text input_dark",'placeholder' => $param->langData['name']])->label(false) ?>
                   </span></div>

        <?} else {?>

        <?if (( $param->name == 'area')){    ?>




            <div class="form-reg__group"><span class="form-reg__input">
                    <?=$form->field($model,$param->name)->dropDownList($arr_area,['onchange'=>"rlist(this);",'class'=>"input input_text input_dark"])->label($param->langData['name'],['style' => 'font-size: 0.875rem;']) ?>
                   </span></div>

        <?} else if (($param->name == 'region')){  ?>
            <div class="form-reg__group"><span class="form-reg__input">
                    <?=$form->field($model,$param->name)->dropDownList([null=>\yii::t('register-form','Выберите район')],['class'=>"input input_text input_dark"])->label($param->langData['name'],['style' => 'font-size: 0.875rem;']) ?>
                   </span></div>

        <?} else { ?>

        <div class="form-reg__group"><span class="form-reg__input">
                    <?=$form->field($model,$param->name)->textInput(['class'=>"input input_text input_dark",'placeholder' => $param->name == 'phone' ? \Yii::t('register', 'Телефон в формате 0507778899  - 10 цифр') :  $param->langData['name']])->label(false) ?>
                   </span></div>

        <? }} ?>
<?}?>


    <div class="form-reg__check-btn">


        <?=$form->field($model, 'agree')->checkBox(['class'=>"input-checkbox",'id' =>'input-checkbox_1','value' => ''])?>
        <label  for="input-checkbox_1" class="input-checkbox__label input-checkbox__label_form-reg"> <?=\Yii::t('register', 'С условиями')?> <a id="agreement_1" href="#"><?=\Yii::t('register', 'пользовательского соглашения')?></a> <?=\Yii::t('register', 'согласен')?> </label>


    </div>


    <div class="form-reg__button">
        <button type="submit" value="Отправить" class="btn btn_border btn_orange btn_form-reg"><?=\Yii::t('register', 'Зарегистрироваться')?></button>
    </div>

    <script>
        function rlist(elem){

            var lang = $("html").attr('lang');

            idval = elem.value;

            var oAjax = $.ajax({
                'url':  '/'+lang+'/forecast/default/ajax-regions1.html'
                , 'method': 'POST'
                , 'dataType': 'json'
                , 'timeout': 10000
                , 'data': {
                    'place_id': idval

                }
                , 'success': function (oServerResponse) {

                    $('#dynamicparams-region').empty();

                    $('#dynamicparams-region').append('<option value>  <?= \yii::t('register-form','Выберите район')?></option>');

                    var aArray = oServerResponse;
                    if ( aArray.length ) {
                        aArray.forEach(function(item, i, arr) {


                            $('#dynamicparams-region').append("<option  value=" + item.val + ">" + item.name + "</option>");

                        });
                    }


                    //  console.log('ok');


                }
                , 'error': function (oAjax) {
                    alert('Проблемы, повторите попытку позже');
                }
                , 'complete': function (oAjax) { // Обьеденяет Succes и Error . Техническая логика
                    if (oAjax.status == 200) { // 200 = OK
                        if (typeof(oAjax.responseJSON) == 'undefined') {
                            console.error('could not parse server response as JSON object', oAjax.responseText);
                        }
                        else {
                        }
                    }
                    else if (oAjax.statusText == 'timeout') {
                        console.error('AJAX request timed out');
                    }
                    else if (oAjax.status == 403) { // access forbidden
                        console.error('access forbidden');
                    }
                    else {
                        console.error('Unpredicated error', oAjax);
                    }
                }
            });



        }

    </script>


<? if ($message){ ?>

    <div class="form-popup show">
        <div class="form-popup__inner"><span class="form-popup__text"><?=$message?></span><span class="form-popup__close-btn"><a onClick="location.href='<?= yii\helpers\Url::toRoute(['/'.\Yii::$app->language.'/main','signin' => '1']);?>'" class="btn btn_orange">ОК</a></span></div>
    </div>


<?}?>

<?php
ActiveForm::end();
?>