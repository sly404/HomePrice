$(function () {

    var area2 = new Chartist.Line('#chartArea2', {
        labels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        series: [
            [cityPrice1['一月'], cityPrice1['二月'], cityPrice1['三月'], cityPrice1['四月'], cityPrice1['五月'], cityPrice1['六月'], cityPrice1['七月'], cityPrice1['八月'], cityPrice1['九月'], cityPrice1['十月'], cityPrice1['十一月'], cityPrice1['十二月']],
            [cityPrice2['一月'], cityPrice2['二月'], cityPrice2['三月'], cityPrice2['四月'], cityPrice2['五月'], cityPrice2['六月'], cityPrice2['七月'], cityPrice2['八月'], cityPrice2['九月'], cityPrice2['十月'], cityPrice2['十一月'], cityPrice2['十二月']]
        ]
    }, {
        plugins: [
            Chartist.plugins.tooltip()
        ]
    }, {
        high: 30,
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
})