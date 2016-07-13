/**
 * Created by XiaodongLiu on 2016/3/7.
 */
/************************* 选择不同帖图方式后选择图片帖图 ***************************/
function setMtrBox(model, texture, mode) {
    switch (mode) {
        case config.AMBIENT:
            setMtrAmbient(model, texture);
            break;
        case config.SHININESS:
            setMtrShininess(model, texture);
            break;
        case config.DIFFUSE:
            setMtrDiffuse(model, texture);
            break;
        case config.SPECULAR:
            setMtrSpecular(model, texture);
            break;
        case config.TRANSPARENT:
            setMtrTransparent(model, texture);
            break;
        case config.BUMP:
            setMtrBump(model, texture);
            break;
        case config.REFLECT:
            setMtrReflect(model, texture);
            break;
    }
}

function setMtrAmbient(model, texture) {
    if (chkSplitObj.checked === false) {
        var boxMaterial = model.material;
        boxMaterial.map = texture;
        boxMaterial.metal = true;
        boxMaterial.shading = parameter.shading;
    } else {
        //model.material = new THREE.MeshPhongMaterial({
        //    map: texture,
        //    metal: true,
        //    shading: parameter.shading
        //});
        var boxMaterial = model.material;
        boxMaterial.map = texture;
        boxMaterial.metal = true;
        boxMaterial.shading = parameter.shading;
    }
}

function setMtrShininess(model, texture) {
    if (chkSplitObj.checked === false) {
        var boxMaterial = model.material;
        boxMaterial.map = texture;
        boxMaterial.metal = true;
        boxMaterial.shading = parameter.shading;
        boxMaterial.shininess = parameter.shininess;
    } else {
        //model.material = new THREE.MeshPhongMaterial({
        //    map: texture,
        //    metal: true,
        //    shading: parameter.shading,
        //    shininess: parameter.shininess
        //});
        var boxMaterial = model.material;
        boxMaterial.map = texture;
        boxMaterial.metal = true;
        boxMaterial.shading = parameter.shading;
        boxMaterial.shininess = parameter.shininess;
    }
}

function setMtrDiffuse(model, texture) {
    if (chkSplitObj.checked === false) {
        var boxMaterial = model.material;
        boxMaterial.map = texture;
        boxMaterial.metal = true;
        boxMaterial.shading = parameter.shading;
    } else {
        //model.material = new THREE.MeshPhongMaterial({
        //    map: texture
        //});
        var boxMaterial = model.material;
        boxMaterial.map = texture;
        boxMaterial.metal = true;
        boxMaterial.shading = parameter.shading;
    }
}

function setMtrSpecular(model, texture) {
    if (chkSplitObj.checked === false) {
        var boxMaterial = model.material;
        boxMaterial.specularMap = texture;
        boxMaterial.specular = new THREE.Color(parameter.specular);
        boxMaterial.shininess = parameter.shininess;
    } else {
        //model.material = new THREE.MeshPhongMaterial({
        //    specularMap: texture,
        //    specular: new THREE.Color(parameter.specular),
        //    specular: parameter.shininess
        //});
        var boxMaterial = model.material;
        boxMaterial.map = texture;
        boxMaterial.metal = true;
        boxMaterial.shading = parameter.shading;
    }
}

function setMtrTransparent(model, texture) {
    if (chkSplitObj.checked === false) {
        var boxMaterial = model.material;
        boxMaterial.map = texture;
        boxMaterial.transparent = parameter.transparent;
    } else {
        //model.material = new THREE.MeshPhongMaterial({
        //    map: texture,
        //    transparent: parameter.transparent
        //});
        var boxMaterial = model.material;
        boxMaterial.map = texture;
        boxMaterial.transparent = parameter.transparent;
    }
}

function setMtrBump(model, texture) {
    if (chkSplitObj.checked === false) {
        var boxMaterial = model.material;
        //boxMaterial.map = texture;
        boxMaterial.bumpMap = texture;
        boxMaterial.bumpScale = parameter.bumpScale;
    } else {
        //model.material = new THREE.MeshPhongMaterial({
        //    bumpMap: texture,
        //    bumpScale: parameter.bumpScale
        //});
        var boxMaterial = model.material;
        //boxMaterial.map = texture;
        boxMaterial.bumpMap = texture;
        boxMaterial.bumpScale = parameter.bumpScale;
    }

    console.log(model.material);
}

function setMtrReflect(model, texture) {
    if (chkSplitObj.checked === false) {
        var boxMaterial = model.material;
        boxMaterial.color = mtrColor;

        boxMaterial.envMap = envirCube;
        console.log(model.material);
    } else {
        mtrColor.setRGB(1, 1, 1);
        model.material = new THREE.MeshPhongMaterial({
            //color: mtrColor,
            map: texture,
            envMap: envirCube,
            shading: parameter.shading,
            side: THREE.DoubleSide,
            overdraw: 0.5
        });
    }
}

function setBoxHightlight(index) {
    clearBoxHightlight();
    var interSeceted = mesh.children[index];

    currentHex = interSeceted.material.emissive.getHex();
    currentBoxIdx = index;

     //interSeceted.material = new THREE.MeshPhongMaterial({
     //        emissive: 0xffffff
     //})
    mesh.children[index].material.emissive.setHex(0xffffff);
}

function clearBoxHightlight() {
    console.log(currentBoxIdx)
    var curSeceted = mesh.children[currentBoxIdx];
    curSeceted.material.emissive.setHex(currentHex);
    // curSeceted.material = new THREE.MeshPhongMaterial({
    //     emissive: currentHex
    // })
}

/************* 设置材质贴图模式的尺度 value *****************/

function setMtrValue(value, mode) {
    if (checkSltObj()) {
        var box = mesh;
    } else {
        var box = mesh.children[boxIdx];
    }
    var boxMaterial = box.material;

    switch (mode) {
        case config.AMBIENT:
            var col = new THREE.Color('#' + value);
            //scene.__lights[0].color.set(col);
            boxMaterial.ambient = col;
            break;
        case config.SHININESS:

            break;
        case config.DIFFUSE:
            diffuseColor.setRGB(1, 1, 1);
            diffuseColor.multiplyScalar(this.value);
            boxMaterial.color.copy(diffuseColor);
            break;
        case config.SPECULAR:
            boxMaterial.specular = new Color(1, 1, 1);
            //specularColor.setRGB(1,1,1);
            //specularColor.multiplyScalar(this.value);
            //boxMaterial.specular.copy(specularColor);
            break;
        case config.TRANSPARENT:
            boxMaterial.transparent = value;
            break;
        case config.BUMP:
            boxMaterial.bumpScale = value;
            break;
        case config.REFLECT:
            break;

    }
}
/************鼠标点击modeBtn clickBtn()调用**************/

function setBorder(id, width) {
    var el = document.getElementById(id);
    if (width === 0) {
        el.style.border = width;
    } else {
        el.style.border = width + 'px solid ' + config.BORDERCOLOR;
    }
}

function setModeVis(mode) {
    switch (mode) {
        case config.DIFFUSE:
            setVisual(iDiffuse);
            break;
        case config.SPECULAR:
            setVisual(iSpecular);
            break;
        case config.TRANSPARENT:
            setVisual(iTransparent);
            break;
        case config.BUMP:
            setVisual(iBump);
            break;
        case config.REFLECT:
            setVisual(iReflect);
            break;
        default:
            setVisual(iDefault);
            break;
    }
}

function setVisual(data) {
    var len = data.length;
    for (var i = 0; i < len; i++) {
        var el = document.getElementById(BID[i]);
        el.style.display = data[i] === 0 ? 'none' : 'inline-block';
    }
}

/************* 选择材质组合 设置帖图模式 **************/
function setModeGroup(index) {

    switch (index) {
        case '0':
            setModeCheck(mtrModeChs.specMode);
            break;
        case '1':
            setModeCheck(mtrModeChs.transMode);
            break;
    }
}

function setModeCheck(mode) {
    for (var i = 0; i < mode.length; i++) {
        var check = document.getElementById(MODECHECKID[i]);
        var input = document.getElementById(MODEINPUTID[i]);
        var btn = document.getElementById(MODEBTNID[i]);
        check.checked = mode[i] === 1 ? true : false;
        input.disabled = mode[i] === 1 ? false : true;
        btn.disabled = mode[i] === 1 ? false : true;
    }
}

function setBtnBg(index, imgUrl) {
    var btn = document.getElementById(MODEBTNID[index]);
    var img = new Image();
    img.src = imgUrl;
    //console.log(btn);
    btn.style.background = img;
}

/***************** 选择要加载的模型 0测试球 1包装盒 2包装盒******************/
function setObjLoad(index) {
    var posParam = mcPosLists[index];
    loadModel(posParam);
    //if(index === 0){
    //    testModel();
    //} else{
    //    loadModel(posParam[0]-1, posParam[1], posParam[2], posParam[3], posParam[4]);
    //}
}

/************* 加载模型 *********************/
function loadModel(param) {
    var index = param[0];
    var posX = param[1];
    var posY = param[2];
    var posZ = param[3];
    var cz = param[4];
    var loader = new THREE.OBJMTLLoader();
    loader.addEventListener('load', function(event) {
        var object = event.content;
        object.rotation.x = 0.5;

        scene.remove(mesh);
        //object.position.y = -1;
        //object.position.set(new THREE.Vector3(0, 0, 0));
        mesh = object;
        boxGroup = mesh.children;
        currentHex = mesh.children[0].material.emissive.getHex();

        var boxNum = boxGroup.length;
        addBoxOpt2Slt(boxNum)
        for (var i = 0; i < boxNum; i++) {
            var box = boxGroup[i];
            var bMap = box.material;
        }
        mesh.position.set(posX, posY, posZ);

        camera.position.z = cz;
        scene.add(mesh);
    });
    loader.load(objFiles[index], mtlFiles[index]);
}

//
//function testModel() {
//    var sphere = new THREE.SphereGeometry(20, 20, 20);
//
//    if(SETBGSHOW == 1) {
//        var sphereMaterial = new THREE.MeshPhongMaterial( {
//            color: mtrColor,
//            envMap: envirCube,
//            shading: parameter.shading,
//            side: THREE.DoubleSide,
//            overdraw: 0.5
//        });
//    } else {
//        var sphereMaterial = new THREE.MeshPhongMaterial({
//            shading: parameter.shading,
//            side: THREE.DoubleSide,
//            overdraw: 0.5
//        })
//    }
//
//
//    scene.remove(mesh);
//    mesh = new THREE.Mesh(sphere, sphereMaterial);
//    camera.position.z = 200;
//    scene.add(mesh);
//}
/****************** 将部分全局变量清除，还原为空 ********************/
function setParamInit() {
    boxIdx = null;
    materialAttr = null;
    currentBoxIdx = 0;
}

function setCameraPosition(x, y, z) {
    //camera.position.set(x, y, z);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}
