<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "users_threats_list".
 *
 * @property string $id
 * @property integer $threat_value
 * @property string $created_at
 * @property integer $to_send
 * @property integer $is_key
 * @property string $user_id
 * @property string $user_threat_id
 *
 * @property User $user
 * @property UserThreat $userThreat
 */
class UsersThreatsList extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'users_threats_list';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['threat_value', 'to_send', 'is_key', 'user_threat_id'], 'required'],
            [['threat_value', 'to_send', 'is_key','user_id', 'user_threat_id','station1_id','station2_id','station3_id','station_id','threat_id','field_id','culture_id',], 'integer'],
            [['created_at',
                 'station1_value','station2_value','station3_value',
                'station1_distance','station2_distance','station3_distance'
            ], 'safe'],
            //[['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['user_id' => 'id']],
            [['user_threat_id'], 'exist', 'skipOnError' => true, 'targetClass' => UserThreat::className(), 'targetAttribute' => ['user_threat_id' => 'id']],
        ];
    }






    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'threat_value' => 'Threat Value',
            'created_at' => 'Created At',
            'to_send' => 'To Send',
            'is_key' => 'Is Key',
           // 'user_id' => 'User ID',
            'user_threat_id' => 'User Threat ID',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUserThreat()
    {
        return $this->hasOne(UserThreat::className(), ['id' => 'user_threat_id']);
    }
}
