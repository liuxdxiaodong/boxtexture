/**
 * Created by CGGI_006 on 2016/6/5.
 */
 var IMGPATH = 'images/test1.png';
var CANVAS = 'xCanvas';
var IMAGEX = 'xImage';

var divImg = document.getElementById(IMAGEX);
var chkDrtText = document.getElementById('xFontDrt');
var sltType = document.getElementById('xFontType');
var sltSize = document.getElementById('xFontSize');
var iptDist = document.getElementById('xDistNum');
var iptColor = document.getElementById('xFontColor');
var iptX = document.getElementById('xLeft');
var iptY = document.getElementById('xTop');
var btnItalic = document.getElementById('xFontItalic');
var btnBold = document.getElementById('xFontBold');

var divLeft = divImg.offsetLeft;
var divTop = divImg.offsetTop;
var ISVERTICAL = false;
var fontList = [
    '',
    '��������',
    '����',
    '΢���ź�',
    '�����п�',
    '��������',
    '����'
];
// var textValueList = [
//     'ӡ��˵',
//     '���װ�������',
//     '����ܼࣺĳĳĳ',
//     '��ϵ��ʽ��188888888',
//     '��ַ������ʡ������'
// ];

// var textSizeList = [19, 12, 11, 14, 15];
// var textTypeIdxList = [0, 1, 4, 4, 4];
// var textCanvasPosList = [[30, 80],[20, 200], [20, 230],[20,260],[20, 290]];
// var textDistList = [2, 1.5, 1.2, 1.2, 1.2];
// var textDrtList = [true, false, false, false, false];
// var italicList = [true, false, false, false, false];
// var boldList = [true, false, false, false, false];
var textValueList = [
    '���',
    'logo',
    '�ҹȻ���',
    '�й�����',
    'THE BEST TEA',
    'WU YI YAN CHA'
];

var textSizeList = [80, 50, 23, 13, 13,13];
var textTypeIdxList = [2, 1, 4, 1, 1, 1];
var textCanvasPosList = [[97, 191],[85, 126], [61, 329],[181,201],[177, 269],[165,270]];
var textDistList = [2, 1, 1.2, 1.2, 1, 1, 1];
var textDrtList = [true, false, true, true, false, false];
var italicList = [false, false, false, false, false, false];
var boldList = [true, true, false, false, false, false];
var rotateList = [false, false, false, false, true, true];
var textColorList = ['black', 'black', 'black', 'black', 'black', 'black'];

var textId = 'text0';
var textIdx = 0;
var iptTextId = 'iptText1';
var textValue = textValueList[0];
var textType = fontList[0];
var textSize = textSizeList[0];
var textZIndex = 2;
var textWidth = 200;
var textHeight = textSize * 2;
var textRotate = rotateList[0];
var textDist = textDistList[0];
var textItalic = italicList[0];
var textBold = boldList[0];
var textColor = textColorList[0];

AddCanvas();
LoadImg(IMGPATH);
AddTextCanvasList(textValueList, textSizeList, textTypeIdxList, textCanvasPosList, textDistList, textDrtList, rotateList, textColorList);
// AddTextBlockCanvas(textId, textZIndex, textCanvasX, textCanvasY, textWidth, textHeight, textX, textY, textValue, textSize, textType);
AddOptsToSlt();
//AddTextIpt(iptTextId);
//AddTextEditEvent(textId, iptTextId);
//MoveEvent();

/************ �����div����ӻ������ڴ��ͼƬ *****************/
function AddCanvas() {
    var divImg = document.getElementById(IMAGEX);
    var canvas = document.createElement('canvas');
    var cWidth = divImg.clientWidth;
    var cHeight = divImg.clientHeight;

    canvas.id = CANVAS;
    canvas.zIndex = 1;
    canvas.width = cWidth;
    canvas.height = cHeight;
    canvas.style.left = divLeft;
    canvas.style.top = divTop;
    canvas.style.position = 'absolute';
    divImg.appendChild(canvas);
}

/************* ����໭���м���ͼƬ ***************/
function LoadImg(src) {
    var canvas = document.getElementById(CANVAS);
    var ctx = canvas.getContext('2d');

    var cWidth = canvas.clientWidth;
    var cHeight = canvas.clientHeight;
    canvas.style.border = '1px solid red';
    var image = new Image();
    image.src = src;
    image.onload = function() {
        var scale1 = cWidth / this.width;
        var scale2 = cHeight / this.height;
        var scale = scale1<scale2 ? scale1:scale2;
        var imgWidth = this.width * scale;
        var imgHeight = this.height * scale;

        //canvas.height = imgHeight;
        ctx.drawImage(this, 0, 0, imgWidth, imgHeight);
    }
    //canvas.width = image.offsetWidth;
}

function AddTextCanvasList(textList, sizeList, fontTypeList, pstList, distList, drtList, rotateList, colorList){
    var count = textList.length;
    for(var i=0;i<count;i++){
        var tId = 'text' + i;
        var tValue = textList[i];
        var tSize = sizeList[i];
        var tFont = fontList[fontTypeList[i]];
        var ITALIC = italicList[i];
        var BOLD = boldList[i];
        var tRotate = rotateList[i];
        var tColor = colorList[i];
        var tDirect = drtList[i];
        AddTextBlockCanvas(tId, i+2, divLeft+pstList[i][0], divTop+pstList[i][1],  tValue, tSize, tFont, distList[i], ITALIC, BOLD, tDirect, tRotate, tColor);

        var iptId = 'iptText' + i;
        AddTextIpt(iptId, tValue);
        AddTextIptEvent(tId, iptId, i);
        MoveEvent(tId, iptId, i);
    }
    AddTextEditEvent();
}

/***************** �����div��������ֵĻ����������ͼƬcanvas�Ϸ� *******************/
function AddTextBlockCanvas(id, zIndex, x, y, value,  textSize, textType, textDist, ITALIC, BOLD, textDirect, textRotate, textColor) {
    var divTxt = document.getElementById(IMAGEX);
    var text = document.createElement('canvas');

    text.id = id;
    text.style.position = 'absolute';
    text.style.top = y;
    text.style.left = x;
    SetFont(text, zIndex, value, textSize, textDist, textType, ITALIC, BOLD, textDirect, textRotate, textColor);
    divTxt.appendChild(text);
}

/**************** �Ҳ�editҳ�沼�֣����optionsѡ�input *********************/
function AddOptsToSlt(){
    var sltFontType = document.getElementById('xFontType');
    for(var i=0; i<fontList.length; i++) {
        var optFont = document.createElement('option');
        optFont.value = fontList[i];
        optFont.text = fontList[i];
        sltFontType.appendChild(optFont);
    }

    var sltFontSize = document.getElementById('xFontSize');
    var minSize = 8,
        maxSize = 100;
    for(var j=minSize; j<=maxSize; j++) {
        var optSize = document.createElement('option');
        optSize.value = j;
        optSize.text = j + '��';
        sltFontSize.appendChild(optSize);
    }
}

function AddTextIpt(iptId, textValue){
    var divText = document.getElementById('xText');
    var iptText = document.createElement('input');
    iptText.id = iptId;
    iptText.width = 300;
    iptText.style.marginTop = '20px';
    iptText.style.marginLeft = '20px';
    iptText.value = textValue;
    divText.appendChild(iptText);
}

/************** ��ӱ༭�¼� ****************/
function ClearCanvas(canvas, width, height) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);
}

function removeNode(id) {
    var node = document.getElementById(id);
    node.parentNode.removeChild(node);
}

/************** SetFont function has not completed  and every call should update **********************/
function SetFont(canvas, zIndex,text, size, dist, type, ITALIC, BOLD, direct, rotate, color) {
    size = parseInt(size);
    var context = canvas.getContext('2d');
    context.font =  size + 'px ' + type;
    var measWidth = context.measureText(text).width;

    canvas.zIndex = zIndex;
    var cMargin = 6;
    var cItalic = ITALIC === true ? 'italic ' : ' ';
    var cBold = BOLD === true ? 'bold ' :  ' ';
    //context.textAlign = 'right';

    if(!direct && !rotate) {
        canvas.width = measWidth + cMargin;
        canvas.height = size + cMargin;
        var x = 0;
        var y = canvas.height/2;
        context.textBaseline = 'middle';
        context.fillStyle = color;
        context.font = cItalic + cBold + size + 'px ' + type;
        context.fillText(text, x, y);
        //context.restore();
        //for(var i=0; i<text.length; i++){
        //    context.fillText(text[i], x + i*size*dist, y);
        //}
    } else if(!direct && rotate) {
        canvas.width =  size + cMargin;
        canvas.height = measWidth * dist + cMargin;
        var x = size;
        var y = canvas.height/2;
        context.textAlign = 'center';
        context.font = cItalic + cBold + size + 'px ' + type;
        var xPos = canvas.width/2;
        var yPos = canvas.height/2;
        context.translate(xPos, yPos);
        context.rotate(Math.PI/2);
        context.translate(-xPos,-yPos);
        context.fillStyle = color;
        context.fillText(text, x, y);
    } else {
        canvas.width = size + cMargin;
        canvas.height = measWidth * dist + cMargin;
        var x = canvas.width/2;
        var y = size;
        context.textAlign = 'center';
        context.font = cItalic + cBold + size + 'px ' + type;
        context.fillStyle = color;
        for(var i=0; i<text.length; i++){
            context.fillText(text[i], x, y + i*size*dist);
        }
    }
}

function AddTextIptEvent(id, iptId, i) {
    var iptText = document.getElementById(iptId);
    var canvasText = document.getElementById(id);
    iptText.addEventListener('change', function() {
        ClearCanvas(canvasText, textWidth, textHeight);
        textId = id;
        textIdx = i;
        var text = this.value;
        textValue = text;
        SetFont(canvasText, textZIndex,textValue, textSize, textDist, textType, textItalic, textBold, ISVERTICAL, textRotate, textColor);

    });
    iptText.addEventListener('click', function(){
        var preText = document.getElementById(textId);
        preText.style.border = 'none';
        textId = id;
        textIdx = i;
        var text = document.getElementById(id);
        text.style.border = '1px solid red';
        sltType.value = fontList[textTypeIdxList[i]];
        sltSize.value = textSizeList[i];
        iptDist.value = textDistList[i];
        iptColor.value = textColorList[i];
        iptX.value = textCanvasPosList[i][0];
        iptY.value = textCanvasPosList[i][1];
        chkDrtText.checked = textDrtList[i];

        ISVERTICAL = textDrtList[i];
        textItalic = italicList[i];
        textBold = boldList[i];
        textValue = this.value;
        textType = sltType.value;
        textSize = sltSize.value;
        textDist = iptDist.value;
        textRotate = rotateList[i];
        textColor = textColorList[i];
        textWidth = text.width;
        textHeight = text.height;
    });
    canvasText.addEventListener('click', function(){
        var preText = document.getElementById(textId);
        preText.style.border = 'none';
        textId = id;
        textIdx = i;
        var text = document.getElementById(id);
        text.style.border = '1px solid red';
        document.getElementById(iptId).focus();
        sltType.value = fontList[textTypeIdxList[i]];
        sltSize.value = textSizeList[i];
        iptDist.value = textDistList[i];
        iptColor.value = textColorList[i];
        iptX.value = textCanvasPosList[i][0];
        iptY.value = textCanvasPosList[i][1];
        chkDrtText.checked = textDrtList[i];
        ISVERTICAL = textDrtList[i];
        textItalic = italicList[i];
        textBold = boldList[i];
        textValue = document.getElementById(iptId).value;
        textType = sltType.value;
        textSize = sltSize.value;
        textDist = iptDist.value;
        textRotate = rotateList[i];
        textColor = textColorList[i];
        textWidth = text.width;
        textHeight = text.height;
    });
}

function AddTextEditEvent() {
    chkDrtText.addEventListener('change', function() {
        var canvasText = document.getElementById(textId);
        ClearCanvas(canvasText, textWidth, textHeight);

        if(this.checked === true) {
            ISVERTICAL = true;
            textDrtList[textIdx] = true;
            SetFont(canvasText, textZIndex, textValue, textSize, textDist, textType, textItalic, textBold, ISVERTICAL, textRotate, textColor);
        } else {
            ISVERTICAL = false;
            textDrtList[textIdx] = false;
            SetFont(canvasText, textZIndex, textValue, textSize, textDist, textType, textItalic, textBold, ISVERTICAL, textRotate, textColor);
        }
    });

    sltType.addEventListener('change', function() {
        var canvasText = document.getElementById(textId);
        ClearCanvas(canvasText, textWidth, textHeight);
        var type = this.value;
        var idx = this.selectedIndex;
        textType = type;
        textTypeIdxList[textIdx] = idx;
        if(!ISVERTICAL)
            SetFont(canvasText, textZIndex, textValue, textSize, textDist, textType, textItalic, textBold, ISVERTICAL, textRotate, textColor);
        else{
            SetFont(canvasText,  textZIndex, textValue, textSize, textDist, textType, textItalic, textBold, ISVERTICAL, textRotate, textColor);
        }
    });


    sltSize.addEventListener('change', function() {
        var canvasText = document.getElementById(textId);
        ClearCanvas(canvasText, textWidth, textHeight);
        var size = this.value;
        textSize = size;
        //canvasText.height = 2 * textSize;
        textSizeList[textIdx] = size;
        if(!ISVERTICAL){
            SetFont(canvasText, textZIndex, textValue, textSize, textDist, textType, textItalic, textBold, ISVERTICAL, textRotate, textColor);
        }
        else{
            SetFont(canvasText, textZIndex, textValue, textSize, textDist, textType, textItalic, textBold, ISVERTICAL, textRotate, textColor);
        }
    });

    iptDist.addEventListener('change', function(){
        var canvasText = document.getElementById(textId);
        ClearCanvas(canvasText, textWidth, textHeight);
        var dist = this.value;
        textDist = dist;
        textDistList[textIdx] = dist;
        SetFont(canvasText, textZIndex, textValue, textSize, textDist, textType, textItalic, textBold, ISVERTICAL, textRotate, textColor);
    });

    iptColor.addEventListener('change', function(){
        var canvasText = document.getElementById(textId);
        ClearCanvas(canvasText, textWidth, textHeight);
        var color = this.value;
        textColor = color;
        textColorList[textIdx] = color;
        SetFont(canvasText, textZIndex, textValue, textSize, textDist, textType, textItalic, textBold, ISVERTICAL, textRotate, textColor);
    });

    iptX.addEventListener('change', function() {
        var canvasText = document.getElementById(textId);
        ClearCanvas(canvasText, textWidth, textHeight);
        var x = this.value;
        canvasText.style.left = parseInt(x) + divLeft;
        textCanvasPosList[textIdx][0] = x;
        SetFont(canvasText, textZIndex, textValue, textSize, textDist, textType, textItalic, textBold, ISVERTICAL, textRotate, textColor);
    });

    iptY.addEventListener('change', function() {
        var canvasText = document.getElementById(textId);
        ClearCanvas(canvasText, textWidth, textHeight);
        var y = this.value;
        canvasText.style.top = parseInt(y) + divTop;
        textCanvasPosList[textIdx][1] = y;
        SetFont(canvasText, textZIndex, textValue, textSize, textDist, textType, textItalic, textBold, ISVERTICAL, textRotate, textColor);
    })
    btnItalic.addEventListener('click', function(){
        var canvasText = document.getElementById(textId);
        ClearCanvas(canvasText, textWidth, textHeight);
        textItalic = !textItalic;
        italicList[textIdx] = textItalic;
        SetFont(canvasText, textZIndex, textValue, textSize, textDist, textType, textItalic, textBold, ISVERTICAL, textRotate, textColor);
    });

    btnBold.addEventListener('click', function(){
        var canvasText = document.getElementById(textId);
        ClearCanvas(canvasText, textWidth, textHeight);
        textBold = !textBold;
        boldList[textIdx] = textBold;
        SetFont(canvasText, textZIndex, textValue, textSize, textDist, textType, textItalic, textBold, ISVERTICAL, textRotate, textColor);
    });

    var btnSave = document.getElementById('xSave');
    btnSave.addEventListener('click', function(){
        var canvasText = document.getElementById(textId);
        canvasText.style.border = 'none';
        //alert('rotate');
        //var canvasText = document.getElementById(CANVAS);
        //var context = canvasText.getContext('2d');
        ////ClearCanvas(canvasText, textWidth, textHeight);
        //context.save();
        //SetFont(canvasText, textZIndex, textValue, textSize, textDist, textType, textItalic, textBold, ISVERTICAL, textRotate, textColor)
        //context.restore();
        //var canvas = document.getElementById(CANVAS);
        //var image = new Image();
        //image.src = canvas.toDataURL('image/png');
    })
}
function MoveEvent(id, iptId, i){
    var X = 0;
    var Y = 0;
    var margin = 5;
    var divObj = document.getElementById(id);
    var moveFlag = false;
    var clickFlag = false;
    var imgCanvas = document.getElementById(CANVAS);
    var imgWidth = imgCanvas.width;
    var imgHeight = imgCanvas.height;
    var imgLeft = parseInt(imgCanvas.style.left);
    var imgTop = parseInt(imgCanvas.style.top);
    divObj.onmousedown = function(e){
        moveFlag = true;
        clickFlag = true;
        var clickEvent = window.event || e;
        var mWidth = clickEvent.clientX - parseInt(divObj.style.left);
        var mHeight = clickEvent.clientY - parseInt(divObj.style.top);

        divObj.onmousemove = function(e){
            clickFlag = false;
            var moveEvent = window.event || e;
            if(moveFlag){
                divObj.style.left = moveEvent.clientX - mWidth;
                divObj.style.top = moveEvent.clientY - mHeight;

                X = moveEvent.clientX - mWidth;
                Y = moveEvent.clientY - mHeight;
                if(moveEvent.clientX <= mWidth + imgLeft + margin){
                    X = imgLeft + margin;
                    divObj.style.left = X;

                }
                if(parseInt(divObj.style.left) + divObj.width >= (imgWidth + imgLeft - margin)){
                    X = imgWidth + imgLeft - margin - divObj.width;
                    divObj.style.left = X;
                }
                if(moveEvent.clientY <= mHeight + imgTop + margin) {
                    Y = imgTop + margin;
                    divObj.style.top = Y;
                }
                if(parseInt(divObj.style.top) + divObj.height >= (imgHeight + imgTop - margin)) {
                    Y = imgHeight + imgTop - margin - divObj.height;
                    divObj.style.top = Y;
                }
                iptX.value = parseInt(divObj.style.left) - imgLeft;
                iptY.value = parseInt(divObj.style.top) - imgTop;
                textCanvasPosList[i][0] = iptX.value;
                textCanvasPosList[i][1] = iptY.value;

                divObj.onmouseup = function() {
                    moveFlag = false;
                    if(clickFlag) {
                        //var preText = document.getElementById(textId);
                        //preText.style.border = 'none';
                        //textId = id;
                        //textIdx = i;
                        //var text = document.getElementById(id);
                        //text.style.border = '1px solid red';
                        //document.getElementById(iptId).focus();
                        //sltType.value = fontList[textTypeIdxList[i]];
                        //sltSize.value = textSizeList[i];
                        //iptDist.value = textDistList[i];
                        //chkDrtText.checked = textDrtList[i];
                        //textValue = document.getElementById(iptId).value;
                        //textType = sltType.value;
                        //textSize = sltSize.value;
                        //textDist = iptDist.value;
                    }
                }
            }
        }
    }
}