/** 
 * 首页 需求市场状况走势 图表
 */
function drawDemAnalyCharts(renderId, cdata, cwidth, cheight)
{
	if (!cwidth) cwidth = 664;
	if (!cheight) cheight = 310;
	var chart;
	
	var cparms = cdata.parms;
	
	var cseries = cdata.series;
	
	var copts = genLineOptions();
	copts.chart.renderTo = renderId;
	copts.chart.width = cwidth;
	copts.chart.height = cheight;
	copts.chart.type = cparms['chart_type'];
	
	copts.xAxis.title.text =  cparms['xTitle'];
	copts.xAxis.categories = cdata.categories;
	copts.xAxis.tickmarkPlacement = 'on';
	copts.xAxis.labels.step = 2;
	
	copts.tooltip.formatter = function() {
		return '<b>['+ this.series.name + '] 占'
			+ Highcharts.numberFormat(this.y, 1) + '%/时间:'
			+ this.x +'</b>';
	};
	
	copts.yAxis.title.text =  cparms['yTitle'];
	copts.yAxis.min = 0;
	copts.yAxis.max = cparms['yMax'];
	copts.yAxis.tickInterval = cparms['yTickInterval'];
	
	copts.plotOptions.series.marker.radius = 3;
	copts.plotOptions.series.marker.status.hover.radius = 5;
		
	copts.tooltip.shared = false;
	copts.tooltip.crosshairs = true;
	
	var serieHa = {}, serieForsale = {}, serieLease = {};
	serieHa.data = cseries.ha;
	serieHa.name = cparms.serie_name.ha;
	serieHa.color = '#058dc7';
	serieHa.marker = {symbol: 'square'};
	copts.series.push(serieHa);
	
	serieForsale.data = cseries.forsale;
	serieForsale.name = cparms.serie_name.forsale;
	serieForsale.color = '#c50000';
	serieForsale.marker = {symbol: 'circle'};
	copts.series.push(serieForsale);
	
	serieLease.data = cseries.lease;
	serieLease.name = cparms.serie_name.lease;
	serieLease.color = '#50b432';
	serieLease.marker = {symbol: 'triangle'};
	copts.series.push(serieLease);
	
	chart = new Highcharts.Chart(copts);
	
	return chart;
}

function genLineOptions() {
	var chartOpt = {
		chart: {
			renderTo: '',
			type: 'spline',
			width: 675,
			height: 320,
			margin: [30, 20, 40, 30]
		},
		title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
		xAxis: {
			title: {
				text: '',
				align: 'middle',
				style: {
					fontSize: '12px',
					fontFamily: '宋体, Helvetica, sans-serif',
					color: '#999999',
					backgroundColor: '#FFFFFF',
					fontWeight: 'normal'
				},
				rotation: 0,
				x: 0,
				y: 100
			},
			type: 'categories',
			tickmarkPlacement: 'on',
			labels: {
				rotation: 0,
				align: 'center',
				// x: -6,
				y: 15,
				step: 2,
				style: {
					fontSize: '12px',
					fontFamily: '宋体, Helvetica, sans-serif',
					color: '#000000',
					backgroundColor: '#FFFFFF', // 兼容ie6中 rotation > 0 时的bug
					fontWeight: 'normal'
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
			showLastLabel: true
		},
		yAxis: {
			title: {
				text: '',
				align: 'high',
				rotation: 0,
				x: -15,
				y: -10,
				margin: -40,
				style: {
					fontSize: '12px',
					fontFamily: '宋体, Helvetica, sans-serif',
					color: '#999999',
					backgroundColor: '#FFFFFF', // 兼容ie6中 rotation > 0 时的bug
					fontWeight: 'normal'
				}
			},
			labels: {
				align: 'right',
				x: -5,
				// y: -5,
				style: {
					fontSize: '12px',
					fontFamily: '宋体, Helvetica, sans-serif',
					color: '#000000',
					backgroundColor: '#FFFFFF', // 兼容ie6中 rotation > 0 时的bug
					fontWeight: 'normal'
				},
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
		legend: { // 图例
			align: 'left',
			verticalAlign: 'top',
			x: 50,
			y: -8,
			style: {
				fontSize: '12px',
				fontFamily: '宋体, Helvetica, sans-serif',
				color: '#000000',
				backgroundColor: '#FFFFFF', // 兼容ie6中 rotation > 0 时的bug
				fontWeight: 'normal'
			},
			floating: true,
			borderWidth: 0
		},
		tooltip: {
			shared: false,
			crosshairs: false
		},
		plotOptions: {
			series: { // 线的总体样式属性
				cursor: 'pointer',
				// lineWidth: 1.5, // 线图中线条的粗细
				marker: {
					// radius: 3, // 数据点的半径大小
					status: {
						hover: { // 鼠标经过时的样式
							lineWidth: 1
						}
					}
				},
				connectNulls: true, // 链接空节点
				shadow: false
			}
		},
		series: [], // 数据序列
		exporting: {
			enabled: false // 显示打印按钮
		}
	};
	
	return chartOpt;
}
