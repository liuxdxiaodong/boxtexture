/**
 * Created by XiaodongLiu on 2016/3/9.
 */
var scene, camera, renderer, container,
    plane, sceneCube, skyBox, envirCube;
var ambientLight, spotLight;
var effectController;
var raycaster = new THREE.Raycaster(),
    SELECTED, INTERSECTED;
var mouse = new THREE.Vector2(),
    offset = new THREE.Vector3();
var mesh = null,
    control,
    boxGroup,
    boxIdx, clickIndex, selectIndex, modeIndex,
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
    M: 'm',
    S: 's',

};

var sltBoxObj = document.getElementById(config.SLTBOXINDEX);
var sltMtrGroup = document.getElementById(config.SLTMTRGROUP);
var sltObjGroup = document.getElementById(config.SLTOBJGROUP);
var chkSplitObj = document.getElementById(config.CHKSPLITFORMID);
var chkBg = document.getElementById(config.CHKBACKGROUND);

var iptLightX = document.getElementById(config.IPTLIGHTX);
var iptLightY = document.getElementById(config.IPTLIGHTY);
var iptLightZ = document.getElementById(config.IPTLIGHTZ);
var iptLightIts = document.getElementById(config.IPTLIGHTITS);

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
    9,
    10
];

var objBoxNum = [
    1,
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
    [0, 0, 0, 0, 200],
    [1, 0, -10, 20, 700],
    [2, 0, -1, -0.5, 10],
    [3, 50, -50, 25, 700],
    [4, 0, -80, 0, 800],
    [5, 120,  20, -160, 800],
    [6, 250, 180, -450, 800],
    [7, 0, -100, 30, 800],
    [8, 120, 200, -450, 800],
    [9, -550, -100, 0, 800],
    [10, 0, -30, 0, 500]
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
    'mbt1.jpg',
    'mbt2.jpg',
    'mbt3.jpg',
    'mbt4.jpg',
    'mbt5.jpg',
    'mbt6.jpg',
    'mbt7.jpg'
];

var BNAME = [
    '材质1',
    '材质2',
    '材质3',
    '材质4',
    '材质5',
    '材质6',
    '材质7'
];

var BID = [
    'mbt1',
    'mbt2',
    'mbt3',
    'mbt4',
    'mbt5',
    'mbt6',
    'mbt7'
];

var VLIST = [
    'mvt1.bmp',
    'mvt2.jpg',
    'mvt3.jpg',
    'mvt4.jpg',
    'mvt5.jpg',
    'mvt6.png',
    'mvt7.png',
    'mvt8.png'
];

var VNAME = [
    '个性1',
    '个性2',
    '个性3',
    '个性4',
    '个性5',
    '个性6',
    '个性7',
    '个性8'
];

var VID = [
    'mvt1',
    'mvt2',
    'mvt3',
    'mvt4',
    'mvt5',
    'mvt6',
    'mvt7',
    'mvt8'
];


var iDiffuse =        [1, 1, 1, 1, 1, 1,1];
var iSpecular =       [1, 1, 1, 1, 1, 1, 1];
var iTransparent =    [1, 1, 1, 1, 1, 1, 1];
var iBump =            [1, 1, 1, 1, 1, 1, 1];
var iReflect =        [1, 1, 1, 1, 1, 1, 1];
var iDefault =        [1, 1, 1, 1, 1, 1, 1];