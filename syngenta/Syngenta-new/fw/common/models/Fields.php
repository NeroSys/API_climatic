<?php

namespace common\models;

use common\models\translationtables\Regions;
use Yii;

/**
 * This is the model class for table "fields".
 *
 * @property string $id
 * @property string $name
 * @property string $latitude
 * @property string $longitude
 * @property string $user_id
 * @property string $culture_id
 * @property string $area_pid
 * @property string $region_pid
 * @property string $station1_id
 * @property string $station2_id
 * @property string $station3_id
 *
 * @property FieldCultures[] $fieldCultures
 * @property FieldStations[] $fieldStations
 * @property Cultures $culture
 * @property User $user
 * @property Stations $station1
 * @property Stations $station2
 * @property Stations $station3
 * @property UserThreat[] $userThreats
 */
class Fields extends \yii\db\ActiveRecord
{

    public $field_id;
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'fields';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'culture_id','area_pid', 'region_pid','sfield'], 'required'],
            [['latitude'], 'required','message' => \yii::t('new-field-form','Выберите поле')],
            [['longitude'], 'required','message' => \yii::t('new-field-form','кликом по карте')],

            [['user_id', 'culture_id', 'station1_id', 'station2_id', 'station3_id'], 'safe'],
            [['name'], 'string', 'max' => 45],
            [['field_id'], 'safe'],
            [['sfield'], 'number', 'numberPattern' => '/^\s*[-+]?[0-9]*[.,]?[0-9]+([eE][-+]?[0-9]+)?\s*$/'],
            [['field_id'], 'integer'],
            [['latitude', 'longitude'], 'string', 'max' => 18],
            [['area_pid', 'region_pid'], 'string', 'max' => 50],
            [['culture_id'], 'exist', 'skipOnError' => true, 'targetClass' => translationtables\Cultures::className(), 'targetAttribute' => ['culture_id' => 'id'],'message' => \yii::t('new-field-form','Культура не выбрана')],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['user_id' => 'id']],
            [['station1_id'], 'exist', 'skipOnError' => true, 'targetClass' => Stations::className(), 'targetAttribute' => ['station1_id' => 'id'],'message' => \yii::t('new-field-form','Метеостанция не выбрана') ],
          //  [['station2_id'], 'exist', 'skipOnError' => true, 'targetClass' => Stations::className(), 'targetAttribute' => ['station2_id' => 'id']],
           // [['station3_id'], 'exist', 'skipOnError' => true, 'targetClass' => Stations::className(), 'targetAttribute' => ['station3_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        if (\yii::$app->language == 'ru') {
            return [
                'id' => 'ID',
                'name' => 'Название поля',
                'latitude' => 'Широта',
                'longitude' => 'Долгота',
                'user_id' => 'User ID',
                'culture_id' => 'Culture ID',
                'area_pid' => 'Area Pid',
                'region_pid' => 'Region Pid',
                'station1_id' => 'Station1 ID',
                'station2_id' => 'Station2 ID',
                'station3_id' => 'Station3 ID',
                'sfield' => 'Площадь поля'
            ];
        }

        if (\yii::$app->language == 'uk') {
            return [
                'id' => 'ID',
                'name' => 'Ім\'я поля',
                'latitude' => 'Широта',
                'longitude' => 'Долгота',
                'user_id' => 'User ID',
                'culture_id' => 'Culture ID',
                'area_pid' => 'Area Pid',
                'region_pid' => 'Region Pid',
                'station1_id' => 'Station1 ID',
                'station2_id' => 'Station2 ID',
                'station3_id' => 'Station3 ID',
                'sfield' => 'Площа поля'
            ];
        }
        if (\yii::$app->language == 'ua') {
            return [
                'id' => 'ID',
                'name' => 'Назва поля',
                'latitude' => 'Широта',
                'longitude' => 'Долгота',
                'user_id' => 'User ID',
                'culture_id' => 'Culture ID',
                'area_pid' => 'Area Pid',
                'region_pid' => 'Region Pid',
                'station1_id' => 'Station1 ID',
                'station2_id' => 'Station2 ID',
                'station3_id' => 'Station3 ID',
                'sfield' => 'Площа поля'
            ];
        }


    }

    /**
     * @return \yii\db\ActiveQuery
     */
    /*public function getFieldCultures()
    {
        return $this->hasMany(FieldCultures::className(), ['fields_id' => 'id']);
    }*/

    /**
     * @return \yii\db\ActiveQuery
     */
  /*  public function getFieldStations()
    {
        return $this->hasMany(FieldStations::className(), ['field_id' => 'id']);
    }*/

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCulture()
    {
        return $this->hasOne(Cultures::className(), ['id' => 'culture_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'user_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStation1()
    {
        return $this->hasOne(Stations::className(), ['id' => 'station1_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStation2()
    {
        return $this->hasOne(Stations::className(), ['id' => 'station2_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStation3()
    {
        return $this->hasOne(Stations::className(), ['id' => 'station3_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUserThreats()
    {
        return $this->hasMany(UserThreat::className(), ['field_id' => 'id']);
    }

    public function getRegions(){

        return$this->hasOne(Regions::className(), ['place_id' => 'region_pid']);
    }
}
