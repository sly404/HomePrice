$(function () {
  	var area1 = new Chartist.Line('#predictchart', {
		labels: [1, 4, 6, 8, 10, 12, 14, 8, 9, 10, 11, 12],
		series: [
			[6, 3, 2, 3, 4, 8, 6, 2, 7, 5, 3,12]
		]
	}, {
		plugins: [
			Chartist.plugins.tooltip()
		]
	}, {
		high: 40,
		low: 0,
		axisY: {
			onlyInteger: true
		},
		showArea: true,
		fullWidth: true,
		chartPadding: {
			bottom: 0,
			left: 0
		}
	});
});