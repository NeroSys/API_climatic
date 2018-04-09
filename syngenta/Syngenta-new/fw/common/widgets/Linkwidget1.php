<?php
namespace common\widgets;





use yii\helpers\Html;
use yii\helpers\Url;
use yii\widgets\LinkPager;

class Linkwidget1 extends LinkPager
{
    public $pageCssClass = 'pagination-list__item';
    public $options = ['class' => 'pagination-list'];
    public $linkOptions = ['class' => 'pagination-list__link'];
    public $nextPageLabel = '<i class="icon-syngenta icon-syngenta_24"></i>';
    public $prevPageLabel = '<i class="icon-syngenta icon-syngenta_21"></i>';
    public $nextPageCssClass = 'pagination-list__item';
    public $prevPageCssClass = 'pagination-list__item';
   // public $all_button;
   // public $url;
    public $maxButtonCount = 7;
    protected function tobegin($page)

    {
       if ($page < $this->maxButtonCount-1){

         return 0;
       } else{ $page=$page-$this->maxButtonCount+1;
           return $page; }


    }

    protected function toend($page)

    {
        $pageCount = $this->pagination->getPageCount();
        if ($page  >= $pageCount - 1-$this->maxButtonCount) {
           return  $page = $pageCount - 1;
                } else{ $page=$page+$this->maxButtonCount-1;
            return $page; }


    }


    protected function renderPageButtons()
    {
        $pageCount = $this->pagination->getPageCount();
        if ($pageCount < 2 && $this->hideOnSinglePage) {
            return '';
        }
        $buttons = [];
        $currentPage = $this->pagination->getPage();
        // first page
        $firstPageLabel = $this->firstPageLabel === true ? '1' : $this->firstPageLabel;
        if ($firstPageLabel !== false) {
            $buttons[] = $this->renderPageButton($firstPageLabel, 0, $this->firstPageCssClass, $currentPage <= 0, false);
        }
        // prev page
        if ($this->prevPageLabel !== false) {
            if (($page = $currentPage - 1) < 0) {
                $page = 0;
            }
            $buttons[] = $this->renderPrevPageButton($this->prevPageLabel, $this->tobegin($page), $this->prevPageCssClass, $currentPage <=0, false);
        }
        // internal pages
        list($beginPage, $endPage) = $this->getPageRange();
        for ($i = $beginPage; $i <= $endPage; ++$i) {
            $buttons[] = $this->renderPageButton($i + 1, $i, null, false, $i == $currentPage);
        }
        // next page
        if ($this->nextPageLabel !== false) {
            if (($page = $currentPage + 1) >= $pageCount - 1) {
                $page = $pageCount - 1;
            }
            $buttons[] = $this->renderNextPageButton($this->nextPageLabel, $this->toend($page), $this->nextPageCssClass, $currentPage >= $pageCount - 1, false);
        }
        // last page
        $lastPageLabel = $this->lastPageLabel === true ? $pageCount : $this->lastPageLabel;
        if ($lastPageLabel !== false) {
            $buttons[] = $this->renderPageButton($lastPageLabel, $pageCount - 1, $this->lastPageCssClass, $currentPage >= $pageCount - 1, false);
        }

       // $buttons[] = $this->renderLastPageButton();

        return Html::tag('ul', implode("\n", $buttons), $this->options);
    }

   /* protected function renderLastPageButton()
    {

        return Html::tag('li', Html::a($this->all_button,$this->url, ['class' => 'btn btn_border btn_orange btn_pgn']), ['class' => 'pagination-list__item']);
    }*/






    protected function renderNextPageButton($label, $page, $class, $disabled, $active)
    {
        $linkOptions = $this->linkOptions;
        $options = ['class' => empty($class) ? $this->pageCssClass : $class];
        if ($active) {
            Html::addCssClass($options, $this->activePageCssClass);
        }
        if ($disabled) {
            Html::addCssClass($options, $this->disabledPageCssClass);

            return Html::tag('li', Html::a($label,'#',['class' => 'pagination-list__link pagination-list__link_arrow']), $options);
        }

        $linkOptions['data-page'] = $page;

        return Html::tag('li', Html::a($label, $this->pagination->createUrl($page),['class' => 'pagination-list__link pagination-list__link_arrow']), $options);
    }



    protected function renderPrevPageButton($label, $page, $class, $disabled, $active)
    {
        $linkOptions = $this->linkOptions;
        $options = ['class' => empty($class) ? $this->pageCssClass : $class];
        if ($active) {
            Html::addCssClass($options, $this->activePageCssClass);
        }
        if ($disabled) {
            Html::addCssClass($options, $this->disabledPageCssClass);

            return Html::tag('li', Html::a($label,'#',['class' => 'pagination-list__link pagination-list__link_arrow']), $options);
        }

        $linkOptions['data-page'] = $page;

        return Html::tag('li', Html::a($label, $this->pagination->createUrl($page),['class' => 'pagination-list__link pagination-list__link_arrow']), $options);
    }

}
