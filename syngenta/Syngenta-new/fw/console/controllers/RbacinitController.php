<?

namespace console\controllers;




use common\models\Fields;
use common\models\Language;
use common\models\Mail;
use common\models\StationsThreats;
use common\models\translationtables\Cultures;
use common\models\translationtables\Stations;
use common\models\translationtables\Threats;
use common\models\User;
use common\models\UserParamsValue;
use common\models\UsersThreatsList;
use common\models\UserThreat;
use console\models\Baserbacrule;
use Mailgun\Mailgun;

class RbacinitController extends \yii\console\Controller{





    public function actionIndex(){

        $auth = \Yii::$app->authManager;

        $auth->removeAll();


        $rule = new Baserbacrule();
        $auth->add($rule);

        $admin = $auth->createRole('admin');
        $head = $auth->createRole('head');
        $head->ruleName = $rule->name;
        $director = $auth->createRole('director');
        $director->ruleName = $rule->name;
        $manager = $auth->createRole('manager');
        $manager->ruleName = $rule->name;
        $expert = $auth->createRole('expert');
        $expert->ruleName = $rule->name;
        $content = $auth->createRole('content');

        $auth->add($admin);
        $auth->add($head);
        $auth->add($director);
        $auth->add($manager);
        $auth->add($expert);
        $auth->add($content);


//        $auth->addChild($admin, $head);
//        $auth->addChild($head, $director);
//        $auth->addChild($director, $manager);
//        $auth->addChild($director, $expert);

        $seeHead = $auth->createPermission('seeHead');
        $seeDirector = $auth->createPermission('seeDirector');
        $seeManager = $auth->createPermission('seeManager');
        $seeExpert = $auth->createPermission('seeExpert');
        $createUser = $auth->createPermission('createUser');
        $createAdminUser = $auth->createPermission('createAdminUser');
       // $addCSVUsers = $auth->createPermission('addCSVUsers');

        $auth->add($seeHead);
        $auth->add($seeDirector);
        $auth->add($seeManager);
        $auth->add($seeExpert);
        $auth->add($createUser);
        $auth->add($createAdminUser);
       // $auth->add($addCSVUsers);

//        $createHead = $auth->createPermission('createHead');
//        $createDirector = $auth->createPermission('createDirector');
//        $createManager = $auth->createPermission('createManager');
//        $createExpert = $auth->createPermission('createExpert');
//
//        $updateHead = $auth->updatePermission('updateHead');
//        $updateDirector = $auth->updatePermission('updateDirector');
//        $updateManager = $auth->updatePermission('updateManager');
//        $updateExpert = $auth->updatePermission('updateExpert');
//
//        $deleteHead = $auth->deletePermission('deleteHead');
//        $deleteDirector = $auth->deletePermission('deleteDirector');
//        $deleteManager = $auth->deletePermission('deleteManager');
//        $deleteExpert = $auth->deletePermission('deleteExpert');

        $auth->addChild($admin, $seeHead);
        $auth->addChild($admin, $content);
        $auth->addChild($admin, $createUser);
        $auth->addChild($admin, $createAdminUser);
       // $auth->addChild($admin, $addCSVUsers);

//        $auth->addChild($admin, $createHead);
//        $auth->addChild($admin, $updateHead);
//        $auth->addChild($admin, $deleteHead);

        $auth->addChild($manager, $createUser);
        $auth->addChild($director, $createUser);
        $auth->addChild($head, $createUser);



        $auth->addChild($head, $seeDirector);
        $auth->addChild($director, $seeManager);
        $auth->addChild($director, $seeExpert);

        $auth->assign($admin, 1);
        $auth->assign($content, 3);





    }




}