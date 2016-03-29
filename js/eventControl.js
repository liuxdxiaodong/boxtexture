/**
 * Created by CGGI_006 on 2016/3/18.
 */


/*************** 添加点击图片事件，修改材质***************/

function clickMet(id, index) {
    var el = document.getElementById(id);
    el.addEventListener('click', function () {
        clickIndex = index;
        if(chkSplitObj.checked === false) {
            boxIdx = clickIndex;
        }
    });
}

function clickMbt(id, index) {
    var el = document.getElementById(id);
    el.addEventListener('click', function () {
        var box;
        var bImg = BPATH + config.L + BLIST[index];
        var bTexture = new THREE.ImageUtils.loadTexture(bImg);

        if (boxIdx || checkSltObj()) {
            if( checkSltObj() ) {
                box = mesh;
            } else {
                box = mesh.children[boxIdx];
            }
            if(materialAttr) {
                setMtrBox(box,bTexture, materialAttr);
                var labelImg = BPATH + config.S + BLIST[index];
                setBtnBg(modeIndex, labelImg);
            } else {
                alert(config.CLICKATTRALERT);
            }
            setBorder( config.MTRBID, 0);
        } else {
            alert(config.CLICKPARTALERT);
        }
    });
}

function clickMvt(id, index) {
    var el = document.getElementById(id);
    el.addEventListener('click', function () {
        var vImg = VPATH + config.L + VLIST[index];
        var vTexture = new THREE.ImageUtils.loadTexture(vImg);
        if (boxIdx || checkSltObj() ) {
            if(checkSltObj()) {
                var box = mesh;
            } else {
                var box = mesh.children[boxIdx];
            }
            if(materialAttr) {
                setMtrBox(box,vTexture, materialAttr);
            } else {
                alert(config.CLICKATTRALERT);
            }
            setBorder( config.MTRVID, 0);
        } else {
            alert(config.CLICKPARTALERT);
        }
    });
}


/************** 点击Btn,选择相应属性的material ******************/

function clickModeBtn(id, attr, index) {
    var el = document.getElementById(id);
    el.addEventListener('click', function () {
        if(boxIdx || checkSltObj(index) || index === 0) {
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
        window.open(config.CALLFILE) ;
    });
}

function checkSltObj () {
    return sltObjGroup.value ==='0';
}

function changeIptValue (id, attr) {
    var el = document.getElementById(id);
    el.addEventListener('change', function() {
        var value = this.value;
        setMtrValue( value, attr);
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
    chkBg.addEventListener('change', function() {
        if(this.checked === true) {
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
    sltObjGroup.addEventListener('change', function() {
        setParamInit();
        var index = this.value;
        setObjLoad(index);
        addBoxOpt2Slt(index);
    });

    sltBoxObj.addEventListener('change', function() {
        selectIndex = this.value;
        if(chkSplitObj.checked === true) {
            boxIdx = selectIndex;
            materialAttr = null;
        }
    });

    sltMtrGroup.addEventListener('change', function() {
        var index = this.value;
        setModeGroup(index);
    });

}

function addBoxOpt2Slt(index) {
    sltBoxObj.options.length = 0;
    var optNum = objBoxNum[index];
    for (var i = 0; i < optNum; i++) {
        var optObj = document.createElement('option');
        optObj.value = i;
        optObj.text = i;
        sltBoxObj.appendChild(optObj);
    }
    if(chkSplitObj.checked) {
        sltBoxObj.disabled = false;
    } else {
        sltBoxObj.disabled = true;
    }
}

function addMtr2Group() {
    for(var i= 0; i<mtrModeGroup.length; i++) {
        var mtrObj = document.createElement('option');
        mtrObj.value = i;
        mtrObj.text = mtrModeGroup[i];
        sltMtrGroup.appendChild(mtrObj);
    }
}

function addObjOpt2Slt() {
    var optNum = objIdxList.length;
    for (var i=0; i<optNum; i++) {
        var optObj = document.createElement('option');
        optObj.value = objIdxList[i];
        optObj.text = objIdxList[i];
        sltObjGroup.appendChild(optObj);
    }
}

function checkMode(id, index) {
    var el = document.getElementById(id);
    el.addEventListener('change', function() {
        var input = document.getElementById(MODEINPUTID[index]);
        var btn = document.getElementById(MODEBTNID[index]);
        input.disabled = this.checked === true ? false : true;
        btn.disabled = this.checked === true ? false : true;
    })
}

//
//function changeParam(id) {
//    var el = document.getElementById(id);
//    el.addEventListener('change', function () {
//        scene.remove(ambient);
//        var txt = this.value;
//        aLevel = '0x' + txt.toString();
//        alert(aLevel);
//        //ambient.value = aLevel;
//        //scene.add(ambient);
//    });
//}

/************************ 鼠标点击物件移动box ************************/
//function onDocumentMouseMove(event) {
//    event.preventDefault();
//    mouse.x = (event.clientX / container.offsetWidth) * 2 - 1;
//    mouse.y = (event.clientY / container.offsetHeight) * 2 - 1;
//
//    raycaster.setFromCamera(mouse, camera);
//    if(SELECTED) {
//        var intersects = raycaster.intersectObject( plane );
//        if(intersects.length > 0) {
//            SELECTED.position.copy( intersects[0].point.sub( offset));
//        }
//        return;
//    }
//    var intersects = raycaster.intersectObjects(boxGroup);
//    if(intersects.length > 0) {
//        if(INTERSECTED !== intersects[0].object) {
//            if(INTERSECTED) {
//                INTERSECTED.material.color.setHex( INTERSECTED.currentHex);
//            }
//            INTERSECTED = intersects[0].object;
//            INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
//
//            plane.position.copy(INTERSECTED.position);
//            plane.lookAt(camera.position);
//        }
//        container.style.cursor = 'pointer';
//    } else {
//        if(INTERSECTED) {
//            INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
//        }
//        INTERSECTED = null;
//        container.style.cursor = 'auto';
//    }
//}
//
//function onDocumentMouseDown(event) {
//    event.preventDefault();
//    raycaster.setFromCamera( mouse, camera);
//    var intersects = raycaster.intersectObjects( boxGroup );
//    if (intersects.length > 0) {
//        control.enabled = false;
//        SELECTED = intersects[0].object;
//        var intersects = raycaster.intersectObject(plane);
//        if ( intersects.length > 0) {
//            offset.copy(intersects[0].point).sub(plane.position);
//        }
//        container.style.cursor = 'move';
//    }
//}
//
//function onDocumentMouseUp(event) {
//    event.preventDefault();
//    control.enabled = true;
//    if(INTERSECTED) {
//        plane.position.copy(INTERSECTED.position);
//        SELECTED = null;
//    }
//    container.style.cursor = 'auto';
//}