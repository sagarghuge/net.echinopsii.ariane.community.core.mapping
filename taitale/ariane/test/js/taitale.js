// ┌──────────────────────────────────────────────────────────────────────────────────────┐ \\
// │ Taitale 0.0.1   - JavaScript Taitale Library                                         │ \\
// │ Use Raphael.js                                                                       │ \\
// │ -------------------------------------------------------------------------------------│ \\
// │ Taitale - provide an infrastructure mapping graph engine                             │ \\
// │ Copyright (C) 2013  Mathilde Ffrench												  │ \\
// │ 																					  │ \\
// │ This program is free software: you can redistribute it and/or modify                 │ \\
// │ it under the terms of the GNU Affero General Public License as                       │ \\
// │ published by the Free Software Foundation, either version 3 of the                   │ \\
// │ License, or (at your option) any later version.									  │ \\
// │																					  │ \\
// │ This program is distributed in the hope that it will be useful,					  │ \\
// │ but WITHOUT ANY WARRANTY; without even the implied warranty of						  │ \\
// │ MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the						  │ \\
// │ GNU Affero General Public License for more details.								  │ \\
// │																					  │ \\
// │ You should have received a copy of the GNU Affero General Public License			  │ \\
// │ along with this program.  If not, see <http://www.gnu.org/licenses/>.				  │ \\
// └──────────────────────────────────────────────────────────────────────────────────────┘ \\

require.config({
    baseUrl: window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.split('/')[1],
    paths: {
        'jquery': 'js/jquery/jquery-1.9.1',
        'jquery-ui': 'js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom',
        'prime-ui': 'js/primeui/primeui-0.9.6',
        'rgbcolor': 'js/canvag/rgbcolor',
        'StackBlur': 'js/canvag/StackBlur',
        'canvg': 'js/canvag/canvg',
        'eve': 'js/raphael/eve',
        'raphael-core': 'js/raphael/raphael.core',
        'raphael-svg': 'js/raphael/raphael.svg',
        'raphael-vml': 'js/raphael/raphael.vml',
        'raphael': 'js/raphael/raphael.amd',
        'raphael-zpd': 'js/raphael/raphael.zpd',
        'raphael-svg-export': 'js/raphael/raphael.svg.export',
        /*taitale tools*/
        'taitale-cylinder': 'js/taitale/tools/cylinder',
        'taitale-dictionaries': 'js/taitale/tools/dictionaries',
        'taitale-ext-string': 'js/taitale/tools/ext.string',
        'taitale-ext-raphael': 'js/taitale/tools/ext.raphael',
        'taitale-helper': 'js/taitale/tools/helper',
        'taitale-matrix': 'js/taitale/tools/matrix',
        'taitale-loader': 'js/taitale/tools/loader',
        'taitale-params': 'js/taitale/tools/params',
        'taitale-prototypes': 'js/taitale/tools/prototypes',
        /*taitale core*/
        'taitale-map-options': 'js/taitale/core/map/options',
        'taitale-map-matrix': 'js/taitale/core/map/matrix',
        'taitale-map': 'js/taitale/core/map/map',
        'taitale-container-matrix': 'js/taitale/core/container/matrix',
        'taitale-container-hat': 'js/taitale/core/container/hat',
        'taitale-container': 'js/taitale/core/container/container',
        'taitale-node-matrix': 'js/taitale/core/node/matrix',
        'taitale-node': 'js/taitale/core/node/node',
        'taitale-endpoint': 'js/taitale/core/endpoint',
        'taitale-transport': 'js/taitale/core/transport/transport',
        'taitale-transport-multicastbus': 'js/taitale/core/transport/multicastBus',
        'taitale-link': 'js/taitale/core/link',
        /*taitale tree layout*/
        'taitale-tree': 'js/taitale/layout/tree/tree',
        'taitale-vertex': 'js/taitale/layout/tree/vertex',
        /*taitale network layout*/
        'taitale-map-splitter': 'js/taitale/layout/network/mapSplitter',
        'taitale-layoutntw-registries' : 'js/taitale/layout/network/registries',
        'taitale-datacenter': 'js/taitale/layout/network/datacenter/datacenter',
        'taitale-datacenter-splitter': 'js/taitale/layout/network/datacenter/dcSplitter',
        'taitale-datacenter-hat': 'js/taitale/layout/network/datacenter/hat',
        'taitale-datacenter-matrix': 'js/taitale/layout/network/datacenter/matrix',
        'taitale-area': 'js/taitale/layout/network/area/area',
        'taitale-area-hat': 'js/taitale/layout/network/area/hat',
        'taitale-area-matrix': 'js/taitale/layout/network/area/matrix',
        'taitale-lan': 'js/taitale/layout/network/lan/lan',
        'taitale-lan-matrix': 'js/taitale/layout/network/lan/matrix',
        'taitale-lan-hat': 'js/taitale/layout/network/lan/hat'
    },
    shim: {
        "jquery-ui": {
            exports: "$",
            deps: ['jquery']
        },
        "prime-ui": {
            exports: "$",
            deps: ['jquery','jquery-ui']
        },
        "canvg": {
            exports: "canvg",
            deps: ['rgbcolor', 'StackBlur']
        }
    }
});

requirejs (
    [
        'prime-ui',
        'canvg',
        'taitale-helper',
        'taitale-loader',
        'taitale-dictionaries',
        'taitale-map-options'
    ],
    function ($,canvg,helper,loader,dictionaries,mapOptions) {

        var loader_   = new loader(),
            dic       = new dictionaries(),
            options   = new mapOptions(),
            helper_   = new helper(),
            homeURI   = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.split('/')[1];

        helper_.initGrowlMsgs('#mapGrowl');

        var test = $('#test'),
            layout = $('#layout'),
            mode = $('#mode'),
            notifyI = $('#notifyInfo'),
            notifyW = $('#notifyWarn'),
            notifyE = $('#notifyErrs'),
            reload = $('#reload'),
            nsize = $('#nsize'),
            center = $('#center'),
            details = $('#details'),
            JPG = $('#JPG'),
            PNG = $('#PNG'),
            SVG = $('#SVG'),
            mapExport = $('#mapExport'),
            imgExport = $('#imgExport'),
            displayDC = $("#displayDC"),
            displayArea = $("#displayArea"),
            displayLan = $("#displayLan"),
            rootTreeSorting = $('#rootTreeSorting'),
            subTreesSorting = $('#subTreesSorting');

        test.change([loader_, dic], function(){
            options.setURI(homeURI + "/js/taitale.samples/json/sample.taitale.input."+test.val()+".json");
            try {
                loader_.reloadMap(options);
                loader_.editionMode(options);
            } catch (e) {
                helper_.addMsgToGrowl(e);
                helper_.growlMsgs(
                    {
                        severity: 'error',
                        summary: 'Failed to load map',
                        detail: 'Name: '+test.val()+'<br>Layout: '+options.getLayout()+"<br>Mode: "+options.getMode(),
                        sticky: true
                    }
                );
                console.log(e.stack);
            }
        });

        layout.change([loader_, dic], function() {
            options.setLayout(layout.val());
            try {
                if (options.getLayout()===dic.mapLayout.NTWWW) {
                    document.getElementById('networkOptions').style.display = "";
                    document.getElementById('treeOptions').style.display    = "none";
                } else if (options.getLayout()===dic.mapLayout.TREE) {
                    document.getElementById('networkOptions').style.display = "none";
                    document.getElementById('treeOptions').style.display    = "";
                } else {
                    document.getElementById('networkOptions').style.display = "none";
                    document.getElementById('treeOptions').style.display    = "none";
                }
                loader_.rebuildMap(options);
                loader_.editionMode(options);
                loader_.displayDC(displayDC[0].checked);
                loader_.displayArea(displayArea[0].checked);
                loader_.displayLan(displayLan[0].checked);
            } catch (e) {
                helper_.addMsgToGrowl(e);
                helper_.growlMsgs(
                    {
                        severity: 'error',
                        summary: 'Failed to load map',
                        detail: 'Name: '+test.val()+'<br>Layout: '+options.getLayout()+"<br>Mode: "+options.getMode(),
                        sticky: true
                    }
                );
                console.log(e.stack);
            }
        });

        mode.change([loader_, dic], function() {
            options.setMode(mode.val());
            try {
                loader_.editionMode(options);
            } catch (e) {
                helper_.addMsgToGrowl(e);
                helper_.growlMsgs(
                    {
                        severity: 'error',
                        summary: 'Failed to refresh map',
                        detail: 'Name: '+test.val()+'<br>Layout: '+options.getLayout()+"<br>Mode: "+options.getMode(),
                        sticky: true
                    }
                );
                console.log(e.stack);
            }
        });

        notifyI.change(function() {
            helper_.setNotifyInfo(notifyI[0].checked);
        });

        notifyW.change(function() {
            helper_.setNotifyWarn(notifyW[0].checked);
        });

        notifyE.change(function() {
            helper_.setNotifyErrs(notifyE[0].checked);
        });

        nsize.click([loader_, dic], function() {
            try {
                loader_.normalSize();
            } catch (e) {
                helper_.addMsgToGrowl(e);
                helper_.growlMsgs(
                    {
                        severity: 'error',
                        summary: 'Failed to center map',
                        detail: 'Check the console log to know more...',
                        sticky: true
                    }
                );
                console.log(e.stack);
            }
        });

        center.click([loader_, dic], function() {
            try {
                loader_.centerMappy();
            } catch (e) {
                helper_.addMsgToGrowl(e);
                helper_.growlMsgs(
                    {
                        severity: 'error',
                        summary: 'Failed to center map',
                        detail: 'Check the console log to know more...',
                        sticky: true
                    }
                );
                console.log(e.stack);
            }
        });

        details.click([loader_,dic], function() {
            $('#mapObjectDetails').puidialog('show');
        });

        reload.click([loader_, dic], function() {
            try {
                loader_.reloadMap(options);
                loader_.editionMode(options);
            } catch (e) {
                helper_.addMsgToGrowl(e);
                helper_.growlMsgs(
                    {
                        severity: 'error',
                        summary: 'Failed to reload map',
                        detail: 'Check the console log to know more...',
                        sticky: true
                    }
                );
                console.log(e.stack);
            }
        });

        mapExport.puidialog({
            showEffect: 'fade',
            hideEffect: 'fade',
            width: 1000,
            height:800
        });

        JPG.click([loader_, dic], function() {
            try {
                var svg          = loader_.exportToSVG(),
                    exportCanvas = '<canvas id="exportCanvas" title="jpgMap"></canvas>';
                imgExport.empty();
                imgExport.append(exportCanvas);
                canvg('exportCanvas', svg);
                document.getElementById("exportCanvas").toDataURL("image/jpeg", 1.0);
                mapExport.puidialog('show');
            } catch (e) {
                helper_.addMsgToGrowl(e);
                helper_.growlMsgs(
                    {
                        severity: 'error',
                        summary: 'Failed to export map to PNG',
                        detail: 'Check the console log to know more...',
                        sticky: true
                    }
                );
                console.log(e.stack);
            }
        });

        PNG.click([loader_, dic], function() {
            try {
                var svg    = loader_.exportToSVG(),
                    imgsrc = "data:image/svg+xml," + encodeURIComponent(svg),
                    img    = '<canvas id="exportPngCanvas" title="pngMap"></canvas>';
                imgExport.empty();
                imgExport.append(img);
                canvg('exportPngCanvas', svg);
                document.getElementById("exportPngCanvas").toDataURL("image/png");
                mapExport.puidialog('show');
                //open(imgsrc);
            } catch (e) {
                helper_.addMsgToGrowl(e);
                helper_.growlMsgs(
                    {
                        severity: 'error',
                        summary: 'Failed to export map to PNG',
                        detail: 'Check the console log to know more...',
                        sticky: true
                    }
                );
                console.log(e.stack);
            }
        });

        SVG.click([loader_, dic], function() {
            try {
                var svg    = loader_.exportToSVG(),
                    imgsrc = "data:image/svg+xml," + encodeURIComponent(svg),
                    img    = '<img src="'+imgsrc+'" title="svgMap">';
                imgExport.empty();
                imgExport.append(img);
                mapExport.puidialog('show');
                //open(imgsrc);
            } catch (e) {
                helper_.addMsgToGrowl(e);
                helper_.growlMsgs(
                    {
                        severity: 'error',
                        summary: 'Failed to export map to SVG',
                        detail: 'Check the console log to know more...',
                        sticky: true
                    }
                );
                console.log(e.stack);
            }
        });

        displayDC.change([loader_, dic], function() {
            try {
                options.displayDC = displayDC[0].checked;
                loader_.displayDC(options.displayDC);
            } catch (e) {
                helper_.addMsgToGrowl(e);
                helper_.growlMsgs(
                    {
                        severity: 'error',
                        summary: 'Failed to display/hide DCs',
                        detail: 'Check the console log to know more...',
                        sticky: true
                    }
                );
                console.log(e.stack);
            }
        });

        displayArea.change([loader_, dic], function() {
            try {
                options.displayAREA = displayArea[0].checked;
                loader_.displayArea(options.displayAREA);
            } catch (e) {
                helper_.addMsgToGrowl(e);
                helper_.growlMsgs(
                    {
                        severity: 'error',
                        summary: 'Failed to display/hide Areas',
                        detail: 'Check the console log to know more...',
                        sticky: true
                    }
                );
                console.log(e.stack);
            }
        });

        displayLan.change([loader_, dic], function() {
            try {
                options.displayLAN = displayLan[0].checked;
                loader_.displayLan(options.displayLAN);
            } catch (e) {
                helper_.addMsgToGrowl(e);
                helper_.growlMsgs(
                    {
                        severity: 'error',
                        summary: 'Failed to display/hide Lans',
                        detail: 'Check the console log to know more...',
                        sticky: true
                    }
                );
                console.log(e.stack);
            }
        });

        rootTreeSorting.change([loader_, dic], function() {
            try {
                options.setRootTreeSorting(rootTreeSorting.val());
                loader_.sortRootTree(rootTreeSorting.val());
                loader_.rebuildMapTreeLayout();
                loader_.refreshMap(options);
                loader_.editionMode(options);
            } catch (e) {
                helper_.addMsgToGrowl(e);
                helper_.growlMsgs(
                    {
                        severity: 'error',
                        summary: 'Failed refresh tree map with selected sub tree sorting',
                        detail: 'Check the console log to know more...',
                        sticky: true
                    }
                );
                console.log(e.stack);
            }
        });

        subTreesSorting.change([loader_, dic], function() {
            try {
                options.setSubTreesSorting(subTreesSorting.val());
                loader_.sortSubTrees(options.getSubTreesSorting());
                loader_.rebuildMapTreeLayout();
                loader_.refreshMap(options);
                loader_.editionMode(options);
            } catch (e) {
                helper_.addMsgToGrowl(e);
                helper_.growlMsgs(
                    {
                        severity: 'error',
                        summary: 'Failed refresh tree map with selected sub tree sorting',
                        detail: 'Check the console log to know more...',
                        sticky: true
                    }
                );
                console.log(e.stack);
            }
        });

        try {
            notifyI[0].checked=helper_.getNotifyInfo();
            notifyW[0].checked=helper_.getNotifyWarn();
            notifyE[0].checked=helper_.getNotifyErrs();

            options.setLayout(layout.val());
            options.setMode(mode.val());
            options.setURI(homeURI + "/js/taitale.samples/json/sample.taitale.input."+test.val()+".json");
            if (options.getLayout()===dic.mapLayout.NTWWW) {
                document.getElementById('networkOptions').style.display = "";
                document.getElementById('treeOptions').style.display    = "none";
            } else if (options.getLayout()===dic.mapLayout.TREE) {
                document.getElementById('networkOptions').style.display = "none";
                document.getElementById('treeOptions').style.display    = "";
            } else {
                document.getElementById('networkOptions').style.display = "none";
                document.getElementById('treeOptions').style.display    = "none";
            }
            loader_.loadMap(options);
            loader_.editionMode(options);
        } catch (e) {
            helper_.addMsgToGrowl(e);
            helper_.growlMsgs(
                {
                    severity: 'error',
                    summary: 'Failed to load map',
                    detail: 'Name: '+test.val()+'<br>Layout: '+options.getLayout()+"<br>Mode: "+options.getMode(),
                    sticky: true
                });
            console.log(e.stack);
        }
    });