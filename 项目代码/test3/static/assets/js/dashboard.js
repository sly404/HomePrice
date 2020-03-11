$(function() {
	'use strict';
	
	
	// /*----eCharts----*/
	// var echartBar = echarts.init(document.getElementById('index'), {
		// color: ['#f47b25', '#5d61bf'],
		// categoryAxis: {
			// axisLine: {
				// lineStyle: {
					// color: '#ececff'
				// }
			// },
			// splitLine: {
				// lineStyle: {
					// color: ['#ececff']
				// }
			// }
		// },
		// grid: {
			// x: 40,
			// y: 20,
			// x2: 40,
			// y2: 20
		// },
		// valueAxis: {
			// axisLine: {
				// lineStyle: {
					// color: '#ececff'
				// }
			// },
			// splitArea: {
				// show: true,
				// areaStyle: {
					// color: ['rgba(255,255,255,0.1)']
				// }
			// },
			// splitLine: {
				// lineStyle: {
					// color: ['#ececff']
				// }
			// }
		// },
		
	// });
	
	// echartBar.setOption({
		// tooltip: {
			// trigger: 'axis'
		// },
		// legend: {
			// data: ['New Account', 'Expansion Account']
		// },
		// toolbox: {
			// show: false
		// },
		// calculable: false,
		// xAxis: [{
			// type: 'category',
			// data: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		// }],
		// yAxis: [{
			// type: 'value'
		// }],
		// series: [{
			// name: 'New Accounts',
			// type: 'bar',
			// data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0],
			// markPoint: {
				// data: [{
					// type: 'max',
					// name: ''
				// }, {
					// type: 'min',
					// name: ''
				// }]
			// },
			// markLine: {
				// data: [{
					// type: 'average',
					// name: ''
				// }]
			// }
		// }, {
			// name: 'Expansion Accounts',
			// type: 'bar',
			// data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8,],
			// markPoint: {
				// data: [{
					// name: 'New Accounts',
					// value: 182.2,
					// xAxis: 7,
					// yAxis: 183,
				// }, {
					// name: 'Expansion Accounts',
					// value: 2.3,
					// xAxis: 11,
					// yAxis: 3
				// }]
			// },
			// markLine: {
				// data: [{
					// type: 'average',
					// name: ''
				// }]
			// }
		// }]
	// });
	
	window.Apex = {
		stroke: {
			width: 3
		},
		markers: {
			size: 0
		},
		tooltip: {
			fixed: {
				enabled: true,
			}
		}
	};
	var options1 = {
		chart: {
			type: 'line',
			width: '100%',
			height: 45,
			sparkline: {
				enabled: true
			}
		},
		stroke: {
			colors: '#f47b25',
		},
		series: [{
			data: [64773, 64051, 64051, 63441, 61921, 64663, 65473, 64906, 64169, 63776, 63905]
		}],
		tooltip: {
			fixed: {
				enabled: false
			},
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function(seriesName) {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	}
	var options2 = {
		chart: {
			type: 'line',
			width: '100%',
			height: 45,
			sparkline: {
				enabled: true
			}
		},
		stroke: {
			colors: '#5d61bf',
		},
		series: [{
			data: [51878, 52319, 52319, 53848, 52120, 53166, 53234, 52109, 52511, 52130, 51877]
		}],
		tooltip: {
			fixed: {
				enabled: false
			},
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function(seriesName) {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	}
	var options3 = {
		chart: {
			type: 'line',
			width:'100%',
			height: 45,
			sparkline: {
				enabled: true
			}
		},
		stroke: {
			colors: '#31c92e',
		},
		series: [{
			data: [32791, 32863, 33317, 33551, 32703, 33790, 33393, 33221, 33231, 33139, 33858]
		}],
		tooltip: {
			fixed: {
				enabled: false
			},
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function(seriesName) {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	}
	var options4 = {
		chart: {
			type: 'line',
			width: '100%',
			height: 45,
			sparkline: {
				enabled: true
			}
		},
		stroke: {
			colors: '#3ebaef',
		},
		series: [{
			data: [55789, 55841, 55992, 58575, 58260, 60775, 61574, 62680, 62505, 62431, 62987]
		}],
		tooltip: {
			fixed: {
				enabled: false
			},
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function(seriesName) {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	}
	var options5 = {
		chart: {
			type: 'line',
			width: '100%',
			height: 45,
			sparkline: {
				enabled: true
			}
		},
		stroke: {
			colors: '#f47b25',
		},
		series: [{
			data: [9035, 9681, 9125, 9731, 10741, 9672, 10092, 8558, 8623, 8870, 10325]
		}],
		tooltip: {
			fixed: {
				enabled: false
			},
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function(seriesName) {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	}
	var options6 = {
		chart: {
			type: 'line',
			width: '100%',
			height: 45,
			sparkline: {
				enabled: true
			}
		},
		stroke: {
			colors: '#5d61bf',
		},
		series: [{
			data: [3783, 3733, 3747, 3904, 3873, 3787, 3747, 3741, 3684, 3436, 3961]
		}],
		tooltip: {
			fixed: {
				enabled: false
			},
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function(seriesName) {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	}
	var options7 = {
		chart: {
			type: 'line',
			width:'100%',
			height: 45,
			sparkline: {
				enabled: true
			}
		},
		stroke: {
			colors: '#31c92e',
		},
		series: [{
			data: [4465, 4683, 4587, 4542, 4744, 4962, 4815, 4855, 5075, 4554, 4995]
		}],
		tooltip: {
			fixed: {
				enabled: false
			},
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function(seriesName) {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	}
	var options8 = {
		chart: {
			type: 'line',
			width: '100%',
			height: 45,
			sparkline: {
				enabled: true
			}
		},
		stroke: {
			colors: '#3ebaef',
		},
		series: [{
			data: [5199, 5194, 5164, 5375, 5324, 5085, 5373, 5271, 5057, 4923, 5374]
		}],
		tooltip: {
			fixed: {
				enabled: false
			},
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function(seriesName) {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	}
	var options9 = {
		chart: {
			type: 'line',
			width: '100%',
			height: 45,
			sparkline: {
				enabled: true
			}
		},
		stroke: {
			colors: '#5d61bf',
		},
		series: [{
			data: [7524, 9770, 10394, 10003, 10504, 10209, 9861, 9824, 10936, 11257, 10316]
		}],
		tooltip: {
			fixed: {
				enabled: false
			},
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function(seriesName) {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	}
	var options10 = {
		chart: {
			type: 'line',
			width:'100%',
			height: 45,
			sparkline: {
				enabled: true
			}
		},
		stroke: {
			colors: '#31c92e',
		},
		series: [{
			data: [18207, 19455, 21367, 22136, 22806, 21474, 20923, 21159, 21977, 20913, 19421]
		}],
		tooltip: {
			fixed: {
				enabled: false
			},
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function(seriesName) {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	}
	var options11 = {
		chart: {
			type: 'line',
			width: '100%',
			height: 45,
			sparkline: {
				enabled: true
			}
		},
		stroke: {
			colors: '#3ebaef',
		},
		series: [{
			data: [4385, 4651, 4086, 4271, 4253, 4711, 4575, 4588, 4633, 4847, 4538]
		}],
		tooltip: {
			fixed: {
				enabled: false
			},
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function(seriesName) {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	}
	var options12 = {
		chart: {
			type: 'line',
			width: '100%',
			height: 45,
			sparkline: {
				enabled: true
			}
		},
		stroke: {
			colors: '#3ebaef',
		},
		series: [{
			data: [13597, 10249, 11820, 12381, 13397, 13630, 13738, 13834, 13941, 13989, 13101]
		}],
		tooltip: {
			fixed: {
				enabled: false
			},
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function(seriesName) {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	}
	new ApexCharts(document.querySelector("#chart1"), options1).render();
	new ApexCharts(document.querySelector("#chart2"), options2).render();
	new ApexCharts(document.querySelector("#chart3"), options3).render();
	new ApexCharts(document.querySelector("#chart4"), options4).render();
	new ApexCharts(document.querySelector("#chart5"), options5).render();
	new ApexCharts(document.querySelector("#chart6"), options6).render();
	new ApexCharts(document.querySelector("#chart7"), options7).render();
	new ApexCharts(document.querySelector("#chart8"), options8).render();
	new ApexCharts(document.querySelector("#chart9"), options9).render();
	new ApexCharts(document.querySelector("#chart10"), options10).render();
	new ApexCharts(document.querySelector("#chart11"), options11).render();
	new ApexCharts(document.querySelector("#chart12"), options12).render();
	
	
	var bar = new Morris.Bar({
 		element: 'bar-chart',
 		resize: true,
 		data: [{
 			y: '一月',
 			a: 18888,
 			b: 19900
 		}, {
 			y: '二月',
 			a: 17732,
 			b: 18020
 		}, {
 			y: '三月',
 			a: 18900,
 			b: 17900
 		}, {
 			y: '四月',
 			a: 18924,
 			b: 19110
 		}, {
 			y: '五月',
 			a: 19320,
 			b: 18930
 		}, {
 			y: '六月',
 			a: 19830,
 			b: 19450
 		}, {
 			y: '七月',
 			a: 18235,
 			b: 19030
 		}],
 		barColors: ['#f47b25', '#5d61bf'],
 		xkey: 'y',
 		ykeys: ['a', 'b'],
 		labels: ['2018年', '2019年'],
 		hideHover: 'auto'
 	});
	/*----DonutChart----*/
	var donut = new Morris.Donut({
		element: 'sales-chart',
		resize: true,
		colors: ['#f47b25', '#5d61bf', '#3ebaef'],
		data: [{
			label: "2018",
			value: 126393
		}, {
			label: "2017",
			value: 133701
		}, {
			label: "2016",
			value: 117591
		}],
		hideHover: 'auto'
	});
	
});


