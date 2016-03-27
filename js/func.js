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
        boxMaterial.shading = config.shading;
    } else {
        model.material = new THREE.MeshPhongMaterial({
            map: texture, metal: true, shading: THREE.SmoothShading
        });
    }
}

function setMtrShininess(model, texture) {
    if (chkSplitObj.checked === false) {
        var boxMaterial = model.material;
        boxMaterial.map = texture;
        boxMaterial.metal = true;
        boxMaterial.shading = config.shading;
        boxMaterial.shininess = config.shininess;
    } else {
        model.material = new THREE.MeshPhongMaterial({
            map: texture, metal: true, shading: THREE.SmoothShading, shininess: config.shininess
        });
    }
}

function setMtrDiffuse(model, texture) {
    if (chkSplitObj.checked === false) {
        var boxMaterial = model.material;
        boxMaterial.map = texture;
        boxMaterial.metal = true;
        boxMaterial.shading = config.shading;

    } else {
        model.material = new THREE.MeshPhongMaterial({map: texture});
    }
    alert(mesh.children.length);
}

function setMtrSpecular(model, texture) {
    if (chkSplitObj.checked === false) {
        var boxMaterial = model.material;
        boxMaterial.specularMap = texture;
        boxMaterial.specular = new THREE.Color(config.specular);
        boxMaterial.shininess = 10;
        console.log(boxMaterial);
    } else {
        model.material = new THREE.MeshPhongMaterial({map: texture});
    }
}

function setMtrTransparent(model, texture) {
    if (chkSplitObj.checked === false) {
        var boxMaterial = model.material;
        boxMaterial.map = texture;
        boxMaterial.transparent = config.transparent;
    } else {
        model.material = new THREE.MeshPhongMaterial({map: texture});
    }
}

function setMtrBump(model, texture) {
    if (chkSplitObj.checked === false) {
        var boxMaterial = model.material;
        //boxMaterial.map = texture;
        boxMaterial.bumpMap = texture;
        boxMaterial.bumpScale = 1000;
    } else {
        model.material = new THREE.MeshPhongMaterial({map: texture});
    }
}

function setMtrReflect(model, texture) {
    if (chkSplitObj.checked === false) {
        var boxMaterial = model.material;
        var materialColor = new THREE.Color();
        materialColor.setRGB(1.0, 1.0, 1.0);

        boxMaterial.map = null;
        boxMaterial.bumpMap = null;
        //boxMaterial.color = materialColor;
        //boxMaterial.envMap = envirCube;
        //var boxMaterial = model.material;
        //boxMaterial.Map = texture;
        //boxMaterial.envMap = envirCube;
        //boxMaterial.reflectivity = config.reflectivity;
        //model.material = new THREE


        console.log(model.material);
    } else {
        model.material = new THREE.MeshPhongMaterial({map: texture});
    }
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
            console.log(boxMaterial);
            break;
        case config.SHININESS:

            break;
        case config.DIFFUSE:
            break;
        case config.SPECULAR:
            boxMaterial.specular = new THREE.Color(1, 1, 1);
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
    switch (index) {
        case '0':
            scene.remove(mesh);
            testModel();
            setCameraPosition(0, 0, 200);
            break;
        case '1':
            loadNewModel(0, 100, 100, 700);
            break;
        case '2':
            loadNewModel(1, 0, 0, 10);
            break;
        case '3':
            loadNewModel(2, 0, 20, 700);
            break;
        case '4':
            loadNewModel(3, 0, 20, 1000);
            break;
        case '5':
            loadNewModel(4, 0, 20, 700);
            break;
        case '6':
            loadNewModel(5, 0, 0, 100);
            break;
        case '7':
            loadNewModel(6, 0, 20, 800);
            break;
    }
}

function loadNewModel(index, x, y, z) {
    scene.remove(mesh);
    loadModel(index);
    setCameraPosition(x, y ,z);
}
/****************** 将部分全局变量清除，还原为空 ********************/
function setParamInit() {
    boxIdx = null;
    materialAttr = null;
}

function setCameraPosition(x, y, z) {
    camera.position.set(x, y, z);
}