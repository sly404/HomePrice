$(function () {
    // alert("predict js");
    // alert(predictdata['2019.7(预测)']);
    var area2 = new Chartist.Line('#predictchart', {
        labels: ["2018.7", "2018.8", "2018.9", "2018.10", "2018.11", "2018.12", "2019.1","2019.2","2019.3","2019.4","2019.5","2019.6","2019.7(预测)"],
        series: [
          [predictdata['2018.7'], predictdata['2018.8'], predictdata['2018.9'], predictdata['2018.10'], predictdata['2018.11'], predictdata['2018.12'],predictdata['2019.1'],predictdata['2019.2'],predictdata['2019.3'],predictdata['2019.4'],predictdata['2019.5'],predictdata['2019.6'],predictdata['2019.7(预测)']]
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