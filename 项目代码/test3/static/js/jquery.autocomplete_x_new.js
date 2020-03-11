/***************************************************
**页面变量的声明layout_new 文件中                    ** 
**-------------auto_temp,auto_temp2,auto_temp3强制下拉找LI节点 -----         ** 
**用来存储页面是leaser forssale ha 等页面的值自动完成用**
**插件修改点搜索cupdate                             **
****************************************************/
/*input提示函数
参数：{second:1000,color:'#000000',msg:'提示'}
*/
$.fn.extend({
	notice:function(obj){
		if(!obj.second){obj.second=1000;}
		if(!obj.color){obj.color='#C50000';}
		var oldmsg=$(this).val();
		var oldcsscolor=$(this).css('color');
		$(this).css('color',obj.color);
		$(this).val(obj.msg);
		eval("setTimeout(function(){var obj=$('#"+$(this).attr('id')+"');obj.val('"+oldmsg+"');obj.css('color','"+oldcsscolor+"');},"+obj.second+");");
	}
});
/*
*/
$.fn.extend({
	placeholder:function(css1,css2){
		text=$(this).attr('place');
		$(this).val(text);
		$(this).focus(function(){
			if($(this).val()==text){
				$(this).css(css1).val('');
			}
		});
		$(this).blur(function(){
			if($(this).val()==''){
				$(this).css(css2).val(text);
			}
		});
/*		inpu=$(this);
		$(this).parent().submit(function(){
			alert($(this).val());
			if(inpu.val()==text){
				inpu.val('');
			}
		});*/
	}
});


//function SetCookie(name,value,expire) {
//    alert('ddd')
//     var exp  = new Date();   
//     exp.setTime(exp.getTime() + expire);   
//     document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/;domain=cityhouse.cn";   
//}   
//   
//function getCookie(name) {   
//     var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));   
//     if(arr != null) return unescape(arr[2]); return null;   
//}

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
	 
 	var imgparrLink = $(imgcont+" img");
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
			imgparrLink.parents("li").removeClass("active"); 
			$(this).parents("li").addClass("active"); 
			$(imgparcont).attr("src",pUrl(this.src));
			$(imgparcont).attr("imgid",this.imgid);
			imgpartext.html(imgtext[this.imgid].innerHTML);
			spanBor(this.imgid);
			$(this).parent().blur();//去掉虚框
			return false;
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
			//遍历右边的图集选中连接相同的
			 
		    imgparrLink.parents("li").removeClass("active"); 	//清除所有的
			var imgpar_scr = imgparcont.src.match(/\w+.jpg/g);
			imgpar_scr = imgpar_scr[0];
			imgparrLink.each(function(){
									if($(this)[0].src.indexOf(imgpar_scr)>-1){
										 try{
											$(this).parents("li").addClass("active"); 
										 }catch(e){
											 throw new Error("HTML结构错误");
										 }
									
									}
									 
									 
									   
									  })
									 
									 
		});
		$(this).focus(function(){ this.blur(); });
		
	});
	
	//格式化url
	function pUrl(str){
		return str.replace(/\/middle/,'/big');
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
            data:"fromtype="+fromtype+"&hacode="+$ha_code+'&rand'+Math.random(),
            success:function(data){
            	if(data=='full'){
            	alert('您的选择的比较数目达到最大值，此选择无效！')	
            	}            
            }
        });
}
function savecodes(ha_code,fromtype){
     $.ajax({
            type:"get",
            url:"/ha/savecode.html",
            data:"fromtype="+fromtype+"&hacode="+ha_code+'&rand'+Math.random(),
            success:function(data){
            	if(data=='full'){
            	alert('您的选择的比较数目达到最大值，此选择无效！')	
            	}            
            }
        });
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
		var ac = pform.ac;
		var regp=/\/(\w+)\//;
		var whref=location.pathname;
		if(whref.match(regp) && whref.match(regp).length>1){
			whref=whref.match(regp)[1];
		}
		
		if(whref=='forsale'){
			selectoptions(parselect,'二手房');
			formaction("forsale",pform);
			$('#select_h').children('span').html('找二手房');
		}else if(whref=='lease'||whref=='sharelist'){
			selectoptions(parselect,'租房');
			formaction("lease",pform);
			$('#select_h').children('span').html('找租房');
		}else if(whref=='ha'){
			selectoptions(parselect,'新楼盘');
			formaction("ha",pform);
			$('#select_h').children('span').html('找新楼盘');
		}else if(whref=='halist'){
			selectoptions(parselect,'楼盘');
			formaction("halist",pform);
			$('#select_h').children('span').html('找小区');
		}else if(whref=='market'){
			selectoptions(parselect,'房价');
			formaction("market",pform);
			$('#select_h').children('span').html('查房价');
		}
		
		
		$('#select_h').find('ul li').click(function(){			
			var opvalue=parselect.value;
			if(opvalue=='二手房'){
				auto_temp = "forsale";
				formaction("forsale",pform);
				$('#select_h').children('span').html('<span>找二手房</span><em></em>');
				if($('#q').val()=="例：某某小区90平米3000元"||$('#q').val()=="请输入小区名或地址..."||$('#q').val()=="例：请输入小区名称")
				{
					$('#q').attr("value","例：某某小区90平米80万");
				}
			}else if(opvalue=='租房'){
				auto_temp = "lease";
				formaction("lease",pform);
				$('#select_h').children('span').html('<span>找租房</span><em></em>');
				if($('#q').val()=="例：某某小区90平米80万"||$('#q').val()=="请输入小区名或地址..."||$('#q').val()=="例：请输入小区名称")
				{
					$('#q').attr("value","例：某某小区90平米3000元");
				}
			}else if(opvalue=='新楼盘'){ 
				auto_temp = "ha";
				formaction("ha",pform);
				$('#select_h').children('span').html('<span>找楼盘</span><em></em>');
				if($('#q').val()=="例：某某小区90平米80万"||$('#q').val()=="例：某某小区90平米3000元"||$('#q').val()=="请输入小区名或地址..."||$('#q').val()=="例：请输入小区名称")
				{
					$('#q').attr("value","请输入小区名或地址...");
				}
			}else if(opvalue=='楼盘'){ 
				auto_temp = "halist";
				formaction("halist",pform);
				$('#select_h').children('span').html('<span>找新楼盘</span><em></em>');
				if($('#q').val()=="例：某某小区90平米80万"||$('#q').val()=="例：某某小区90平米3000元"||$('#q').val()=="请输入小区名或地址..."||$('#q').val()=="例：请输入小区名称")
				{
					$('#q').attr("value","请输入小区名或地址...");
				}
			}else if(opvalue=='房价'){ 
				auto_temp = "market";
				formaction("market",pform);
				$('#select_h').children('span').html('<span>查房价</span><em></em>');
				if($('#q').val()=="例：某某小区90平米80万"||$('#q').val()=="例：某某小区90平米3000元"||$('#q').val()=="请输入小区名或地址..."||$('#q').val()=="例：请输入小区名称")
				{
					$('#q').attr("value","例：请输入小区名称");
				}
			}
			
		});
		
		
		function selectoptions(pselect,cobject){
			pselect.value=cobject;
		
		}
		function formaction(avalue,fobject){
			if(avalue=='forsale'){
				fobject.action="/forsale/flist.html";
				//keywords.value = "请输入小区名称、道路名..."
			}else if(avalue=='lease'){
				fobject.action="/lease/llist.html";
				//keywords.value = "请输入小区名称、道路名..."
			}else if(avalue=='ha'){
				fobject.action="/ha/";
				//keywords.value = "请输入小区名或地址..."
			}else if(avalue=='halist'){
				fobject.action="/halist/";
				//keywords.value = "请输入小区名或地址..."
			}else if(avalue=='market'){
				if(ac.value=='index'){
					fobject.action="/market/";
				}else if(ac.value=='newha'){
					fobject.action="/market/";
				}else{
				    fobject.action="/ha/indexcre.html";
				}
			}
		}
	}
	function toggleform2(){ //搜索切换
		var pform=document.getElementById("sform2");
		var keywords=document.getElementById("q2");
		var parselect=pform.s; 
		var regp=/\/(\w+)\//;
		var whref=location.pathname;
		if(whref.match(regp) && whref.match(regp).length>1){
			whref=whref.match(regp)[1];
		}
		if(whref=='forsale'){
			selectoptions(parselect,'二手房');
			formaction("forsale",pform);
			$('#select_h2').children('span').html('找二手房');
		}else if(whref=='lease'){
			selectoptions(parselect,'租房');
			formaction("lease",pform);
			$('#select_h2').children('span').html('找租房');
		}else if(whref=='ha'){
			selectoptions(parselect,'楼盘');
			formaction("ha",pform);
			$('#select_h2').children('span').html('找楼盘');
		}
		
		
		$('#select_h2').find('ul li').click(function(){
			var opvalue=parselect.value;
			if(opvalue=='二手房'){
				formaction("forsale",pform);
				$('#select_h2').children('span').html('<span>找二手房</span><em></em>');
				if($('#q2').val()=="例：某某小区90平米3000元"||$('#q2').val()=="请输入小区名或地址...")
				{
					$('#q2').attr("value","例：某某小区90平米80万");
				}
			}else if(opvalue=='租房'){
				formaction("lease",pform);
				$('#select_h2').children('span').html('<span>找租房</span><em></em>');
				if($('#q2').val()=="例：某某小区90平米80万"||$('#q2').val()=="请输入小区名或地址...")
				{
					$('#q2').attr("value","例：某某小区90平米3000元");
				}
			}else{ 
				formaction("ha",pform);
				$('#select_h2').children('span').html('<span>找楼盘</span><em></em>');
				if($('#q2').val()=="例：某某小区90平米80万"||$('#q2').val()=="例：某某小区90平米3000元"||$('#q2').val()=="请输入小区名或地址...")
				{
					$('#q2').attr("value","请输入小区名或地址...");
				}
			}
		
		});
		
		
		function selectoptions(pselect,cobject){
			pselect.value=cobject;
		
		}
		function formaction(avalue,fobject){
			if(avalue=='forsale'){
				fobject.action="/forsale/flist.html";
				//keywords.value = "请输入小区名称、道路名..."
			}else if(avalue=='lease'){
				fobject.action="/lease/llist.html";
				//keywords.value = "请输入小区名称、道路名..."
			}else if(avalue=='forsale'){
				fobject.action="/halist/";
				//keywords.value = "请输入小区名或地址..."
			}else if(avalue=='market'){
				fobject.action="/market/";
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
	var cookexprie=0.5*3600*1000;
	var flag = 'b';
	if(!gcookie){
		var cArray=new Array(0,0,0,0);
		SetCookie(code,cArray,cookexprie);
	}
	else
	{
		if(gcookie!='0,0,0,0'){
		var flag = 'a';
		}
	}
	var parobj=$(par);
	var grade_em=$(par+" em");
	var par_div=$(par+" div");
	var len_p=$(len+" p");
	var len_link=$(len+" a.eval_but");
	var par_link=$(par+" a.eval_but");
	var len_li=$(len+" li");
	var count_img=$(count+" img");
	var count_pe=$(count+" span.c_gray");
	var count_fenshu=$(count+" span.c_yellow");
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
	//var wcount=$(len_p.parent()).width();
    var wcount = 131;
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
			var len_licount=len_li_par.title*5; //项目总分数
			var smc=0;
			var smv=0;
			var csmv=0;
			var len_smv;
			var urlcount="";
			var oldurlcount="";
			var urlparma="";
			

			var em_all=em_par.get(0).getElementsByTagName("em");
			var em_par_span=em_par.get(0).getElementsByTagName("span")[0];
			for(var a=0;a<em_all.length;a++){
				oldurlcount+=$(em_all[a]).attr("pc")+',';
				
			}
			
			this.pc=parseInt($(this).attr("pc"))+1;
			for(var a=0;a<em_all.length;a++){
				smc+=parseInt($(em_all[a]).attr("pc")*em_all[a].ai);
				smv+=parseInt($(em_all[a]).attr("pc"));
				urlcount+=$(em_all[a]).attr("pc")+',';
				
			}
			
			//var tid = $(this).parent().attr("id");
			len_smv=Math.ceil(wcount*(smc/(smv*5)));
			
			
			//$("#gp_"+tid).css("width",len_smv);
				
			$(len_p[em_par.attr("di")]).css("width",len_smv);
			
			$(len_li_par).attr("title",len_smv+"分");
			
			$(em_par_span).html($(this).html()+"("+ $(this).attr('pc') +"人)");
			
			grade_em.each(function(i){
					csmv+=parseInt($(this).attr("pc")); //统计总人数
			});
			
			var a = parseInt($(count_pe).attr("numP"));

			var cflag = '';		
			if(flag == 'b')
			{	
				
				a = parseInt(a + 1);
				cflag = 'b';		
				flag = 'a';
				$(count_pe).html("("+ a +"人参加)");
			}

			var aa= parseInt($(this).parent().attr("di")+1);
			
			
			urlparma+="?sertype="+parseInt($(this).parent().attr("di")+1)+"&count="+urlcount+"&a="+a+"&oldcount="+oldurlcount+"&flag="+cflag;
			
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
			count_img.attr("alt",Math.round(cfont)+'级');
			count_img.attr("title",Math.round(cfont)+'级');
			$(count_fenshu).html(Math.round(cfont)/2);
		});
	});
}

//店铺评价
//par   点击内容
//code  评级类型
//count 总分数，总人数
function jscityre_cograde(par,code,count){
	var gcookie=getCookie(code);
	var cookexprie=0.5*3600*1000;
	var flag = 'b';
	if(!gcookie){
		var cArray=new Array(0,0,0,0);
		SetCookie(code,cArray,cookexprie);
		
	}
	else
	{
		if(gcookie!='0,0,0,0'){
		var flag = 'a';
		}
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
			//$(em_par_span).html('打分'+"("+ smv +"人)");
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
			
			var em_all=em_par.get(0).getElementsByTagName("em");
			var em_par_span=em_par.get(0).getElementsByTagName("span")[0];
			
			var urlcount="";
			var oldurlcount="";
			var urlparma="";
			for(var a=0;a<em_all.length;a++){
				oldurlcount+=parseInt($(em_all[a]).attr("pc"))+',';
			}
			this.pc=parseInt($(this).attr("pc"))+1;
			$(em_par_span).html($(this).html()+"("+ $(this).attr('pc') +"人)");
			for(var a=0;a<em_all.length;a++){
				urlcount+=parseInt($(em_all[a]).attr("pc"))+',';
			}
			
			var a = parseInt($(count).attr("title"));
			var cflag = 'b';
			if(flag == 'b')
			{	
				cflag = 'b';					
				a = parseInt(a + 1);
				$(count).attr("title",a+'人投票');
				flag = 'a';
				
			}
		
			urlparma+="?sertype="+parseInt($(this).parent().attr("di")+1)+"&count="+urlcount+"&a="+a+"&oldcount="+oldurlcount+"&flag="+flag;
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
			count_img.attr("alt",Math.round(cfont)+'级');
			count_img.attr("title",Math.round(cfont)+'级');
		});
	});
}

//物业公司评价
//par   点击内容
//code  评级类型
//len   总百分比
//count 总分数，总人数
function jscityre_grade_sv(par, code, len, count) {
	var gcookie = getCookie(code);
	var cookexprie = 0.5 * 3600 * 1000;
	var flag = 'b';
	if(!gcookie) {
		var cArray = new Array(0,0,0,0);
		SetCookie(code,cArray,cookexprie);
	} else {
		if(gcookie != '0,0,0,0'){
			var flag = 'a';
		}
	}
	var parobj = $(par);
	var grade_em = $(par + " em");
	var par_div = $(par + " div");
	var len_p = $(len + " p");
	var len_link = $(len + " a.eval_but");
	var par_link = $(par + " a.eval_but");
	var len_li = $(len + " li");
	var count_img = $(count + " img");
	var count_pe = $(count + " span.c_gray");
	var url = "/ha/svgrade/" + code + ".html";
	var power = new Array(0.3, 0.3, 0.2, 0.2); //权
	
	len_link.css("cursor", "pointer");
	len_link.click(function() {
		parobj.css("display", "block");
		$(this).parent().css("display", "none");
	});
	
	par_link.css("cursor", "pointer");
	par_link.click(function() {
		parobj.css("display", "none");
		len_link.parent().css("display", "block");
	});
	
    var wcount = 131;
	par_div.each(function(i) {
		var div_em = this.getElementsByTagName("em");
		this.di = i; //记录等级选项
		for(var a = 0; a < div_em.length; a++){
			div_em[a].ai = a + 1; //记录等级号码 
		}
	});
	
	grade_em.each(function(i) {
		$(this).mousemove(function() {
			var smv = 0;
			var em_par = $(this).parent();
			var em_par_span = em_par.get(0).getElementsByTagName("span")[0];
			var em_all = em_par.get(0).getElementsByTagName("em");
			for(var a=0; a < em_all.length; a++){
				smv += parseInt($(em_all[a]).attr("pc"));
			}
			
			em_par.attr("class", "ft_"+this.ai);
			$(em_par_span).html($(this).html() + "(" + $(this).attr('pc') + "人)");
		});
		
		$(this).mouseout(function() {
			var em_par = $(this).parent();
			var em_par_span = em_par.get(0).getElementsByTagName("span")[0];
			$(em_par_span).html('打分');
		});
		
		$(this).click(function() {
			var len_li_par = len_li[$(this).parent().attr("di")];
			var em_par = $(this).parent();			
			var cookArray = getCookie(code).split(",");
			if(cookArray[em_par.attr('di')] == 1) {
				alert('每项只能评价一次！');
				return;
			}
			
			cookArray[em_par.attr('di')] = 1;
			SetCookie(code, cookArray, cookexprie);
			var len_licount = len_li_par.title * 5; //项目总分数
			var smc = 0;
			var smv = 0;
			var csmv = 0;
			var len_smv;
			var urlcount = "";
			var oldurlcount = "";
			var urlparma = "";
			
			var em_all = em_par.get(0).getElementsByTagName("em");
			var em_par_span = em_par.get(0).getElementsByTagName("span")[0];
			for(var a = 0; a < em_all.length; a++) {
				oldurlcount += $(em_all[a]).attr("pc") + ',';
			}
			
			this.pc = parseInt($(this).attr("pc")) + 1;
			for(var a = 0; a < em_all.length; a++){
				smc += parseInt($(em_all[a]).attr("pc") * em_all[a].ai);
				smv += parseInt($(em_all[a]).attr("pc"));
				urlcount += $(em_all[a]).attr("pc") + ',';
			}
			
			len_smv = Math.ceil(wcount * (smc / (smv * 5)));
			$(len_p[em_par.attr("di")]).css("width", len_smv);
			$(len_li_par).attr("title", len_smv + "分");
			$(em_par_span).html($(this).html() + "(" + $(this).attr('pc') + "人)");
			
			grade_em.each(function(i) {
				csmv += parseInt($(this).attr("pc")); //统计总人数
			});
			
			var a = parseInt($(count_pe).attr("numP"));
//			alert($(count_pe).attr("class"));
			var cflag = '';
			if(flag == 'b') {
				a = parseInt(a + 1);
				cflag = 'b';		
				flag = 'a';
				$(count_pe).html("(" + a + "人参加)");
			}

			var aa = parseInt($(this).parent().attr("di") + 1);

			urlparma += "?sertype=" + parseInt($(this).parent().attr("di") + 1)
				+"&count=" + urlcount + "&a=" + a
				+ "&oldcount=" + oldurlcount + "&flag=" + cflag;
			$.getScript(url + urlparma);
			var cfont = 0;
			//取每单项分数
			par_div.each(function(i) {
				var div_em = this.getElementsByTagName('em');
				var dcount = 0;//单项总人数
				var dprent = 0;//单项总分数
				
				for(var a=0; a < div_em.length; a++){
					dcount += parseInt($(div_em[a]).attr("pc"));
					dprent += (parseInt($(div_em[a]).attr("pc")) * (a + 1))
				}
				
				var fcont = ((dprent / (dcount * 5)) * 10) * power[i];
				if(!fcont) {
					fcont = 0;
				};
				
				cfont += fcont;
			});
			
			var thimg;
			thimg = 'hastar' + Math.round(cfont) + '.';
			var cscr = count_img.attr("src").replace(/hastar(.+)\./, thimg);
			count_img.attr("src", cscr);
			count_img.attr("alt", Math.round(cfont) + '级');
			count_img.attr("title", Math.round(cfont) + '级');
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
            data:"fromtype="+fromtype+"&hacode="+hacode+"&matchrand=a0b92382",
            success:function(data){
            	if(!data){
                	alert("收藏成功！");
                }
            }
        });
   // });
}
//收藏房源
function keeplinklist(dealcode,fromtype){
	 $.ajax({
            type:"get",
            url:"/ha/saveha.html",
            data:"fromtype="+fromtype+"&hacode="+dealcode,
            success:function(data){
            	if(!data){
                	alert("收藏成功！");
                }
            }
        });
}
//店铺详细页小区滚动
function bbshatoleft(id){ 
	var updisplay1 = $("#updisplay1");
	var updisplay  = $("#updisplay");
	var dnbar  = $(".pgup");
	var upbar  = $(".pgdn");
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
//店铺首页推荐房源滚动
function shoplistindex(id){ 
	var updisplay1 = $("#updisplay1");
	var updisplay  = $("#updisplay");
	var dnbar  = $(".pgup");
	var upbar  = $(".pgdn");
	var uwidth = updisplay1.width();
	var uleft  = parseInt(updisplay1.css('left'));
	var _interval;
	if(uwidth>600){
	if(id>5){upbar.click(function (){
		 clearInterval(_interval);
		if(-parseInt(updisplay1.css('left'))<(id-5)*135){
		updisplay1.animate({left:'-=135'},"quick");}
	})
	}
	dnbar.click(function (){
		 clearInterval(_interval);
		if(parseInt(updisplay1.css('left'))<0)updisplay1.animate({left:'+=135'},"quick");
	})
	}
	$(document).ready(function(){    
	_interval = setInterval(function (){
		if(-parseInt(updisplay1.css('left'))<(id-5)*135){
		updisplay1.animate({left:'-=135'},"quick");}else{
			updisplay1.css({'left':"0px"});
		}
	},2500);
	})
} 
//广告位 
function adDefaultPing(num){
	document.write(num);		 
	//alert(num);
}
function adCallPing(id,num){
	var obj=document.getElementById(id);
	var a = document.createElement("p");
	if(num.indexOf("embed")!=-1){
		a.style.position="relative";	
	}
    $(a).html(num);
	//a.innerHTML=num;
     
	obj.appendChild(a);
	$("#"+id+" img").error(function(){		
		$("#"+id).remove();	
	});
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
		oilink.title='城市房产';
		oimg.alt="";
		oimg.src=_imageLibrary["image1"].src;
		oilink.appendChild(oimg);
		nDiv.style.width='960px';
		nDiv.style.margin="0 auto 10px auto";	
		
		if(linkurl!=''){
			nDiv.appendChild(oilink);
		}else{
			nDiv.appendChild(oimg);
		}	
		document.body.insertBefore(nDiv,ohome);
		moveobjp=nDiv.offsetHeight;
		$(document).ready(function(){move();});
		function move(){
			nDiv.style.display="block";
			setTimeout(outmove,30000);
		}
		function outmove(){
			nDiv.style.display="none";
		}
}

//广告位 END>>
	//反编电话号码	
	function tel_ajaxTel(linktel){

		var sTel=document.getElementById("jscityre_imgplaycont");

		var tTelss=document.getElementById(linktel);

		var tp=document.createElement("font");

		if(!sTel || !tTelss) return ;

		if(!document.all){
			sTel.tel=sTel.getAttribute("tel");
		}
		

		if(sTel.tel){

			var mtel=sTel.tel.split(",");

			var ctel="";

			for(var i=0;i<mtel.length;i++){

				if(i==2){ break; }

				ctel=ctel + " " +mtel[i].match(/\d/g).join("");

			}
			
			var text=document.createTextNode(ctel );

			tp.appendChild(text);

			tTelss.appendChild(tp);

		}

	}	

	
function favHouse()
{
	var ha_name = $("#ha_name").html();
	var dist_name = $("#dist_name").html();
	var price = $("#price").html();
	var floor = $("#floor").html();
	var bldgarea = $("#bldgarea").html();
	var href = document.location.href;
	var fav = getCookie('myfav');
	var str = '<li><a href="'+href+'" target="_blank"><b>'+ha_name+'</b></a>'+dist_name+'<br><span class="number">'+price+'</span>万元<br><span class="number">'+bldgarea+'</span>㎡ <span class="number">'+floor+'</span> </li>';
	
	if(fav && fav.indexOf(href) == -1)
	{
		str += fav;
	}
	SetCookie('myfav',str,3600000);
	alert('收藏房源成功');
}

function lastView(type,dealcode)
{
    var key = 'lastView_' + type;
	var add =  dealcode;	
	var lastView = getCookie(key) ? getCookie(key) : add;	
	if(lastView && lastView.indexOf(dealcode) == -1)
	{
		var arr = lastView.split(',');
		arr.unshift(add);		
		if(arr.length > 10)
		{
			arr.pop();
		}
		lastView = arr.join(',');		
	}
	var exp  = new Date();   
    exp.setTime(exp.getTime() + 3600000);   
    document.cookie = key + "="+ escape (lastView) + ";expires=" + exp.toGMTString()+";path=/"+type;   
	//alert(lastView);
}




 	/* 鼠标滑过效果
	id:jscityre_hovemenu
	h2_classname:tit_h
	ha_hover_classname:tit_h active
	
	content
	div_classname:col_detail
	*/
 	function leftmenu_hover(){
		var htit=$("#jscityre_hovemenu .item_a");
		var pcont=$("#jscityre_hovemenu div.col_detail");
		var eselect=$("#jscityre_hovemenu select");
		
		
		htit.hover(
			function(){
				$(this).addClass("this_1");
				var ndiv=$(this).next().attr("class");
				//alert($(this).next().attr("tagName"));
				if(ndiv=='col_detail'){
					$(this).next().css("display","block");
				}else{
					$(this).next().next().css("display","block");
				}
			},
			function(){
				$(this).removeClass("this_1");
				var ndiv=$(this).next().attr("class");
				if(ndiv=='col_detail'){
					$(this).next().css("display","none");
				}else{
					$(this).next().next().css("display","none");
				}
			});
		
		pcont.hover(
			function(){
				//alert(1);
				//alert($(this).prev().tagName());
				$(this).css("display","block");
				var ndiv=$(this).prev().attr("tagName");
				
				if(ndiv=='H2'){
					$(this).prev().addClass("this_1");
				}else{
					$(this).prev().prev().addClass("this_1");
				}
			},
			function(){
				
/*				if(eselect.focus()){
					//alert(1);
					$(this).css("display","block");
					return;
				}*/
				
				
				$(this).css("display","none");
				var ndiv=$(this).prev().attr("tagName");
				
				if(ndiv=='H2'){
					$(this).prev().removeClass("this_1");
				}else{
					$(this).prev().prev().removeClass("this_1");
				}

			}
		);
	}





   /*
   替换select为可编辑样式
   */
   function repselect(className){
   		
		var se=$("."+className);
		var seli=se.find("ul li");
   		se.hover(
			function(){
				//$(this).css("z-index","9999");
				$(this).find(".lns_btbox").addClass("lns_bt_ac");
				$(this).find(".select_item").addClass("active");			
				$(this).find("ul.item_list").css("display","block");
			},
			function(){
				//$(this).css("z-index","");	
				$(this).find(".lns_btbox").removeClass("lns_bt_ac");
				$(this).find("ul.item_list").css("display","none");
				$(this).find(".select_item").removeClass("active");				

			}
		);
   		seli.hover(function(){
			$(this).addClass("active")
							},function(){
							    $(this).removeClass("active");	
							});
		seli.click(function(){
			var p_a = $(this).parent().parent();				
			p_a.find("span.select_item").html($(this).find("span").html());
			p_a.find("input").val($(this).find("span").attr("dc"));
			if($(this).find("span").attr("dc")=='bldgcode'){
				p_a.find("input").attr('name','bldgcode');
				p_a.find("input").val('21');
				$('#houselr').val('0');
				$('#houseba').val('0');
			}
			p_a.prev().removeClass("lns_bt_ac");
			$(this).parent().css("display","none");
		});
   }

	//二手房、租房高级搜索显示隐藏
	function listclick()
	{
		//alert(1);
		$(".search_flod").click(function(){
			if($(".house_form").css("display")=='none'){
				
				//alert($(".select_menu").html());
				$(".house_form").css("display",'block');
			}else{
				$(".house_form").css("display",'none');
			}
		});
		
	}
	
	//二手房、租房判断输入的小区查询内容
	function areaCheck(){
		
			if($(".sr_big_text").val()=="")
			{
				alert("请输入正确的小区名称");
				return false;
			}
			else if($(".sr_big_text").val()=="请输入小区或道路名称")
			{
				alert("请输入正确的小区名称");
				return false;
			}
			else if($(".sr_big_text").val().length<=2)
			{
				alert("您输入的小区名称不准确");
				return false;
			}
			else{
				return true;
			}
		
	}
	//若推荐房源中无内容，则隐藏。
	function hidearea(){
		if($(".rec_house ul").html()==null){
			$(".fl_recommend").css("display","none");
		}
	}

	

//设置Cookie 计数 lxq 
	function setCountCookie(name)
	{
		var userName=getCountCookie(name);
		if(!userName){
			userName=1;
		}
		else{
			delCountCookie(name);
			userName=parseInt(userName)+1;
		}
		var exp = new Date(); 
		exp.setTime(exp.getTime() + 30*24*60*60*1000);
		document.cookie = name+"="+userName+";expires=" + exp.toGMTString()+";path=/;domain=cityhouse.cn";
		//添加或修改第二个Cookie，该Cookie名为cookieUserPassword，
		//值为密码框中的内容
		//document.cookie = "cookieUserPassword="+userPassword;
	}
	function getMaxDir(){
		var maxCount=0;
		var fmarketCount=getCountCookie('fm');
		var lmarketCount=getCountCookie('lm');
		var forsaleCount=getCountCookie('f');
		var leaseCount=getCountCookie('l');
		var haCount=getCountCookie('h');
		maxCount=Math.max(fmarketCount,lmarketCount,forsaleCount,leaseCount,haCount);
		if(fmarketCount==maxCount){
			return '/forsale/market.html';
		}
		else if(lmarketCount==maxCount){
			return '/lease/market.html';
		}
		else if(forsaleCount==maxCount){
			return '/forsale/'
		}
		else if(leaseCount==maxCount){
			return '/lease/'
		}
		else if(haCount==maxCount){
			return '/ha/'
		}
	}
	//获得Cookie文件中的信息
	function getCountCookie(cookieName)
	{		
		var cookieMesaage = document.cookie;
		var cookieValue = "";
		
		cookieValue = returnCountCookieValue(cookieMesaage,cookieName)
		return cookieValue;
	}
	
	//用于返回某个Cookie的值
	//cookieValue为整个Cookie文件的内容
	//cookieName为要获得值的Cookie名
	function returnCountCookieValue(cookieValue,cookieName)
	{
		var returnCookieValue = "";
		var cookies = cookieValue.split("; ");
		var cookiesValue = new Array();
		for (var i=0;i<cookies.length;i++)
		{
		var tempArr = cookies[i].split("=");
		cookiesValue[i] = tempArr;
		}
	
		for (var i=0;i<cookiesValue.length;i++)
		{
			if (cookiesValue[i][0]==cookieName)
			{
				returnCookieValue = cookiesValue[i][1];
				break;
			}
		}
		return returnCookieValue;
	}
	
	function delCountCookie(name) {
		var date = new Date();
		date.setTime(date.getTime() - 10000); 
		document.cookie = name + " " + "; expires=" + date.toUTCString();
	}
	

	
//滚动中介公司功能
Function.prototype.addplay = function(name,funct)
{
	this.prototype[name] = funct;
	return this;
}
var zj_main = function(){}
zj_main.addplay('start',function(){

//搜索的点击
var ys = "";
$(".input_txt4_2").focus(function(){
								  ys = $(this).val();
								  $(this).val("").css("color","#333");
								  })

.
blur(function(){
			  if($(this).val()=="")
			  {
				  $(this).val(ys).css("color","#999");
			  }
			  });
;
								 
$(".hd_zjbox li").each(function(index){
								if($(this).hasClass("hover"))
								{
									$(".hd_zjbox h2 span").text($.trim($(this).text()));	
								}
								
								});//取初始值						 
								 //alert("cs");
								 var clear = "";
								 var obj = arguments[0];
								 obj.each(function(index){
												   var child = $(this).children("ul");
												   var child2 = $(this).children("h2");
												   var child2span = child2.children("span");
												   var ulclick = child.children("li");
												 $(this).hover(function(){
																		
																		
																		clear = setTimeout(function(){
																		//child2.removeClass("active");	
																		child.stop(true,true);
																		child2.addClass("active");
																		
																		child.slideDown();},200);
																		},function(){
																			
																			child.slideUp(function(){child2.removeClass("active");});
																			
																			clearTimeout(clear);	
																			
																			});  
												 
												 ulclick.each(function(){
																	  $(this).click(function(){
																					child2span.text($.trim($(this).text()));		 
																							 
																							 });
																	  
																	  });
												   
												   });
								 
								 					
							     
								 
								 

								 
								 });

//end 滚动中介公司功能
/*
*
*
*/
function showmap(url)
{
	//alert(url);
	//url='http://www.baidu.com';
	//alert(document.getElementById('diframeupimage').src);
	document.getElementById('diframeupimage').src = url;
	var body_scroll_top = (document.documentElement.scrollTop||document.body.scrollTop);//去当前的滚轮位置
	var fz_y=document.getElementById('baidudmap');//取地图框
	fz_y.style.marginTop = 0+"px";
	fz_y.style.top = body_scroll_top+100+"px";
	document.getElementById('baidudmap').style.display = 'block';
	
	//window.open(url,'map','width=500,height=400,resizable=no,location=no,toolbar=no,menubar=no,scrollbars=no,status=no');
}
/*
*fd生成的DIV站点容器
*dropmaps图片的容器
*/
img_position = {
	img_dom:null,//获取图片的容器
	left:0,//图片的外围坐标
	top:0,
	center_x:"",//图片的中心点坐标
	center_y:"",
	set_position:function(){//求外围坐标
		 this.yz_dom();
		 var zj = this.img_dom;
		 while(zj){
			this.left += zj.offsetLeft;
			this.top += zj.offsetTop;
			zj = zj.offsetParent;
		 }
		// alert(this.left+""+this.top);
	},
	set_center:function(xpos,ypos){//求中心坐标
		//alert(xpos+""+ypos)
		 if(!xpos||!ypos){
		 	xpos = 300;
		 	ypos = 240;
		 }
		  this.yz_dom();
		  this.center_x = xpos/2;
		  this.center_y = ypos/2;
		  //alert(this.center_x);
   
	},
	yz_dom:function(){
		if(this.img_dom){
			return true;	
		}else{
			throw new Error("没初始化_imgdom成员");	
		}
	}
};



Function.prototype.addplay = function(name,funct){
	this.prototype[name] = funct;
	return this;
};
var mapmain = function(){};
mapmain.addplay('move',function(){
					//取要移动的对象
					 
					var yd = document.getElementById("bbus_name");
					var ml = document.getElementById("map_left");
					if(!yd || !ml){
					    return false;	
					}
					var w =  Number(yd.style.width.replace("px",""))/2;
					var h = (Number(yd.style.height.replace("px",""))-40)/2;
					//alert(w+""+h);
			 		//alert(w+','+h);
					//alert(img_position.center_x);
					
					yd.style.left = ml.offsetWidth+img_position.center_x + "px";
					yd.style.top = img_position.center_y-40 +"px";
					 
					yd.style.display='block';
					
					
							 });
var mapmain2 = function(){};
mapmain2.addplay('move',function(){
					//取要移动的对象
					 
					var yd = document.getElementById("bbus_name");
					 
					var w =  Number(yd.style.width.replace("px",""))/2;
					var h = (Number(yd.style.height.replace("px",""))-40)/2;
					//alert(w+""+h);
			 		//alert(w+','+h);
					//alert(img_position.center_x);
					
					yd.style.left = img_position.left + img_position.center_x + "px";
					yd.style.top = img_position.top+ img_position.center_y-30 +"px";
					yd.style.display='block';
					
					
							 });

//租房二手房浏览记录的滚动效果
//alert("");
var addEvent = function(funct){
	var ls = window.onload;
	if(typeof ls !== "function"){
		window.onload = funct;	
	}else{
		window.onload = function(){
			ls();
			funct();
		}
	}
};//添加事件处理器
//事件处理机制--prototype框架
Function.prototype.addplay = function(name,funct){
	this.prototype[name] = funct;
	return this;
}
//功能函数
//总功能函数工厂
var functs = {
	clear : "",//计时器
	mobj : "",//滚动对象
	step:"",//可以滚动的步长
	flag:0,//正在走的步长
	clone_top:0,//克隆的高度
	read_numbers:function(obj,numbers){
		var return_read = false;
		var ls = obj.getElementsByTagName("tr"); 
		if(!numbers)
		var numbers = 5;//没有默认就是5条
		//alert("");
		//alert(numbers);
		
		if(ls.length>numbers)
			return_read = true;
	
	return return_read;
		
	},//读取条数
	yz_id:function(obj){
		var runtn_obj = false;
		var ls = document.getElementById(obj);
		if(ls){
			runtn_obj = ls;
		}
		return runtn_obj;
	},//验证ID
	setStep:function(obj){
		var p = this.mobj.offsetHeight;
		var c = obj.offsetHeight;
		this.step = c - p;
		//alert(this.step);
	},//设置步长
	plays:function(time,sd){
		var that = this;//控制权交接
		if(!time)
		time = 50;
		//alert(time);
		//alert(sd);
		var bt = 0;
		if(sd){
			bt = sd;
		}else{
			bt = 1;	
		}
		if(this.step<10)
		return false;//可滚动数太小不动
		
 
		this.clear = setInterval(function(){
 							if(that.mobj.scrollTop>=that.step){
									that.mobj.scrollTop = 0;	  
								}else{
								    that.mobj.scrollTop += 1;
								} 
  
										  },time);//计时器
		
	},//开始滚动
	stops:function(){
		clearInterval(this.clear);
	},//停止滚动
	copyDiv:function(){
		//做无缝滚动的克隆DIV
		 var cd_div = document.createElement("div");
		 var m_append = this.mobj.childNodes[0];
		 cd_div.innerHTML = m_append.innerHTML;
		 m_append.appendChild(cd_div);
		 //设置控制参数
		 this.clone_top = cd_div.offsetHeight;
		 this.step = this.clone_top;
	}
}

var gdClass = function(obj,time,numbers,sd){//1、滚动对象ID的名字2、时间3、多少条开始滚动4、速度
 
for(var i=1;i<arguments.length;i++){
	if(typeof arguments[i] !== "number"){
		throw new Error(i+"参数类型错误");	
	}
}

//首先判断传入的对象是否合法	 

var rt = functs.yz_id(obj);
if(!rt){
	throw new Error("传入非法ID名");
}
//读取现有的条数判断是否应该滚动
var tf_hd = functs.read_numbers(rt,numbers);
if(tf_hd)
	functs.mobj = rt.parentNode;
else{
	rt.parentNode.removeAttribute("class");
	return false;
}

 
//处理步长
functs.setStep(rt);

functs.copyDiv();//添加克隆DIV 

//动画部分
functs.plays(time,sd);
//滑动事件
functs.mobj.onmouseover = function(){
	functs.stops();
};
functs.mobj.onmouseout = function(){
	functs.plays(time,sd);
}


	};
 



/*****************************************
**-date       2012-7-20                  *
**-author     dlc                        *
**-work       efdc                       *
**-model      toolbar                    *
*******************************************/
Function.prototype.addplay = function(name,funct){
    this.prototype[name] = funct;
	return this;
}
/*列表的点击全域跳转*/
var ck_ul = function(){};
ck_ul.addplay("jump" , function(objs,target){
		var ck_li = objs.ck_li,
			linkp_name = objs.linkp_name,
			ulist_ac = objs.ulist_ac;
			
		if(!ck_li || !linkp_name || !ulist_ac){
		    throw new Error("传入错误");	
		}
		var _alink_ = [];//记录所有的跳转连接
		ck_li.each(function(){
		    _alink_.push($(this).find("."+linkp_name+" a").eq(0).attr("href"));   
		}); 
		var  _open_ = function(flag){
			if(!target)
			{
		        window.open(_alink_[flag]);	
			}
			else
			{
			    location.href = _alink_[flag];	
			}
		};//打开函数
		
		ck_li.each(function(index){
			$(this).bind("click",function(){				
		    	_open_(index);
			});
			//划过连接的处理
			var that = $(this);
			$(this).hover(function(){
				 $(this).addClass(ulist_ac);
			}
			,function(){
				$(this).removeClass(ulist_ac);
			});
			$(this).find("a").hover(function(){
			    that.unbind("click");
			},function(){
				that.bind("click",function(){
				    _open_(index);
				});
			})
		});//初始化点击
		
		
		
		 	 	  
	});
/*end 列表的点击全域跳转*/
/*dropDom下拉*/
var domDrop = function(){};
domDrop.prototype.start = function(obj){
    if(!obj.mk_obj || !obj.show_name || !obj.close_name || !obj.ac_name){
	    throw new Error("传入错误的对象或名字");	
	}
	var show_obj = "";
	obj.mk_obj.each(function(){
	    show_obj = $(this).nextAll(obj.show_name).eq(0);
		var that = "";
		$(this).click(function(){
		    show_obj.show();
			$(this).addClass(obj.ac_name);
			that = $(this);
		});

		$(this).parent().bind("mouseleave",function(){
		    that.removeClass(obj.ac_name); 
			show_obj.hide();
		});
	})
}
/*end dropDom下拉*/
/*显示动画--淡进淡出*/
var Alpha = function(){};
Alpha.addplay('fade',function(obj){
	var dom = obj.dom[0];			
	var obj_name = obj.obj_name; 		
	var timer = obj.timer;
	var funct = obj.funct;
							  
   
	var that = this;//句柄交接
	var ft = 0;//是否开启回调函数
	if(!dom || (timer !== 0 &&(!timer || isNaN(timer))) || (obj_name!=0 && !obj_name)){
	    throw new Error("没有该ID"+obj_name+"或者时间错误或者数组名错误");
	}
	if(typeof funct !== "undefined" && typeof funct !== null){
	    if(typeof funct === "function"){
	        ft = 1;
		}else{
		    throw new Error("错误调用回调格式");
		}
	} 
	
	if(!this.opacitys){
	    this.opacitys = [];
	}
	/*if(!this.opacitys[obj_name]){
	    
		if(dom.offsetHeight){
		    this.opacitys[obj_name] = 100;
		}else{
		    this.opacitys[obj_name] = 0;
		}
	}else{
	    var show_hide = this.showHide(dom);
		if(show_hide){
		    this.opacitys[obj_name] = 100;
		}else{
		    this.opacitys[obj_name] = 0;
		}
	}*///初始话
	if(dom.offsetHeight){
	    this.opacitys[obj_name] = 100;
	}else{
	    this.opacitys[obj_name] = 0;
	}//初始话
	//语句过程 
	var _call2_ = function(){
		dom.style.display = "none";
		if(ft){
			funct();//执行回调函数
		}
	}
	var _call3_ = function(){
		if(ft){
			funct();//执行回调函数
		}
	}
	//end 语句过程 
    
	
	//main
	var cp = this.opacitys[obj_name];
	if(!this.ifIe()){
	    cp /= 100;
		var _fadeOuts_ = function(){
		   	cp = parseInt((cp-0.1)*100)/100;
			var thatag = arguments.callee;
			setTimeout(function(){
			    if(cp === 0){
				    _call2_();	
				}else{
					dom.style.opacity = cp;
				    thatag();
				}
			},timer);
		};
		var _fadeIns_ = function(){
		    dom.style.display = "block";
			dom.style.opacity = cp;
			cp = parseInt((cp+0.1)*100)/100;
			var thatag = arguments.callee;
			setTimeout(function(){
				 if(cp <= 1){
					dom.style.opacity = cp;
					thatag();
				}else{
					_call3_();
				}
			},timer);
		};
	}else{
		var _fadeOuts_ = function(){
		   	cp -= 10;
			var thatag = arguments.callee;
			setTimeout(function(){
			    if(cp === 0){
					_call2_();
				}else{
					dom.style.filter = "alpha(opacity:"+cp+")";
				    thatag();
				}
			},timer);
		};
		var _fadeIns_ = function(){
			dom.style.display = "block";
			dom.style.filter = "alpha(opacity:"+cp+")";
			cp += 10;
			var thatag = arguments.callee;
			setTimeout(function(){
			    if(cp <= 100){
					dom.style.filter = "alpha(opacity:"+cp+")";
				    thatag();
				}else{
				    _call3_();
				}
			},timer);
		};
	}
	
	
	if(this.opacitys[obj_name]){//显示动作隐藏
		_fadeOuts_(); 
	}else{
	   _fadeIns_(); 
	}//隐藏动作显示
	
	
})
.addplay('showHide',function(obj){
    if(!obj){
	    throw new Error("对象错误");
	}
	var rt = 0;
	if(obj.style.display === "block"){
	    rt = 1;
	}
	return rt;
})
.addplay("ifIe",function(){
    var rt = 0;//1是IE
	if(navigator.userAgent.toLowerCase().indexOf("msie")>-1){
	    rt = 1;    
	}
	return rt;
});

/*end 显示动画--淡进淡出*/
var toolWindow = {
	scrolls : function(funct){
		var ls = window.onscroll;
		if(typeof ls !== "function"){
			window.onscroll = funct;	
		}else{
			window.onscroll = function(){
				funct();
				ls();
			}
		}
	},
	resizes : function(funct){
		var ls = window.onresize;
		if(typeof ls !== "function"){
			window.onresize = funct;	
		}else{
			window.onresize = function(){
				funct();
				ls();
			}
		}		
	},
	loads : function(funct){
		var ls = window.onload;
		if(typeof ls !== "function"){
			window.onload = funct;	
		}else{
			window.onload = function(){
				funct();
				ls();
			}
		}
	}
};//添加窗体的滚动和最大最小话
var toolbar = (function(){
						return{
							altStart : function(obj){
							    if(!obj.st_name || obj.st_name.constructor !== Array || !obj.close_name || !obj.show_name){
								    throw new Error("错误参数传递");	
								}
							},//弹出层
							scrollsAlt : function(obj){
								
							    if(!obj.scrolls || !obj.closes || isNaN(obj.timer) || !obj.timer){
								    throw new Error("参数传递错误");	
								}
								var o_timer = Number(obj.timer);
								var main_obj = obj.scrolls.height();//框的高度
								var scroll_height = $("html").scrollTop();//滚动了距离
								var c = $("html")[0].clientHeight;
								var mk_run = scroll_height + c - main_obj-10;
								var q_page = $("body")[0].offsetHeight;//求页面总高度
								var make_scroll = q_page - main_obj;//求出滚动条高度

								var mkRun = function(mk_run){
								    obj.scrolls.css({
									    top : mk_run + "px"
									})	
								}
								var window_null = function(){
								    //window.onscroll = null;	//清除滚动
									//window.onresize = null;//清除最大最小的
								}
								
								mkRun(mk_run);//初始化
 								
 								toolWindow.scrolls(function(){
								    mk_run = c - main_obj + $("html").scrollTop() - 10;
									if($("html").scrollTop() >= make_scroll){
									    mk_run = make_scroll;	
									}
									mkRun(mk_run);
								});
								toolWindow.resizes(function(){
								   c = $("html")[0].clientHeight;
								   mk_run = c - main_obj + $("html").scrollTop() - 10;
								   mkRun(mk_run);
								});
								//关闭提示层
								obj.closes.click(function(){
								    $(this).parent().addClass("dn");  
									window_null();
									clearTimeout(sq);
								})
								//计时器
								var sq = setTimeout(function(){
													obj.closes.parent().addClass("dn");
													window_null();				
													},o_timer);
								 
							},//提示滚动
							/*------------------------------------------楼盘列表关闭模块--------------------------------------------------------*/
							selectClose : function(obj){
							     if(!obj.sel_name){
								     throw new Error("传入错误的参数");	 
								 }
								 obj.sel_name.each(function(){
									var that = $(this);					
								    $(this).children("a").click(function(){
									    that.addClass("dn");				   					   
									})							
															
								 })
							},//end 关闭列表选择下拉
							/*-----------------------------------------楼盘小区详细页的更多折叠收起----------------------------------------------*/
							lap : function(obj){
							    if(!obj.lap || !obj.limit || isNaN(obj.limit)){
								    throw new Error("出入错误的参数")	
								}
								var o_limit = Number(obj.limit);
								var articlez = $.trim(obj.lap.prev().html());//存储默认文章值
								var article = $.trim(obj.lap.prev().text());//存储默认文章值
								var jz = obj.lap;
								var n_r = jz.prev();
								var flag = article.length;
								if(flag > o_limit){
								    //显示出折叠
								    jz.html("更多...");
									n_r.html(article.substring(0,o_limit));//限定字串
								}else{
									jz.remove();
								}//初始化判断是否应该出现更多有limit来做字数限定
								
								jz.click(function(){
								    if(flag===n_r.text().length){
									    n_r.html(article.substring(0,o_limit));//限定字串  
										jz.html("更多...");
									}else{
										n_r.html(articlez);
										jz.html("收起...");
									}
									return false;
								})
								 
							},//end 楼盘小区详细页的更多折叠收起
							/*-----------------------------------------楼盘小区详细页的户型图切换-----------------------------------------------*/
							haSelect : function(obj){
							    if(!obj.haXc || !obj.qh){
								    throw new Error("传入错误参数");	
								}
								var flag = 0;
								var f_img = obj.haXc.find("img");
								obj.qh.each(function(index){
								    $(this).click(function(){
									    f_img.attr("src",($(this).attr("drc")));
										obj.qh.eq(flag).parent("li").removeClass("hover");
										$(this).parent("li").addClass("hover");
										flag = index;
									})    					 
								})
							},//end 楼盘小区详细页的户型图切换
							/*----------------------------------------------楼盘社区服务商切换------------------------------------------------------------*/
							fadeSq : function(obj){
							    if(!obj.shop_zs || !obj.l_timer || isNaN(obj.l_timer) || !obj.s_time || isNaN(obj.s_time) || !obj.btn_a){
								    throw new Error("传入错误参数");		
								}
								var o_l_timer = Number(obj.l_timer);
								var o_l_timer2 = o_l_timer / 10;
								var o_s_time = Number(obj.s_time);
								var lenght_obj = obj.shop_zs.length;//所有需要参加轮播的容器个数
								if(lenght_obj > 1){
								var flag = 0;//初始化第一个
								var flag2 = 0;
								var setinterval_time = o_l_timer * lenght_obj + o_s_time;//多长时间开始轮播
								var clear = "";//计时器句柄
								var clearinterval = function(){
									 clearInterval(clear);//清除计时器
								};//清除计时器
								var faded = new Alpha();
								
								
								//return false;
								var run = function(){
								    clear = setTimeout(function(){
										faded.fade({dom:obj.shop_zs.eq(flag) , obj_name : flag , timer : o_l_timer2 , funct : function(){						 
										    flag ++;//下一个开始
											if(flag===lenght_obj){
											    flag = 0;	
											}
											faded.fade({dom:obj.shop_zs.eq(flag) , obj_name : flag , timer : o_l_timer2 , funct : function(){
											    run();
											}});
											 
										}}); 
										
									},setinterval_time);	
									
								}
								run();//初始化轮播
								/*注册划过停止动作且离开开始动作*/
								obj.shop_zs.hover(function(){
												     clearinterval();//清除计时器
												   },
												  function(){
													  if(flag2 === 0){
												          run();//离开开启计时器
													  }else{
													      flag2 = 0;  
													  }
										           });//end 划过事件
								//标志的切换
								obj.shop_zs.each(function(){
								    $(this).find("."+obj.btn_a+" a").each(function(index){
									    $(this).click(function(){
											flag2 = 1;
											if($(this)[0].className === ""){
												faded.fade({dom:obj.shop_zs.eq(flag) , obj_name : flag , timer : o_l_timer2 , funct : function(){												
												    faded.fade({dom:obj.shop_zs.eq(index) , obj_name : index , timer : o_l_timer2});
												}});
												flag = index;
												return false;
											}
										})           
									})
								})
								
								}
								 
							},
							/*----------------------------------------弹出框和关闭动作----------------------------------------------------*/
							mkAlt : function(obj){
							    if(!obj.m_alt || !obj.m_close || !obj.m_zt){
								    throw new Error("传入错误参数")	
								}
								obj.m_alt.each(function(){
								    $(this).click(function(){
										var that = $(this).siblings("."+obj.m_zt);
										that
										.removeClass("dn")
										.find("."+obj.m_close).click(function(){
																			 that.addClass("dn");
																			 });				   
										$(this).blur();//消除虚框
										return false;
									})   
								});
							},//end 弹出框和关闭动作
							/*------------------------------------------查看更多折叠收起------------------------------------------------------*/
							selectMore : function(obj){
							    if(!obj.op_link || !obj.op_link_n || !obj.limit || isNaN(obj.limit)){
								    throw new Error("传入错误参数");		
								}
								var o_limit = Number(obj.limit);
								obj.op_link.each(function(){
								    var prev = $(this).siblings("."+obj.op_link_n);
									var prev_html = prev.html();
									var del_html = "";
									var flag = 0;//判断是否该折叠0不是1是
									if(prev_html){
										prev_html = prev_html.replace(/\n/g,"");
									    var key = prev_html.match(/\<li.*?\<\/li\>/gi);
										if(key.length > o_limit){
											for(var i = 0 ; i < o_limit ; i++){
											    del_html += key[i];	
											}
											prev.html(del_html);//初始化折叠
											$(this).click(function(){
												var jz_a = $(this).children("a");
												if(jz_a.text().indexOf("查看更多")>-1){
												    jz_a.text("收起");
													prev.html(prev_html);
												}else{
													jz_a.text("查看更多");
													prev.html(del_html);
												}
												return false;
											});
										}else{
										    //$(this).remove();//条数小于限定直接去掉
										}
										
									}
									
									
								})
								
								 
								 
								 
								
								
							},//end 查看更多折叠收起
							/*--------------------------------------二手房详细页折叠收起--------------------------------------------*/
							selectMoreTable : function(obj){
							    if(!obj.js_fold || !obj.prev || !obj.limit || isNaN(obj.limit)){
								    throw new Error("传入错误参数");	
								}
								var o_limit = Number(obj.limit);
								obj.js_fold.each(function(){
								    var prev = $(this).siblings("."+obj.prev);		
									var prev_html = prev.html();
									var del_html = "";
									if(prev_html){
									    prev_html = prev_html.replace(/\n/g,"");//清除回车保持IE和非IE的统一
										var key = prev_html.match(/\<tr.*?\<\/tr\>/gi);
										if(key.length > o_limit){
											for(var i = 0 ; i < o_limit ; i++){
											    del_html += key[i];	
											}
											prev.html(del_html);//初始化折叠
											$(this).click(function(){
												var jz_a = $(this).children("a");
												if(jz_a.text().indexOf("查看更多")>-1){
												    jz_a.html("收起&gt;&gt;");
													prev.html(prev_html);
												}else{
													jz_a.html("查看更多&gt;&gt;");
													prev.html(del_html);
												}
												return false;
											});
										}else{
										    //$(this).remove();//条数小于限定直接去掉
										}
									}
								})
								
							},//二手房详细页折叠收起
							/*---------------------------------店铺滚动公告-----------------------------------------------*/
							scrollStart : function(obj){
							    if(!obj.message_b || !obj.timer || isNaN(obj.timer)){
								    throw new Error("传入错误参数");	
								}
								var timer = Number(obj.timer);
								var jl = obj.message_b.width();//父宽度
								var child_span_w = obj.message_b.children("span").width();//子宽度
 								var leave = obj.message_b.offset().left;
								var clear = "";
								var flag = 0;
								var start = function(){
									clear = setInterval(function(){
										flag ++;
										obj.message_b[0].scrollLeft = flag;
										if(leave >= span.offset().left){
											  flag = 0;	
										}
									},timer);
								}
								if(child_span_w > jl){
									var span = $("<span>"+obj.message_b.html()+"</span>");
									obj.message_b.append(span);
								    start();//启动
								}
								obj.message_b.hover(function(){
														clearInterval(clear);	 
													},function(){
														start();	
													});
								 
							},//end 店铺滚动公告
							/*-------------------------------------------------iframeLOAD------------------------------------------------------*/
							bindIfrmae : function(obj){
							    if(!obj.iframe || !obj.loading || !obj.sel_map){
								    throw new Error("传入了非法参数");	
								}
								obj.sel_map.click(function(){
								    obj.loading.removeClass("dn");   
									obj.iframe[0].contentWindow.document.getElementsByTagName("body")[0].innerHTML = "";
								});
								var show = function(){
								    obj.loading.addClass("dn");	
								}
								this.iframeOnload({iframe : obj.iframe[0],funct : show});
							},
							/*------------------------------------------------iframe加载后要实现功能----------------------------------------------*/
							iframeOnload : function(obj){
								if(!obj.iframe || !obj.funct || typeof obj.funct !== "function"){
								    throw new Error(arguments.callee.caller+"传入了非法参数");	
								}
                                if(this.ifIeAll()){
								    obj.iframe.onreadystatechange = function(){
									    if(obj.iframe.readyState === "complete"){
										    obj.funct();
										}
									}
								}else{
								    obj.iframe.onload = function(){
									    obj.funct();	
									}
								}
							},//end iframe加载后要实现功能
							ifIe : function(){
							    if(navigator.userAgent.toLowerCase().indexOf("msie 6.0")>-1){
								    return true;
								}else{
									return false;
								}
							},
							ifIeAll : function(){
							    if(navigator.userAgent.toLowerCase().indexOf("msie")>-1){
								    return true;	
								}else{
								    return false;	
								}
							},//小功能方法体
							/*-------------------------------------列表页条件--------------------------------------------------*/
							/*
							*功能实现点击后后面内容显示
							*参数：1点击者对象2关闭后的名称3显示和隐藏的开关类
							*/
							list : function(ck,rp_name,dn){
								//取当前的内容信息
								var this_name = ck.eq(0).text();
								ck.each(function(){
									var next = $(this).next();
									$(this).click(function(){
										if($(this).text() !== rp_name){
											next.removeClass(dn);
											$(this).text(rp_name);
										}else{
											next.addClass(dn);
											$(this).text(this_name);
										}
									});
								});
							}
						}
						
						
						})();



/*show--js*/

function sms(code) {
	w = 460;
	h = 570;
	l = (screen.width - w) / 2;
	t = (screen.height - h) / 3;
wh=window.open(code,"order", "width="+w+",height="+h+",left="+l+",top="+t);
wh.focus();
}

function sms_email(code) {
	w = 360;
	h = 420;
	l = (screen.width - w) / 2;
	t = (screen.height - h) / 3;
wh=window.open(code,"order", "width="+w+",height="+h+",left="+l+",top="+t);
wh.focus();
}

function NewShow(code,w,h) {
	l = (screen.width - w) / 2;
	t = (screen.height - h) / 3;
wh=window.open(code,"", "width="+w+",height="+h+",left="+l+",top="+t);
wh.focus();
}

function SetCookie(name,value,expire) {   
     var exp  = new Date();   
     exp.setTime(exp.getTime() + expire);   
     document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/;domain=cityhouse.cn";   
}   
   
function getCookie(name) {   
     var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));   
     if(arr != null) return unescape(arr[2]); return null;   
}
/*end show--js*/




/*
 * Autocomplete - jQuery plugin 1.0.2
 *
 * Copyright (c) 2007 Dylan Verheul, Dan G. Switzer, Anjesh Tuladhar, Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.autocomplete.js 5747 2008-06-25 18:30:55Z joern.zaefferer $
 *
 */

(function($) {
	
$.fn.extend({
	autocomplete: function(urlOrData, options) {
		var isUrl = typeof urlOrData == "string";
		options = $.extend({}, $.Autocompleter.defaults, {
			url: isUrl ? urlOrData : null,
			data: isUrl ? null : urlOrData,
			delay: isUrl ? $.Autocompleter.defaults.delay : 10,
			max: options && !options.scroll ? 10 : 150
		}, options);
		
		// if highlight is set to false, replace it with a do-nothing function
		options.highlight = options.highlight || function(value) { return value; };
		
		// if the formatMatch option is not specified, then use formatItem for backwards compatibility
		options.formatMatch = options.formatMatch || options.formatItem;
		
		return this.each(function() {
			new $.Autocompleter(this, options);
		});
	},
	result: function(handler) {
		return this.bind("result", handler);
	},
	search: function(handler) {
		return this.trigger("search", [handler]);
	},
	flushCache: function() {
		return this.trigger("flushCache");
	},
	setOptions: function(options){
		return this.trigger("setOptions", [options]);
	},
	unautocomplete: function() {
		return this.trigger("unautocomplete");
	}
});


$.Autocompleter = function(input, options) {

	var KEY = {
		UP: 38,
		DOWN: 40,
		DEL: 46,
		TAB: 9,
		RETURN: 13,
		ESC: 27,
		COMMA: 188,
		PAGEUP: 33,
		PAGEDOWN: 34,
		BACKSPACE: 8
	};

	// Create $ object for input element
	var $input = $(input).attr("autocomplete", "off").addClass(options.inputClass);

	var timeout;
	var previousValue = "";
	var cache = $.Autocompleter.Cache(options);
	var hasFocus = 0;
	var lastkeyupCode;
	var config = {
		mouseDownOnSelect: false
	};
	var select = $.Autocompleter.Select(options, input, selectCurrent, config);
	
	var blockSubmit;
	
	// prevent form submit in opera when selecting with return key
	$.browser.opera && $(input.form).bind("submit.autocomplete", function() {
		if (blockSubmit) {
			blockSubmit = false;
			return false;
		}
	});
	
	
	
	
	// only opera doesn't trigger keyup multiple times while pressed, others don't work with keyup at all
	$input.bind("keyup" + ".autocomplete", function(event) {
		// track last key pressed
		lastkeyupCode = event.keyCode;
		switch(event.keyCode) {
		
			case KEY.UP:
				event.preventDefault();
				if ( select.visible() ) {
					select.prev();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.DOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.next();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.PAGEUP:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageUp();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.PAGEDOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageDown();
				} else {
					onChange(0, true);
				}
				break;
			
			// matches also semicolon
			case options.multiple && $.trim(options.multipleSeparator) == "," && KEY.COMMA:
			case KEY.TAB:
			case KEY.RETURN:
				if( selectCurrent() ) {
					// stop default to prevent a form submit, Opera needs special handling
					event.preventDefault();
					blockSubmit = true;
					return false;
				}
				break;
				
			case KEY.ESC:
				select.hide();
				break;
				
			default:
				clearTimeout(timeout);
				timeout = setTimeout(onChange, options.delay);
				break;
		}
	}).focus(function(){
		// track whether the field has focus, we shouldn't process any
		// results if the field no longer has focus
		hasFocus++;
	}).blur(function() {
		hasFocus = 0;
		if (!config.mouseDownOnSelect) {
			hideResults();
		}
	}).click(function() {
		// show select when clicking in a focused field
		if ( hasFocus++ > 1 && !select.visible() ) {
			onChange(0, true);
		}
	}).bind("search", function() {
		// TODO why not just specifying both arguments?
		var fn = (arguments.length > 1) ? arguments[1] : null;
		
		
		
		function findValueCallback(q, data) {
			var result;
			if( data && data.length ) {
				for (var i=0; i < data.length; i++) {
					if( data[i].result.toLowerCase() == q.toLowerCase() ) {
						result = data[i];
						break;
					}
				}
			}
			if( typeof fn == "function" ) fn(result);
			else $input.trigger("result", result && [result.data, result.value]);
		}
		$.each(trimWords($input.val()), function(i, value) {
			request(value, findValueCallback, findValueCallback);
		});
	}).bind("flushCache", function() {
		cache.flush();
	}).bind("setOptions", function() {
		$.extend(options, arguments[1]);
		// if we've updated the data, repopulate
		if ( "data" in arguments[1] )
			cache.populate();
	}).bind("unautocomplete", function() {
		select.unbind();
		$input.unbind();
		$(input.form).unbind(".autocomplete");
	});
	
	
	function selectCurrent() {
		var selected = select.selected();
	
		if( !selected )
			return false;
		
		//alert(selected);
		  
		var v = selected.result;
		previousValue = v;
		//alert(v);
		if ( options.multiple ) {
			var words = trimWords($input.val());
			if ( words.length > 1 ) {
				v = words.slice(0, words.length - 1).join( options.multipleSeparator ) + options.multipleSeparator + v;
			}
			v += options.multipleSeparator;
			
		}
		/*补充去掉<span>*/
		var regspan=/<span>.*<\/span>/;
		var rega = /<\/?a.*?>/g;//cupdate过滤A标记
		//alert(v);
		v=v.replace(regspan,"");
		v=v.replace(rega,"");//cupdate过滤A标记
		//alert(v);
		/*补充去掉<span>*/
		$input.val(v);//去掉内容的填充--cupdate
		hideResultsNow();
		$input.trigger("result", [selected.data, selected.value]);
		return true;
	}
	
	function onChange(crap, skipPrevCheck) {
		if( lastkeyupCode == KEY.DEL ) {
			select.hide();
			return;
		}
		
		var currentValue = $input.val();
		
		if ( !skipPrevCheck && currentValue == previousValue )
			return;
		
		previousValue = currentValue;
		
		currentValue = lastWord(currentValue);
		if ( currentValue.length >= options.minChars) {
			$input.addClass(options.loadingClass);
			if (!options.matchCase)
				currentValue = currentValue.toLowerCase();
			request(currentValue, receiveData, hideResultsNow);
		} else {
			stopLoading();
			select.hide();
		}
	};
	
	function trimWords(value) {
		if ( !value ) {
			return [""];
		}
		var words = value.split( options.multipleSeparator );
		var result = [];
		$.each(words, function(i, value) {
			if ( $.trim(value) )
				result[i] = $.trim(value);
		});
		return result;
	}
	
	function lastWord(value) {
		if ( !options.multiple )
			return value;
		var words = trimWords(value);
		return words[words.length - 1];
	}
	
	// fills in the input box w/the first match (assumed to be the best match)
	// q: the term entered
	// sValue: the first matching result
	function autoFill(q, sValue){
		// autofill in the complete box w/the first match as long as the user hasn't entered in more data
		// if the last user key pressed was backspace, don't autofill
		if( options.autoFill && (lastWord($input.val()).toLowerCase() == q.toLowerCase()) && lastkeyupCode != KEY.BACKSPACE ) {
			// fill in the value (keep the case the user has typed) 
			$input.val($input.val() + sValue.substring(lastWord(previousValue).length));
			// select the portion of the value not typed by the user (so the next character will erase)
			$.Autocompleter.Selection(input, previousValue.length, previousValue.length + sValue.length);
		}
	};

	function hideResults() {
		clearTimeout(timeout);
		timeout = setTimeout(hideResultsNow, 200);
	};

	function hideResultsNow() {
		var wasVisible = select.visible();
		select.hide();
		clearTimeout(timeout);
		stopLoading();
		if (options.mustMatch) {
			// call search and run callback
			$input.search(
				function (result){
					// if no value found, clear the input box
					if( !result ) {
						if (options.multiple) {
							var words = trimWords($input.val()).slice(0, -1);
							$input.val( words.join(options.multipleSeparator) + (words.length ? options.multipleSeparator : "") );
						}
						else
							$input.val( "" );
					}
				}
			);
		}
		if (wasVisible)
			// position cursor at end of input field
			$.Autocompleter.Selection(input, input.value.length, input.value.length);
	};

	function receiveData(q, data) {
		if ( data && data.length && hasFocus ) {
			stopLoading();
			select.display(data, q);
			autoFill(q, data[0].value);
			select.show();
		} else {
			hideResultsNow();
		}
	};

	function request(term, success, failure) {
		if (!options.matchCase)
			term = term.toLowerCase();
		var data = cache.load(term);
		// recieve the cached data
		if (data && data.length) {
			success(term, data);
		// if an AJAX url has been supplied, try loading the data now
		} else if( (typeof options.url == "string") && (options.url.length > 0) ){
			
			var extraParams = {
				timestamp: +new Date()
			};
			$.each(options.extraParams, function(key, param) {
				extraParams[key] = typeof param == "function" ? param() : param;
			});
			if(!("auto_temp" in window)){
			    auto_temp = null;	
			}//传入新的参数--cupdate
			if(!("auto_temp2" in window)){
				auto_temp2 = null;//非A跳转传入参数
			}
			if(!("auto_temp3" in window))
			{
				auto_temp3 = null;
			}
			$.ajax({
				// try to leverage ajaxQueue plugin to abort previous requests
				mode: "abort",
				// limit abortion to this input
				port: "autocomplete" + input.name,
				dataType: options.dataType,
				url: options.url,
				data: $.extend({
					q: lastWord(term),
					limit: options.max,
					datas : auto_temp,//传入新的参数--cupdate
					na : auto_temp2
				}, extraParams),
				success: function(data) {
					var parsed = options.parse && options.parse(data) || parse(data);
					cache.add(term, parsed);
					success(term, parsed);
				}
			});
		} else {
			// if we have a failure, we need to empty the list -- this prevents the the [TAB] key from selecting the last successful match
			select.emptyList();
			failure(term);
		}
	};
	
	function parse(data) {
		var parsed = [];
		var rows = data.split("\n");
		for (var i=0; i < rows.length; i++) {
			var row = $.trim(rows[i]);
			if (row) {
				row = row.split("|");
				parsed[parsed.length] = {
					data: row,
					value: row[0],
					result: options.formatResult && options.formatResult(row, row[0]) || row[0]
				};
			}
		}
		return parsed;
	};

	function stopLoading() {
		$input.removeClass(options.loadingClass);
	};

};

$.Autocompleter.defaults = {
	inputClass: "ac_input",
	resultsClass: "ac_results",
	loadingClass: "ac_loading",
	minChars: 1,
	delay: 400,
	matchCase: false,
	matchSubset: true,
	matchContains: false,
	cacheLength: 10,
	max: 100,
	mustMatch: false,
	extraParams: {},
	selectFirst: true,
	formatItem: function(row) { return row[0]; },
	formatMatch: null,
	autoFill: false,
	width: 0,
	multiple: false,
	multipleSeparator: ", ",
	highlight: function(value, term) {
		return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
	},
    scroll: false,
    scrollHeight: 180 
};

$.Autocompleter.Cache = function(options) {

	var data = {};
	var length = 0;
	
	function matchSubset(s, sub) {
		if (!options.matchCase) 
			s = s.toLowerCase();
		var i = s.indexOf(sub);
		if (i == -1) return false;
		return i == 0 || options.matchContains;
	};
	
	function add(q, value) {
		if (length > options.cacheLength){
			flush();
		}
		if (!data[q]){ 
			length++;
		}
		data[q] = value;
	}
	
	function populate(){
		if( !options.data ) return false;
		// track the matches
		var stMatchSets = {},
			nullData = 0;

		// no url was specified, we need to adjust the cache length to make sure it fits the local data store
		if( !options.url ) options.cacheLength = 1;
		
		// track all options for minChars = 0
		stMatchSets[""] = [];
		
		// loop through the array and create a lookup structure
		for ( var i = 0, ol = options.data.length; i < ol; i++ ) {
			var rawValue = options.data[i];
			// if rawValue is a string, make an array otherwise just reference the array
			rawValue = (typeof rawValue == "string") ? [rawValue] : rawValue;
			
			var value = options.formatMatch(rawValue, i+1, options.data.length);
			if ( value === false )
				continue;
				
			var firstChar = value.charAt(0).toLowerCase();
			// if no lookup array for this character exists, look it up now
			if( !stMatchSets[firstChar] ) 
				stMatchSets[firstChar] = [];

			// if the match is a string
			var row = {
				value: value,
				data: rawValue,
				result: options.formatResult && options.formatResult(rawValue) || value
			};
			
			// push the current match into the set list
			stMatchSets[firstChar].push(row);

			// keep track of minChars zero items
			if ( nullData++ < options.max ) {
				stMatchSets[""].push(row);
			}
		};

		// add the data items to the cache
		$.each(stMatchSets, function(i, value) {
			// increase the cache size
			options.cacheLength++;
			// add to the cache
			add(i, value);
		});
	}
	
	// populate any existing data
	setTimeout(populate, 25);
	
	function flush(){
		data = {};
		length = 0;
	}
	
	return {
		flush: flush,
		add: add,
		populate: populate,
		load: function(q) {
			if (!options.cacheLength || !length)
				return null;
			/* 
			 * if dealing w/local data and matchContains than we must make sure
			 * to loop through all the data collections looking for matches
			 */
			if( !options.url && options.matchContains ){
				// track all matches
				var csub = [];
				// loop through all the data grids for matches
				for( var k in data ){
					// don't search through the stMatchSets[""] (minChars: 0) cache
					// this prevents duplicates
					if( k.length > 0 ){
						var c = data[k];
						$.each(c, function(i, x) {
							// if we've got a match, add it to the array
							if (matchSubset(x.value, q)) {
								csub.push(x);
							}
						});
					}
				}				
				return csub;
			} else 
			// if the exact item exists, use it
			if (data[q]){
				return data[q];
			} else
			if (options.matchSubset) {
				for (var i = q.length - 1; i >= options.minChars; i--) {
					var c = data[q.substr(0, i)];
					if (c) {
						var csub = [];
						$.each(c, function(i, x) {
							if (matchSubset(x.value, q)) {
								csub[csub.length] = x;
							}
						});
						return csub;
					}
				}
			}
			return null;
		}
	};
};

$.Autocompleter.Select = function (options, input, select, config) {
	var CLASSES = {
		ACTIVE: "ac_over"
	};
	
	var listItems,
		active = -1,
		data,
		term = "",
		needsInit = true,
		element,
		list;
	
	// Create results
	function init() {
		if (!needsInit)
			return;
		element = $("<div/>")
		.hide()
		.addClass(options.resultsClass)
		.css("position", "absolute")
		.appendTo(document.body);
		list = $("<ul/>").appendTo(element).mouseover( function(event) {
			if(target(event).nodeName && target(event).nodeName.toUpperCase() == 'LI') {
	            active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
			    $(target(event)).addClass(CLASSES.ACTIVE);            
	        }
		}).click(function(event) {

			$(target(event)).addClass(CLASSES.ACTIVE);
			
			//$(target(event)).addClass(CLASSES.ACTIVE).html("111111111111");
			
			//alert($(target(event)).addClass(CLASSES.ACTIVE).html());
			
			 
			 
			select();
			// TODO provide option to avoid setting focus again after selection? useful for cleanup-on-focus
			//input.acomplete=1;
			input.focus();
			//return true;//去掉关闭默认事件cupdate
		}).mousedown(function() {
			config.mouseDownOnSelect = true;
		}).mouseup(function() {
			config.mouseDownOnSelect = false;
		});
		
		if( options.width > 0 )
			element.css("width", options.width);
			
		needsInit = false;
	} 
	
	function target(event) {
		var element = event.target;
		while(element && element.tagName != "LI")
			element = element.parentNode;
		// more fun with IE, sometimes event.target is empty, just ignore it then
		if(!element)
			return [];
		return element;
	}

	function moveSelect(step) {
		listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
		movePosition(step);
        var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
        if(options.scroll) {
            var offset = 0;
            listItems.slice(0, active).each(function() {
				offset += this.offsetHeight;
			});
            if((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
                list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight());
            } else if(offset < list.scrollTop()) {
                list.scrollTop(offset);
            }
        }
	};
	
	function movePosition(step) {
		active += step;
		if (active < 0) {
			active = listItems.size() - 1;
		} else if (active >= listItems.size()) {
			active = 0;
		}
	}
	
	function limitNumberOfItems(available) {
		return options.max && options.max < available
			? options.max
			: available;
	}
	
	function fillList() {
		list.empty();
		var max = limitNumberOfItems(data.length);
		for (var i=0; i < max; i++) {
			if (!data[i])
				continue;
			var formatted = options.formatItem(data[i].data, i+1, max, data[i].value, term);
            
			if ( formatted === false )
				continue;
			var li = $("<li/>").html( options.highlight(formatted, term) ).addClass(i%2 == 0 ? "ac_even" : "ac_odd").appendTo(list)[0];
			$.data(li, "ac_data", data[i]);
		}

		if(auto_temp && !auto_temp3){//cupdate原来是li
		    listItems = list.find("a");//cupdate li 换成a
		}else{
			listItems = list.find("li");//cupdate a 换成li
		}
		if ( options.selectFirst ) {
			listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
			active = 0;
		}
		// apply bgiframe if available
		if ( $.fn.bgiframe )
			list.bgiframe();
	}
	
	return {
		display: function(d, q) {
			init();
			data = d;
			term = q;
			fillList();
		},
		next: function() {
			moveSelect(1);
		},
		prev: function() {
			moveSelect(-1);
		},
		pageUp: function() {
			if (active != 0 && active - 8 < 0) {
				moveSelect( -active );
			} else {
				moveSelect(-8);
			}
		},
		pageDown: function() {
			if (active != listItems.size() - 1 && active + 8 > listItems.size()) {
				moveSelect( listItems.size() - 1 - active );
			} else {
				moveSelect(8);
			}
		},
		hide: function() {
			element && element.hide();
			listItems && listItems.removeClass(CLASSES.ACTIVE);
			active = -1;
		},
		visible : function() {
			return element && element.is(":visible");
		},
		current: function() {
			return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0]);
		},
		show: function() {
			var offset = $(input).offset();
			element.css({
				width: typeof options.width == "string" || options.width > 0 ? options.width : $(input).width(),
				top: offset.top + input.offsetHeight,
				left: offset.left
			}).show();
            if(options.scroll) {
                list.scrollTop(0);
                list.css({
					maxHeight: options.scrollHeight,
					overflow: 'auto'
				});
				
                if($.browser.msie && typeof document.body.style.maxHeight === "undefined") {
					var listHeight = 0;
					listItems.each(function() {
						listHeight += this.offsetHeight;
					});
					var scrollbarsVisible = listHeight > options.scrollHeight;
                    list.css('height', scrollbarsVisible ? options.scrollHeight : listHeight );
					if (!scrollbarsVisible) {
						// IE doesn't recalculate width when scrollbar disappears
						listItems.width( list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")) );
					}
                }
                
            }
		},
		selected: function() {
			var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
			return selected && selected.length && $.data(selected[0], "ac_data");
		},
		emptyList: function (){
			list && list.empty();
		},
		unbind: function() {
			element && element.remove();
		}
	};
};

$.Autocompleter.Selection = function(field, start, end) {
	if( field.createTextRange ){
		var selRange = field.createTextRange();
		selRange.collapse(true);
		selRange.moveStart("character", start);
		selRange.moveEnd("character", end);
		selRange.select();
	} else if( field.setSelectionRange ){
		field.setSelectionRange(start, end);
	} else {
		if( field.selectionStart ){
			field.selectionStart = start;
			field.selectionEnd = end;
		}
	}
	field.focus();
};

})(jQuery);
