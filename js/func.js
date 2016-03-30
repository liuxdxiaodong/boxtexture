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
        model.material = new THREE.MeshPhongMaterial({
            map: texture,
            metal: true,
<<<<<<< HEAD
            shading: parameter.shading
=======
            shading: THREE.SmoothShading
>>>>>>> origin/master
        });
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
        model.material = new THREE.MeshPhongMaterial({
<<<<<<< HEAD
            map: texture, metal: true,
            shading: parameter.shading,
            shininess: parameter.shininess
=======
            map: texture,
            metal: true,
            shading: config.shading,
            shininess: config.shininess
>>>>>>> origin/master
        });
    }
}

function setMtrDiffuse(model, texture) {
    if (chkSplitObj.checked === false) {
        var boxMaterial = model.material;
        boxMaterial.map = texture;
        boxMaterial.metal = true;
        boxMaterial.shading = parameter.shading;

    } else {
        model.material = new THREE.MeshPhongMaterial({
            map: texture
        });
<<<<<<< HEAD

=======
>>>>>>> origin/master
    }
}

function setMtrSpecular(model, texture) {
    if (chkSplitObj.checked === false) {
        var boxMaterial = model.material;
        boxMaterial.specularMap = texture;
<<<<<<< HEAD
        boxMaterial.specular = new THREE.Color(parameter.specular);
        boxMaterial.shininess = parameter.shininess;
        console.log(boxMaterial);
    } else {
        model.material = new THREE.MeshPhongMaterial({
            specularMap: texture,
            specular: new THREE.Color(parameter.specular),
            specular: parameter.shininess
=======
        boxMaterial.specular = new THREE.Color(config.specular);
        boxMaterial.shininess = config.shininess;
    } else {
        model.material = new THREE.MeshPhongMaterial({
            specularMap: texture,
            specular: new THREE.Color(config.specular),
            shininess: config.shininess
>>>>>>> origin/master
        });
    }
}

function setMtrTransparent(model, texture) {
    if (chkSplitObj.checked === false) {
        var boxMaterial = model.material;
        boxMaterial.map = texture;
        boxMaterial.transparent = parameter.transparent;
    } else {
        model.material = new THREE.MeshPhongMaterial({
            map: texture,
            transparent: parameter.transparent
        });
    }
}

function setMtrBump(model, texture) {
    if (chkSplitObj.checked === false) {
        var boxMaterial = model.material;
        //boxMaterial.map = texture;
        boxMaterial.bumpMap = texture;
        boxMaterial.bumpScale = parameter.bumpScale;
    } else {
        model.material = new THREE.MeshPhongMaterial({
            bumpMap: texture,
            bumpScale: parameter.bumpScale
        });
    }
}

function setMtrReflect(model, texture) {
    if (chkSplitObj.checked === false) {
        var boxMaterial = model.material;

        boxMaterial.envMap = envirCube;
        //boxMaterial.map = null;
        //boxMaterial.bumpMap = null;
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
            camera.position.z = 200;
            break;
        case '1':
            loadNewModel(0, 0, -10, 20, 700);
            break;
        case '2':
            loadNewModel(1, 0, -1, -0.5, 10);
            break;
        case '3':
            loadNewModel(2, 50, -50, 25, 700);
            break;
        case '4':
            loadNewModel(3, 0, -80, 0, 800);
            break;
        case '5':
            loadNewModel(4, 120,  20, -160, 800);
            break;
        case '6':
            loadNewModel(5, 250, 180, -450, 800);
            break;
        case '7':
            loadNewModel(6, 0, -100, 30, 800);
            break;
        case '8':
            loadNewModel(7, 120, 200, -450, 800);
            break;
        case '9':
            loadNewModel(8, -550, -100, 0, 800);
            break;
    }
}

function loadNewModel(index, x, y, z, cz) {
    scene.remove(mesh);
    loadModel(index, x, y, z);
    camera.position.z = cz;
}

/************* 加载模型 *********************/
function loadModel(index, posX, posY, posZ) {
    var loader = new THREE.OBJMTLLoader();
    loader.addEventListener('load', function (event) {
        var object = event.content;
        object.rotation.x = 0.5;
        //object.position.y = -1;
        //object.position.set(new THREE.Vector3(0, 0, 0));
        mesh = object;
        boxGroup = mesh.children;
        for(var i=0; i < boxGroup.length; i++) {
            var box = boxGroup[i];
            var bMap = box.material;
        }
        mesh.position.set(posX, posY, posZ);
        scene.add(mesh);
    });
    loader.load(objFiles[index], mtlFiles[index]);
}


function testModel() {
    var sphere = new THREE.SphereGeometry(20, 20, 20);
    var mtrColor = new THREE.Color();
    mtrColor.setRGB( 1.0, 1.0, 1.0);
    var sphereMaterial = new THREE.MeshPhongMaterial( {color:mtrColor, overdraw: 0.5});
    mesh = new THREE.Mesh(sphere, sphereMaterial);
    scene.add(mesh);
}
/****************** 将部分全局变量清除，还原为空 ********************/
function setParamInit() {
    boxIdx = null;
    materialAttr = null;
}

function setCameraPosition(x, y, z) {
    //camera.position.set(x, y, z);
    camera.lookAt(new THREE.Vector3(0,0,0));
}
