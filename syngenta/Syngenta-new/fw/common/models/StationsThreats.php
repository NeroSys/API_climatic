<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "stations_threats".
 *
 * @property string $id
 * @property string $threat_id
 * @property string $station_id
 * @property double $value
 * @property string $time
 * @property integer $old
 *
 * @property Stations $station
 * @property Threats $threat
 */
class StationsThreats extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'stations_threats';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['threat_id', 'station_id', 'time', 'old'], 'required'],
            [['threat_id', 'station_id', 'old'], 'integer'],
            [['value'], 'number'],
            [['time'], 'string', 'max' => 16],
            [['station_id'], 'exist', 'skipOnError' => true, 'targetClass' => Stations::className(), 'targetAttribute' => ['station_id' => 'id']],
            [['threat_id'], 'exist', 'skipOnError' => true, 'targetClass' => Threats::className(), 'targetAttribute' => ['threat_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'threat_id' => 'Threat ID',
            'station_id' => 'Station ID',
            'value' => 'Value',
            'time' => 'Time',
            'old' => 'Old',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStation()
    {
        return $this->hasOne(Stations::className(), ['id' => 'station_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getThreat()
    {
        return $this->hasOne(Threats::className(), ['id' => 'threat_id']);
    }
}
