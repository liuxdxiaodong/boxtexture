/**
 * Created by CGGI_006 on 2016/2/24.
 */
if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
}

window.onload = function() {
    initParam();
    init();
    loadModel(mcPosLists[0]);
    addEvent();
    render();
};

function init() {
    /************container*******************/
    container = document.getElementById(config.CONTAINID);

    /*************scene**********************/
    scene = new THREE.Scene();

    ambientLight = new THREE.AmbientLight(config.ambientColor);
    scene.add(ambientLight);

    spotLight = new THREE.SpotLight(config.spotLightColor);
    //spotLight = new THREE.DirectionalLight(config.spotLightColor);
    spotLight.position.set(parameter.LIGHTPOSX, parameter.LIGHTPOSY, parameter.LIGHTPOSZ);
    spotLight.intensity = parameter.LIGHTITS;
    spotLight.castShadow = true;
    scene.add(spotLight);

    mtrColor = new THREE.Color();
    mtrColor.setRGB(1.0, 1.0, 1.0);

    var geo = new THREE.PlaneGeometry(2000, 2000, 8, 8);
    plane = new THREE.Mesh(geo, new THREE.MeshBasicMaterial( {visible: true}));
    //scene.add(plane);

    /************camera**********************/
    camera = new THREE.PerspectiveCamera(30, container.offsetWidth / container.offsetHeight, 0.1, 10000);
    camera.position.set(parameter.CAMERAX, parameter.CAMERAY, parameter.CAMERAZ);

    /********************reflection map ********************/
    envirCube = THREE.ImageUtils.loadTextureCube(envirUrls);
    var envirShader = THREE.ShaderLib['cube'];
    envirShader.uniforms['tCube'].value = envirCube;

    var skyboxMaterial = new THREE.ShaderMaterial( {
        fragmentShader: envirShader.fragmentShader,
        vertexShader: envirShader.vertexShader,
        uniforms: envirShader.uniforms,
        depthWrite: false,
        side: THREE.BackSide
    });

    var boxGeo = new THREE.CubeGeometry(3000, 3000, 3000);
    skyBox = new THREE.Mesh(boxGeo, skyboxMaterial);

    sceneCube = new THREE.Scene();
    /*****************controls***************************/
    control = new THREE.TrackballControls(camera, container);
    control.enabled = false;

    /*****************renderer**************************/
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(container.offsetWidth, container.offsetHeight);

    container.appendChild(renderer.domElement);

}

function render() {
    requestAnimationFrame(render);

    if(AUTOMAN === 1) {
        mesh.rotation.y += 0.01;
    }

    control.update();
    renderer.render(scene, camera);
    if(SETBGSHOW === 1) {
        renderer.autoClear = false;
        skyBox.position.copy( camera.position);
        renderer.render(sceneCube, camera);
    }
}

/*********** 初始化参数 ***************/
function initParam() {
    iptLightX.value = parameter.LIGHTPOSX;
    iptLightY.value = parameter.LIGHTPOSY;
    iptLightZ.value = parameter.LIGHTPOSZ;
    iptLightIts.value = parameter.LIGHTITS;
    iptStepMove.value = parameter.MOVESTEP;
}
/********************* 添加鼠标事件及复选框事件 *************************/
function addEvent() {

    clickImgEvent();
    clickBtnEvent();
    clickLoadBtn(config.BTNLOADID);
    clickMoveDirecBtn();

    addObjOpt2Slt();
    addMtr2Group();
    addBoxOpt2Slt(0);

    changeOpt();
    changeIptValueEvent();
    changeLightPos();


    checkAutoMan(config.RDOAUTOFORMID, 0);
    checkAutoMan(config.RDOMANFORMID, 1);
    checkSplit();
    checkBackground();

    for(var i=0; i < MODECHECKID.length; i++ ) {
        checkMode(MODECHECKID[i], i);
    }
    //renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false);
    //renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false);
    //renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false);
}

/***************** 鼠标事件 ************************/
function clickImgEvent() {
    for (var k = 0; k < ELIST.length; k++) {
        switch (k) {
            case 0:
                clickMet(EID[k], 28);
                break;
            case 1:
                clickMet(EID[k], 30);
                break;
            case 2:
                clickMet(EID[k], 29);
                break;
            case 3:
                clickMet(EID[k], 27);
                break;
            case 4:
                clickMet(EID[k], 20);
                break;
        }
    }

    for (var i = 0; i < BLIST.length; i++) {
        clickMbt(BID[i], i);
    }

    for (var j = 0; j < VLIST.length; j++) {
        clickMvt(VID[j], j);
    }
}

function clickBtnEvent() {
    for (var i = 0; i < MODEBTNID.length; i++) {
        var btn = MODEBTNID[i];
        var attr = BTNATTR[i];
        clickModeBtn(btn, attr, i);
    }
}

function changeIptValueEvent() {
    for (var i=0; i<MODEINPUTID.length; i++) {
        var ipt = MODEINPUTID[i];
        var attr = BTNATTR[i];
        changeIptValue(ipt, attr);
    }
}


