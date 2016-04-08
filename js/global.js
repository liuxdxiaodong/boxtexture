/**
 * Created by XiaodongLiu on 2016/3/9.
 */
var scene, camera, renderer, container,
    plane, sceneCube, skyBox, envirCube;
var ambientLight, spotLight, mtrColor;
var effectController;
var raycaster = new THREE.Raycaster(),
    SELECTED, INTERSECTED;
var mouse = new THREE.Vector2(),
    offset = new THREE.Vector3();
var mesh = null,
    control,
    boxGroup,
    boxIdx, clickIndex, selectIndex, modeIndex;
var currentBoxIdx, currentHex,
    materialAttr;

var AUTOMAN = 0;
var SETBGSHOW = 0;

var VPATH = 'images/mvt/';
var BPATH = 'images/mbt/';
var EPATH = 'images/met/';
var envirPath = 'images/skybox/';
var envirUrls = [
    envirPath + 'px.jpg', envirPath + 'nx.jpg',
    envirPath + 'py.jpg', envirPath + 'ny.jpg',
    envirPath + 'pz.jpg', envirPath + 'nz.jpg'
];

var diffuseColor = new THREE.Color();
var specularColor = new THREE.Color();

var parameter = {
    LIGHTPOSX: 0,
    LIGHTPOSY: 200,
    LIGHTPOSZ: 700,
    LIGHTITS: 1,

    CAMERAX: 0,
    CAMERAY: 0,
    CAMERAZ: 200,
    MOVESTEP: 1,

    ambientColor: 0xaaaaaa,
    spotLightColor: 0xffffff,
    shininess: 5,
    specular: 0xffffff,
    bumpScale: 20,
    transparent: 1,
    reflectivity: 1,

    metal: true,
    shading: THREE.SmoothShading
};

var config = {
    CONTAINID: 'jScene',
    MTREID: 'mtrExistId',
    MTRBID: 'mtrBasicId',
    MTRVID: 'mtrVariaId',

    BTNLOADID: 'upLoadBtn',
    BTNOKID: 'okBtn',
    BTNSUBMITID: 'submitBtn',
    BTNCANCELID: 'cancelBtn',
    BTNUPID: 'upBtn',
    BTNDOWNID: 'downBtn',
    BTNLEFTID: 'leftBtn',
    BTNRIGHTID: 'rightBtn',
    BTNFRONTID: 'frontBtn',
    BTNBACKID: 'backBtn',

    RDOAUTOFORMID: 'autoForm',
    RDOMANFORMID: 'manForm',
    CHKSPLITFORMID: 'sForm',
    CHKAUTOMANAME: 'forms',
    CHKBACKGROUND: 'chkBg',
    SLTBOXINDEX: 'boxArrange',
    SLTMTRGROUP: 'mtrGroup',
    SLTOBJGROUP: 'objGroup',

    IPTLIGHTX: 'lightX',
    IPTLIGHTY: 'lightY',
    IPTLIGHTZ: 'lightZ',
    IPTLIGHTITS: 'lightIntense',
    IPTSTEPMOVE: 'stepMove',

    AMBIENT: 'ambient',
    SHININESS: 'shininess',
    DIFFUSE: 'diffuse',
    SPECULAR: 'specular',
    TRANSPARENT: 'transparent',
    BUMP: 'bump',
    REFLECT: 'reflect',

    BORDERCOLOR: '#0f0',
    DEFAULTIMG: 'images/skybox/nx.jpg',

    CALLFILE: 'load.html',

    CLICKPARTALERT: '请选择需要修改材质的部分！',
    CLICKATTRALERT: '请选择帖图模式！',

    L: 'l',
    M: 'M',
    S: 's',
    MIMG: 'MIMG/',
    OIMG: 'OIMG/',
    JPG: '.jpg',
    PNG: '.png',
    ALPHA: '_alpha'

};

var sltBoxObj   = document.getElementById(config.SLTBOXINDEX);
var sltMtrGroup = document.getElementById(config.SLTMTRGROUP);
var sltObjGroup = document.getElementById(config.SLTOBJGROUP);
var chkSplitObj = document.getElementById(config.CHKSPLITFORMID);
var chkBg        = document.getElementById(config.CHKBACKGROUND);
var btnUp        = document.getElementById(config.BTNUPID);
var btnDown      = document.getElementById(config.BTNDOWNID);
var btnLeft      = document.getElementById(config.BTNLEFTID);
var btnRight     = document.getElementById(config.BTNRIGHTID);
var btnFront     = document.getElementById(config.BTNFRONTID);
var btnBack      = document.getElementById(config.BTNBACKID);
var iptLightX    = document.getElementById(config.IPTLIGHTX);
var iptLightY    = document.getElementById(config.IPTLIGHTY);
var iptLightZ    = document.getElementById(config.IPTLIGHTZ);
var iptLightIts  = document.getElementById(config.IPTLIGHTITS);
var iptStepMove  = document.getElementById(config.IPTSTEPMOVE);

var objFiles = [
    'data/model_tea/tea2.obj',
    'data/model_package/package.obj',
    'data/CCQ02MD01/CCQ02MD01.obj',
    'data/CCQ02MD02/CCQ02MD02.obj',
    'data/CCQ02MD03/CCQ02MD03.obj',
    'data/CCQ02MD04/CCQ02MD04.obj',
    'data/CCQ02MD05/CCQ02MD05.obj',
    'data/CCQ02MD06/CCQ02MD06.obj',
    'data/CCQ02MD07/CCQ02MD07.obj',
    'data/model_pd/PDMODEL.obj'
];

var mtlFiles = [
    'data/model_tea/tea2.mtl',
    'data/model_package/package.mtl',
    'data/CCQ02MD01/CCQ02MD01.mtl',
    'data/CCQ02MD02/CCQ02MD02.mtl',
    'data/CCQ02MD03/CCQ02MD03.mtl',
    'data/CCQ02MD04/CCQ02MD04.mtl',
    'data/CCQ02MD05/CCQ02MD05.mtl',
    'data/CCQ02MD06/CCQ02MD06.mtl',
    'data/CCQ02MD07/CCQ02MD07.mtl',
    'data/model_pd/PDMODEL.mtl'
];

var objIdxList = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
];

var objNameList = [
    'teaBox',
    'package',
    'MD01',
    'MD02',
    'MD03',
    'MD04',
    'MD05',
    'MD06',
    'MD07',
    'teaBag'
];
var objBoxNum = [
    31,
    8,
    6,
    16,
    10,
    8,
    39,
    18,
    43,
    4
];

var mcPosLists = [
    [0, 0, -10, 20, 700],
    [1, 0, -1, -0.5, 10],
    [2, 50, -50, 25, 700],
    [3, 0, -80, 0, 800],
    [4, 120,  20, -160, 800],
    [5, 250, 180, -450, 800],
    [6, 0, -100, 30, 800],
    [7, 120, 200, -450, 800],
    [8, -550, -100, 0, 800],
    [9, 0, -30, 0, 500]
];

var mtrModeGroup = [
    '高光帖图',
    '透明帖图'
];

var mtrModeChs = {
    specMode: [0, 0, 1, 1, 0, 0, 0],
    transMode: [0, 0, 1, 0, 1, 0, 0]
};

var BTNATTR = [
    config.AMBIENT,
    config.SHININESS,
    config.DIFFUSE,
    config.SPECULAR,
    config.TRANSPARENT,
    config.BUMP,
    config.REFLECT
];

var MODEBTNID = [
    'mepAmbtBtn',
    'mepShinBtn',
    'mepDiffBtn',
    'mepSpelBtn',
    'mepTranBtn',
    'mepBumpBtn',
    'mepReftBtn'
];

var MODEINPUTID = [
    'mepAmbtIpt',
    'mepShinIpt',
    'mepDiffIpt',
    'mepSpelIpt',
    'mepTranIpt',
    'mepBumpIpt',
    'mepReftIpt'
];

var MODECHECKID = [
    'mepAmbtChk',
    'mepShinChk',
    'mepDiffChk',
    'mepSpelChk',
    'mepTranChk',
    'mepBumpChk',
    'mepReftChk'
];

var ELIST = [
    'met1.png',
    'met2.png',
    'met3.png',
    'met4.png',
    'met5.png'
];

var ENAME = [
    '部件1',
    '部件2',
    '部件3',
    '部件4',
    '部件5'
];

var EID = [
    'met1',
    'met2',
    'met3',
    'met4',
    'met5'
];

var BLIST = [
    'HY1000',
    'HY1001',
    'HY1002',
    'HY1003',
    'HY1004',
    'HY1005',
    'HY1006',
    'HY1007',
    'HY1008',
    'HY1009',
    'HY1010',
    'HY1011',
    'HY1012',
    'HY1013',
    'HY1014',
    'HY1015',
    'HY1016',
    'HY1017',
    'HY1018',
    'HY1019',
    'HY1020',
    'HY1021',
    'HY1022',
    'HY1023',
    'HY1024',
    'HY1025',
    'HY1026',
    'HY1027',
    'HY1028',
    'HY1029',
    'HY1030',
    'HY1031',
    'HY1032',
    'HY1033',
    'HY1034',
    'HY1035',
    'HY1036',
    'HY1037',
    'HY1038',
    'HY1039',
    'HY1040',
    'HY1041',
    'HY1042',
    'HY1043',
    'HY1044',
    'HY1045',
    'HY1046',
    'HY1047',
    'HY1048',
    'HY1049',
    'HY1050',
    'HY1051',
    'HY1052',
    'HY1053',
    'HY1054',
    'HY1055',
    'HY1056',
    'HY1057',
    'HY1058',
    'HY2001',
    'HY2002',
    'HY2003',
    'HY2004',
    'HY2005',
    'HY2006',
    'HY2007',
    'HY2008',
    'HY2009',
    'HY2010',
    'HY2011',
    'HY2012',
    'HY2013',
    'HY2014',
    'HY2015',
    'HY2016',
    'HY2017',
    'HY2018',
    'HY2019',
    'HY2020',
    'HY2021',
    'HY2022',
    'HY2023',
    'HY2024',
    'HY2025',
    'HY2026',
    'HY2027',
    'HY2028',
    'HY2029',
    'HY2030',
    'HY2031',
    'HY2032',
    'HY2033',
    'HY2034',
    'HY2035',
    'HY2036',
    'HY2037',
    'HY2038',
    'HY2039',
    'HY2040',
    'HY2041',
    'HY2042',
    'HY2043',
    'HY2044',
    'HY2045',
    'HY2046',
    'HY2047',
    'HY2048',
    'HY2049',
    'HY2050',
    'HY2051',
    'HY2052',
    'HY2053',
    'HY2054',
    'HY2055',
    'HY2056',
    'HY2057',
    'HY2058',
    'HY2059'
    ];

var BID = BLIST;
    //var BLIST = [
//    'mbt1.jpg',
//    'mbt2.jpg',
//    'mbt3.jpg',
//    'mbt4.jpg',
//    'mbt5.jpg',
//    'mbt6.jpg',
//    'mbt7.jpg'
//];
//
//var BNAME = [
//    '材质1',
//    '材质2',
//    '材质3',
//    '材质4',
//    '材质5',
//    '材质6',
//    '材质7'
//];
//
//var BID = [
//    'mbt1',
//    'mbt2',
//    'mbt3',
//    'mbt4',
//    'mbt5',
//    'mbt6',
//    'mbt7'
//];

var VLIST = [
    'logo_01',
    'logo_02',
    'logo_03',
    'logo_04',
    'logo_05',
    'logo_06',
    'logo_07',
    'text_01',
    'text_02',
    'text_03',
    'text_04'
];

var VNAME = VLIST;
var VID = VLIST;


var iDiffuse =        [1, 1, 1, 1, 1, 1,1];
var iSpecular =       [1, 1, 1, 1, 1, 1, 1];
var iTransparent =    [1, 1, 1, 1, 1, 1, 1];
var iBump =            [1, 1, 1, 1, 1, 1, 1];
var iReflect =        [1, 1, 1, 1, 1, 1, 1];
var iDefault =        [1, 1, 1, 1, 1, 1, 1];