<?php


namespace common\models\translationtables;


use common\models\StationsThreats;
use common\models\TranslationTable;
use Yii;


class Stations extends TranslationTable
{

    public $cultures_ids;

    protected $tableStructure = [
        'standard' => [
            'name' => 'Название',

        ],
    ];


    public function rules()
    {
        return [
            [['is_available', 'visible'], 'integer'],
            [['name'], 'string', 'max' => 8],
            [['cultures_ids'], 'safe'],
            [['cultures_ids_array'], 'safe'],
            [['latitude', 'longitude'], 'string', 'max' => 18],
            [['user_station_name'], 'string', 'max' => 45],
        ];
    }


    public static  function getVisAvailable(){


        $item = new Stations();
        return $item->find()
            ->where(
                [
                    'visible' => true,
                    'is_available' => true
                ]
            )

            ->all();


    }

    public static  function getVisAvailableReal(){

      $newst_threats = new StationsThreats();
       $st_ids = $newst_threats->find()->all();
        $ar_st_id =[];
        foreach ($st_ids as $st_id){
            $ar_st_id[] = $st_id->station_id;
        }


        $item = new Stations();
        return $item->find()
            ->where(
                [
                    'visible' => true,
                    'is_available' => true
                ]
            )
//            ->andWhere(
//                [
//                    'id' => $ar_st_id
//
//                ]
//            )

            ->all();


    }


}




















