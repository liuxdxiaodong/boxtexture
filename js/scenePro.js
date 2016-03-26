/**
 * Created by CGGI_006 on 2016/2/24.
 */
if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
}

window.onload = function() {
    init();
    testModel();
    addEvent();
    render();
};

function init() {
    /************container*******************/
    container = document.getElementById(config.CONTAINID);

    /************camera**********************/
    camera = new THREE.PerspectiveCamera(30, container.offsetWidth / container.offsetHeight, 0.1, 10000);
    camera.position.set(0, 0, 200);

    /*************scene**********************/
    scene = new THREE.Scene();

    ambientLight = new THREE.AmbientLight(aLevel);
    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-100, 200, 500);
    spotLight.castShadow = true;
    var geo = new THREE.PlaneGeometry(2000, 2000, 8, 8);
    plane = new THREE.Mesh(geo, new THREE.MeshBasicMaterial( {visible: false}));
    //scene.add(plane);
    scene.add(spotLight);
    scene.add(ambientLight);

    /********************reflection map ********************/
    envirCube = THREE.ImageUtils.loadTextureCube(envirUrls);
    //var envirCube = THREE.CubeTextureLoader(envirUrls);
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
    sceneCube.add(skyBox);
    sceneCube.add(scene);

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

    skyBox.position.copy( camera.position);
    renderer.render(sceneCube, camera);
}

/************* 加载模型 *********************/
function loadModel(index) {
    var loader = new THREE.OBJMTLLoader();
    loader.addEventListener('load', function (event) {
        var object = event.content;
        object.rotation.x = 0.5;
        object.position.y = -1;
        mesh = object;
        boxGroup = mesh.children;
        for(var i=0; i < boxGroup.length; i++) {
            var box = boxGroup[i];
            var bMap = box.material;
            //console.log(bMap);
        }
        scene.add(mesh);
    });
    var objmtl = objMtlFiles[index];
    loader.load(objmtl[0], objmtl[1]);
}

function testModel() {
    var sphereTexture = new THREE.ImageUtils.loadTexture(config.DEFAULTIMG);
    //var sphereTexture = new THREE.TextureLoader(config.DEFAULTIMG);
    var sphere = new THREE.SphereGeometry(20, 20, 20);
    var sphereMaterial = new THREE.MeshPhongMaterial( {map: sphereTexture, overdraw: 0.5});
    mesh = new THREE.Mesh(sphere, sphereMaterial);
    scene.add(mesh);
}
/********************* 添加鼠标事件及复选框事件 *************************/
function addEvent() {

    clickImgEvent();
    clickBtnEvent();
    clickLoadBtn(config.LOADBTNID);

    addBoxOpt2Slt();
    addObjOpt2Slt();
    addMtr2Group();

    changeOpt();
    changeIptValueEvent();

    checkAutoMan(config.AUTOFORMID, 0);
    checkAutoMan(config.MANFORMID, 1);
    checkSplit(config.SPLITFORMID);

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
//
//function setTextColor(picker) {
//    var bLevel = '0x' + picker.toString();
//    //scene.ambient.value = bLevel;
//    scene.ambient.color = aLevel;
//}



