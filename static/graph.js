// ------ Global Variables ------ //
let gData = null;
let gModel = null;
let G = null;

// ====== Graph Settings =======  //
let gContainer = null;
let gWidth = 600;
let gHeight = 700;
let nodeSize = 0.35;
let setNodeId = false;
let gDebug = false;


function isValidUrl(string) {
    try {
      new URL(string);
    } catch (_) {
      return false;  
    }
  
    return true;
}

function button_callback(){
    let url = document.getElementById("url_p");
    console.log('Button callback!!')
    if (isValidUrl(url.value)){
        
        console.log('Before AJAX!');
        $.ajax({
            url: "/json",
            type: "get",
            data: {jsdata: url.value},
            success: function(response) {
                gData = null;
                manipulateData(response);
            },
            error: function(xhr) {
                //Do Something to handle error
                console.log('Error happened in AJAX call!');
            }
        });
    }
    else{
        console.log(url.value + " is not valid!");
    }    
}  


function manipulateData(data){

    if (data == null){
        return;
    }

    // create node dictionary
    let ndict = {};
    data.nodes.forEach(function(node, index){
        ndict[node.id] = index;
    });

    // Make links
    let links = data.links.map(function(link){
        src = ndict[link.source];
        target = ndict[link.target];
        return {"source" : src, "target" : target}
    });

    let model = {
        nodes: [],
        edges: []
    };

    data.nodes.forEach(function(node, n) {
        model.nodes.push({
        group: ( ('label' in node) ? node.label : 1),
        label: ( (setNodeId) ? node.id : null )
        });

    });

    links.forEach(function(link) {
        let fromIndex = link.source;
        let toIndex = link.target;

        model.edges.push({
        from: fromIndex,
        to: toIndex
        });
    });

    // =set model globally=
    gModel = model;
    
    // get radio buttons from UI
    var rd1=document.getElementById("rd1");
    var rd2=document.getElementById("rd2");
    var rd3=document.getElementById("rd3");
    var rd4=document.getElementById("rd4");

    // set container
    gContainer = document.getElementById("container-1");

    // set data globally
    gData = data;

    // check radio buttons and render graph
    if(rd1.checked==true){ render_graph(ElGrapho.layouts.ForceDirected); }
    else if(rd2.checked==true){ render_graph(ElGrapho.layouts.Tree); }
    else if(rd3.checked==true){ render_graph(ElGrapho.layouts.RadialTree); }
    else if(rd4.checked==true){ render_graph(ElGrapho.layouts.Cluster); }
    
}

 function rd1_cf(){
     render_graph(ElGrapho.layouts.ForceDirected);
 }

 function rd2_cf(){
    render_graph(ElGrapho.layouts.Tree);
}

function rd3_cf(){
    render_graph(ElGrapho.layouts.RadialTree);
}

function rd4_cf(){
    render_graph(ElGrapho.layouts.Cluster);
}


function render_graph(layout){
    if (gModel == null){
        console.log('No model exists!')
        return;
    }

    G = new ElGrapho({
        container: gContainer,
        model: layout(gModel),
        width: gWidth,
        height: gHeight,
        nodeSize: nodeSize,
        debug: gDebug
      });
    // set tooltip function
    G.tooltipTemplate = toolTipFn;
    // scroll to page bottom
    window.scrollTo(0,document.body.scrollHeight);
}


function toolTipFn(index, el) {
    // get node type from id
    let node_id = gData.nodes[index].id;
    let i = node_id.indexOf("_");
    if (i > -1){
        node_id = node_id.substring(0, i);
    }
    el.innerHTML = node_id + "<br />" + "<pre>" + JSON.stringify(gData.nodes[index].attrs, null, 4) + "</pre>";
};