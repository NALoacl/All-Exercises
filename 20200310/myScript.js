//先克隆
var cloneT = $(".child");
$("#chi").css("display","none");

//$('#excel-file').value='system.xlsx';

//路徑
var path = '';

//給input標籤繫結change事件，一上傳選中的.xls檔案就會觸發該函式
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
                }) // 以二進位制流方式讀取得到整份excel表格物件
                var persons = []; // 儲存獲取到的資料
            } catch (e) {
                console.log('檔案型別不正確');
                return;
            }
            // 表格的表格範圍，可用於判斷表頭是否數量是否正確
            var fromTo = '';
            // 遍歷每張表讀取
            for (var sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    fromTo = workbook.Sheets[sheet]['!ref'];
                    console.log(fromTo);
                    persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    break; // 如果只取第一張表，就取消註釋這行
                }
            }
            //在控制檯打印出來表格中的資料
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
        // 以二進位制方式開啟檔案
        fileReader.readAsBinaryString(files[0]);
    });

function inValueEd(keys,names,files){
	//賦值
	var ImgT = document.createElement("img");
	ImgT.src=files;
	$(".title")[keys].innerHTML = names;
	$(".pic")[keys].appendChild(ImgT);
}

//賦值
//var ImgT = document.createElement("img");
//ImgT.src=picT[0];
//$(".title")[0].innerHTML = nameT[0];
//$(".pic")[0].appendChild(ImgT);

function cloneDiv(){
	$("#mom").append(cloneT.clone());
	}
//克隆
//var cloneT = $(".child");
//$("#mom").append(cloneT.clone());


//cmd開啟測試
function JsExecCmd(value) {
var cmd = new ActiveXObject("WScript.Shell");
/*

命令參數說明

cmd.exe /c dir 執行完dir命令后關閉命令窗口。

cmd.exe /k dir 執行完dir命令后不關閉命令窗口。

cmd.exe /c start dir 在新窗口執行dir指令，原窗口關閉。

cmd.exe /k start dir 在新窗口執行dir指令，原窗口不關閉。

*/
var cmd = new ActiveXObject("WScript.Shell");
cmd.run("cmd.exe /c "+value);
cmd=null;
}