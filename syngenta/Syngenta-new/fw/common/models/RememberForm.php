<?php
namespace common\models;

use Yii;
use yii\base\Model;
use yii\helpers\Url;

/**
 * Login form
 */
class RememberForm extends Model
{
    public $email;

    private $_user;


    /**
     * @inheritdoc
     */

    public function rules()
    {
        $change = false;
        if (Yii::$app->language == 'uk') {
            Yii::$app->language = 'ua';
            $change = true;
        }

        $ar = [
            ['email', 'filter', 'filter' => 'trim'],
            ['email', 'required'],
            ['email', 'email'],
            ['email', 'exist',
                'targetClass' => '\common\models\User',
                'filter' => ['status' => User::STATUS_ACTIVE],
                'message' => \Yii::t('remember', 'Неправильный E-mail')
            ],
            ['email', 'validateUsername'],
        ];

        if (Yii::$app->language == 'ua' && $change) {
            Yii::$app->language = 'uk';
        }

        return $ar;
    }


    /**
     * Validates the password.
     * This method serves as the inline validation for password.
     *
     * @param string $attribute the attribute currently being validated
     * @param array $params the additional name-value pairs given in the rule
     */
    public function validateUsername($attribute, $params)
    {
        $change = false;
        if (Yii::$app->language == 'uk') {
            Yii::$app->language = 'ua';
            $change = true;
        }
        if (!$this->hasErrors()) {
            $user = $this->getUser();
            if ($user->activated != 1){
                $this->addError($attribute, \Yii::t('remember', 'Активируйте Ваш аккаунт') );
            }
        }
        if (Yii::$app->language == 'ua' && $change) {
            Yii::$app->language = 'uk';
        }
    }

    /**
     * Logs in a user using the provided username and password.
     *
     * @return boolean whether the user is logged in successfully
     */
    public function send()
    {
        if ($this->validate() && $this->isSend()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Finds user by [[username]]
     *
     * @return User|null
     */
    protected function getUser()
    {
        if ($this->_user === null) {
            $this->_user = User::findByUsername($this->email);
        }


        return $this->_user;
    }
    protected function isSend()
    {
        $user = User::findOne([
            'status' => User::STATUS_ACTIVE,
            'email' => $this->email,
        ]);

        if ($user) {
            if (!User::isPasswordResetTokenValid($user->password_reset_token)) {
                $user->generatePasswordResetToken();
            }



            if ($user->save()) {

                $activation_url = Url::toRoute(['/'.\yii::$app->language.'/main/validate/password','socket'=> $user->id,'key' => $user->password_reset_token],true);

                $change = false;
                if (Yii::$app->language == 'uk') {
                    Yii::$app->language = 'ua';
                    $change = true;
                }

                    $result = \Yii::$app->mailer->compose('password', ['activation_url' => $activation_url])
                        ->setFrom(['site@sproduccion.com' => 'site@sproduccion.com'])
                        ->setTo([$user->email => ''])
                        ->setSubject(\Yii::t('remember', 'Восстановление пароля учетной записи Syngenta'))
                        ->send();
                    if (Yii::$app->language == 'ua' && $change) {
                        Yii::$app->language = 'uk';
                    }
                    return $result;




            }
        }

        return false;
    }




}
