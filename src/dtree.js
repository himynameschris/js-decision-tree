// our initial variables

// a hash-map tree to reference nodes by their ID
var tree = {};
var dtree_level = 0;
var rendered_leaves = [];

// build our tree hash-map
var buildTree = function(leaf) {
    //console.log('build tree adding leaf: ', leaf);
    //if(leaf.end) return;
    leaf.leafID = leaf.leafID.replace(/\./g,'d');
    leaf.parent = leaf.parent.replace(/\./g,'d');
    tree[leaf.leafID] = leaf;
    if(leaf.parent != '0') {
        if(tree[leaf.parent].children) tree[leaf.parent].children.push(leaf)
        else tree[leaf.parent].children = [leaf];
    } 
    return;    
}

// grow a leaf by assembling the HTML snippet, adding it to the tree and fading in
var growLeaf = function(leaf) {
    
    // assemble our template with the leaf info
    var leafTemplate = '<div id="' + leaf.leafID + '" class="leaf">' +
                        '<p>' +
                        // when title link is clicked, remove all nodes after
                        '<h3><a href="#" onclick="handleClick(\'' + leaf.leafID + '\')">' + leaf.title + '</a></h3>' +
                        '<div>' + leaf.text + '</div>' + 
                        '<ul>';
    if(leaf.children) {
        for(var i = 0; i < leaf.children.length; i++) {
            leafTemplate += '<li>'
            if(leaf.children[i].action) {
                // when link on an end node is clicked, take the action
                leafTemplate += '<a href="' + leaf.children[i].action + '" target="_blank">' + leaf.children[i].choiceText + '</a>';
            } else {
                // when a link on a choice is clicked, handle based on position
                leafTemplate += '<a href="#" onclick="handleClick(\'' + leaf.children[i].leafID + '\',true)">' + leaf.children[i].choiceText + '</a>';
            }
            leafTemplate += '</li>';
        }
    }    

    leafTemplate += '</ul></p></div>';

    $('#root').prepend(leafTemplate);
    rendered_leaves.push(leaf.leafID);
    $("#" + leaf.leafID).css({'transform' : 'rotate('+ (4 - (Math.random() * 8).toFixed(0)) +'deg)'});
    if(rendered_leaves.length % 2 == 0) {
        $("#" + leaf.leafID).css({'background' : '#cfc'});
    } else if (rendered_leaves.length % 3 == 0) {
        $("#" + leaf.leafID).css({'background' : '#ccf'});
    }
    
    $("#" + leaf.leafID).fadeIn('fast');

    dtree_level++;
}

var witherLeaf = function(nbr, cb) {

    function wither(nbr) {
        var remove_id = "#" + rendered_leaves.pop();
        $(remove_id).fadeOut("fast", function() {
            $(remove_id).remove();
            dtree_level--;
            nbr--;
            if(nbr > 0) {
                wither();
            } else if(cb) {
                cb();
            }
        }); 
    }

    wither(nbr);
       
}

// handle a click on a link within a leaf
var handleClick = function(leafID, isChoice) {
    //console.log('handling click from leafID:',leafID);
    
    // calculate the level based on the leafID
    var level = ('' + leafID).split('d').length;
    if(level > dtree_level) {
        // leaf is ahead of current lead, add
        growLeaf(tree[leafID]);

    } else if (level <= dtree_level) {
        // leaf is below current leaf, remove all nodes below
        if(leafID == rendered_leaves[rendered_leaves.length - 1]) return;
        var ceiling = dtree_level - level;
        if(isChoice) ceiling++;
        witherLeaf(ceiling, function() {
            if(isChoice) {
                growLeaf(tree[leafID]);
            }
        });
    }
}


$(document).ready(function() {
    
    Papa.parse('http://localhost:9000/data/data.csv', 
        {
            download:true
            ,header:true
            ,complete:function(results) {
                console.log('papaparse results: ', results);
                var leaves = results.data;

                leaves.map(leaf => buildTree(leaf));
                //buildTree(leaves);
                growLeaf(tree['1']);
                console.log('tree: ', tree);
                console.log('rendered leaves: ', rendered_leaves);
            }
        });

});