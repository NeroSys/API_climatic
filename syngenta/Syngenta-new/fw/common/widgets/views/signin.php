




        <?php
        $form = \yii\bootstrap\ActiveForm::begin([
            'enableAjaxValidation' => true,
           // 'enableClientValidation' => false,
           // 'validateOnSubmit' => true,
            'validationUrl' => \yii\helpers\Url::toRoute('/'.\Yii::$app->language.'/main/validate/sign-in'),
            'options' => [
                'name'=> "form-enter",
                'class' => 'form-enter active',


            ]]);
        ?>
        <div class="form-enter__group"><span class="form-enter__input">
        <?=$form->field($model,'username')->textInput(['class'=>"input input_text input_dark",'placeholder' => 'E-mail'])->label(false) ?>
        </span></div>

        <div class="form-enter__group"><span class="form-enter__input">
        <?=$form->field($model,'password')->passwordInput(['class'=>"input input_text input_dark",'placeholder' => 'Password'])->label(false) ?>
        </span></div>

        <div class="form-reg__check-btn">
            <?=$form->field($model, 'rememberMe')->checkBox(['class'=>"input-checkbox",'id' =>'input-checkbox_2'])->label(false)?>

            <label onclick="changeclass(this);" for="input-checkbox_2" class="input-checkbox__label input-checkbox__label_form-reg checked"><?=\Yii::t('login-form', 'Запомнить меня')?></label>
        </div>




    <a href="#" class="form-enter__link form-enter__link_remember"><?=\Yii::t('login-form', 'Забыли пароль?')?></a>

        <div class="form-enter__button">
        <button type="submit" value="" class="btn btn_border btn_orange btn_form-enter"><?=\Yii::t('login-form', 'Войти')?></button>
    </div>



        <?php
        \yii\bootstrap\ActiveForm::end(); ?>




<script>
function changeclass(element) {$(element).toggleClass('checked');}
</script>