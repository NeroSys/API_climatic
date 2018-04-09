/**
 * Created by фіва on 10.06.2016.
 */
"use strict";

var culturesJSON = [
    {
        "idCulture" : "id_1"
        ,"name" : "РљСѓРєСѓСЂСѓР·Р°"
    }
    ,{
        "idCulture" : "id_2"
        ,"name" : "Р›СЋРїРёРЅ"
    }
    ,{
        "idCulture" : "id_3"
        ,"name" : "РќСѓС‚"
    }
    ,{
        "idCulture" : "id_4"
        ,"name" : "РЎРѕС‡РµРІРёС†СЏ"
    }
    ,{
        "idCulture" : "id_5"
        ,"name" : "Р•СЃРїР°СЂС†РµС‚"
    }
    ,{
        "idCulture" : "id_6"
        ,"name" : "РћРіС–СЂРѕРє"
    }
];
var fieldsJSON = {
    'ChIJ_Y7vgK9C0EARlBkNFDXFp9g' : {
        'ChIJ2QpuAbzy0EARXFnOk844f3I' : {
            'id-pole_111' : {
                'location' : {'lat':48.660098465508256, 'lng':32.75848388671875}
                ,'name' : '1.1.1'
                ,'stations' : {}
                ,'culture' : {}
            }
            ,'id-pole_112' : {
                'location' : {'lat':48.76340097088824,  'lng':32.354736328125}
                ,'name' : '1.1.2'
                // , inf : {}
            }
            ,'id-pole_113' : {
                'location' : {'lat':48.614723427841376, 'lng':32.65960693359375}
                ,'name' : 'Nazvanije 1.1.3'
                // , inf : {}
            }
        }
        ,'ChIJ_Qtj-kvj0EARpjSEydf71-c' : {
            'id-pole_121' : {
                'location' : {'lat':48.99598004392248,'lng':32.20710754394531}
                ,'name' : 'Nazvanije 1.2.1'
                // , inf : {}
            }
            ,'id-pole_122' : {
                'location' : {'lat':48.98381461747991,'lng':32.526397705078125}
                ,'name' : 'Nazvanije 1.2.2'
                // , inf : {}
            }
            ,'id-pole_123' : {
                'location' : {'lat':48.882320528273084,'lng':32.05879211425781}
                ,'name' : 'Nazvanije 1.2.3'
                // , inf : {}
            }
            ,'id-pole_124' : {
                'location' : {'lat':49.055862684194864,'lng':31.95648193359375}
                ,'name' : 'Nazvanije 1.2.4'
                // , inf : {}
            }
        }
    }
};
var fieldsInfoJSON = {
    'id-pole_111' : {
        'location' : {'lat':48.660098465508256, 'lng':32.75848388671875}
        ,'name' : '1.1.1'
        ,'culture' : {
            "idCulture" : "id_1"
            ,"name" : "РљСѓРєСѓСЂСѓР·Р°"
        }
        ,'stations' : [
            { "stationId" : 'dksdfhg3234hh'
                ,"name"       : 'Puma'
                ,"date" : "11.02.2016"
                ,"dangers"    : {
                "id_danger_1" : {"name": "РўР»СЏ11"    ,"percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                ,"id_danger_2" : {"name": "РњРѕС€РєР°11"  ,"percent" :"10%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РІРЅРµСЃРµРЅРЅСЏ: РџСЂРµРїР°СЂР°С‚ 1: РЅРѕСЂРјР° 1"}
                ,"id_danger_3" : {"name": "РЎР°СЂР°РЅР°11","percent" :"20%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РІРЅРµСЃРµРЅРЅСЏ: РџСЂРµРїР°СЂР°С‚ 1: РЅРѕСЂРјР° 5"}
            }
            }
            ,{ "stationId" : 'hdajh859kflk'
                ,"name"       : 'Sirius'
                ,"date" : "11.02.2016"
                ,"dangers"    : {
                    "id_danger_1" : {"name": "РўР»СЏ12"    ,"percent" :"10%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                    ,"id_danger_2" : {"name": "РњРѕС€РєР°12"  ,"percent" :"80%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РІРЅРµСЃРµРЅРЅСЏ: РџСЂРµРїР°СЂР°С‚ 1: РЅРѕСЂРјР° 1"}
                    ,"id_danger_3" : {"name": "РЎР°СЂР°РЅС‡Р°12","percent" :"60%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                }
            }
        ]
    }
    ,'id-pole_112' : {
        'location' : {'lat':48.76340097088824,  'lng':32.354736328125}
        ,'name' : '1.1.2'
        ,'culture' : {
            "idCulture" : "id_2"
            ,"name" : "Р›СЋРїРёРЅ"
        }
        ,'stations' : [
            { "stationId" : 'dksdfhg3234hh'
                ,"name"       : 'Puma'
                ,"date" : "11.02.2016"
                ,"dangers"    : {
                "id_danger_1" : {"name": "РўР»СЏ12311"    ,"percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                ,"id_danger_2" : {"name": "РњРѕС€РєР°1131"  ,"percent" :"80%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РІРЅРµСЃРµРЅРЅСЏ: РџСЂРµРїР°СЂР°С‚ 1: РЅРѕСЂРјР° 11"}
                ,"id_danger_3" : {"name": "РЎР°СЂР°РЅС‡Р°1121","percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
            }
            }
            ,{ "stationId" : 'hdajh859kflk'
                ,"name"       : 'Sirius'
                ,"date" : "11.02.2016"
                ,"dangers"    : {
                    "id_danger_1" : {"name": "РўР»СЏ22"    ,"percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РІРЅРµСЃРµРЅРЅСЏ: РџСЂРµРїР°СЂР°С‚ 1: РЅРѕСЂРјР° 1"}
                    ,"id_danger_2" : {"name": "РњРѕС€РєР°22"  ,"percent" :"80%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                    ,"id_danger_3" : {"name": "РЎР°СЂР°РЅС‡Р°22","percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РІРЅРµСЃРµРЅРЅСЏ: РџСЂРµРїР°СЂР°С‚ 1: РЅРѕСЂРјР° 1"}
                }
            }
        ]
    }
    ,'id-pole_113' : {
        'location' : {'lat':48.614723427841376, 'lng':32.65960693359375}
        ,'name' : '1.1.3'
        ,'culture' : {
            "idCulture" : "id_3"
            ,"name" : "РќСѓС‚"
        }
        ,'stations' : [
            { "stationId" : 'dksdfhg3234hh'
                ,"name"       : 'Puma'
                ,"date" : "11.02.2016"
                ,"dangers"    : {
                "id_danger_1" : {"name": "РўР»СЏ11"    ,"percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                ,"id_danger_2" : {"name": "РњРѕС€РєР°12"  ,"percent" :"60%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                ,"id_danger_3" : {"name": "РЎР°СЂР°РЅС‡Р°1","percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
            }
            }
            ,{ "stationId" : 'hdajh859kflk'
                ,"name"       : 'Sirius'
                ,"date" : "11.02.2016"
                ,"dangers"    : {
                    "id_danger_1" : {"name": "РўР»СЏ43"    ,"percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                    ,"id_danger_2" : {"name": "РњРѕС€РєР°34"  ,"percent" :"60%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                    ,"id_danger_3" : {"name": "РЎР°СЂР°РЅС‡Р°43","percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                }
            }
        ]
    }
    ,'id-pole_121' : {
        'location' : {'lat':48.614723427841376, 'lng':32.65960693359375}
        ,'name' : '1.2.1'
        ,'culture' : {
            "idCulture" : "id_4"
            ,"name" : "РЎРѕС‡РµРІРёС†СЏ"
        }
        ,'stations' : [
            { "stationId" : 'dksdfhg3234hh'
                ,"name"       : 'Puma'
                ,"date" : "11.02.2016"
                ,"dangers"    : {
                "id_danger_1" : {"name": "РўР»СЏ17"    ,"percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                ,"id_danger_2" : {"name": "РњРѕС€РєР°17"  ,"percent" :"90%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                ,"id_danger_3" : {"name": "РЎР°СЂР°РЅС‡Р°78","percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
            }
            }
            ,{ "stationId" : 'hdajh859kflk'
                ,"name"       : 'Sirius'
                ,"date" : "11.02.2016"
                ,"dangers"    : {
                    "id_danger_1" : {"name": "РўР»СЏ44"    ,"percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                    ,"id_danger_2" : {"name": "РњРѕС€РєР°89"  ,"percent" :"90%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                    ,"id_danger_3" : {"name": "РЎР°СЂР°РЅС‡Р°09","percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                }
            }
        ]
    }
    ,'id-pole_122' : {
        'location' : {'lat':48.614723427841376, 'lng':32.65960693359375}
        ,'name' : '1.2.2'
        ,'culture' : {
            "idCulture" : "id_5"
            ,"name" : "Р•СЃРїР°СЂС†РµС‚"
        }
        ,'stations' : [
            { "stationId" : 'dksdfhg3234hh'
                ,"name"       : 'Puma'
                ,"date" : "11.02.2016"
                ,"dangers"    : {
                "id_danger_1" : {"name": "РўР»СЏ21"    ,"percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                ,"id_danger_2" : {"name": "РњРѕС€РєР°22"  ,"percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                ,"id_danger_3" : {"name": "РЎР°СЂР°РЅС‡Р°79","percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
            }
            }
            ,{ "stationId" : 'hdajh859kflk'
                ,"name"       : 'Sirius'
                ,"date" : "11.02.2016"
                ,"dangers"    : {
                    "id_danger_1" : {"name": "РўР»СЏ34"    ,"percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                    ,"id_danger_2" : {"name": "РњРѕС€РєР°86"  ,"percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                    ,"id_danger_3" : {"name": "РЎР°СЂР°РЅС‡Р°989","percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                }
            }
        ]
    }
    ,'id-pole_123' : {
        'location' : {'lat':48.614723427841376, 'lng':32.65960693359375}
        ,'name' : '1.2.3'
        ,'culture' : {
            "idCulture" : "id_6"
            ,"name" : "РћРіС–СЂРѕРє"
        }
        ,'stations' : [
            { "stationId" : 'dksdfhg3234hh'
                ,"name"       : 'Puma'
                ,"date" : "11.02.2016"
                ,"dangers"    : {
                "id_danger_1" : {"name": "РўР»СЏ123"    ,"percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                ,"id_danger_2" : {"name": "РњРѕС€РєР°43"  ,"percent" :"60%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                ,"id_danger_3" : {"name": "РЎР°СЂР°РЅС‡Р°76","percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
            }
            }
            ,{ "stationId" : 'hdajh859kflk'
                ,"name"       : 'Sirius'
                ,"date" : "11.02.2016"
                ,"dangers"    : {
                    "id_danger_1" : {"name": "РўР»СЏ7865"    ,"percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                    ,"id_danger_2" : {"name": "РњРѕС€РєР°44"  ,"percent" :"60%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                    ,"id_danger_3" : {"name": "РЎР°СЂР°РЅС‡Р°1356","percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                }
            }
        ]
    }
    ,'id-pole_124' : {
        'location' : {'lat':48.614723427841376, 'lng':32.65960693359375}
        ,'name' : '1.2.4'
        ,'culture' : {
            "idCulture" : "id_1"
            ,"name" : "РљСѓРєСѓСЂСѓР·Р°"
        }
        ,'stations' : [
            { "stationId"   : 'dksdfhg3234hh'
                ,"name"       : 'Puma'
                ,"date" : "11.02.2016"
                ,"dangers"    : {
                "id_danger_1" : {"name": "РўР»СЏ545"    ,"percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                ,"id_danger_2" : {"name": "РњРѕС€РєР°88"  ,"percent" :"90%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                ,"id_danger_3" : {"name": "РЎР°СЂР°РЅС‡Р°99","percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
            }
            }
            ,{ "stationId"   : 'hdajh859kflk'
                ,"name"       : 'Sirius'
                ,"date" : "11.02.2016"
                ,"dangers"    : {
                    "id_danger_1" : {"name": "РўР»СЏ22"    ,"percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                    ,"id_danger_2" : {"name": "РњРѕС€РєР°55"  ,"percent" :"100%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                    ,"id_danger_3" : {"name": "РЎР°СЂР°РЅС‡Р°44","percent" :"30%", "info": "Р РµРєРѕРјРµРЅРґРѕРІР°РЅРѕ РїРѕРґР°Р»СЊС€РёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЃРёС‚СѓР°С†С–С—"}
                }
            }
        ]
    }

};
var stationsJSON = [
    {
        "stationId" : "hdajh859kflk"
        ,"location" : {lat: 50.350014, lng: 27.919203}
        ,"name" : "Sirius"
        ,"date" : "13.01.16 10:00"
        ,"dangers" : ""
    }
    ,{
        "stationId" : "bh2hahhkjf"
        ,"location" : {lat: 51.403679, lng: 32.736562}
        ,"name" : "Marusya"
        ,"date" : "17.02.16 12:00"
        ,"dangers" : ""
    }
    ,{
        "stationId" : "plnabb83hf12"
        ,"location" : {lat: 47.869943, lng: 31.659988}
        ,"name" : "Venera"
        ,"date" : "18.02.16 22:00"
        ,"dangers" : ""
    }
    ,{
        "stationId" : "bnhufgs56"
        ,"location" : {lat: 48.601688, lng: 38.010085}
        ,"name" : "Casiapea"
        ,"date" : "14.06.16 20:00"
        ,"dangers" : ""
    }
    ,{
        "stationId" : "dksdfhg3234hh"
        ,"location" : {lat: 48.558078, lng: 23.046707}
        ,"name" : "Rita"
        ,"date" : "16.22.16 07:00"
        ,"dangers" : ""
    }
    ,{
        "stationId" : "dksdfhg3234hh"
        ,"location" : {lat: 48.047214, lng: 31.620470}
        ,"name" : "Afrodita"
        ,"date" : "02.02.16 13:00"
        ,"dangers" : ""
    }
    ,{
        "stationId" : "dksdfhg3234hh"
        ,"location" : {lat: 48.006676, lng: 30.526932}
        ,"name" : "Alla"
        ,"date" : "17.08.16 17:00"
        ,"dangers" : ""
    }
    ,{
        "stationId" : "dksdfhg3234hh"
        ,"location" : {lat: 47.697831, lng: 31.329631}
        ,"name" : "Puma"
        ,"date" : "11.08.16 19:00"
        ,"dangers" : ""
    }
];


$(document).ready(function (){
    fieldBlockRender(fieldsInfoJSON);
    setFields(fieldsInfoJSON, s25); // methods from prognosis
    setFields(fieldsInfoJSON, s28); // methods from prognosis
    setCulture(culturesJSON, s26); // methods from prognosis
    setCulture(culturesJSON, s29); // methods from prognosis
    s58.checkSelectedOptions();
    s59.checkSelectedOptions();
    s60.checkSelectedOptions();
    s61.checkSelectedOptions();
    s62.checkSelectedOptions();
    // window.f3 = new Formfilter('#filter-form_3');
    var f3 = new Formfilter('#filter-form_3');


    (function($, undefined) { // reset selects in notify edit
        var btnReset = $(".btn_filter_reset");
        btnReset.bind("click" , function (event) {
            event.preventDefault();
            s28.delCustomSelect();
            s29.delCustomSelect();
            s30.delCustomSelect();
            s33.delCustomSelect();
            s34.delCustomSelect();
            s39.delCustomSelect();
            s40.delCustomSelect();
            s28 = new Selectblock('#select-block_28');
            s29 = new Selectblock('#select-block_29');
            s30 = new Selectblock('#select-block_30');
            s33 = new Selectblock('#select-block_33');
            s34 = new Selectblock('#select-block_34');
            s39 = new Selectblock('#select-block_39');
            s40 = new Selectblock('#select-block_40');
        });

    })($);

    (function($) {
        var  checkBtn = $("#input-checkbox_1")
            ,hiddenForm = $('.set-notifyings__form-notify.set-notifyings__form-notify_hidden')
            ;
        checkBtn.bind('click', function (event) {
            // if ( !hiddenForm.hasClass("active") ) {
            if ( !(checkBtn.is(":not(:checked)")) ) {
                hiddenForm.css("display","block")
                    .animate({
                        "opacity" : 1
                    }
                    ,400
                    ,function () {
                        // $(this).addClass('active');
                        // flag = false;
                        // return false;
                    }
                );
            }
            else {
                hiddenForm.animate({
                        "opacity" : 0
                    }
                    ,400
                    , function () {
                        // $(this).css("display","none").removeClass('active');
                        $(this).css("display","none");
                    }
                );
            }
        });
    })($);

    $('.fields-block__item-btn-arrow').bind('click', showFieldInfo);

    (function ($) {
        var  popupForm    = $(".table-editor__rec")
            ,popupFormBtn = popupForm.find('.table-editor__rec-close')
            ,messageBlock = popupForm.children('.table-editor__rec-inner')
            ,notifyBtn    = $('.list-fields__item-text-btn')
            ;
        popupFormBtn.bind("click", function (event) {

            $(this).closest('.table-editor__rec').animate({
                    "opacity" : 0
                }
                ,400
                ,function () {
                    $(this).css("display","none").removeClass('show');

                }
            );
        });
        notifyBtn.bind('click', function (event) {
            event.preventDefault();
            var curBtn = $(this);
            getDangerInfo(curBtn);
            popupForm.css("display","block")
                .animate({
                    "opacity" : 1
                }
                ,400
                ,function () {
                    $(this).addClass('show');
                }
            );
        });
    })($);
    (function ($) {
        var  popupForm    = $(".table-danger__rec")
            ,popupFormBtn = popupForm.find('.table-danger__rec-close')
            ,messageBlock = popupForm.children('.table-danger__rec-inner')
            ,notifyBtn    = $('.list-dangers__item_btn')
            ,popupDescrBlock = popupForm.find('.table-danger__rec-descr')
            ;
        popupFormBtn.bind("click", function (event) {
            // popupDescrBlock.html("");
            $(this).closest('.table-danger__rec').animate({
                    "opacity" : 0
                }
                ,400
                ,function () {
                    $(this).css("display","none").removeClass('show');
                    popupDescrBlock.html("");
                }
            );
        });
        notifyBtn.bind('click', function (event) {
            event.preventDefault();
            var  curBtn = $(this)
                ,hiddenText = curBtn.children('.list-dangers__item-text_hidden-info').html()
                ;
            console.log(hiddenText);
            popupDescrBlock.html("<p>" + hiddenText + "</p>");
            popupForm.css("display","block")
                .animate({
                    "opacity" : 1
                }
                ,400
                ,function () {
                    $(this).addClass('show');
                }
            );
        });
    })($);
    // events ==============================
    $("#select-block_34").find("select").on("change", function (event) { // block click time select
        var  curItem = $(this)
            ,optionValue = curItem.children('option[selected="selected"]').attr("value")
        // ,options = curItem.find(".select").children('option')
            ,timeSelect = $("#select-block_39")
            ,timeSelectHtml = timeSelect.find(".select")
            ,timeSelectTwo = $("#select-block_40")
            ,timeSelectHtmlTwo = timeSelect.find(".select")
            ;
        // alert("click!");
        if ( parseInt(optionValue) === 0 ) {
            // alert("click! 0");
            timeSelect.addClass('select-block_disabled').css("display", "none");
            timeSelectHtml.attr("disabled", "disabled");
            s39.delCustomSelect();
            s39 = new Selectblock('#select-block_39');
            timeSelectTwo.addClass('select-block_disabled').css("display", "none");
            timeSelectHtmlTwo.attr("disabled", "disabled");
            s40.delCustomSelect();
            s40 = new Selectblock('#select-block_40');
        }
        else if ( parseInt(optionValue) === 1 ) {
            // alert("click! 1");
            timeSelect.removeClass('select-block_disabled').css("display", "block");
            timeSelectHtml.removeAttr("disabled");
            s39.delCustomSelect();
            s39 = new Selectblock('#select-block_39');
            timeSelectTwo.removeClass('select-block_disabled').css("display", "block");
            timeSelectHtmlTwo.removeAttr("disabled");
            s40.delCustomSelect();
            s40 = new Selectblock('#select-block_40');
        }
    });
    // $("#select-block_34").find("select").on("change", function (event) { // block click time select
    //   var  curItem = $(this)
    //       ,optionValue = curItem.children('option[selected="selected"]').attr("value")
    //       // ,options = curItem.find(".select").children('option')
    //       ,timeSelect = $("#select-block_39")
    //       ,timeSelectHtml = timeSelect.find(".select")
    //       ;
    //       // alert("click!");
    //     if ( parseInt(optionValue) === 0 ) {
    //       // alert("click! 0");
    //       timeSelect.addClass('select-block_disabled');
    //       timeSelectHtml.attr("disabled", "disabled");
    //       s39.delCustomSelect();
    //       s39 = new Selectblock('#select-block_39');
    //     }
    //     else if ( parseInt(optionValue) === 1 ) {
    //       // alert("click! 1");
    //       timeSelect.removeClass('select-block_disabled');
    //       timeSelectHtml.removeAttr("disabled");
    //       s39.delCustomSelect();
    //       s39 = new Selectblock('#select-block_39');
    //     }
    // });
    $("#select-block_25").find("select").on("change", function (event) {
        var curItem       = $(this)
            ,resultFieldId = curItem.children('option[selected="selected"]').attr("value")
            ,fieldItems    = $('.fields-block').find(".list-fields__item_field")
            ;
        if ( resultFieldId === "all" ) {
            $(fieldItems[0]).closest('.fields-block').find(".fields-block__item:not(:first)").css("display", "block");
        }
        else {
            for (var i = 0; i < fieldItems.length; i++ ) {
                if ( $(fieldItems[i]).attr("data-field-id") === resultFieldId ) {
                    $(fieldItems[i]).closest(".fields-block__item").css("display","block")
                        .siblings().css("display","none")
                    ;
                    break;
                }
            }
        }
    });
    $("#select-block_26").find("select").on("change", function (event) {
        var curItem       = $(this)
            ,resultCultureId = curItem.children('option[selected="selected"]').attr("value")
            ,cultureItems    = $('.fields-block').find(".list-fields__item_culture")
            ;
        if ( resultCultureId === "all" ) {
            $(cultureItems[0]).closest('.fields-block').find(".fields-block__item:not(:first)").css("display", "block");
        }
        else {
            for (var i = 0; i < cultureItems.length; i++ ) {
                if ( $(cultureItems[i]).attr("data-culture-id") === resultCultureId ) {
                    $(cultureItems[i]).closest(".fields-block__item").css("display","block")
                        .siblings().css("display","none")
                    ;
                    break;
                }
            }
        }
    });


    $(".notifyings-list__item-btn.notifyings-list__item-btn_del").bind("click", function (event) {
        var  curBtn = $(this)
            ,notifyItem = curBtn.closest('.notifyings-list__item')
        //,fieldId        = fieldBlockItem.find('.list-fields__item_field').attr('data-field-id')
            ,notifyList = $('.notifyings-list__item-btn_edit').closest('.notifyings-list__item').children('.notify')
            ,notifyId  = notifyList.attr('data-note');

        var lang = $("html").attr('lang');
        var oAjax = $.ajax({
            'url'      :'/'+lang+'/cabinet/forfield/user-threat.html'
            ,'method'   : 'POST'
            ,'dataType' : 'json'
            ,'timeout'  : 10000 // Р СР В°Р С”РЎРѓ. Р Р†РЎР‚Р ВµР С Р С•Р В±РЎР‚Р В°Р В±Р С•РЎвЂљР С”Р С‘ Р В·Р В°Р С—РЎР‚Р С•РЎРѓР В°
            ,'data'     : {
                "id" : notifyId,
                "fieldtok" : field_tok
            }
            , 'success' : function (oServerResponse) {
                notifyItem.remove();
            }
            , 'error'   : function (oAjax) {
                alert('РџСЂРѕР±Р»РµРјС‹, РїРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ');
            }
            , 'complete': function (oAjax) { // РћР±СЊРµРґРµРЅСЏРµС‚ Succes Рё Error . РўРµС…РЅРёС‡РµСЃРєР°СЏ Р»РѕРіРёРєР°
                if(oAjax.status == 200) { // 200 = OK
                    if ( typeof(oAjax.responseJSON) == 'undefined'){
                        console.error('could not parse server response as JSON object', oAjax.responseText);
                    }
                    else {}
                }
                else if (oAjax.statusText == "timeout") {
                    console.error('AJAX request timed out');
                }
                else if (oAjax.status == 403) { // access forbidden
                    console.error('access forbidden');
                }
                else {
                    console.error("Unpredicated error", oAjax);
                }
            }
        });




    });
    $(".fields-block__item-btn_del").bind("click", function (event) {
        var  curBtn    = $(this)
            ,fieldBlockItem = curBtn.closest('.fields-block__item')
            ,fieldId        = fieldBlockItem.find('.list-fields__item_field').attr('data-field-id')
            ,fieldItem = curBtn.closest('.fields-block__item')
            ;
        var lang = $("html").attr('lang');
        var oAjax = $.ajax({
            'url'      :'/'+lang+'/cabinet/forfield/field.html'
            ,'method'   : 'POST'
            ,'dataType' : 'json'
            ,'timeout'  : 10000 // Р СР В°Р С”РЎРѓ. Р Р†РЎР‚Р ВµР С Р С•Р В±РЎР‚Р В°Р В±Р С•РЎвЂљР С”Р С‘ Р В·Р В°Р С—РЎР‚Р С•РЎРѓР В°
            ,'data'     : {
                "id" : fieldId,
                "fieldtok" : field_tok
            }
            , 'success' : function (oServerResponse) {
                fieldItem.remove();
            }
            , 'error'   : function (oAjax) {
                alert('РџСЂРѕР±Р»РµРјС‹, РїРѕРІС‚РѕСЂРёС‚Рµ РїРѕРїС‹С‚РєСѓ РїРѕР·Р¶Рµ');
            }
            , 'complete': function (oAjax) { // РћР±СЊРµРґРµРЅСЏРµС‚ Succes Рё Error . РўРµС…РЅРёС‡РµСЃРєР°СЏ Р»РѕРіРёРєР°
                if(oAjax.status == 200) { // 200 = OK
                    if ( typeof(oAjax.responseJSON) == 'undefined'){
                        console.error('could not parse server response as JSON object', oAjax.responseText);
                    }
                    else {}
                }
                else if (oAjax.statusText == "timeout") {
                    console.error('AJAX request timed out');
                }
                else if (oAjax.status == 403) { // access forbidden
                    console.error('access forbidden');
                }
                else {
                    console.error("Unpredicated error", oAjax);
                }
            }
        });




    });
    $(".fields-block__item-btn_edit").bind("click", function (event) {
        event.preventDefault();
        var   curBtn         = $(this)
            ,fieldBlockItem = curBtn.closest('.fields-block__item')
            ,fieldId        = fieldBlockItem.find('.list-fields__item_field').attr('data-field-id')
        // ,fieldName      = fieldBlockItem.find('.list-fields__item_field').attr('data-field-id')
            ,cultureId      = fieldBlockItem.find('.list-fields__item_culture').attr('data-culture-id')
            ,lat            = fieldsInfoJSON[fieldId].location.lat
            ,lng            = fieldsInfoJSON[fieldId].location.lng
            ,fieldName      = fieldsInfoJSON[fieldId].name
            ,regionId       = ""
            ,districtId     = ""
            ,formFieldBlock = $('#hidden-block_form-field')
            ,inputName      = formFieldBlock.find(".input_name")
            ,inputLat       = formFieldBlock.find(".input_latitude")
            ,inputLng       = formFieldBlock.find(".input_longitude")
            ,requestGetDistrictComplite = false
            ,mapSection     = $(".map-app")
            ,reqSectionPos  = mapSection.offset().top
            ,inputFieldId = $('.form-feild__hidden-input').find("input[nameh='fieldId']")
            ;
        $('#hidden-block_info-field').removeClass('show');
        inputName.val(fieldName);
        inputLat.val(lat);
        inputLng.val(lng);
        inputFieldId.val(fieldId);
        var breakFlag = false;
        for( var regId in fieldsJSON ) {
            if(breakFlag === true) {break;}
            for( var disId in fieldsJSON[regId] ) {
                if (breakFlag === true) {break;}
                for( var fieldkey in fieldsJSON[regId][disId] ) {
                    if ( fieldkey == fieldId ) {
                        regionId = regId;
                        districtId = disId;
                        breakFlag = true;
                        break;
                    }
                }
            }
        }
        getDistrict(regionId, s8, function () {
            requestGetDistrictComplite = true;
        });

        var regOptions = $("#select-block_7").find("select").children("option");
        optionChecker(regOptions, regionId , s7);

        var timerReqDistr = setInterval( function() {
                if ( requestGetDistrictComplite == true ) {
                    var disOptions = $("#select-block_8").find("select").children("option");
                    optionChecker(disOptions, districtId , s8);
                    clearInterval(timerReqDistr);
                }
            }
            ,100
        );
        var cultureOptions = $("#select-block_11").find("select").children("option");
        optionChecker(cultureOptions, cultureId , s11);

        s9.refreshSelect(arFieldStations[fieldId], s9);
        s23.refreshSelect(arFieldStations[fieldId], s23);
        s24.refreshSelect(arFieldStations[fieldId], s24);

        $("body, html").animate({scrollTop : reqSectionPos},600);

        formFieldBlock.addClass("show");
    });

    $("#select-block_28").find("select").on("change", function (event) {
        // debugger;
        var  curItem     = $(this)
            ,fieldId     = curItem.children("option[selected='selected']").attr("value")
            ,cultureId   = fieldsInfoJSON[fieldId].culture.idCulture
            ,arStation   = fieldsInfoJSON[fieldId].stations
            ,arDangerObj = []
            ,count       = 0
            ,culrureOptions  = $("#select-block_29").find("select").children("option")
            ,culruredivhide  = $("#select-block_29").find('div[data-value="hide"]')
            ;
        for(var i=0; i < culrureOptions.length; i++) {
            if ( $(culrureOptions[i]).attr("value") == cultureId ) {
                var cultureSelect = culrureOptions[i];
                break;
            }
        }
        s29.itemCliker( $(cultureSelect));

        $(culruredivhide).attr("data-value", '');

        var sortDangers = function (dangerA, dangerB) {
            // return parseInt(dangerA.percent) - parseInt(dangerB.percent); from min to max
            return parseInt(dangerB.percent) - parseInt(dangerA.percent); // from max to min
        }

        // for( var i = 0; i < arStation.length; i++) {
        for( var i = 0; i < 1; i++) {
            var dangers = arStation[i].dangers;
            for ( var key in dangers ) {
                arDangerObj[count] = {
                    "val" : key
                    ,"name" : dangers[key].name
                };
                count++;
            }
        }
        arDangerObj.sort(sortDangers);
        s30.refreshSelect(arDangerObj, s30);
    });

    $(".notifyings-list__item-btn_del").bind("click", function (event) {
        var  curBtn = $(this)
            ,notifyItem = curBtn.closest('.notifyings-list__item');
        ;
        notifyItem.remove();
    });
    $('.notifyings-list__item-btn_edit').bind("click", function (event) {
        var notifyList = $(this).closest('.notifyings-list__item').children('.notify');
        setNotifyInfo(notifyList);
    });

    // Logic ======================================
    function setNotifyInfo ( jqNotifyList ) { // РџР РђР’РљР!!!!!!!
        // debugger;
        var  notifyId  = jqNotifyList.attr('data-note')
            ,fieldId   = jqNotifyList.children('.notify__item_field').attr('data-field-id')
            ,dangerId  = jqNotifyList.children('.notify__item_danger').attr('data-danger-id')
            ,dlvlId    = jqNotifyList.children('.notify__item_danger-lvl').attr('data-dlvl-id')
            ,ntypeId   = jqNotifyList.children('.notify__item_type_notify').attr('data-ntype-id')
        // ,freqId    = jqNotifyList.children('.notify__item_freq').attr('data-freq-id')
            ,timeIdOne = jqNotifyList.children('.notify__item_time').attr('data-time-id-1')
            ,formSave       = $('#notifyings_2')
            ,inputNotifyId  = formSave.find('input[nameh="notifyId"]')
            ,inputfieldId   = formSave.find('input[nameh="fieldId"]')
            ,inputdangerId  = formSave.find('input[nameh="dangerId"]')
            ,percOptions    = $('#select-block_54').find("select").children('option')
            ,ntypeOptions   = $('#select-block_55').find("select").children('option')
        // ,freqOptions    = $('#select-block_56').find("select").children('option')
            ,timeOneOptions = $('#select-block_57').find("select").children('option')
            ;
        optionChecker(percOptions, dlvlId , s54);
        optionChecker(ntypeOptions, ntypeId, s55);
        // optionChecker(freqOptions, freqId, s56);
        optionChecker(timeOneOptions, timeIdOne, s57);
        inputNotifyId.val(notifyId);
        inputfieldId.val(fieldId);
        inputdangerId.val(dangerId);

        // console.log("asdad");
    }
    function optionChecker(arOptions, sCheck, oSelect) {
        for(var i=0; i < arOptions.length; i++) {
            if ( $(arOptions[i]).attr("value") == sCheck ) {
                var select = arOptions[i];
                break;
            }
        }
        oSelect.itemCliker( $(select) );
    }
    function getDangerInfo (jqButtonHelp) {
        var  dangerBlockinfo = jqButtonHelp.closest(".list-fields__item-text_danger").children(".list-fields__item-text-val")
            ,dangerPercent   = dangerBlockinfo.html()
            ,dangerInfo      = dangerBlockinfo.attr('data-info')
            ,recDescr        = $(".table-editor__rec").find('.table-editor__rec-descr')
            ;
        recDescr.html("").html("<p>" + dangerInfo + "</p>");
    }
    function fieldBlockRender (jsonFields) {
        var  fieldBlock        = $(".fields-block")
            ,fieldBlockItem    = fieldBlock.children(".fields-block__item:first")
            ,curfieldBlockItem = null
            ;
        for (var fieldId in jsonFields) {
            fieldBlock.append( fieldBlockItem.clone() );
            curfieldBlockItem = fieldBlock.children(".fields-block__item:last");
            fieldBlockItemAdd(fieldId, jsonFields, curfieldBlockItem);
        }
    }
    function fieldBlockItemAdd (sFieldId, jsonFields, jqCurBlockItem) {
        var fieldBlock     = $(".fields-block")
            ,listField      = jqCurBlockItem.find(".list-fields")
            ,itemField      = listField.children('.list-fields__item_field')
            ,itemCulture    = listField.children('.list-fields__item_culture')
            ,itemDangerName = listField.children('.list-fields__item_danger_name')
            ,itemDangerInfo = listField.children('.list-fields__item_danger_info')
            ,arStation      = jsonFields[sFieldId].stations
            ,arDangerObj    = []
            ,count = 0
            ;
        var sortDangers = function (dangerA, dangerB) {
            // return parseInt(dangerA.percent) - parseInt(dangerB.percent); from min to max

            if (dangerB.id == dangerA.id) {
                if (parseInt(dangerB.percent) && parseInt(dangerA.percent)) {
                    return 100000000 * (parseInt(dangerB.id) - parseInt(dangerA.id)) + (parseInt(dangerB.percent) - parseInt(dangerA.percent));
                } else {
                    if (parseInt(dangerB.percent)) {
                        return 1;
                    } else if (parseInt(dangerA.percent)) {
                        return -1;
                    } else {
                        return parseInt(dangerB.id) - parseInt(dangerA.id);
                    }
                }
            } else {
                var valA = 0;
                var valB = 0;

                for( var i = 0; i < arDangerObj.length; i++) {

                    if (arDangerObj[i].id == dangerA.id) {
                        if (parseInt(arDangerObj[i].percent)) {
                            valA = Math.max(valA, arDangerObj[i].percent);
                        }

                    }
                    if (arDangerObj[i].id == dangerB.id) {
                        if (parseInt(arDangerObj[i].percent)) {
                            valB = Math.max(valB, arDangerObj[i].percent);
                        }
                    }

                }
                if (valB == valA){
                    return parseInt(dangerB.id) - parseInt(dangerA.id);
                } else {
                    return valB - valA; }
            }
            // from max to min

        }

        for( var i = 0; i < arStation.length; i++) {
            var dangers = arStation[i].dangers;
            for ( var key in dangers ) {
                arDangerObj[count] = {
                    "lat" : jsonFields[sFieldId].location.lat
                    ,"lng" : jsonFields[sFieldId].location.lng
                    ,"idStation" : arStation[i].stationId
                    ,"id" : key
                    ,"name" : dangers[key].name
                    ,"percent" : dangers[key].percent
                    ,"info" : dangers[key].info
                };
                count++;
            }
        }
        arDangerObj.sort(sortDangers);

        itemField.attr("data-field-id", sFieldId);
        itemField.children().html(jsonFields[sFieldId].name);
        itemCulture.attr("data-culture-id", jsonFields[sFieldId].culture.idCulture )
            .children().html(jsonFields[sFieldId].culture.name)
        ;
        for (var i = 0; i < arDangerObj.length; i++) {
            var purepercent = arDangerObj[i].percent.length > 3 ? '-' : arDangerObj[i].percent;
            // var purepercent = arDangerObj[i].percent;
            var CurSname = '';
            var Curlat = '';
            var Curlng = '';
            for (var ii = 0; ii < stationsJSON.length; ii++) {

                if (stationsJSON[ii].stationId == arDangerObj[i].idStation){
                    CurSname = stationsJSON[ii].name;
                    Curlat = stationsJSON[ii].location.lat;
                    Curlng = stationsJSON[ii].location.lng;
                }
            }
            var myLatlng1 = new google.maps.LatLng(Curlat, Curlng);
            var myLatlng2 = new google.maps.LatLng(arDangerObj[i].lat, arDangerObj[i].lng);

            var distance = google.maps.geometry.spherical
                .computeDistanceBetween(myLatlng1,myLatlng2);

            distance = Math.floor(distance/1000);

            itemDangerName.append( "<div data-danger-id='" + arDangerObj[i].id
                + "' class='list-fields__item-text'>"
                + arDangerObj[i].name+' - '+'РњРµС‚РµРѕСЃС‚Р°РЅС†РёСЏ: "'+"<em>"+CurSname+'", '+ "</em>"  + distance +"РєРј."+"</div>"
            );
            // itemDangerInfo.append( "<div class='list-fields__item-text list-fields__item-text_danger' data-danger-id='" + arDangerObj[i].id + "'> \
            // 							            <span class='list-fields__item-text-val' data-info='" + arDangerObj[i].info + "' >" + purepercent  + "</span> \
            // 							            <span class='list-fields__item-text-btn'><a class='btn btn_orange btn_help' href='#'>" + recomendations_button + "</a></span> \
            // 						           </div>"
            // 					            );
            itemDangerInfo.append( "<div class='list-fields__item-text list-fields__item-text_danger' data-danger-id='" + arDangerObj[i].id + "'> \
                                <span class='list-fields__item-text-val' data-info='" + arDangerObj[i].info + "' >" + purepercent  + "</span> \
                                <span class='list-fields__item-text-btn'><a class='btn btn_orange btn_help' href='#'>" + "Р РµРєРѕРјРµРЅРґР°С†РёРё" + "</a></span> \
                             </div>"
            );
        }
    }

    function showFieldInfo (event) {
        var  btnArrow    = $(this)
            ,fields      = btnArrow.closest('.fields-block__item').find('.list-fields__item-text')
            ,fieldBtns   = btnArrow.closest('.fields-block__item').find('.fields-block__item-btn')
            ;
        if ( !btnArrow.hasClass('active') ) {
            fieldBtns.css("display","inline-block");
            fields.css("display","block");
            btnArrow.addClass('active');
        }
        else {
            fieldBtns.css("display","none");
            fields.css("display","none");
            btnArrow.removeClass('active');
        }
    }
});

function setFields (fieldsInfoJSON, oSelectBlock) {
    if ( Object.keys(fieldsInfoJSON).length) {
        var arrSelect = [];
        var count = 0;
        for(var key in fieldsInfoJSON) {
            arrSelect[count] = {
                "name" : fieldsInfoJSON[key].name
                ,"val"  : key
            };
            count++;
        }
        oSelectBlock.refreshSelect(arrSelect, oSelectBlock);
    }
    else {
        // alert("РћС€РёР±РєР° РґР°РЅРЅС‹С… Рѕ РІСЃРµС… РїРѕР»СЏС…!!!");
    }
}
function setCulture (aCultures, oCultureSelect) {
    var arrSelect = [];
    //console.debug(aCultures);
    aCultures.forEach(function (item,i,arr) {
        arrSelect[i] = {
            "name" : item.name
            ,"val"  : item.idCulture
        };
    });
    oCultureSelect.refreshSelect(arrSelect, oCultureSelect); // РћР±РЅРѕРІР»РµРЅРёРµ cРµР»РµРєС‚Р° РєСѓР»СЊС‚СѓСЂ
}