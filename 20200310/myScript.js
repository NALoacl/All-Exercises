//���J��
var cloneT = $(".child");
$("#chi").css("display","none");

//$('#excel-file').value='system.xlsx';

//���|
var path = '';

//��input����ô��change�ƥ�A�@�W�ǿ襤��.xls�ɮ״N�|Ĳ�o�Ө禡
    $('#excel-file').change(function(e) {
    	  console.log(e);
    	  console.log(e.target.baseURI);
    	  /*path=(e.target.baseURI).slice(8,-10);
    	  var paths = path.split("/");
    	  path = paths.join("\\");*/
    	  path = (((e.target.baseURI).slice(8,-10)).split("/")).join("\\");
    	  /*path=e.target.baseURI;
    	  console.log(path);
    	  var row_array=[];
    	  for (var i=8;i<20;i++){
    	    row_array.push(path[i]);
    	  }
    	  console.log(row_array);*/
    	  console.log(path);
        var files = e.target.files;
        var fileReader = new FileReader();
        fileReader.onload = function(ev) {
            try {
                var data = ev.target.result
                var workbook = XLSX.read(data, {
                    type: 'binary'
                }) // �H�G�i���y�覡Ū���o����excel���檫��
                var persons = []; // �x�s����쪺���
            } catch (e) {
                console.log('�ɮ׫��O�����T');
                return;
            }
            // ���檺����d��A�i�Ω�P�_���Y�O�_�ƶq�O�_���T
            var fromTo = '';
            // �M���C�i��Ū��
            for (var sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    fromTo = workbook.Sheets[sheet]['!ref'];
                    console.log(fromTo);
                    persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    break; // �p�G�u���Ĥ@�i���A�N���������o��
                }
            }
            //�b�����i���L�X�Ӫ��椤�����
            console.log(persons);
            var i=1;
            for(var key in persons) {
            	cloneDiv();
            	console.log(key);
            	console.log(persons[key].name);
            	console.log(persons[key].files);
            	inValueEd(i,persons[key].name,persons[key].files);
            	i=i+1;
						}
						//JsExecCmd(path+persons[key].files);
						//var ImgT = document.createElement("img");
						//ImgT.src=persons[0].files;
						//$(".title")[0].innerHTML = persons[0].name;
						//$(".pic")[0].appendChild(ImgT);
        };
        // �H�G�i���覡�}���ɮ�
        fileReader.readAsBinaryString(files[0]);
    });

function inValueEd(keys,names,files){
	//���
	var ImgT = document.createElement("img");
	ImgT.src=files;
	$(".title")[keys].innerHTML = names;
	$(".pic")[keys].appendChild(ImgT);
}

//���
//var ImgT = document.createElement("img");
//ImgT.src=picT[0];
//$(".title")[0].innerHTML = nameT[0];
//$(".pic")[0].appendChild(ImgT);

function cloneDiv(){
	$("#mom").append(cloneT.clone());
	}
//�J��
//var cloneT = $(".child");
//$("#mom").append(cloneT.clone());


//cmd�}�Ҵ���
function JsExecCmd(value) {
var cmd = new ActiveXObject("WScript.Shell");
/*

�R�O�Ѽƻ���

cmd.exe /c dir ���槹dir�R�O�Z�����R�O���f�C

cmd.exe /k dir ���槹dir�R�O�Z�������R�O���f�C

cmd.exe /c start dir �b�s���f����dir���O�A�쵡�f�����C

cmd.exe /k start dir �b�s���f����dir���O�A�쵡�f�������C

*/
var cmd = new ActiveXObject("WScript.Shell");
cmd.run("cmd.exe /c "+value);
cmd=null;
}