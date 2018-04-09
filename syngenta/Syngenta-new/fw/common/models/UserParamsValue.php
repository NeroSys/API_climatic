<?php

namespace common\models;

use common\models\translationtables\UserParams;
use Yii;

/**
 * This is the model class for table "user_params_value".
 *
 * @property string $id
 * @property string $user_id
 * @property string $user_param_id
 * @property string $value
 *
 * @property UserParams $userParam
 * @property User $user
 */
class UserParamsValue extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'user_params_value';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['user_id', 'user_param_id'], 'required'],
            [['user_id', 'user_param_id'], 'integer'],
            [['value'], 'string', 'max' => 255],
            [['user_param_id'], 'exist', 'skipOnError' => true, 'targetClass' => UserParams::className(), 'targetAttribute' => ['user_param_id' => 'id']],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'user_param_id' => 'User Param ID',
            'value' => 'Value',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUserParam()
    {
        return $this->hasOne(UserParams::className(), ['id' => 'user_param_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'user_id']);
    }
}
