
function SetCookie(name,value,expire) {
     var exp  = new Date();   
     exp.setTime(exp.getTime() + expire);   
     document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";   
}   
   
function getCookie(name) {   
     var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));   
     if(arr != null) return unescape(arr[2]); return null;   
}

function clickH(mObj,sObj){
	$(mObj).css("cursor","pointer");
	$(mObj).click(function(){
		if($(sObj).css("display")=='block'){
			$(sObj).hide();
		}else{
			$(sObj).show();
		}
	});
}

function imgPlay(imgpar,imgcont){ //首页图片切换
	
	var imgparLink=$(imgpar+" a");
	var imgparcont=$(imgpar+" img")[0];
	var imgconts=$(imgcont+" img");
	var imgspans=$(imgcont+" span");
	var imgtext=$(imgcont+" p");
	var imgpartext=$(imgpar+" h4");
	//alert(imgpartext.html());
	//alert(imgtext.length);
	var imgArray=[];
	var imgLen=imgconts.length;
	imgparcont.imgid=0;
	spanBor(0);
	
	//设置小图样式
	function spanBor(Item){
		imgspans.each(function(i){
			if(Item==i){
				//$(this).css("border","1px solid #FFCC00");
			}else{
				$(this).removeAttr("style");
			}
		});
	}
	
	//遍历小图
	imgconts.each(function(i){
		this.imgid=i;	
		imgArray.push(this.src); //初始化图片数组
		
		$(this).click(function(){
			$(imgparcont).attr("src",pUrl(this.src));
			$(imgparcont).attr("imgid",this.imgid);
			imgpartext.html(imgtext[this.imgid].innerHTML);
			spanBor(this.imgid);
		});
	});
	
	//点击链接
	imgparLink.each(function(i){
		$(this).click(function(evt){
			evt=window.event||evt;
			if(evt.preventDefault){
				evt.preventDefault();
			}else{
				evt.returnValue=false;
			}
			var nowimgid=$(imgparcont).attr("imgid");
			
			
			if(i==0){ //向上
				if(nowimgid==0){
					$(imgparcont).attr("src",pUrl(imgArray[imgLen-1]));
					$(imgparcont).attr("imgid",imgLen-1);
					spanBor(imgLen-1);
					imgpartext.html(imgtext[imgLen-1].innerHTML);
				}else{
					$(imgparcont).attr("src",pUrl(imgArray[nowimgid-1]));
					$(imgparcont).attr("imgid",nowimgid-1);
					spanBor(nowimgid-1);
					imgpartext.html(imgtext[nowimgid-1].innerHTML);
				}
			}else if(i==1){//向下
				if(nowimgid==(imgLen-1)){
					$(imgparcont).attr("src",pUrl(imgArray[0]));
					$(imgparcont).attr("imgid",0);
					spanBor(0);
					imgpartext.html(imgtext[0].innerHTML);
				}else{
					$(imgparcont).attr("src",pUrl(imgArray[nowimgid+1]));
					$(imgparcont).attr("imgid",nowimgid+1);
					spanBor(nowimgid+1);
					imgpartext.html(imgtext[nowimgid+1].innerHTML);
				}
			}

		});
		$(this).focus(function(){ this.blur(); });
	});
	
	//格式化url
	function pUrl(str){
		return str.replace(/\/small/,'');
	}
	
	
	function SImage(callback)
		{
			var img = new Image();
			this.img = img;
			var appname = navigator.appName.toLowerCase();
			if (appname.indexOf("netscape") == -1)
			 {
			   //ie
				 img.onreadystatechange = function () {
					if (img.readyState == "complete")
					 {
						 callback(img);
					 }
				 };
			 } else {
			   //firefox
				 img.onload = function () {
					if (img.complete == true)
					 {
						 callback(img);
					 }
				 }
			 }
		}
		
		SImage.prototype.get = function (url)
		{
			this.img.src = url;
		}
		
		var img = new SImage(icall);
		img.get("http://space.cnblogs.com/images/logo.gif");
		
		function icall(obj)
		{
			// alert(obj.width);
		}
			
}



//页签切换
//par
//contag
//menu
//menutag
function jscityre_sortToggle(par,contag,menu,menutag){ 
var contArray=$(par+" "+contag);
var menuArray=$(menu+" "+menutag);
menuArray.each(function(i){
	$(this).mousemove(function(){
		menuArray.each(function(n){
			if(i==n){
				if($(contArray[n]).attr("style"))$(contArray[n]).removeAttr("style");
				$(this).attr("class","active");
			}else{
				$(this).removeAttr("class");
				$(contArray[n]).css("display","none");
			}
			
		})
	});
});
}


//鼠标滑过切换
//par
//cont
function jscityre_togHa(par,cont){
 var contArray=$(par+" "+cont);
 contArray.each(function(i){
	$(this).mousemove(function(){
		 contArray.each(function(n){
			if(i==n){
				$(this).attr("class","active");
			}else{
				$(this).removeAttr("class");
			}							 
		 });
	});
 });
}


// 楼盘比较
function savecode($ha_code){
	 var hreflink=location.href;
     var reg=/\/(\w+)\/(\w+).html/;
     reg.test(hreflink);
     var fromtype=RegExp.$1;
     
     if(fromtype==''){
     	reg=/\/(\w+)\//;
     	reg.test(hreflink);
     	fromtype=RegExp.$1;
     }
     $.ajax({
            type:"get",
            url:"/ha/savecode.html",
            data:"fromtype="+fromtype+"&hacode="+$ha_code,
            success:function(data){
            	if(data=='full'){
            	alert('您的选择的比较数目达到最大值，此选择无效！')	
            	}            
            }
        });
}


//顶部菜单js
function togglemenu (parobj,objcount,countclass){
	var menupar=$(parobj);
	var countpar=$(objcount); 
	var menu_link=$(parobj+" li");
	var menu_span=$(parobj+" span");
	var count_div=$("div.menu_list_info");
	var headerId=$("#header");
	
	menu_span.each(function(i){
		if($(this).html()=='楼盘小区'){
			mouseHandle($(this),i);
		}else if($(this).html()=='二手房'){
			mouseHandle($(this),i);
		}else if($(this).html()=='租房'){
			mouseHandle($(this),i);
		}
	});
	count_div.each(function(i){
		$(this).mousemove(function(){
			$(this).css("display","block");
			$(menu_link[i+1]).attr("class","active");
		});
		$(this).mouseout(function(){
			$(this).css("display","none");
		$(menu_link[i+1]).removeAttr("class");
		});
	});
	
	function mouseHandle(obj,items){
			obj.mousemove(function(){
				var offLeft=headerId.offset().left;
				var offTop=obj.offset().top+obj.height();
				$(count_div[items-1]).css({left:(offLeft+15),top:offTop,display:"block"});
				menu_link.each(function(i){
					if(i==items){
						$(this).attr("class","active");	
					}else{
						$(this).removeAttr("class");
					}
				});
			});
			obj.mouseout(function(){
				$(count_div[items-1]).css("display","none");
				menu_link.each(function(i){
						$(this).removeAttr("class");
				});
			});
	}
}

//左侧菜单
function jscityre_leftmenu(mpar,mtit,mcont,bq){
	var mtitle=$(mpar+" "+mtit);
	var mbq=$(mpar+" "+mtit+" "+bq);
	var menucount=$(mpar+" "+mcont);
	mtitle.each(function(i){
		$(this).css("cursor","pointer");
		$(this).click(function(){
				if($(menucount[i]).css("display")=='block'){
					$(menucount[i]).css("display","none");
					$(mbq[i]).attr("class","open");
				}else{
					$(menucount[i]).css("display","block");
					$(mbq[i]).attr("class","close");
				}
		});
	});
}


function toggleform(){ //搜索切换
		var pform=document.getElementById("sform");
		var keywords=document.getElementById("q");
		var parselect=pform.s; 
		var regp=/\/(\w+)\//;
		var whref=location.pathname;
		if(whref.match(regp) && whref.match(regp).length>1){
			whref=whref.match(regp)[1];
		}
		
		if(whref=='forsale'){
			selectoptions(parselect,'二手房');
			formaction("forsale",pform);
		}else if(whref=='lease'){
			selectoptions(parselect,'租房');
			formaction("lease",pform);
		}else if(whref=='ha'){
			selectoptions(parselect,'楼盘');
			formaction("ha",pform);
		}
		
		parselect.onchange=function(){
			var opvalue=parselect.options[parselect.selectedIndex].value;
			if(opvalue=='二手房'){
				formaction("forsale",pform);
			}else if(opvalue=='租房'){
				formaction("lease",pform);
			}else{ 
				formaction("ha",pform);
			}
		}
		
		function selectoptions(pselect,cobject){
			for(var i=0;i<pselect.options.length;i++){
				var poptions=pselect.options[i];
				if(poptions.value==cobject){
					 poptions.selected="selected";
				}
			}
		}
		function formaction(avalue,fobject){
			if(avalue=='forsale'){
				fobject.action="/forsale/flist.html";
				keywords.value = "请输入小区名称、道路名..."
			}else if(avalue=='lease'){
				fobject.action="/lease/llist.html";
				keywords.value = "请输入小区名称、道路名..."
			}else{
				fobject.action="/ha/halist.html";
				keywords.value = "请输入楼盘名称、道路名..."
			}
		}
	}

//楼盘等级评价
//par   点击内容
//code  评级类型
//len   总百分比
//count 总分数，总人数
function jscityre_grade(par,code,len,count){
	var gcookie=getCookie(code);
	var cookexprie=5*60*1000;
	if(!gcookie){
		var cArray=new Array(0,0,0,0);
		SetCookie(code,cArray,cookexprie);
	}
	var parobj=$(par);
	var grade_em=$(par+" em");
	var par_div=$(par+" div");
	var len_p=$(len+" p");
	var len_link=$(len+" a.eval_but");
	var par_link=$(par+" a.eval_but");
	var len_li=$(len+" li");
	var count_img=$(count+" img");
	var count_pe=$(count+" span");
	var url="/ha/grade/"+code+".html";
	
	var power=new Array(0.25,0.25,0.25,0.25); //权
	len_link.css("cursor","pointer");
	len_link.click(function(){
		parobj.css("display","block");
		$(this).parent().css("display","none");
	});
	par_link.css("cursor","pointer");
	par_link.click(function(){
		parobj.css("display","none");
		len_link.parent().css("display","block");
	});
	var wcount=$(len_p.parent()).width();
	par_div.each(function(i){
		var div_em=this.getElementsByTagName("em");
		this.di=i; //记录等级选项
		for(var a=0;a<div_em.length;a++){
			div_em[a].ai=a+1; //记录等级号码 
		}
	});
	
	grade_em.each(function(i){
		$(this).mousemove(function(){
			var smv=0;
			var em_par=$(this).parent();
			var em_par_span=em_par.get(0).getElementsByTagName("span")[0];
			var em_all=em_par.get(0).getElementsByTagName("em");
			for(var a=0;a<em_all.length;a++){
				smv+=parseInt($(em_all[a]).attr("pc"));
			}
			
			em_par.attr("class","ft_"+this.ai);
			$(em_par_span).html($(this).html()+"("+ $(this).attr('pc') +"人)");
		});
		$(this).mouseout(function(){
			var em_par=$(this).parent();
			var em_par_span=em_par.get(0).getElementsByTagName("span")[0];
			//em_par.attr("class","ft_0");
			$(em_par_span).html('打分');
		});
		
		$(this).click(function(){
			var len_li_par=len_li[$(this).parent().attr("di")];
			var em_par=$(this).parent();
			var cookArray=getCookie(code).split(",");
			if(cookArray[em_par.attr('di')]==1){
				alert('每项只能评价一次！');
				return;
			}
			cookArray[em_par.attr('di')]=1;
			SetCookie(code,cookArray,cookexprie);
			//var len_licount=len_li_par.title*5; //项目总分数
			var smc=0;
			var smv=0;
			var csmv=0;
			var len_smv;
			var urlcount="";
			var urlparma="";
			this.pc=parseInt($(this).attr("pc"))+1;
			
			var em_all=em_par.get(0).getElementsByTagName("em");
			var em_par_span=em_par.get(0).getElementsByTagName("span")[0];
		
			for(var a=0;a<em_all.length;a++){
				smc+=em_all[a].pc*em_all[a].ai;
				smv+=parseInt($(em_all[a]).attr("pc"));
				urlcount+=$(em_all[a]).attr("pc")+',';
			}
			
			len_smv=Math.ceil(wcount*(smc/(smv*5)));
			
			$(len_p[em_par.attr("di")]).css("width",len_smv);
			
			$(len_li_par).attr("title",len_smv+"分");
			
			$(em_par_span).html($(this).html()+"("+ $(this).attr('pc') +"人)");
			
			grade_em.each(function(i){
				csmv+=parseInt($(this).attr("pc")); //统计总人数
			});
			count_pe.html("("+ csmv +"人参加)");	
			
			urlparma+="?sertype="+parseInt($(this).parent().attr("di")+1)+"&count="+urlcount;
			
			$.getScript(url+urlparma);
			
			var cfont=0;
			//取每单项分数
			par_div.each(function(i){
				var div_em=this.getElementsByTagName('em');
				var dcount=0;//单项总人数
				var dprent=0;//单项总分数
				
				//alert(div_em.length);
				for(var a=0;a<div_em.length;a++){
				dcount+=parseInt($(div_em[a]).attr("pc"));
				dprent+=(parseInt($(div_em[a]).attr("pc"))*(a+1))
				}
				var fcont=((dprent/(dcount*5))*10)*power[i];
				if(!fcont){
				fcont=0;
				};
				cfont+=fcont;
			});
			var thimg;
			thimg='hastar'+Math.round(cfont)+'.';
			var cscr=count_img.attr("src").replace(/hastar(.+)\./,thimg);
			count_img.attr("src",cscr);
			
		});
	});
}

//店铺评价
//par   点击内容
//code  评级类型
//count 总分数，总人数
function jscityre_cograde(par,code,count){
	var gcookie=getCookie(code);
	var cookexprie=5*60*1000;
	if(!gcookie){
		var cArray=new Array(0,0,0,0);
		SetCookie(code,cArray,cookexprie);
	}
	var parobj=$(par);
	var grade_em=$(par+" em");
	var par_div=$(par+" div");
	var count_img=$(count+" img");
	var count_span=$(count+" span");
	var url="/ha/grade/"+code+".html";
	
	var power=new Array(0.30,0.15,0.20,0.30);
	par_div.each(function(i){
		var div_em=this.getElementsByTagName("em");
		this.di=i; //记录等级选项
		for(var a=0;a<div_em.length;a++){
			div_em[a].ai=a+1; //记录等级号码 
		}
	});
	grade_em.each(function(i){
		$(this).mousemove(function(){
			var smv=0;
			var em_par=$(this).parent();
			var em_par_span=em_par.get(0).getElementsByTagName("span")[0];
			em_par.attr("class","ft_"+this.ai);
			$(em_par_span).html($(this).html()+"("+ $(this).attr('pc') +"人)");
		});
		
		$(this).mouseout(function(){
			var smv=0;
			var em_par=$(this).parent();
			var em_par_span=em_par.get(0).getElementsByTagName("span")[0];
			var em_all=em_par.get(0).getElementsByTagName("em");

			for(var a=0;a<em_all.length;a++){
				smv+=parseInt($(em_all[a]).attr("pc"));
			}
			$(em_par_span).html('打分'+"("+ smv +"人)");
		});
		
		$(this).click(function(){
			var em_par=$(this).parent();
			var cookArray=getCookie(code).split(",");
			if(cookArray[em_par.attr('di')]==1){
				alert('每项只能评价一次！');
				return;
			}
			cookArray[em_par.attr('di')]=1;
			SetCookie(code,cookArray,cookexprie);
			this.pc=parseInt($(this).attr("pc"))+1;
			var em_all=em_par.get(0).getElementsByTagName("em");
			var em_par_span=em_par.get(0).getElementsByTagName("span")[0];
			$(em_par_span).html($(this).html()+"("+ $(this).attr('pc') +"人)");
			var urlcount="";
			var urlparma="";
			for(var a=0;a<em_all.length;a++){
				urlcount+=parseInt($(em_all[a]).attr("pc"))+',';
			}
			urlparma+="?sertype="+parseInt($(this).parent().attr("di")+1)+"&count="+urlcount;
			$.getScript(url+urlparma);
			var cfont=0;
			//取每单项分数
			par_div.each(function(i){
				var div_em=this.getElementsByTagName('em');
				var dcount=0;//单项总人数
				var dprent=0;//单项总分数
				for(var a=0;a<div_em.length;a++){
					dcount+=parseInt($(div_em[a]).attr("pc"));
					dprent+=(parseInt($(div_em[a]).attr("pc"))*(a+1))
				}
				var fcont=((dprent/(dcount*5))*5)*power[i];
				if(!fcont){
					fcont=0;
				};
				cfont+=fcont;
			});
			
			var thimg;
			thimg='shop'+Math.round(cfont)+'.';
			count_span.html("("+ cfont.toString().substr(0,4) +"分)");
			var cscr=count_img.attr("src").replace(/shop(.+)\./,thimg);
			count_img.attr("src",cscr);
		});
	});
}
//收藏本小区
function keeplink(){
	
    var keeplink=$("#keeplink");
    if(!keeplink) return;
    var hreflink=location.href;
    var reg=/\/(\w+)\/(\w+).html/;
    reg.test(hreflink);
    var hacode=RegExp.$2;
    var fromtype=RegExp.$1;
  //  keeplink.click(function(){
       $.ajax({
            type:"get",
            url:"/ha/saveha.html",
            data:"fromtype="+fromtype+"&hacode="+hacode,
            success:function(data){
            	if(!data){
                	alert("收藏成功！");
                }
            }
        });
   // });
}
//店铺详细页小区滚动
function bbshatoleft(id){ 
	var updisplay1 = $("#updisplay1");
	var updisplay  = $("#updisplay");
	var upbar  = $(".pgup");
	var dnbar  = $(".pgdn");
	var uwidth = updisplay1.width();
	var uleft  = parseInt(updisplay1.css('left'));
	if(uwidth>909){
	if(id>6){upbar.click(function (){
		if(-parseInt(updisplay1.css('left'))<(id-6)*151){
		updisplay1.animate({left:'-=151'},"quick");}
	})
	}
	dnbar.click(function (){
		if(parseInt(updisplay1.css('left'))<0)updisplay1.animate({left:'+=151'},"quick");
	})
	}
} 
//广告位 
function adDefaultPing(num){
	document.write(num);		 
	//alert(num);
}
function adCallPing(id,num){
	//alert(num);
	var obj=document.getElementById(id);
	var a=document.createElement("p");
	if(num.indexOf("embed")!=-1){
		a.style.position="relative";	
	}
	a.innerHTML=num;
	obj.appendChild(a);		
}
function adCallPingAd(id,num){
	var obj=document.getElementById(id);
	obj.innerHTML=num;
}
function adInfoClick(id){
	    $.ajax({
            type:"get",
            url:"/ad/adinfoclick.html",
            data:"id="+id,
            success:function(data){
            	
            }
        });
}
function citytopad(adimgname,linkurl,id){
		var _imageLibrary=new Array();
		_imageLibrary["image1"]=new Image();
		_imageLibrary["image1"].src=adimgname;
		var leftx,i=10,moveobjp,settime,itmes,settime2;
		var ohome=document.getElementById("content");
		var oimg=document.createElement("img");
		var oilink=document.createElement("a");
		var nDiv=document.createElement("div");
		oilink.href=linkurl;
		oilink.onclick=function(){adInfoClick(id);};
		oilink.title='dfd';
		oimg.alt="";
		oimg.src=_imageLibrary["image1"].src;
		oilink.appendChild(oimg);
		nDiv.style.width='960px';
		nDiv.style.height='0';
		nDiv.style.background='#eee';
		nDiv.style.overflow="hidden";
		nDiv.style.margin="0 auto 0 auto";	
		
		nDiv.appendChild(oilink);	
		document.body.insertBefore(nDiv,ohome);
		moveobjp=nDiv.offsetHeight;
		items=0;
		move();
		function move(){
			nDiv.style.height=items+"px";
			items+=i;
			settime=setTimeout(move,10);
			if(items>=_imageLibrary["image1"].height+15){
			
			clearTimeout(settime);
			setTimeout(outmove,10000);
			}
		}

		function outmove(){
			nDiv.style.height=items+"px";
			items-=i;
			settime2=setTimeout(outmove,10);
			if(items==0){
				clearTimeout(settime2);	
				document.body.removeChild(nDiv);
			}	
		}			
}

//广告位 END>>





//楼盘、房源详细页图片
function imgPlayha(imgpar,imgcont){
			var imgparLink=$(imgcont+" a");
			
			var imgparcont=$(imgpar+" img")[0];
			
			var imgconts=$(imgcont+" img");
			
			var imgspans=$(imgcont+" li");
			
			var imgAnimate=$(imgcont+" ul")[0];
			
			var imgArray=[];
			var imgLen=imgconts.length;
			imgparcont.imgid=0;
			
			var simgWidth=imgspans[0].offsetWidth;
			
			$(imgAnimate).css("width","700px");
			
			
			function spanBor(Item){ //小图样式
				imgspans.each(function(i){
					if(Item==i){
						$(this).addClass("active");
					}else{
						$(this).removeAttr("class");
					}
				});
			}
			imgconts.each(function(i){
				this.imgid=i;	
				imgArray.push(this.src); //初始化图片数组
				
				$(this).click(function(){
					$(imgparcont).attr("src",pUrl(this.src));
					$(imgparcont).attr("imgid",this.imgid);
					spanBor(this.imgid);
				});
			});
			imgparLink.each(function(i){
				$(this).click(function(evt){
					evt=window.event||evt;
					if(evt.preventDefault){
						evt.preventDefault();
					}else{
						evt.returnValue=false;
					}
					var nowimgid=$(imgparcont).attr("imgid");
					
					if(i==0){ //向上
						if(nowimgid>0){
							$(imgAnimate).animate({left:'-'+(simgWidth*(nowimgid-1))+'px'},"fast");
							$(imgparcont).attr("src",pUrl(imgArray[nowimgid-1]));
							$(imgparcont).attr("imgid",nowimgid-1);
							spanBor(nowimgid-1);
						}
					}else if(i==1){//向下
						
						if(nowimgid<imgLen-1){
							$(imgAnimate).animate({left:'-'+(61*(nowimgid+1))+'px'},"fast");
							
							$(imgparcont).attr("src",pUrl(imgArray[nowimgid+1]));
							$(imgparcont).attr("imgid",nowimgid+1);
							spanBor(nowimgid+1);
						}
					}

				});
				
				$(this).focus(function(){ this.blur(); });
			});
			 
			function pUrl(str){
				return str.replace(/\/small/,'');
			}
		}
		
		
		
		
		
//控制小区图片大小 star

function imgHa_Width_Height(maxWidth,maxHeight){
	


	 	var w = $("#ha_img_height img").width();
        var h = $("#ha_img_height img").height();
		
		
		if($("#ha_img_height img").width() > maxWidth){
			
			$("#ha_img_height img").width(maxWidth);
			//$("#ha_img_height > img").height(maxWidth/imgw*imgh);
			
			
			}
			else{
			//alert("width:ok");
			
				}
			
			
		if($("#ha_img_height img").height() > maxHeight){
			
			$("#ha_img_height img").height(maxHeight);
			//$("#ha_img_height > img").width(maxHeight/imgh*imgw);
			}
			
			else{
				
			//alert("height:ok");
			}
			
	}
	


//控制小区图片大小 end
		
		
		
		
		
		
		
		
		