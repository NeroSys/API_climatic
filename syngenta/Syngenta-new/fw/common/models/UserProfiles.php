<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "user_profiles".
 *
 * @property string $id
 * @property string $name
 * @property integer $visible
 * @property string $sort
 * @property integer $threat
 * @property integer $station
 * @property integer $sms
 * @property integer $email
 */
class UserProfiles extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'user_profiles';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['visible', 'sort', 'threat', 'station', 'sms', 'email'], 'integer'],
            [['name'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Название профиля',
            'visible' => 'Отображение',
            'sort' => ' Индекс сортировки',
            'threat' => 'Показ угроз',
            'station' => 'Показ моячков',
            'sms' => 'Отправка Sms',
            'email' => 'Отправка Email',
        ];
    }
}
