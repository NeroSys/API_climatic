<?php
namespace backend\components;
class Admin extends \yii\base\Component{
    public function init() {
        if (!\yii::$app->user->isGuest) {
            if (\yii::$app->user->identity->admin != 1) {
                \Yii::$app->user->logout();
            }
        }

        parent::init();
    }
}