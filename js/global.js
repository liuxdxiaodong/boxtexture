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
    materialAttr,
    aLevel = 0xffffff;

var AUTOMAN = 0;
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

var config = {
    CONTAINID: 'jScene',
    MTREID: 'mtrExistId',
    MTRBID: 'mtrBasicId',
    MTRVID: 'mtrVariaId',
    LOADBTNID: 'upLoadBtn',
    OKBTNID: 'okBtn',
    SUBMITBTNID: 'submitBtn',
    CANCELBTNID: 'cancelBtn',

    AUTOFORMID: 'autoForm',
    MANFORMID: 'manForm',
    SPLITFORMID: 'sForm',
    BOXINDEX: 'boxArrange',
    AUTOMANAME: 'forms',
    MTRGROUP: 'mtrGroup',
    OBJGROUP: 'objGroup',

    AMBIENT: 'ambient',
    SHININESS: 'shininess',
    DIFFUSE: 'diffuse',
    SPECULAR: 'specular',
    TRANSPARENT: 'transparent',
    BUMP: 'bump',
    REFLECT: 'reflect',

    BORDERCOLOR: '#0f0',
    DEFAULTIMG: 'images/skybox/nx.jpg',
    OBJFILE1: 'data/3Dmodel/chichaqu.obj',
    MTLFILE1: 'data/3Dmodel/chichaqu.mtl',
    OBJFILE2: 'data/tea2.obj',
    MTLFILE2:  'data/tea2.mtl',
    OBJFILE3: 'data/bagmodel/package.obj',
    MTLFILE3: 'data/bagmodel/package.mtl',

    CALLFILE: 'load.html',

    CLICKPARTALERT: '请选择需要修改材质的部分！',
    CLICKATTRALERT: '请选择帖图模式！',

    L: 'l',
    M: 'm',
    S: 's',

    shininess: 5,
    specular: 0x333333,
    transparent: 1,
    reflectivity: 1,

    metal: true,
    shading: THREE.SmoothShading
};

var sltBoxObj = document.getElementById(config.BOXINDEX);
var sltMtrGroup = document.getElementById(config.MTRGROUP);
var sltObjGroup = document.getElementById(config.OBJGROUP);
var chkSplitObj = document.getElementById(config.SPLITFORMID);

var mtrModeGroup = [
    '高光帖图',
    '透明帖图'
];

var mtrModeChs = {
    specMode: [0, 0, 1, 1, 0, 0, 0],
    transMode: [0, 0, 1, 0, 1, 0, 0]
};

var objIdxList = [
    0,
    1,
    2,
    3
];

var objMtlFiles = [
    [config.OBJFILE1, config.MTLFILE1],
    [config.OBJFILE2, config.MTLFILE2],
    [config.OBJFILE3, config.MTLFILE3]
];

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