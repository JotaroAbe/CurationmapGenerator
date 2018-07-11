

var jsontxt = document.getElementById("jsontext").textContent;
var map = JSON.parse(jsontxt);


map.documents.sort(function (a,b) {
        return (a.hub > b.hub) ? -1 : 1;
    }

);

var topDoc = map.documents[1];
var treeData= {
    name:topDoc.url,
    children:[]

};

for(var frag of topDoc.fragments){
    var links = [];
    for(var link of frag.links){
        links.push({"name" : link.destText});
    }
    treeData.children.push({
        "name" : frag.text,
        "children":links
    });
}
console.log(map);
console.log(treeData);


// 3. 描画用のデータ変換
root = d3.hierarchy(treeData);

var tree = d3.tree()
    .nodeSize([30, 500]);


tree(root);

// 4. svg要素の配置
g = d3.select("svg").append("g").attr("transform", "translate(80,3000)");
var link = g.selectAll(".link")
    .data(root.descendants().slice(treeData.children.length + 1))
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", function(d) {
        return "M" + d.y + "," + d.x +
            "C" + (d.parent.y + 100) + "," + d.x +
            " " + (d.parent.y + 100) + "," + d.parent.x +
            " " + d.parent.y + "," + d.parent.x;
    });

var node = g.selectAll(".node")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

node.append("circle")
    .attr("r", 8)
    .attr("fill", "#999");

node.append("text")
    .attr("dy", 3)
    .attr("x", function(d) { return d.children ? -12 : 12; })
    .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
    .attr("font-size", "100%")
    .text(function(d) { return d.data.name; });