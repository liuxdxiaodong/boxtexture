/**
 * Created by CGGI_006 on 2016/2/26.
 */

showMbtImg();
showMvtImg();
showMetImg();

function showMetImg() {
    var metContainer = document.getElementById(config.MTREID);
    for (var index=0; index < ELIST.length; index++) {
        var metLink = document.createElement('a');
        var totalDiv = document.createElement('div');
        var imageDiv = document.createElement('div');
        var labelDiv = document.createElement('div');
        var metImg = document.createElement('img');
        var metLabel = document.createElement('label');

        metLink.href = 'javascript: void(0)';
        metLink.id = EID[index];
        metLink.style.display = 'inline-block';

        metImg.src = EPATH + ELIST[index];
        metImg.style.width = '100%';
        metImg.style.height = '100%';
        //metImg.style.border = '1px solid #000';

        metLabel.for = metLink.id;
        metLabel.innerHTML = ENAME[index];

        totalDiv.style.width = '84px';
        totalDiv.style.height = '84px';
        totalDiv.style.margin = '2px 2px';
        imageDiv.style.width = '100%';
        imageDiv.style.height = '86%';
        labelDiv.style.width = '100%';
        labelDiv.style.height = '14%';
        labelDiv.style.textAlign = 'center';


        imageDiv.appendChild(metImg);
        labelDiv.appendChild(metLabel);
        totalDiv.appendChild(imageDiv);
        totalDiv.appendChild(labelDiv);
        metLink.appendChild(totalDiv);
        metContainer.appendChild(metLink);

        //metLink.appendChild(metImg);
        //metLink.appendChild(metLabel);
        //metContainer.appendChild(metLink);
    }
}
function showMbtImg() {

    var mbtContainer = document.getElementById(config.MTRBID);

    for (var index=0; index <BLIST.length; index++) {
        var mbtLink = document.createElement('a');
        var totalDiv = document.createElement('div');
        var imageDiv = document.createElement('div');
        var labelDiv = document.createElement('div');
        var alphaDiv = document.createElement('div');
        var mbtImg = document.createElement('img');
        var mbtLabel = document.createElement('label');
        var alphaChk = document.createElement('input');

        var mbtId = BLIST[index];
        mbtLink.href = 'javascript:void(0)';
        mbtLink.id = mbtId;

        mbtImg.src = BPATH + config.MIMG + config.M + BLIST[index] + config.JPG;
        mbtImg.style.width = '100%';
        mbtImg.style.height = '100%';

        mbtLabel.innerText = BLIST[index];

        alphaChk.type = 'checkbox';
        alphaChk.name = 'mbtAlpha';
        alphaChk.style.size = '10px 10px';
        //alphaChk.id = 'mbt' + 'A' + idIdx;

        totalDiv.style.width = '70px';
        totalDiv.style.height = '70px';
        totalDiv.style.margin = '2px 2px';
        totalDiv.style.display = 'inline-block';
        imageDiv.style.width = '100%';
        imageDiv.style.height = '86%';
        labelDiv.style.width = '100%';
        labelDiv.style.height = '14%';
        labelDiv.style.textAlign = 'center';

        imageDiv.appendChild(mbtImg);
        labelDiv.appendChild(mbtLabel);
        totalDiv.appendChild(imageDiv);
        totalDiv.appendChild(labelDiv);

        mbtLink.appendChild(totalDiv);
        mbtContainer.appendChild(mbtLink);
    }
}

function showMvtImg() {
    var mvtContainer = document.getElementById(config.MTRVID);
    for (var index=0; index < VLIST.length; index++) {
        var mvtLink = document.createElement('a');
        var totalDiv = document.createElement('div');
        var imageDiv = document.createElement('div');
        var labelDiv = document.createElement('div');
        var mvtImg = document.createElement('img');
        var mvtLabel = document.createElement('label');

        mvtLink.href = 'javascript: void(0)';
        mvtLink.id = VID[index];

        mvtImg.src = VPATH + config.M + VLIST[index];
        mvtImg.style.width = '100%';
        mvtImg.style.height = '100%';

        mvtLabel.for = mvtLink.id;
        mvtLabel.innerText = VNAME[index];

        totalDiv.style.width = '70px';
        totalDiv.style.height = '70px';
        totalDiv.style.margin = '2px 2px';
        totalDiv.style.display = 'inline-block';
        imageDiv.style.width = '100%';
        imageDiv.style.height = '86%';
        labelDiv.style.width = '100%';
        labelDiv.style.height = '14%';
        labelDiv.style.textAlign = 'center';


        imageDiv.appendChild(mvtImg);
        labelDiv.appendChild(mvtLabel);
        totalDiv.appendChild(imageDiv);
        totalDiv.appendChild(labelDiv);

        mvtLink.appendChild(totalDiv);
        mvtContainer.appendChild(mvtLink);
    }
}
