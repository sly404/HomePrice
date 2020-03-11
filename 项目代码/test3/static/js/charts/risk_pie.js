/**
 * 复估统计PIE图表
 */
function drawRestatPie(renderTo, data, width, height)
{
	var chart, serie = {};
	var pieOpt;
	pieOpt = genPieOptions();
	
	pieOpt.chart.renderTo = renderTo;
	pieOpt.chart.width = width;
	pieOpt.chart.height = height;
	
	pieOpt.plotOptions.pie.dataLabels.formatter = function () {
		if (this.percentage > 0) {
			return Highcharts.numberFormat(this.percentage, 1) + ' %';
		}
	};
	
	// 添加pie图表数据序列
	serie.name = '';
	
	for (i in data) {
		data[i]['y'] = parseFloat(data[i]['y']) > 0 ? parseFloat(data[i]['y']) : null;
		
		if (data[i]['id'] == 'ha') { // 新房
			data[i]['color'] = '#058dc7';
		} else if (data[i]['id'] == 'forsale') { // 二手房
			data[i]['color'] = '#c50000';
		} else if (data[i]['id'] == 'lease') { // 租房
			data[i]['color'] = '#50b432';
		}
		
		serie.data = data;
	}
	
	pieOpt.series.push(serie);
	
	chart = new Highcharts.Chart(pieOpt);
	
	return chart;
}

/**
 * pie图表属性设置
 */
function genPieOptions()
{
	var pieOpt = {
		chart: {
			type: 'pie',
			renderTo: '',
			plotBackgroundColor: null,
			plotBorderWidth: 0,
			plotShadow: true,
			shadow: false,
			margin: [1, 1, 1, 1],
			spacingBottom: 1,
			spacingLeft: 1,
			spacingRight: 1,
			spacingTop: 1
		},
		title: {
			text: ''
		},
		tooltip: {enabled: false},
		legend: { // 图例
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'bottom',
			x: 0,
			y: -25,
			floating: true,
			borderWidth: 0,
			itemMarginTop: 5,
            itemMarginBottom: 5,
			itemStyle: {
				fontSize: '12px',
				fontFamily: '宋体, Helvetica, sans-serif',
				color: '#000000',
                fontWeight: 'normal'
            }
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				size: '60%', /* 相对图表区域的大小 */
				dataLabels: {
					enabled: true,
	                color: '#000000',
	                connectorColor: '#000000',
	                distance: 8,
					style: {
						fontSize: '12px',
						fontFamily: '宋体, Helvetica, sans-serif',
						color: '#000000',
						backgroundColor: '#FFFFFF', // 兼容ie6中 rotation > 0 时的bug
						fontWeight: 'normal'
					}
				},
				showInLegend: true,
				shadow: false
			}
		},
		series: [],
		exporting : {
			enabled : false // 显示打印按钮
		}
	};
	
	return pieOpt;
}
