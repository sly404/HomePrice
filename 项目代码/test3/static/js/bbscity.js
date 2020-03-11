function addBookmark(title,url)
{
    if (window.sidebar)
    {
        window.sidebar.addPanel(title, url,"");
    }
    else if( document.all )
    {
        window.external.AddFavorite(url, title);
    }
    else if( window.opera && window.print )
    {
       return true;
    }
}

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
};

//添加窗体的滚动和最大最小话
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
				}, function(){
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
