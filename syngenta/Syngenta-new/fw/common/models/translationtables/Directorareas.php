<?php


namespace common\models\translationtables;


use common\models\TranslationTable;
use Yii;


class Directorareas extends TranslationTable
{

    public $areas_ids_array;

    protected $tableStructure = [
        'standard' => [
           // 'name' => 'Название',

        ],
    ];

    public function rules()
    {

        $rules = parent::rules();
        $rules[] =   [['areas_ids_array'], 'safe'];
        return $rules;

    }

}




















