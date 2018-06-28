

var jsontxt = document.getElementById("jsontext").textContent;
//var map = JSON.parse(jsontxt);
// サンプルデータ
var treeData =
    {
        "name": "Level 0",
        "children": [
            {
                "name": "Level 1-1",
                "children": [
                    { "name": "Level 2-1" },
                    { "name": "Level 2-2" }
                ]
            },
            { "name": "Level 1-2" }
        ]
    };

// SVGの描画領域を設定
var margin = {top: 40, right: 90, bottom: 50, left: 90},
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Treeレイアウト
var treemap = d3.tree()
    .size([width, height]);

// 階層データの前処理
var rootNode = d3.hierarchy(treeData);

// ノード描画用のデータ
var nodes = treemap(rootNode);

// ノード間を結ぶパス描画用のデータ
var links = nodes.links();

// SVG描画領域を設定
var svg = d3.select("#myGraph")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// ノードを描画
svg.selectAll("circle")
    .data(nodes.descendants())
    .enter()
    .append("circle")
    .attr("class","node")
    .attr("cx", function(d){
        return d.x;
    })
    .attr("cy", function(d){
        return d.y;
    })
    .attr("r", 10);

// 直線を引くための関数を定義
var fncLine = d3.line()
    .x(function(d) {return d.x;})
    .y(function(d) {return d.y;});

// ノード間を結ぶパスを描画
svg.selectAll("path")
    .data(links)
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", function(d) {
        return fncLine([d.source, d.target]);
    });
