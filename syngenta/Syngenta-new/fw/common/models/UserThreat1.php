<?php

namespace common\models;

use common\models\translationtables\Threats;
use Yii;

/**
 * This is the model class for table "user_threat".
 *
 * @property string $id
 * @property string $user_id
 * @property string $field_id
 * @property string $threat_id
 * @property integer $warning_level
 * @property integer $mail_interval
 * @property string $time_to_mail
 * @property integer $via_sms
 *
 * @property Fields $field
 * @property Threats $threat
 * @property User $user
 */
class UserThreat1 extends \yii\db\ActiveRecord
{
    public $user_threat_id;
    public $tomanager;




    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'user_threat';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [[ 'field_id', 'threat_id', 'warning_level', 'via_sms'], 'required'],
            [['warning_level', 'via_sms'], 'integer','message' => \yii::t('cabinet-threat-form','Значение не выбрано') ],
           // [['time_to_mail'], 'string', 'max' => 11],
            [['time2'], 'isgood'],
            [['manager_id','tomanager'], 'safe'],

            [['time_to_mail'], 'isis'],
            [['user_threat_id', 'mail_interval','time2','time_to_mail'], 'safe'],
            [['field_id'], 'exist', 'skipOnError' => true, 'targetClass' => Fields::className(), 'targetAttribute' => ['field_id' => 'id'],'message' => \yii::t('cabinet-threat-form','Поле не выбрано') ],
            [['threat_id'], 'exist', 'skipOnError' => true, 'targetClass' => Threats::className(), 'targetAttribute' => ['threat_id' => 'id'],'message' => \yii::t('cabinet-threat-form','Угроза не выбрана') ],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['user_id' => 'id']],
        ];
    }


    public function isgood($attribute, $params)
    {

        if ($this->time2 !='hide' && $this->time_to_mail != 'hide' && ($this->time2 <= $this->time_to_mail) && ($this->via_sms == 1) ) {

            $this->addError($attribute, \yii::t('cabinet-threat-form', 'Неправильное значение времени'));

        } else if ($this->time2 == 'hide'  && $this->via_sms == 1){


            $this->addError($attribute, \yii::t('cabinet-threat-form', 'Значение не выбрано'));

        }

       // (empty($this->time2) || empty($this->time_to_mail)) &&
    }

    public function isis($attribute, $params)
    {

        if (($this->time_to_mail == 'hide')  && ($this->via_sms == 1) ) {

            $this->addError($attribute, \yii::t('cabinet-threat-form', 'Значение не выбрано'));

        }

        // (empty($this->time2) || empty($this->time_to_mail)) &&
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'field_id' => 'Field ID',
            'threat_id' => 'Threat ID',
            'warning_level' => 'Warning Level',
            'mail_interval' => 'Mail Interval',
            'time_to_mail' => 'Time To Mail',
            'via_sms' => 'Via Sms',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getField()
    {
        return $this->hasOne(Fields::className(), ['id' => 'field_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getThreat()
    {
        return $this->hasOne(Threats::className(), ['id' => 'threat_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'user_id']);
    }
}
