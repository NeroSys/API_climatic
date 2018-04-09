<?php
namespace backend\components;

use yii\validators\Validator;

class ValidateMax extends Validator
{
    public function validateAttribute($model, $attribute)
    {


           $item = new \common\models\translationtables\Recommendations();

           $result1 = $item->find()->where(['threat_id' => $model->threat_id])
               ->andWhere('`max_level` > :level1', [':level1' => $model->max_level])
               ->andWhere('`min_level` < :level1', [':level1' => $model->max_level])
               ->all();


           if (!empty($result1)) {

              // $this->addError($model, $attribute, 'Неправильное максимальное значение');
           }



    }
}