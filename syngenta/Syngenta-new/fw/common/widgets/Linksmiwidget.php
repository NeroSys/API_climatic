<?php
namespace common\widgets;





use yii\helpers\Html;
use yii\helpers\Url;
use yii\widgets\LinkPager;

class Linksmiwidget extends LinkPager
{
    public $pageCssClass = 'pagination-list__item';
    public $options = ['class' => 'pagination-list'];
    public $linkOptions = ['class' => 'pagination-list__link'];
    public $nextPageLabel = false;
    public $prevPageLabel = false;


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
            $buttons[] = $this->renderPageButton($this->prevPageLabel, $page, $this->prevPageCssClass, $currentPage <= 0, false);
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
            $buttons[] = $this->renderPageButton($this->nextPageLabel, $page, $this->nextPageCssClass, $currentPage >= $pageCount - 1, false);
        }
        // last page
        $lastPageLabel = $this->lastPageLabel === true ? $pageCount : $this->lastPageLabel;
        if ($lastPageLabel !== false) {
            $buttons[] = $this->renderPageButton($lastPageLabel, $pageCount - 1, $this->lastPageCssClass, $currentPage >= $pageCount - 1, false);
        }

        $buttons[] = $this->renderLastPageButton();

        return Html::tag('ul', implode("\n", $buttons), $this->options);
    }

    protected function renderLastPageButton()
    {

        return Html::tag('li', Html::a('ВСЕ НОВОСТИ',Url::toRoute('/'.\Yii::$app->language.'/pressroom/smi/all'), ['class' => 'pagination-list__link']), ['class' => 'pagination-list__item']);
    }

}
