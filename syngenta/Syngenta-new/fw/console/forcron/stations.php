<?php
ini_set("memory_limit","128M");
require_once('class.pessl_soap.php');
date_default_timezone_set("Europe/Kiev");
set_time_limit(600);

$url = 'http://www.fieldclimate.com/api/index.php?action=CIDIStationList_GetStations&user_name=&user_passw=';
$result = @file_get_contents($url);
// проверка коннекта с вышками.
//var_dump($result);

if ($result) {
    $stations_custom_names = json_decode($result,true);


}


if (!empty($stations_custom_names['ReturnDataSet'])){

    $custom_names = $stations_custom_names['ReturnDataSet'];
}





$soap_stations =  new PesslsoapStationList();
$soap_stations ->username = 'syngenta_ukraine';
$soap_stations ->password = 'Syngenta@20';
$stations = & $soap_stations->PesslSoapStationListAll() or
die("error reading station list: ".$soap_stations->error);
if(!count($stations)){
    die("there are no stations available");

}

$dsn = 'mysql:host=localhost; dbname=syngenta_new';
$user = 'root';
$password = 'zz';

try {

    $zdbh = new PDO($dsn, $user, $password);
    // var_dump($zdbh); // object(PDO)#1 (0) { }

} catch (PDOException $e) {
    // echo $e->getMessage();
}
//$sth = $dbh->query('show databases;');

$zdbh->query("SET NAMES utf8");
$zdbh->query("TRUNCATE TABLE stations_threats");
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
        $sthz->execute([$value['name']]);
    }
}

$jj=0;
foreach($stations as $station) {
    $jj++;
    if (!in_array($station['f_name'], $stations_in_base)) {
        $sthz = $zdbh->prepare('insert into  `stations` (`name`,`latitude`,`longitude`,`is_available`,`visible`,`user_station_name`) values (?,?,?,?,?,?);');

        $sthz->execute([$station['f_name'], $station['f_latitude'], $station['f_longitude'], 1, 1, !empty($custom_names[$station['f_name']]['custom_name']) ? $custom_names[$station['f_name']]['custom_name'] : 'Станція '.$jj ]);
    }

    if (in_array($station['f_name'], $stations_in_base)) {
        $sthz = $zdbh->prepare('UPDATE `stations` SET `is_available`= 1 where `name` = ? ');
        $sthz->execute([$station['f_name']]);

    }

}





$sth6 = $zdbh->prepare('select `id`, `model`, `code`,`transform_array` from threats where `visible` = 1 and `culture_id` in (select `id` from `cultures` where `visible` = 1);');
$sth6->execute();
$threats = $sth6->fetchAll(PDO::FETCH_ASSOC);





$stations_ids =[];
$stations_visible= [];
$sth6 = $zdbh->prepare('select `id`,`name` from stations where `is_available`= 1 and `visible` = 1');
$sth6->execute();
$id3 = $sth6->fetchAll(PDO::FETCH_ASSOC);
foreach ($id3 as $value){
$stations_ids[$value['name']] = $value['id'];
    $stations_visible[] =  $value['name'];

}




 $start = time();
 $obtained=[];

foreach  ($stations_visible as $station) {
        foreach ($threats as $threat){
          if (!empty($threat['model']) && !empty($threat['code'])) {

              if (isset($obtained[$station][$threat['model']][$threat['code']])){
                $value = $obtained[$station][$threat['model']][$threat['code']];
              } else {
                  $value = StationData($station, $threat['model'], $threat['code']);
                  $obtained[$station][$threat['model']][$threat['code']] = $value;
              }

              if ($value !== false){

               $value = TransformData($value,$threat['transform_array']);

                  echo $station.' '.$threat['model'].' '.$threat['code'].' '.$value.' *'.'<br>';

                  $sthz = $zdbh->prepare('insert into  `stations_threats` (`station_id`,`threat_id`,`value`,`time`,`old`) values (?,?,?,?,?);');
                  $sthz->execute([$stations_ids[$station], $threat['id'], $value, date('d.m.y H:00', time()), 0]);

              }

          }
        }




}

// echo time()- $start;


// преобразование значений в диапазон 0-100
function TransformData($value,$transform_matrix)
{
    $resultvalue = null;
    if ($value < 0) {
        $resultvalue = 0;
    } else {
        $basearr = $transform_matrix;
        $basearr = trim($basearr, ',');


        $prearr = explode(',', $basearr);

        $arr = [];
        foreach ($prearr as $prestr) {

            $strarr = explode('-', $prestr);

            $arr[$strarr[0]] = $strarr[1];


        }


        $oldkey = 0;
        $oldvalue = 0;


        foreach ($arr as $curkey => $curvalue) {

            if ($value <= $curkey) {

                $resultvalue = round($value * ($curvalue - $oldvalue) / ($curkey - $oldkey) + $oldvalue - $oldkey * ($curvalue - $oldvalue) / ($curkey - $oldkey));

                break;
            }

            $oldkey = $curkey;
            $oldvalue = $curvalue;
            $resultvalue = $curvalue;

        }


    }

    return $resultvalue;
}


// получение данных со станции
function StationData($station_name,$model,$code)
{

    $public_key = "";
    $private_key = "";
    $method = "POST";
    $time= gmmktime();
    $request = "/disease/".$station_name."/from/".$time;
   // $request = "/disease/".$station_name."/last/2h";
    $timestamp = gmdate('D, d M Y H:i:s T'); // Date as per RFC2616 - Wed, 25 Nov 2014 12:45:26 GMT
    $content_to_sign = $method.$request.$timestamp.$public_key;
    $signature = hash_hmac("sha256", $content_to_sign, $private_key);
    $headers = [
        "Accept: application/json",
        "Authorization: hmac {$public_key}:{$signature}",
        "Date: {$timestamp}",
    ];
    $data =['data'=>['model'=>$model]];
    $data_string = json_encode($data);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://stage.fieldclimate.com" . $request);
    curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, FALSE );
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    $output = json_decode(curl_exec($ch));
    curl_close($ch);

    if (json_last_error() !='JSON_ERROR_NONE'){
        return false;
    }


        if (isset($output->$station_name)){

            $station_output= $output->$station_name;

            if (isset($station_output[count($station_output)-1]->$code)) {
             // echo  $station_output[count($station_output)-1]->date.' ';
                return $station_output[count($station_output)-1]->$code;
            }
            return false;
        } else {
        return false;
    }

}

?>
