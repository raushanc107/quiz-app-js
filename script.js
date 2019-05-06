var total=0;
var ques=[
	{
		"id":1,
		"question" : "Inside which HTML element do we put the JavaScript?",
		"options" : [
			"&lt;script&gt;", 
			"&lt;javascript&gt;", 
			"&lt;scripting&gt;", 
			"&lt;js&gt;"
			],

			"answer":"&lt;script&gt;"

	},

	{	"id":2,
		"question" : "Where is the correct place to insert a JavaScript?",
		"options" : [
			"The &lt;head&gt; section", 
			"The &lt;body&gt; section", 
			"Both the &lt;head&gt; section and the &lt;body&gt; section are correct"
			],
		"answer":"Both the &lt;head&gt; section and the &lt;body&gt; section are correct"
	},


	{	"id":3,
        "question" : "What is the correct syntax for referring to an external script called 'xxx.js'?",
		"options" : [
			"&ltscript href=&quot;xxx.js&quot;>", 
			"&lt;script name=&quot;xxx.js&quot;&gt;", 
			"&lt;script src=&quot;xxx.js&quot;&gt;"
			],
		"answer":"&lt;script src=&quot;xxx.js&quot;&gt;"
	}
	
];



var ans=Object();


function _(e){

	return document.getElementById(e);
}


function onSignIn(googleUser){

  		var profile=googleUser.getBasicProfile();
  		var a=profile.getEmail();
  		var b=profile.getImageUrl();
  		_('signin').style.display='none';
  		_('det').style.display='block';
  		_('start').style.display='block';
  		_('signout').style.display='block';
  		_('profileimg').setAttribute('src',b);
  		_('email').innerHTML=a;

  	}

  	function signout(){

  		var auth2=gapi.auth2.getAuthInstance();
  		auth2.signOut().then(function(){

  		_('signin').style.display='block';
  		_('det').style.display='none';
  		_('start').style.display='none';
  		_('signout').style.display='none';
  	


  		});
  	}

  	function shuffle(arr) {
    var i,
        j,
        temp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;    
};

var k=60;
var timer;
function onTimer() {
  _('timer').innerHTML=k+' S';
  k--;

  if (k < 0) {

  	nextq(1);
  }
  else {
    	timer=setTimeout(onTimer, 1000);
  }
}


var i=0;
  	function starttest(e){i=i+e;
  		if(i<ques.length){
  			k=60;
  			let name,danger,onclick;
  			if(i==ques.length-1){
  				name="Submit";
  				danger="btn-success";
  				onclick="submitt();";

  			}else{
  				name="Next >";
  				danger="btn-primary";
  				onclick="nextq(1);"
  			}
  			var a=ques[i]["options"];
  		a=shuffle(a);
  			var op='';
  			for(var j=0;j<a.length;j++){
  				op=op+'<div class="radio"><label><input class="option" type="radio" name="optradio" value="'+a[j]+'">'+a[j]+'</label></div>';
  			}


  		var d='<div class="panel panel-success"><div class="panel-heading"><br><h2>Q.'+(i+1)+') '+ques[i]["question"]+'</h2></div><div class="panel-body"><form>'+op+'</form></div><button class="btn '+danger+' next" onclick="'+onclick+'">'+name+'</button></div>';
  		_('tim').innerHTML='<h3 id="timer" class="btn btn-success"></h3>';

  		_('ques').innerHTML=d;

  		onTimer();

  		}
  	}



function nextq(e){
	if(i==ques.length-1){
		submitt();
		return;
	}
	calcmarks();
	clearInterval(timer);
	starttest(e);
}


function submitt(){
	calcmarks();
	clearInterval(timer);
	_('timer').style.display='none';
	let a="<center class='w3-animate-zoom'><h2>You Scored "+total+" / "+ques.length+"<br><br><span class='alert alert-success '>Thank You for Taking The Test</span></h2><br><br><button class='btn btn-success' onclick='start()'>Retake Test</button</center>";
	_('ques').innerHTML=a;
	
	
}


function calcmarks(){
	let opt=document.getElementsByClassName("option");
	for(var j=0;j<opt.length;j++){
		if(opt[j].checked){
			let v=opt[j].value;
			v = v.replace(/\</g,"&lt;") ;  //for <
		v = v.replace(/\>/g,"&gt;");   //for >
		v = v.replace(/"/g, "&quot;");
			if(v==ques[i]["answer"]){
				total++;
				break;
			}
		}
	}

}
  	




  	function start(){
  	i=0;
  	_('start').style.display='none';
  	ques=shuffle(ques);
  	starttest(0);
  	}


