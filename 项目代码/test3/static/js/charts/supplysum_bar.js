/** 
 * 全国供给量走势图表
 */
function drawCharts_supplysum_bar(renderId, chartData, cwidth, cheight)
{
	if (!cwidth) cwidth = 664;
	if (!cheight) cheight = 310;
	
	var chart;
	
	var cparms = chartData.parms;
	var cdata = {categories: chartData.categories, series: chartData.series};
	
	var co = new ChartOpt(renderId, cwidth, cheight);
	
	co.chartOpt.chart.type = cparms['chart_type'];
	
	co.chartOpt.xAxis.title.text =  cparms['xTitle'];
	co.chartOpt.xAxis.categories = cdata.categories;
	
	co.chartOpt.tooltip.formatter = function() {
		// precision: 小数精确位数
		var precision = 1;
		
		return '<b>[' + this.x + '] '
			+ this.series.name + '占'
			+ Highcharts.numberFormat(this.y, precision, '.') + '%</b>';
	};
	
	co.chartOpt.yAxis.min = cparms['yMin'];
	co.chartOpt.yAxis.max = cparms['yMax'];
	
	co.chartOpt.yAxis.tickInterval = parseInt(cparms['yTickInterval']);
	
	co.chartOpt.yAxis.title.text =  cparms['yTitle'];
	
	co.chartOpt.series[0].data = cdata.series.forsale;
	co.chartOpt.series[0].name = cparms.serie_name.forsale;
	co.chartOpt.series[0].color = '#c50000';
	
	co.chartOpt.series[1].data = cdata.series.lease;
	co.chartOpt.series[1].name = cparms.serie_name.lease;
	co.chartOpt.series[1].color = '#50b432';
	
	chart = new Highcharts.Chart(co.chartOpt);
	
	return chart;
}

/** 行情图属性设置 */
function ChartOpt(renderTo, width, height)
{
	this.chartOpt = {
		chart: {
			renderTo: renderTo,
			type: 'column',
			width: width,
			height: height,
			/*borderWidth: 1,
			borderColor: '#000000',*/
			margin: [30, 20, 40, 30]
		},
		title: {text: ''},
		subtitle: {text: ''},
		xAxis: {
			title: {
				text: '',
				align: 'middle',
				style: {
					fontSize: '12px',
					fontFamily: 'Arial, Helvetica, sans-serif',
					color: '#999999',
					fontWeight:'normal'
				},
				rotation: 0,
				x: 0,
				y: 100
			},
			categories: [],
			tickmarkPlacement: 'between',
			labels: {
				// rotation: 45,
				align: 'center',
				// x: 0,
				y: 15,
				step: 2,
				style: {
					fontSize: '11px',
					fontFamily: 'Arial, Helvetica, sans-serif',
					color: '#000000',
					backgroundColor: '#FFFFFF',
					fontWeight:'normal'
				}
			},
			gridLineWidth: 1, // x轴格线
			gridLineColor: '#E5E5E5',
			tickColor: '#000000',
			lineWidth: 1, // 轴线宽度
			lineColor: '#000000',
			// minorGridLineDashStyle: 'longdash',
			tickWidth: 1,
			showFirstLabel: true,
			showLastLabel: true,
			endOnTick: true
		},
		yAxis: {
			title: {
				text: '',
				align: 'high',
				rotation: 0,
				x: -12,
				y: -5,
				margin: -40,
				style: {
					fontSize:'12px',
					fontFamily: '宋体, Helvetica, sans-serif',
					color: '#999999',
					fontWeight:'normal'
				}
			},
			labels: {
				align: 'right',
				x: -5,
				// y: -5,
				formatter: function() {
					return Highcharts.numberFormat(this.value, 0, '');
				}
			},
			gridLineWidth: 1, // y轴格线
			gridLineColor: '#E5E5E5',
			lineWidth: 1, // 轴线宽度
			lineColor: '#000000',
			tickColor: '#000000',
			tickWidth: 1,
			showFirstLabel: true,
			showLastLabel: true
		},
		legend: {	// 图例
			align: 'left',
			verticalAlign: 'top',
			x: 50,
			y: -5,
			floating: true,
			borderWidth: 0
		},
		tooltip: {
			shared: false,
			crosshairs: false
		},
		plotOptions: {
			series: {
				cursor: 'pointer',
				lineWidth: 1.5,
				borderWidth: 0,
				groupPadding: 0.08,
				pointPadding: 0.08,
				marker: {
					// radius: 3,	// 数据点的半径大小
					status: {
						hover: {
							lineWidth: 1
						}
					}
				},
				connectNulls: true,	// 链接空节点
				shadow: false
			}
		},
		series: [{
			name: '',
			marker: {symbol: 'square'},
			color: '#FFA800'
		}, {
			name: '',
			marker: {symbol: 'circle'},
			color: '#00A1EC'
		}],
		exporting: {
			enabled: false	// 显示打印按钮
		}
	}
}
