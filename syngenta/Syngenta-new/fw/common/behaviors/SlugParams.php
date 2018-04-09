<?php
/**
 * Created by PhpStorm.
 * User: Bizon
 * Date: 23.08.15
 * Time: 08:33
 */

namespace common\behaviors;

use dosamigos\transliterator\TransliteratorHelper;
use yii;
use yii\base\Behavior;
use yii\db\ActiveRecord;
use yii\helpers\Inflector;

class SlugParams extends Behavior {

    public $in_attribute = 'name';
    public $out_attribute = 'slug';
    public $translit = true;

    public function events(){
        return [ActiveRecord::EVENT_AFTER_VALIDATE => 'getSlug'];
    }

    public function getSlug($event){
        if (empty($this->owner->{$this->out_attribute})){
            $this->owner->{$this->out_attribute} = $this->generateSlug($this->owner->{$this->in_attribute});
        } else {
            $this->owner->{$this->out_attribute} = $this->generateSlug($this->owner->{$this->out_attribute});
        }
    }

    private function generateSlug($slug){
        $slug = $this->slugify($slug);
        $slug = ltrim($slug, "1234567890^!+-:.,[]~@$%&*()=|");
        if($this->checkUniqueSlug($slug)){
            return $slug;
        } else {

            for($suffix = 2; !$this->checkUniqueSlug($new_slug = $slug.''.$suffix); $suffix++){};
            return $new_slug;
        }
    }

    private function slugify($slug){
        if($this->translit){
            return Inflector::slug(TransliteratorHelper::process($slug), '', true);
        } else {
            return $this->slug($slug, '', true);
        }
    }

    private function slug($string, $replacement = '-', $lowercase = true){
        $string = preg_replace('/[^\p{L}\p{Nd}]+/u', $replacement, $string);
        $string = trim($string, $replacement);
        return $lowercase ? strtolower( $string ) : $string;
    }

    private function checkUniqueSlug($slug){
        $pk = $this->owner->primaryKey();
        $pk = $pk[0];

        $condition = $this->out_attribute . ' = :out_attribute';
        $params = [ ':out_attribute' => $slug ];
        if ( !$this->owner->isNewRecord ) {
            $condition .= ' and ' . $pk . ' != :pk';
            $params[':pk'] = $this->owner->{$pk};
        }

        return !$this->owner->find()
            ->where( $condition, $params )
            ->one();
    }

}