<?php
ini_set("memory_limit","128M");
require_once('class.pessl_soap.php');
date_default_timezone_set("Europe/Kiev");

$url = 'http://www.fieldclimate.com/api/index.php?action=CIDIStationList_GetStations&user_name=user_pass=';
$result = @file_get_contents($url);

if ($result) {
    $stations_custom_names = json_decode($result,true);


}


if (!empty($stations_custom_names['ReturnDataSet'])){

    $custom_names = $stations_custom_names['ReturnDataSet'];
}





$soap_stations =  new PesslsoapStationList();
$soap_stations ->username = '';
$soap_stations ->password = '';
$stations = & $soap_stations->PesslSoapStationListAll() or
die("error reading station list: ".$soap_stations->error);
if(!count($stations)){
    die("there are no stations available");

}
$dsn = 'mysql:host=localhost; dbname=syngenta';
$user = 'root';
$password = '';
try {

    $zdbh = new PDO($dsn, $user, $password);
    // var_dump($zdbh); // object(PDO)#1 (0) { }

} catch (PDOException $e) {
    // echo $e->getMessage();
}
//$sth = $dbh->query('show databases;');

$zdbh->query("SET NAMES utf8");
$zdbh->query("TRUNCATE TABLE stations_threats24");
//$zdbh->query("TRUNCATE TABLE stations_cultures");



//Обновление базы станций.
$stations_in_syngenta = [];
$stations_in_base = [];

foreach($stations as $station) {
$stations_in_syngenta[] = $station['f_name'];
}

$sth6 = $zdbh->prepare('select `name` from stations');
$sth6->execute();
$id3 = $sth6->fetchAll(PDO::FETCH_ASSOC);

foreach ($id3 as $value){

   $stations_in_base[] =  $value['name'];

    if (!in_array($value['name'], $stations_in_syngenta)){
        $sthz = $zdbh->prepare('UPDATE `stations` SET `is_available`= 0 where `name` = ? ');
       // $sthz->execute([$value['name']]);
    }
}
/*echo "<pre>";
var_dump($stations_in_base);
die;*/
$jj=0;
foreach($stations as $station) {
    $jj++;
    if (!in_array($station['f_name'], $stations_in_base)) {
        $sthz = $zdbh->prepare('insert into  `stations` (`name`,`latitude`,`longitude`,`is_available`,`visible`,`user_station_name`) values (?,?,?,?,?,?);');

       // $sthz->execute([$station['f_name'], $station['f_latitude'], $station['f_longitude'], 1, 1, !empty($custom_names[$station['f_name']]['custom_name']) ? $custom_names[$station['f_name']]['custom_name'] : 'Станція '.$jj ]);
    }

    if (in_array($station['f_name'], $stations_in_base)) {
        $sthz = $zdbh->prepare('UPDATE `stations` SET `is_available`= 1 where `name` = ? ');
       // $sthz->execute([$station['f_name']]);

    }

}


$sth6 = $zdbh->prepare('select `id`, `ch`,`max_value` from threats where `visible` = 1');
$sth6->execute();
$idch = $sth6->fetchAll(PDO::FETCH_ASSOC);

$ch_value =[];
$ch_keys =[];
foreach ($idch as $value){
    $ch_value[$value['ch']] =  $value['max_value'];
    $ch_keys[$value['ch']][] =  $value['id'];

}



$stations_ids =[];
$stations_visible= [];
$sth6 = $zdbh->prepare('select `id`,`name` from stations where `is_available`= 1 and `visible` = 1');
$sth6->execute();
$id3 = $sth6->fetchAll(PDO::FETCH_ASSOC);
foreach ($id3 as $value){
$stations_ids[$value['name']] = $value['id'];
    $stations_visible[] =  $value['name'];

}

/*echo "<pre>";
var_dump($stations_visible);
die;*/
$sth7 = $zdbh->prepare('select `id` from cultures where `visible` = 1;');
$sth7->execute();
$ids_cultures = $sth7->fetchAll(PDO::FETCH_ASSOC);



$chs_by_culture =[];

foreach ($ids_cultures as $id_culture){

    $sth8 = $zdbh->prepare('select `ch` from `threats` where `visible` = 1 and `culture_id` = ?;');

    $sth8->execute([$id_culture['id']]);
    $chs_culture = $sth8->fetchAll(PDO::FETCH_ASSOC);




    $chs = [];
    if (!empty($chs_culture)){
        foreach ($chs_culture as $ch_culture){

           $chs[] = $ch_culture['ch'];

        }
        $chs_by_culture[$id_culture['id']]= $chs;


    }




}

function process($station_data1,$soap_station1,$ch_keys1,$ch_value1,$zdbh1,$stations_ids1,$station1,$chs_by_culture1, $time,$old) {

    $station_ch_array=[];
    $result =[];

    foreach ($station_data1 as $row) {
        foreach ($row as $key => $value) {
            $ch = $soap_station1->PesslsoapGetInfoSensors($key)['f_sensor_ch'];

            $station_ch_array[] =$ch;

            echo ' '.$ch.' ';

            if (in_array($ch, array_keys($ch_keys1))) {

if ($value != null){
                if ($ch_value1[$ch] < $value) {
                    $resultvalue = 100;
                    $result[$ch] = $resultvalue;
                } else {
                    $resultvalue = round(100*$value/$ch_value1[$ch]);
                    if (!empty($result[$ch])) {
                    if    ($result[$ch] < $resultvalue ) {
                        $result[$ch] = $resultvalue;
                    }
                    }else{ $result[$ch] = $resultvalue;
                    }
                }
}else{ $resultvalue = $value;
   if (empty($result[$ch])) {
       $result[$ch] = $resultvalue;
   }
}





            }


        }
    }

    foreach ($result as $keych => $valuech) {
    foreach ($ch_keys1[$keych] as $culture_id_with_ch) {

        $sthz = $zdbh1->prepare('insert into  `stations_threats24` (`station_id`,`threat_id`,`value`,`time`,`old`) values (?,?,?,?,?);');

        $sthz->execute([$stations_ids1[$station1['f_name']], $culture_id_with_ch, $valuech, date('d.m.y H:00', $time), $old]);
    }}

   /* foreach   ($chs_by_culture1 as $id_culture => $chs){
        $exist = false;
        foreach ($chs as $ch){

            if  (in_array($ch, $station_ch_array)){
                $exist = true;
            }

        }

        if ($exist){

            $sthz = $zdbh1->prepare('insert into  `stations_cultures` (`station_id`,`culture_id`) values (?,?);');

            $sthz->execute([$stations_ids1[$station1['f_name']], $id_culture]);




        }



    }*/

   // $sthz22 = $zdbh1->prepare('UPDATE `stations` SET `time`= ? where `name` = ? ');
   // $sthz22->execute([date('d.m.y H:00', $time),$station1['f_name']]);



}




foreach  ($stations as $station) {

    if (in_array($station['f_name'], $stations_visible)){



        $soap_station = new PesslsoapStation();
    $soap_station->station_name = $station['f_name'];
    $soap_station->username = 'syngenta_ukraine';
    $soap_station->password = 'Syngenta@20';
    $soap_station->show_user_app = true;
       // $soap_station->master_user_app='forecast';
    $soap_station->row_count = 48;


       // $station_data = & $soap_station->PesslsoapStationDataGetLast();
    //$station_data = & $soap_station->PesslSOAPStationDataGetFromDate(date('Y-m-d',time()-(24*60*60)).' 06:00:00') or

        $station_data = &$soap_station->PesslSOAPStationDataGetFromDate(date('Y-m-d H:00:00', time()-24*60*60));

        if ($station_data) {

            process($station_data,$soap_station,$ch_keys,$ch_value,$zdbh,$stations_ids,$station,$chs_by_culture, time()-60*60,0);

       /* } elseif($station_data = &$soap_station->PesslSOAPStationDataGetFromDate(date('Y-m-d H:00:00', time()-25*60*60)) ){

            process($station_data,$soap_station,$ch_keys,$ch_value,$zdbh,$stations_ids,$station,$chs_by_culture, time()-2*60*60,1);

        }elseif($station_data = &$soap_station->PesslSOAPStationDataGetFromDate(date('Y-m-d H:00:00', time()-26*60*60)) ){

            process($station_data,$soap_station,$ch_keys,$ch_value,$zdbh,$stations_ids,$station,$chs_by_culture, time()-3*60*60,1);*/

        }else

        {
           // $sthz = $zdbh->prepare('UPDATE `stations` SET `is_available`= 0 where `name` = ? ');
           // $sthz->execute([$station['f_name']]);


        }
}
}
?>
