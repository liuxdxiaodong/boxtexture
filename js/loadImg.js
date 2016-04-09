/**
 * Created by CGGI_006 on 2016/3/18.
 */
var loadImgBtn = document.getElementById('uLoadBtn');
var loadImgCanvas = document.getElementById('canvasA');
var outImgCanvas = document.getElementById('canvasB');
var offcanvas = document.createElement('canvas');
var modeSlt = document.getElementById('uModeSlt');
var textChk = document.getElementById('uTextChk');
var textDrt = document.getElementById('uTextDrt');
var textIpt = document.getElementById('uTextIpt');
var textSize = document.getElementById('uTextSize');
var textFont = document.getElementById('uTextFont');
var btnSave = document.getElementById('uSaveBtn');

var ctxA = loadImgCanvas.getContext('2d');
var ctxB = outImgCanvas.getContext('2d');
var ctxC = offcanvas.getContext('2d');

var imgWidth, imgHeight, imgSrc;
var canvasHeight = 300;
//var canvasWidth = 366;
loadImgCanvas.height = canvasHeight;
outImgCanvas.height = loadImgCanvas.height;
offcanvas.height = loadImgCanvas.height;
//loadImgCanvas.width = canvasWidth;

var startX = 0,
    startY = 0,
    offsetX = 0,
    offsetY = 0;
var locateX = 10,
    locateY = 150;
var textValue,
    fontSize,
    fontType;
var minSize = 10,
    maxSize = 500,
    defaultSize = 20;
var ISVERTICAL = false;
var fontList = [
    '隶书',
    '方正书体',
    '楷体',
    '微软雅黑',
    '华文行楷',
    '华文隶书',
    '仿宋'
];


initLoad();
initText();
addImgEvent();
addTextEvent();

/************* 选择图片上传 ****************/
function initLoad() {
    if(typeof FileReader == 'undefined') {
        ctxA.innerHTML = '抱歉，你的浏览器不支持FileReader';
        loadImgBtn.disabled = 'disabled';
    } else {
        loadImgBtn .addEventListener('change', readFile, false);
    }

    //var image = new Image();
    //window.onload = function () {
    //    image.src = 'images/mvt/mvt001.bmp';
    //    image.onload = function() {
    //        ctxA.drawImage(image, 0, 0, loadImgCanvas.width, loadImgCanvas.height);
    //    }
    //}

}
function readFile() {
    var imgFile = this.files[0];
    if(!/image\/\w+/.test(imgFile.type)) {
        alert('文件必须为图片！');
        return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = function() {
        imgSrc = this.result;
        var img = new Image();
        img.src = imgSrc;
        img.onload = function () {
            var scale = canvasHeight / this.height;
            imgWidth = this.width * scale;
            imgHeight = this.height * scale;
            loadImgCanvas.width = imgWidth;
            outImgCanvas.width = imgWidth;
            offcanvas.width = imgWidth;
            canvasWidth = loadImgCanvas.width;
            clearCanvas(ctxA);
            clearCanvas(ctxC);
            //ctxA.drawImage(img, startX, startY, imgWidth, imgHeight);
            ctxC.drawImage(img, startX, startY, imgWidth, imgHeight);
            ctxA.drawImage(offcanvas,0,0);
            modeSlt.options[0].selected = true;
            modeHandle(modeSlt.value);
        }
    }
}

/***************** 图像处理 *********************/

function clearCanvas(context) {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
}

function addImgEvent() {
    modeSlt.addEventListener('change', function() {
        var mode = this.value;
        modeHandle(mode);
    });
}

function modeHandle(mode) {
    clearCanvas(ctxB);
    switch (mode) {
        case 'original':
            var imageData = ctxA.getImageData(startX, startY, imgWidth, imgHeight);
            ctxB.putImageData(imageData, offsetX, offsetY, startX, startY, imgWidth, imgHeight);
            break;
        case 'binary':
            var imageData = ctxA.getImageData(startX, startY,imgWidth, imgHeight);
            var pixelData = imageData.data;
            var pv;
            for ( var i=0; i<canvasWidth * canvasHeight; i++) {
                var r = pixelData[ i*4   ];
                var g = pixelData[ i*4+1 ];
                var b = pixelData[ i*4+2 ];

                var grey = r * 0.3 + g * 0.59 + b * 0.11;
                if( grey > 125) {
                    pv = 255;
                } else {
                    pv = 0;
                }

                pixelData[ i*4   ] = pv;
                pixelData[ i*4+1 ] = pv;
                pixelData[ i*4+2 ] = pv;
            }
            ctxB.putImageData(imageData, offsetX, offsetY, startX, startY, imgWidth, imgHeight);
            break;
        case 'bump':
            var imageData = ctxA.getImageData(startX, startY, imgWidth, imgHeight);
            var outputData = ctxB.createImageData(imageData);
            var w = imageData.width;
            var h = imageData.height;
            var pixelData = imageData.data;
            var pixelOutData = outputData.data;
            var mtx = [-6, -3, 0, -3, -1, 3, 0, 3, 6];
            for (var x=1; x<h-1; x++) {
                for( var y=1; y<w-1; y++) {
                    for (var z=0; z<3; z++) {
                        var sum = 0;
                        var i = (x * w + y) * 4 + z;
                        var pixelMat = [
                            pixelData[ i - 4*w - 4 ],
                            pixelData[ i - 4*w     ],
                            pixelData[ i - 4*w + 4 ],
                            pixelData[ i       - 4 ],
                            pixelData[ i           ],
                            pixelData[ i       + 4 ],
                            pixelData[ i + 4*w - 4 ],
                            pixelData[ i + 4*w     ],
                            pixelData[ i + 4*w + 4 ]
                        ];
                        for(var k=0; k<pixelMat.length; k++) {
                            sum += mtx[k] * pixelMat[k];
                        }
                        pixelOutData[i] = sum / -1;
                    }
                    pixelOutData[(x * w + y) * 4 + 3] = 255;
                }
            }
            ctxB.putImageData(outputData, offsetX, offsetY, startX, startY, imgWidth, imgHeight);
            break;
        case 'transparent':
            var imageData = ctxA.getImageData(startX, startY, imgWidth, imgHeight);
            var pixelData = imageData.data;
            var pv;

            for( var i = 0; i < imgWidth * imgHeight; i++) {
                var r = pixelData[ i * 4 + 0 ];
                var g = pixelData[ i * 4 + 1 ];
                var b = pixelData[ i * 4 + 2 ];

                var grey = r * 0.3 + g * 0.59 + b * 0.11;
                if(grey > 254) {
                    pv = 0;
                } else {
                    pv = 255;
                }
                pixelData[ i * 4 + 3 ] = pv;
            }
            ctxB.putImageData(imageData, offsetX, offsetY, startX, startY, imgWidth, imgHeight);
            break;
    }
}

/*************** 文字 : 设置文字大小及字体 ****************/
function initText() {

    for(var i=minSize; i<=maxSize; i++ ) {
        var optSize = document.createElement('option');
        optSize.value = i;
        optSize.text = i;
        if( i === defaultSize) {
            optSize.selected = 'selected'
        }
        textSize.appendChild(optSize);
    }

    for(var j=0; j<fontList.length; j++) {
        var optFont = document.createElement('option');
        optFont.value = fontList[j];
        optFont.text = fontList[j];
        textFont.appendChild(optFont);
    }
    changeAbled(true);

    fontSize = textSize.value;
    fontType = textFont.value;

}

function addTextEvent() {
    textChk.addEventListener('change', function () {
        clearCanvas(ctxA);
        //clearCanvas(ctxB);
        ctxA.drawImage(offcanvas,0,0);
        if (this.checked === true) {
            changeAbled(false);
            if(textValue) {
                setFont(ctxA, textValue, fontSize, fontType);
            }
        } else {
            changeAbled(true);
        }
    });

    textDrt.addEventListener('change', function () {
        clearCanvas(ctxA);
        ctxA.drawImage(offcanvas,0,0);
        if(this.checked === true) {
            ISVERTICAL = true;
        } else {
            ISVERTICAL = false;
        }
        if(textValue) {
            setFont(ctxA, textValue, fontSize, fontType);
        }
    });

    textIpt.addEventListener('change', function () {
        clearCanvas(ctxA);
        ctxA.drawImage(offcanvas,0,0);
        textValue = this.value;
        setFont(ctxA, textValue, fontSize, fontType);
    });

    textSize.addEventListener('change', function () {
        clearCanvas(ctxA);
        ctxA.drawImage(offcanvas,0,0);
        fontSize = this.value;
        setFont(ctxA, textValue, fontSize, fontType);
    });

    textFont.addEventListener('change', function () {
        clearCanvas(ctxA);
        ctxA.drawImage(offcanvas,0,0);
        fontType = this.value;
        setFont(ctxA, textValue, fontSize, fontType);
    });

    btnSave.addEventListener('click', function() {
        var image = new Image();
        image.src = outImgCanvas.toDataURL('image/png');
    })
}

function changeAbled(boolValue) {
    textIpt.disabled = boolValue;
    textSize.disabled = boolValue;
    textFont.disabled = boolValue;
}

function setFont( ctx, text, size, type ) {
    ctx.font = size + 'px ' + type;

    if(!ISVERTICAL) {
        //ctxA.strokeText( text, locateX, locateY );
        ctxA.fillText(text, locateX, locateY);
    } else {
        for(var i=0; i< textValue.length; i++) {
            ctxA.fillText(text[i], locateX, locateY + i*size, size, 1.0);
        }
    }

    //ctxA.shadowOffsetX = 2;
    //ctxA.shadowOffsetY = 2;
    //ctxA.shadowBlur = 4;
    //ctxA.shadowColor = '#666666';

    //ctxA.textBaseline = 'top';
    //ctxA.textAlign = 'center';

}





///**
// * Created by CGGI_006 on 2016/3/18.
// */
//var loadImgBtn = document.getElementById('uLoadBtn');
//var loadImgCanvas = document.getElementById('canvasA');
//var outImgCanvas = document.getElementById('canvasB');
//var modeSlt = document.getElementById('uModeSlt');
//var textChk = document.getElementById('uTextChk');
//var textDrt = document.getElementById('uTextDrt');
//var textIpt = document.getElementById('uTextIpt');
//var textSize = document.getElementById('uTextSize');
//var textFont = document.getElementById('uTextFont');
//var btnSave = document.getElementById('uSaveBtn');
//
//var ctxA = loadImgCanvas.getContext('2d');
//var ctxB = outImgCanvas.getContext('2d');
//
//var imgWidth, imgHeight, imgSrc;
//var canvasHeight = 300;
////var canvasWidth = 366;
//loadImgCanvas.height = canvasHeight;
//outImgCanvas.height = loadImgCanvas.height;
////loadImgCanvas.width = canvasWidth;
//
//var startX = 0,
//    startY = 0,
//    offsetX = 0,
//    offsetY = 0;
//var locateX = 10,
//    locateY = 150;
//var textValue,
//    fontSize,
//    fontType;
//var minSize = 10,
//    maxSize = 500,
//    defaultSize = 20;
//var ISVERTICAL = false;
//var fontList = [
//    '隶书',
//    '方正书体',
//    '楷体',
//    '微软雅黑',
//    '华文行楷',
//    '华文隶书',
//    '仿宋'
//];
//
//
//initLoad();
//initText();
//addImgEvent();
//addTextEvent();
//
///************* 选择图片上传 ****************/
//function initLoad() {
//    if(typeof FileReader == 'undefined') {
//        ctxA.innerHTML = '抱歉，你的浏览器不支持FileReader';
//        loadImgBtn.disabled = 'disabled';
//    } else {
//        loadImgBtn .addEventListener('change', readFile, false);
//    }
//
//    //var image = new Image();
//    //window.onload = function () {
//    //    image.src = 'images/mvt/mvt001.bmp';
//    //    image.onload = function() {
//    //        ctxA.drawImage(image, 0, 0, loadImgCanvas.width, loadImgCanvas.height);
//    //    }
//    //}
//
//}
//function readFile() {
//    var imgFile = this.files[0];
//    if(!/image\/\w+/.test(imgFile.type)) {
//        alert('文件必须为图片！');
//        return false;
//    }
//    var reader = new FileReader();
//    reader.readAsDataURL(imgFile);
//    reader.onload = function() {
//        imgSrc = this.result;
//        var img = new Image();
//        img.src = imgSrc;
//        img.onload = function () {
//            var scale = canvasHeight / this.height;
//            imgWidth = this.width * scale;
//            imgHeight = this.height * scale;
//            loadImgCanvas.width = imgWidth;
//            outImgCanvas.width = imgWidth;
//            canvasWidth = loadImgCanvas.width;
//            clearCanvas(ctxA);
//            ctxA.drawImage(img, startX, startY, imgWidth, imgHeight);
//            modeSlt.options[0].selected = true;
//            modeHandle(modeSlt.value);
//        }
//    }
//}
//
///***************** 图像处理 *********************/
//
//function clearCanvas(context) {
//    context.clearRect(0, 0, canvasWidth, canvasHeight);
//}
//
//function addImgEvent() {
//    modeSlt.addEventListener('change', function() {
//        var mode = this.value;
//        modeHandle(mode);
//    });
//}
//
//function modeHandle(mode) {
//    clearCanvas(ctxB);
//    switch (mode) {
//        case 'original':
//            var imageData = ctxA.getImageData(startX, startY, imgWidth, imgHeight);
//            ctxB.putImageData(imageData, offsetX, offsetY, startX, startY, imgWidth, imgHeight);
//            break;
//        case 'binary':
//            var imageData = ctxA.getImageData(startX, startY,imgWidth, imgHeight);
//            var pixelData = imageData.data;
//            var pv;
//            for ( var i=0; i<canvasWidth * canvasHeight; i++) {
//                var r = pixelData[ i*4   ];
//                var g = pixelData[ i*4+1 ];
//                var b = pixelData[ i*4+2 ];
//
//                var grey = r * 0.3 + g * 0.59 + b * 0.11;
//                if( grey > 125) {
//                    pv = 255;
//                } else {
//                    pv = 0;
//                }
//
//                pixelData[ i*4   ] = pv;
//                pixelData[ i*4+1 ] = pv;
//                pixelData[ i*4+2 ] = pv;
//            }
//            ctxB.putImageData(imageData, offsetX, offsetY, startX, startY, imgWidth, imgHeight);
//            break;
//        case 'bump':
//            var imageData = ctxA.getImageData(startX, startY, imgWidth, imgHeight);
//            var outputData = ctxB.createImageData(imageData);
//            var w = imageData.width;
//            var h = imageData.height;
//            var pixelData = imageData.data;
//            var pixelOutData = outputData.data;
//            var mtx = [-6, -3, 0, -3, -1, 3, 0, 3, 6];
//            for (var x=1; x<h-1; x++) {
//                for( var y=1; y<w-1; y++) {
//                    for (var z=0; z<3; z++) {
//                        var sum = 0;
//                        var i = (x * w + y) * 4 + z;
//                        var pixelMat = [
//                            pixelData[ i - 4*w - 4 ],
//                            pixelData[ i - 4*w     ],
//                            pixelData[ i - 4*w + 4 ],
//                            pixelData[ i       - 4 ],
//                            pixelData[ i           ],
//                            pixelData[ i       + 4 ],
//                            pixelData[ i + 4*w - 4 ],
//                            pixelData[ i + 4*w     ],
//                            pixelData[ i + 4*w + 4 ]
//                        ];
//                        for(var k=0; k<pixelMat.length; k++) {
//                            sum += mtx[k] * pixelMat[k];
//                        }
//                        pixelOutData[i] = sum / -1;
//                    }
//                    pixelOutData[(x * w + y) * 4 + 3] = 255;
//                }
//            }
//            ctxB.putImageData(outputData, offsetX, offsetY, startX, startY, imgWidth, imgHeight);
//            break;
//        case 'transparent':
//            var imageData = ctxA.getImageData(startX, startY, imgWidth, imgHeight);
//            var pixelData = imageData.data;
//            var pv;
//
//            for( var i = 0; i < imgWidth * imgHeight; i++) {
//                var r = pixelData[ i * 4 + 0 ];
//                var g = pixelData[ i * 4 + 1 ];
//                var b = pixelData[ i * 4 + 2 ];
//
//                var grey = r * 0.3 + g * 0.59 + b * 0.11;
//                if(grey > 254) {
//                    pv = 0;
//                } else {
//                    pv = 255;
//                }
//                pixelData[ i * 4 + 3 ] = pv;
//            }
//            ctxB.putImageData(imageData, offsetX, offsetY, startX, startY, imgWidth, imgHeight);
//            break;
//    }
//}
//
///*************** 文字 : 设置文字大小及字体 ****************/
//function initText() {
//
//    for(var i=minSize; i<=maxSize; i++ ) {
//        var optSize = document.createElement('option');
//        optSize.value = i;
//        optSize.text = i;
//        if( i === defaultSize) {
//            optSize.selected = 'selected'
//        }
//        textSize.appendChild(optSize);
//    }
//
//    for(var j=0; j<fontList.length; j++) {
//        var optFont = document.createElement('option');
//        optFont.value = fontList[j];
//        optFont.text = fontList[j];
//        textFont.appendChild(optFont);
//    }
//    changeAbled(true);
//
//    fontSize = textSize.value;
//    fontType = textFont.value;
//
//}
//
//function addTextEvent() {
//    textChk.addEventListener('change', function () {
//        clearCanvas(ctxA);
//        clearCanvas(ctxB);
//        if (this.checked === true) {
//            changeAbled(false);
//            if(textValue) {
//                setFont(ctxA, textValue, fontSize, fontType);
//            }
//        } else {
//            changeAbled(true);
//        }
//    });
//
//    textDrt.addEventListener('change', function () {
//        clearCanvas(ctxA);
//        if(this.checked === true) {
//            ISVERTICAL = true;
//        } else {
//            ISVERTICAL = false;
//        }
//        if(textValue) {
//            setFont(ctxA, textValue, fontSize, fontType);
//        }
//    });
//
//    textIpt.addEventListener('change', function () {
//        clearCanvas(ctxA);
//        textValue = this.value;
//        setFont(ctxA, textValue, fontSize, fontType);
//    });
//
//    textSize.addEventListener('change', function () {
//        clearCanvas(ctxA);
//        fontSize = this.value;
//        setFont(ctxA, textValue, fontSize, fontType);
//    });
//
//    textFont.addEventListener('change', function () {
//        clearCanvas(ctxA);
//        fontType = this.value;
//        setFont(ctxA, textValue, fontSize, fontType);
//    });
//
//    btnSave.addEventListener('click', function() {
//        var image = new Image();
//        image.src = outImgCanvas.toDataURL('image/png');
//    })
//}
//
//function changeAbled(boolValue) {
//    textIpt.disabled = boolValue;
//    textSize.disabled = boolValue;
//    textFont.disabled = boolValue;
//}
//
//function setFont( ctx, text, size, type ) {
//    ctx.font = size + 'px ' + type;
//
//    if(!ISVERTICAL) {
//        //ctxA.strokeText( text, locateX, locateY );
//        ctxA.fillText(text, locateX, locateY);
//    } else {
//        for(var i=0; i< textValue.length; i++) {
//            ctxA.fillText(text[i], locateX, locateY + i*size, size, 1.0);
//        }
//    }
//
//    //ctxA.shadowOffsetX = 2;
//    //ctxA.shadowOffsetY = 2;
//    //ctxA.shadowBlur = 4;
//    //ctxA.shadowColor = '#666666';
//
//    //ctxA.textBaseline = 'top';
//    //ctxA.textAlign = 'center';
//
//}
//
