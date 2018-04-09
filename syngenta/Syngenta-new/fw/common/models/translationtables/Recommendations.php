<?php
namespace common\models\translationtables;


use common\models\TranslationTable;
use yii\helpers\ArrayHelper;


class Recommendations extends TranslationTable
{

    protected $tableStructure = [
        'standard' => [
            'description' => 'Рекомендация',

        ],
    ];

    public function rules(){


        $rules = [

            [['name'], 'safe'],
            [['name'], 'string', 'max' => 255],
            [['name'], 'unique'],
            [['langData'], 'safe']
        ];




        $columnNames = $this->getTableSchema()->getColumnNames();

        foreach ($columnNames as $columnName) {
            if ('visible' == $columnName) {
                $rules[] = [['visible'], 'boolean'];
            } else if ('sort' == $columnName) {
                $rules[] = [['sort'], 'integer'];
            }else if ('place_id' == $columnName) {
                $rules[] = [['place_id'], 'string'];
            }
            else if ('max_value' == $columnName) {
                $rules[] = [['max_value'], 'integer'];
                $rules[] = [['max_value'], 'required'];

            } else if ('max_level' == $columnName) {
                $rules[] = [['max_level'], 'integer'];
                $rules[] = [['max_level'], 'required'];
                // $rules[]= [['max_level'], 'compare', 'compareValue' => 100, 'operator' => '<='];
                 $rules[]= [['max_level'], 'compare', 'compareAttribute' => 'min_level', 'operator' => '>', 'type' => 'number'];
                // $rules[]= [['max_level'], ValidateMax::className()];
                $rules[]= [['max_level'], 'validateMax'];
            }
            else if ('min_level' == $columnName) {
                $rules[] = [['min_level'], 'integer'];
                $rules[] = [['min_level'], 'required'];
                // $rules[]= [['min_level'], 'compare', 'compareValue' => 0, 'operator' => '>='];
                // $rules[]= [['min_level'], 'compare', 'compareAttribute' => 'max_level', 'operator' => '<', 'type' => 'number'];
                $rules[]= [['min_level'], 'validateMin' ];
            }

            else if ('ch' == $columnName) {
                $rules[] = [['ch'], 'integer'];
                $rules[] = [['ch'], 'required'];
                $rules[] = [['ch'], 'unique'];
            }else {
                $rules[] = [[$columnName], 'safe'];
            }
        }




        return $rules;
    }

    public function validateMax($attribute, $params)
    {


        $item = new \common\models\translationtables\Recommendations();

        $result1 = $item->find()->where(['threat_id' => $this->threat_id])
            ->andWhere('`max_level` > :level1', [':level1' => $this->max_level])
            ->andWhere('`min_level` < :level2', [':level2' => $this->max_level])
            ->all();

        $result = $item->find()->where(['threat_id' => $this->threat_id])
            ->andWhere('`max_level` <= :level1', [':level1' => $this->max_level])
            ->andWhere('`min_level` >= :level2', [':level2' => $this->min_level])
            ->all();

        $go = true;
        $go1 = true;

        if (count($result) == 1 && $result[0]->id == $this->id ){

            $go = false;
        }
        if (count($result1) == 1 && $result1[0]->id == $this->id  ){
            $go1 = false;
        }


        if (!empty($result1) && $go1) {
            $this->addError($attribute, 'Неправильное максимальное значение');
        } elseif (!empty($result) && $go) {
            $this->addError($attribute, 'Неправильное максимальное или минимальное  значение');
        }


    }

    public function validateMin($attribute, $params)
    {
        if (!$this->hasErrors()) {

            $item = new \common\models\translationtables\Recommendations();


            $result2 = $item->find()->where(['threat_id' => $this->threat_id])
                ->andWhere('`max_level` > :level1', [':level1' => $this->min_level])
                ->andWhere('`min_level` < :level2', [':level2' => $this->min_level])
                ->all();

            $result = $item->find()->where(['threat_id' => $this->threat_id])
               ->andWhere('`max_level` <= :level1', [':level1' => $this->max_level])
                ->andWhere('`min_level` >= :level2', [':level2' => $this->min_level])
                ->all();


            $go = true;
            $go2 = true;
            if (count($result) == 1 && $result[0]->id == $this->id    ){
                $go = false;
            }
            if (count($result2) == 1 &&  $result2[0]->id == $this->id  ){
                $go2 = false;
            }

// здесь проверка значения уровня угрозы

            if (!empty($result2) && $go2){
                $this->addError($attribute, 'Неправильное минимальное значение');
            }elseif (!empty($result) && $go) {
                $this->addError($attribute, 'Неправильное максимальное или минимальное  значение');
            }
        }
    }

    public function getRegions(){

        return $this->hasOne(Regions::className(), ['id' => 'region_id']);
    }

    public function getRegionList(){


        return ArrayHelper::map(Regions::find()->all(), 'id', 'name');
    }

    public function getAreas(){

        return $this->hasOne(Areas::className(), ['id' => 'areas_id']);
    }

    public function getAreasList(){

        return ArrayHelper::map(Areas::find()->all(), 'id', 'name');
    }

}




















