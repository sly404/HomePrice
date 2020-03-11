//creMap
(function($){

    var cre_map = null;

    L.TileLayer.BetterWMS = L.TileLayer.BetterWMS.extend({

        onAdd: function (map) {
            L.TileLayer.WMS.prototype.onAdd.call(this, map);
            map.on('click', this._onAdd, this);
        },

        _onAdd: function(e) {
            if (cre_map.isCommunityLevel()) {
                this.getFeatureInfo(e)
            }
        },

        onRemove: function (map) {
            L.TileLayer.WMS.prototype.onRemove.call(this, map);
            map.off('click', this._onAdd, this);
        },

        showGetFeatureInfo: function(err, latlng, content) {
            // do nothing if there's an error
            if (err) { console.log(err); return; }
            // Otherwise show the content in a popup,
            // or something.
            cre_map.getFeatureCallback(latlng, content);
        }
    })

    function creMap() {

        //layer url
        this.tiandituLayerUrl =
            "http://t0.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}";
        this.bgLayerUrl =
            'http://onemap.cityre.cn/geoserver/gwc/service/wms';
        this.marketUrl =
            '/onemap/ajaxMarket.html';
        this.codeUrl =
            '/default/ajaxCode.html';

        this.mapParams = {
            maplevel:5,
            lat:333,
            lng:333,level:5,
            ptype: defaultProptype,
            flag:defaultFlag
        };

        this.flagMap = {
            1: "sale",
            2: "rent",
            3: "new",
        };

        this.abMap = {
            1: "price",
            2: "like",
            3: "link",
        };

        this.areaAjaxHandle = null;
        this.marketAjaxHandle = null;

        this.communityInfo = null;
        this.latlng = null; //{lat :'', lng:''}

        this.haMaker = null;
        this.closeMaker = null;
        this.haCircle = null;
        this.haPupup = null;

        this.closeMakerClick = false;

        this._map = null;
        this._tianditu = null;
        this._bgLayer = null;
        this._districts = null;
        this._communityPop = null;
    }

    $.extend(creMap.prototype, {

        //地图尺寸调整
        resetMapSize: function(){
        },

        createMap: function() {

            this.resetMapSize();

            this._tianditu = L.tileLayer(this.tiandituLayerUrl, {
                maxZoom: 18,
                attribution: 'One Map'
            });
            this._map = new L.Map('map2017', {
                center: new L.LatLng(36.0611, 120.8343),
                minZoom:4,
                maxZoom:17,
                zoom: 4,
                attributionControl: false,
                layers:[this._tianditu],
                zoomControl:false
            });

            //加载背景图层
            this._bgLayer = L.tileLayer.wms(this.bgLayerUrl, {
                layers:"onemap:lg_geom_bg",
                format: "image/png",
                transparent: "true",
                opacity:0.8
            }).addTo(this._map);

            var starttime = this.getPreMonthDate();
            this._districts = L.tileLayer.betterWms(this.bgLayerUrl, {
                layers:'lg_11_sale_price',
                format:'image/png',
                transparent:true,
                time:starttime
            }).addTo(this._map);

		    $("#datashowbox").on("click dblclick",function(e){
                e.stopPropagation();
            })
		    $("#contentBox").on("click dblclick",function(e){
                e.stopPropagation();
            })
        },

        getPreMonthDate: function() {
            var nowdays = new Date();
            var nowyear = nowdays.getFullYear();
            var nowmonth = nowdays.getMonth();
            var nowday='01';
            if(nowmonth==0) {
                nowmonth=12;
                nowyear=nowyear-1;
            }
            nowyear=nowyear<10?'0'+nowyear:nowyear;
            nowmonth=nowmonth<10?'0'+nowmonth:nowmonth;
            return nowyear+'-'+nowmonth+'-'+nowday;
        },


        onZoom: function() {
            var self = this;
            this._map.on('zoomend',function(e){
                console.log(self._map.getZoom());
                self.setLevel();
                self.setParams();
                //新楼盘下缩放到小区直接跳转二手房
                if(self.mapParams.maplevel >= 14 &&
                        self.mapParams.flag == 3){
                    $('.js-flag .js-title').attr("data-code",'1').html('二手房');
                    self.renderPage();
                }
            })
        },

        onMapClick: function() {
            var self = this;
            this._map.on('click', function(e) {
                self.latlng = e.latlng;
                self.mapParams.lat = e.latlng.lat;
                self.mapParams.lng = e.latlng.lng;
                self.mapParams.maplevel = self._map.getZoom();
                //平滑移动到点击点

                if (!self.closeMakerClick) {
                    self._map.panTo(self.latlng);
                }
                if (self.mapParams.maplevel <14) {
                    self.ajaxRequsetCode();
                    self.setLevel();

                    if (self.mapParams.level == 5) {
                        if(self.mapParams.provcode=='beijing' ||
                                    self.mapParams.provcode=='tianjin' ||
                                    self.mapParams.provcode=='shanghai' ||
                                    self.mapParams.provcode=='chongqing') {
                            window.location.href = 'http://'+self.mapParams.citycode+
                                '.cityhouse.cn';
                        }
                    } else if (self.mapParams.level == 4) {
                        window.location.href = 'http://'+self.mapParams.citycode+
                            '.cityhouse.cn';
                    } else if (self.mapParams.level >= 2 && self.mapParams.level <= 3) {
                        window.location.href = 'http://'+self.mapParams.citycode+
                            ".cityhouse.cn?dist="+self.mapParams.distcode;
                    }
                }
            });
        },

        changeWms: function(){
            var p = this.mapParams;
            var timenum = this.getDate(p);
            var titleSeg = [
                "lg",
                p.ptype,
                this.flagMap[p.flag],
                this.abMap[p.ab]
            ];
            var type = titleSeg.join("_");
            this.filterwms(type, timenum, p.maplevel);
        },

        filterwms: function(title, times, maplevel){
            this.removeAllMaker();
            this._map.removeLayer(this._districts);
            this._districts = L.tileLayer.betterWms(this.bgLayerUrl,{
                layers:title,
                format:'image/png',
                transparent:true,
                time:times
            }).addTo(this._map);
        },

        getDate: function(p) {
            var datetime = new Date();
            //获取完整的年份(4位,1970)
            var nowyear=datetime.getFullYear();
            //获取月份(0-11,0代表1月,用的时候记得加上1)
            var nowmonth=datetime.getMonth()+1;
            var year = p.y || nowyear;
            var month = p.m || nowmonth -1;
            if(month == 0){
                year = year - 1;
                month = 12;
            }

            if(month<=9 && month>0){
                month="0"+month;
            }

            return year+'-'+month+'-01';
        },

        setParams: function() {
            this.mapParams['ptype'] = $(".js-ptype .js-title").
                attr("data-code");

            this.mapParams['flag'] = $(".js-flag .js-title").
                attr("data-code");

            this.mapParams['ab'] = $(".js-ab .js-title").
                attr("data-code");

            var date = this.getPreMonthDate().split('-');

            this.mapParams['y'] = date[0];
            this.mapParams['m'] = date[1];

            this.mapParams.maplevel = this._map.getZoom();
        },

        setLevel: function() {
            var self = this;
            if(self.mapParams.maplevel >=4 &&
                    self.mapParams.maplevel<=6){
                self.mapParams.level = 5;
            }else if(self.mapParams.maplevel >=7 &&
                    self.mapParams.maplevel<=8){
                self.mapParams.level = 4;
            }else if(self.mapParams.maplevel >=9 &&
                    self.mapParams.maplevel<=10){
                self.mapParams.level = 3;
            } else if (self.mapParams.maplevel >= 11 &&
                    self.mapParams.maplevel <=14) {
                self.mapParams.level = 2;
            } else {
                self.mapParams.level = 1;
            }
            //直辖市特殊处理
            if((self.mapParams.provcode=='beijing' ||
                        self.mapParams.provcode=='tianjin' ||
                        self.mapParams.provcode=='shanghai' ||
                        self.mapParams.provcode=='chongqing')
                    && self.mapParams.level==4)
            self.mapParams.level = 3;
        },

        getFeatureCallback: function(latlng, content) {
            var self = this;

            self.latlng = latlng;
            self.communityInfo = null;
            if (self.mapParams.maplevel < 14) {
                return;
            }

            if(content.features[0].id){
                var communityFeature = content.features[0];
                var communityInfo = communityFeature.properties;
                var hacode = communityInfo.ha_code;
                var hainfo = {'haname':communityInfo.name,
                    'haprice':communityInfo.salecalpri,
                    'harent':communityInfo.rentcalpri,
                    'hacode':hacode,
                    'imgurl':communityInfo.imgurl};

                if(hainfo.haprice != null && hainfo.haprice!=0){
                    hainfo.haprice = this.formatCurrency(hainfo.haprice);
                }else{
                    hainfo.haprice = '--';
                }

                if(hainfo.harent!=null && hainfo.harent!=0 &&
                        parseInt(hainfo.harent)!=0){
                    hainfo.harent = hainfo.harent.toFixed(2);
                }else{
                    hainfo.harent = '--';
                }
                if(communityInfo.sdaterange>1){
                    hainfo.haprice = '--';
                    hainfo.harent = '--';
                }
                var imgObjsrc = hainfo.imgurl;
                var suffix = hainfo.imgurl.split('.').
                    pop().toLowerCase();
                if (!hainfo.imgurl ||
                        ($.inArray(suffix,
                        ['jpg', 'jpeg', 'gif', 'png']) == -1)) {
                    hainfo.imgurl =
                        '/js/leaflet/images/no_img.png';
                }
                this.communityInfo = hainfo;
            }

            if (self.mapParams.maplevel >= 14) {
                if (self.communityInfo) {
                    self.communityHandle();
                } else {
                    self.communityAroundHandle();
                }
            }
        },

        communityHandle: function() {
            if(this.mapParams.maplevel < 14){
                return;
            }
            this.haAjaxData(false);
            this.makePopup();//弹出popup
        },

        //点击小区弹出小区详情pop
        makePopup: function() {
            var self = this;
            this.removeAllMaker();
            if(self._map.getZoom() >= 14){
                if(self.haPupup &&
                        self._map.hasLayer(self.haPupup)){
                    self._map.removeLayer(self.haPupup);
                }
                if (self.mapParams.ptype != 11 &&
                        self.communityInfo.harent!='--') {
                    self.communityInfo.harent =
                        (self.communityInfo.harent/30).toFixed(2);
                }
                var tplParams = Object.assign(self.communityInfo,{
                    'citycode': self.mapParams.citycode
                });
                var tpl = _.template($("#rightPanelTpl").html())
                    ({hainfo: tplParams});
                self.haPupup =  L.popup().setLatLng(self.latlng).
                    setContent(tpl);
                self._map.addLayer(self.haPupup);
            }
        },

        //小区周围请求模块
        communityAroundHandle: function() {
            this.removeAllMaker();

            this.makeMaker();//打点
            this.makeCircle();//画圈
            this.makeCloseMaker();
            this.haAjaxData(true);

        },

        formatCurrency: function(num) {
            num = num.toString().replace(/\$|\,/g,'');
            if(isNaN(num))
                num = "0";
            sign = (num == (num = Math.abs(num)));
            num = Math.floor(num*100+0.50000000001);
            num = Math.round(num/100).toString();

            for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
                num = num.substring(0,num.length-(4*i+3))+','+
                    num.substring(num.length-(4*i+3));
            return (((sign)?'':'-') + num);
        },

        //小区级别获取数据
        haAjaxData: function(isArround) {
            var self = this;
            self.mapParams.level = 1;
            self.mapParams.lat = self.latlng.lat;
            self.mapParams.lng = self.latlng.lng;
            if(!isArround){
                self.mapParams.hacode = self.communityInfo.hacode;
                self.mapParams.haAround = 2;
            }else{
                self.mapParams.haAround = 1;
            }
            self.ajaxRequsetCode(self.mapParams);
        },

        //行政区市级省请求函数
        ajaxRequsetCode: function(){

            layer.load(0);
            var self = this;
            if (self.areaAjaxHandle) {
                self.areaAjaxHandle.abort();
            }
            self.areaAjaxHandle = $.ajax({
                url:self.codeUrl,
                type:'GET',
                async:false,
                data:{lon: self.mapParams.lng,
                    lat: self.mapParams.lat},
                dataType:'json',
                success:function(data){

                    if(data.success != 1){
                        self.emsg("无数据");
                        return false;
                    }else{
                        self.mapParams = Object.assign(
                                self.mapParams, data.code);
                        layer.closeAll();
                    }
                    self.areaAjaxHandle = null;
                },
                error:function(xhr,textStatus){
                    self.emsg("无数据！"); return false;
                }
            })
        },

        emsg: function(msg) {
            layer.msg(msg);
            setTimeout(function(){
                layer.closeAll();
            },500)
        },

        //打点弹出marker
        makeMaker: function() {
            this.haMaker = L.marker(this.latlng,
                    this.getMyIcon().redicon);
            this._map.addLayer(this.haMaker);
        },

        //打点弹出marker
        makeCloseMaker: function() {
            this.closeMaker = L.marker(this.latlng,
                    this.getMyIcon().divCloseIcon);
            this._map.addLayer(this.closeMaker);
        },

        //画圈圈出非小区周围相应数字半径
        makeCircle: function() {
            this.haCircle =  L.circle(this.latlng, 1000, {
                        color: '#0578fa',
                        fillColor: '#6e9ace',
                        fillOpacity: 0.3
                    }).addTo(this._map);
            this._map.addLayer(this.haCircle);
        },

        onCloseMarker: function(){
            var self = this;
            $('#map2017').on('click dblclick', '.hide_around',
                    function(e){
                self.closeMakerClick = true;
                e.preventDefault();
                e.stopPropagation();
                self.removeAllMaker();
            })
        },

        removeAllMaker: function() {
            var self = this;
            if(this.haMaker &&
                    this._map.hasLayer(this.haMaker)){
                this._map.removeLayer(this.haMaker);
            }
            if(this.closeMaker &&
                    this._map.hasLayer(this.closeMaker)){
                this._map.removeLayer(this.closeMaker);
            }
            if(this.haCircle &&
                    this._map.hasLayer(this.haCircle)){
                this._map.removeLayer(this.haCircle);
            }
        },

        //自定义图标
        getMyIcon: function() {
            return {
                orangeicon: {
                    icon: L.icon({
                        iconUrl: '/js/leaflet/images/marker-chen-icon.png',
                        shadowUrl: '/js/leaflet/images/marker-shadow.png',
                        iconAnchor: [10, 41],
                        popupAnchor: [5, -40]
                    })
                },
                greenicon: {
                    icon: L.icon({
                        iconUrl: '/js/leaflet/images/marker-chen-icon-green.png',
                        shadowUrl: '/js/leaflet/images/marker-shadow.png',
                        iconAnchor: [10, 41],
                        popupAnchor: [5, -40]
                    })
                },
                redicon: {
                    icon: L.icon({
                        iconUrl: '/js/leaflet/images/marker-chen-icon-red.png',
                        shadowUrl: '/js/leaflet/images/marker-shadow.png',
                        iconAnchor: [10, 41],
                        popupAnchor: [5, -40]
                    })
                },
                divCloseIcon:{
                    icon: L.divIcon({
                        html:"隐藏",
                        className:'hide_around',
                        iconAnchor: [-8, 16],
                        popupAnchor: [5, -40]
                    })
                },
            };
        },

        isCommunityLevel: function() {
            if (this.closeMakerClick) {
                this.closeMakerClick = false;
                return;
            }
            if(this._map.getZoom()>=14 &&
                this._map.getZoom()<=17){
                return true;
            }
        },

        renderPage: function() {
            this.setParams();
            this.changeWms();
        },

        main: function() {

            this.onCloseMarker();
            this.createMap();
            this.onZoom();
            this.onMapClick();
        }

    })

    cre_map = new creMap();
    $(function(){
        cre_map.main();
    })



})($)
