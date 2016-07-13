/**
 * Created by CGGI_006 on 2016/3/18.
 */


/*************** 添加点击图片事件，修改材质***************/

function clickMet(box, index, label) {
    var id = box + index;
    var el = document.getElementById(id);
    switch(label) {
        case 0:
            el.addEventListener('click', function() {
                boxMode = index;
                var child = mesh.children[boxIdx];
                //var tempPos = child.position;
                mesh.remove(child);
            });
            break;
        case 1:
            el.addEventListener('click', function() {
                changeChildBox(index, boxMode, box);
            });
            break;
        case 2:
            el.addEventListener('click', function() {
                changeChildBox(index, boxMode, box )
            });
            break;
    }
}

function clickMbt(id, index) {
    var el = document.getElementById(id);
    el.addEventListener('click', function () {
        var box;
        //var bImg = BPATH + config.L + BLIST[index];
        var bImg = BPATH + config.OIMG + BLIST[index] + config.JPG;
        var bTexture = new THREE.ImageUtils.loadTexture(bImg);

        if (boxIdx) {

            box = mesh.children[boxIdx];

            if (materialAttr) {
                clearBoxHightlight();
                setMtrBox(box, bTexture, materialAttr);
                //var labelImg = BPATH + config.S + BLIST[index];
                //setBtnBg(modeIndex, labelImg);
            } else {
                alert(config.CLICKATTRALERT);
            }
            setBorder(config.MTRBID, 0);
        } else {
            alert(config.CLICKPARTALERT);
        }
    });
}

function clickMvt(id, index) {
    var el = document.getElementById(id);
    el.addEventListener('click', function () {
        var vImg = VPATH + VLIST[index] + config.ALPHA + config.PNG;
        var vTexture = new THREE.ImageUtils.loadTexture(vImg);
        if (boxIdx) {
            var box = mesh.children[boxIdx];
            if (materialAttr) {
                clearBoxHightlight();
                setMtrBox(box, vTexture, materialAttr);
            } else {
                alert(config.CLICKATTRALERT);
            }
            setBorder(config.MTRVID, 0);
        } else {
            alert(config.CLICKPARTALERT);
        }
    });
}


/************** 点击Btn,选择相应属性的material ******************/

function clickModeBtn(id, attr, index) {
    var el = document.getElementById(id);
    el.addEventListener('click', function () {
        if (boxIdx) {
            materialAttr = attr;
            setBorder(config.MTRBID, 1);
            setModeVis(materialAttr);
            modeIndex = index;
        } else {
            alert(config.CLICKPARTALERT);
        }
    }, false);
}

function clickLoadBtn(id) {
    var el = document.getElementById(id);
    el.addEventListener('click', function () {
        window.open(config.CALLFILE);
    });
}

function clickMoveDirecBtn() {
    iptStepMove.addEventListener('change', function () {
        parameter.MOVESTEP = this.value;
    });

    btnUp.addEventListener('click', function () {
        if (boxIdx) {
            var box = mesh.children[boxIdx];
            //box.position.y += parameter.MOVESTEP;
            changeChildBox();
        } else {
            alert(config.CLICKPARTALERT);
        }
    });
    btnDown.addEventListener('click', function () {
        if (boxIdx) {
            var box = mesh.children[boxIdx];
            box.position.y -= parameter.MOVESTEP;
        } else {
            alert(config.CLICKPARTALERT);
        }
    });
    btnLeft.addEventListener('click', function () {
        if (boxIdx) {
            var box = mesh.children[boxIdx];
            box.position.x -= parameter.MOVESTEP;
        } else {
            alert(config.CLICKPARTALERT);
        }
    });
    btnRight.addEventListener('click', function () {
        if (boxIdx) {
            var box = mesh.children[boxIdx];
            box.position.x += parameter.MOVESTEP;
        } else {
            alert(config.CLICKPARTALERT);
        }
    });
    btnFront.addEventListener('click', function () {
        if (boxIdx) {
            var box = mesh.children[boxIdx];
            box.position.z += parameter.MOVESTEP;
        } else {
            alert(config.CLICKPARTALERT);
        }
    });
    btnBack.addEventListener('click', function () {
        if (boxIdx) {
            var box = mesh.children[boxIdx];
            box.position.z -= parameter.MOVESTEP;
        } else {
            alert(config.CLICKPARTALERT);
        }
    });
}

function changeChildBox(idx, mode, box){
    //var boxNum = 9;
    //for(var i = 0; i<=boxNum; i++){
    //    var child = mesh.children[i];
    //    mesh.remove(child);
    //}
    //var child = mesh.children[boxIdx];
    //var tempPos = child.position;
    //mesh.remove(child);
    var loader = new THREE.OBJMTLLoader();
    loader.addEventListener('load', function(event){

        switch(mode){
            case 0:
                var obj = event.content;
                mesh.add(obj);
                break;
            case 1:
                var obj1 = event.content;
                var obj2 = obj1.clone();
                var obj3 = obj1.clone();
                obj1.position.set(0, 0, 0)
                obj2.position.set(-80, 0, 80);
                obj3.position.set(80, 0, 80);
                mesh.add(obj1);
                mesh.add(obj2);
                mesh.add(obj3);
                break;
            case 2:
                var obj1 = event.content;
                var obj2 = obj1.clone();
                obj1.position.set(0, 0, 0);
                obj2.position.set(-150, 0, 0);
                mesh.add(obj1);
                mesh.add(obj2);
                break;
        }
        //mesh.add(obj);
        //var boxNum = mesh.children.length;
        //addBoxOpt2Slt(boxNum)
    })
    switch(box) {
        case config.CYLINDER:
            loader.load(cldFiles[idx][0], cldFiles[idx][1]);
            break;
        case config.SQUARE:
            loader.load(sqrFiles[idx][0], sqrFiles[idx][1]);
            break;
    }
}


function changeIptValue(id, attr) {
    var el = document.getElementById(id);
    el.addEventListener('change', function () {
        var value = this.value;
        setMtrValue(value, attr);
    });
}

/************ 选择是否旋转目标 ******************/
function checkAutoMan(id, index) {
    var el = document.getElementById(id);
    el.addEventListener('click', function () {
        if (index === 0) {
            control.enabled = true;
            AUTOMAN = 0;
        } else {
            control.enabled = false;
            AUTOMAN = 1;
        }
    });
}

function checkSplit() {
    chkSplitObj.addEventListener('change', function () {
        if (this.checked === true) {
            sltBoxObj.disabled = false;
            boxIdx = sltBoxObj.value;
        } else {
            sltBoxObj.disabled = true;
        }
    });
}

function checkBackground() {
    chkBg.addEventListener('change', function () {
        if (this.checked === true) {
            sceneCube.add(skyBox);
            sceneCube.add(scene);
            SETBGSHOW = 1;
        } else {
            sceneCube.remove(skyBox);
            sceneCube.remove(scene);
            SETBGSHOW = 0;
        }
    })
}

function changeOpt() {
    sltObjGroup.addEventListener('change', function () {
        setParamInit();
        var index = Number(this.value);
        setObjLoad(index);
        //addBoxOpt2Slt(index);
    });

    sltBoxObj.addEventListener('change', function () {
        selectIndex = this.value;
        if (chkSplitObj.checked === true) {
            boxIdx = selectIndex;
            materialAttr = null;
            setBoxHightlight(boxIdx);
        }
    });

    sltMtrGroup.addEventListener('change', function () {
        var index = this.value;
        setModeGroup(index);
    });

}

function addBoxOpt2Slt(optNum) {
    sltBoxObj.options.length = 0;
    //var optNum = objBoxNum[index];
    for (var i = 0; i < optNum; i++) {
        var optObj = document.createElement('option');
        optObj.value = i;
        optObj.text = i;
        sltBoxObj.appendChild(optObj);
    }
    if (chkSplitObj.checked) {
        sltBoxObj.disabled = false;
    } else {
        sltBoxObj.disabled = true;
    }
}

function addMtr2Group() {
    for (var i = 0; i < mtrModeGroup.length; i++) {
        var mtrObj = document.createElement('option');
        mtrObj.value = i;
        mtrObj.text = mtrModeGroup[i];
        sltMtrGroup.appendChild(mtrObj);
    }
}

function addObjOpt2Slt() {
    var optNum = objNameList.length;
    for (var i = 0; i < optNum; i++) {
        var optObj = document.createElement('option');
        optObj.value = i;
        optObj.text = objNameList[i];
        sltObjGroup.appendChild(optObj);
    }
}

function checkMode(id, index) {
    var el = document.getElementById(id);
    el.addEventListener('change', function () {
        var input = document.getElementById(MODEINPUTID[index]);
        var btn = document.getElementById(MODEBTNID[index]);
        input.disabled = this.checked === true ? false : true;
        btn.disabled = this.checked === true ? false : true;
    })
}

/************** 控制光源位置 **************/
function changeLightPos() {
    iptLightX.addEventListener('change', function () {
        scene.__lights[1].position.x = this.value;
    });
    iptLightY.addEventListener('change', function () {
        scene.__lights[1].position.y = this.value;
    });
    iptLightZ.addEventListener('change', function () {
        scene.__lights[1].position.z = this.value;
    });
    iptLightIts.addEventListener('change', function () {
        scene.__lights[1].intensity = this.value;
    })
}

