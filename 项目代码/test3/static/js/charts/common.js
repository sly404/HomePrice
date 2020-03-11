/** 加载中效果 */
function waiting(renderTo) {
	html = '<div class="alt5 mb" style="height: 120px;width:673px;">'
			+ '<img src="/images/loading.gif" />' + '</div>';

	$('#' + renderTo).html(''); // 首先清空内容，避免出现多个等待信息的情况
	$(html).prependTo('#' + renderTo).delay(800);
}

/** 无数据可显示效果 */
function showNodata(renderTo) {
	html = '<div class="alt4 mb35"><span>当前查询条件样本数据不足，暂无相关数据！</span></div>';

	$('#' + renderTo).html(''); // 首先清空内容，避免出现多个等待信息的情况
	$('#' + renderTo).parents(".cb_tabwrap").prepend(html);
	//$(html).prependTo('#' + renderTo).delay(800);
}
