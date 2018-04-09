<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "stations".
 *
 * @property string $id
 * @property string $name
 * @property string $latitude
 * @property string $longitude
 * @property integer $is_available
 * @property integer $visible
 * @property string $user_station_name
 *
 * @property FieldStations[] $fieldStations
 * @property Fields[] $fields
 * @property Fields[] $fields0
 * @property Fields[] $fields1
 * @property StationsThreats[] $stationsThreats
 */
class Stations extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'stations';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['is_available', 'visible'], 'integer'],
            [['name'], 'string', 'max' => 8],
            [['latitude', 'longitude'], 'string', 'max' => 18],
            [['user_station_name'], 'string', 'max' => 45],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'latitude' => 'Latitude',
            'longitude' => 'Longitude',
            'is_available' => 'Is Available',
            'visible' => 'Visible',
            'user_station_name' => 'User Station Name',
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

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFieldStations()
    {
        return $this->hasMany(FieldStations::className(), ['station_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFields()
    {
        return $this->hasMany(Fields::className(), ['station1_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFields0()
    {
        return $this->hasMany(Fields::className(), ['station2_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFields1()
    {
        return $this->hasMany(Fields::className(), ['station3_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStationsThreats()
    {
        return $this->hasMany(StationsThreats::className(), ['station_id' => 'id']);
    }
}
