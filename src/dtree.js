// define our namespace
var dtree = dtree || {};

// helper to keep from being loaded multiple times
var isFirstLoad = function(namesp) {
    var isFirst = namesp.firstLoad === undefined;
    namesp.firstLoad = false;
    return isFirst;
}

// a hash-map tree to reference nodes by their ID
var tree = {};
// a pile to keep track of our current leaves
var rendered_leaves = [];

// add a leaf to our tree hash-map for lookup later
var buildTree = function(leaf) {
    if(!leaf.leafID) return;
    leaf.leafID = leaf.leafID.replace(/\./g,'d');
    tree[leaf.leafID] = leaf;
    if(leaf.parent != '0') {
        leaf.parent = leaf.parent.replace(/\./g,'d');
        if(tree[leaf.parent].children) tree[leaf.parent].children.push(leaf)
        else tree[leaf.parent].children = [leaf];
    } 
    return;    
}

// grow a leaf by assembling the HTML snippet, adding it to the tree and fading in
var growLeaf = function(leaf) {
    
    // assemble our template with the leaf info
    var leafTemplate = '<div id="' + leaf.leafID + '" class="leaf">' +
                        // when title link is clicked, remove all nodes after
                        '<a href="#" onclick="handleClick(\'' + leaf.leafID + '\')">' + leaf.title + '</a>' +
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

    leafTemplate += '</ul></div>';

    // add the leaf to the DOM
    $('#root').prepend(leafTemplate);
    // add the leaf to our pile
    rendered_leaves.push(leaf.leafID);
    // style the leaf
    $("#" + leaf.leafID).css({'transform' : 'rotate('+ (4 - (Math.random() * 8).toFixed(0)) +'deg)'});
    if(rendered_leaves.length % 2 == 0) {
        $("#" + leaf.leafID).css({'background' : '#cfc'});
    } else if (rendered_leaves.length % 3 == 0) {
        $("#" + leaf.leafID).css({'background' : '#ccf'});
    }
    // make the leaf visible
    $("#" + leaf.leafID).fadeIn('fast');
}

// remove a leaf or leaves from the DOM, fade out
var witherLeaf = function(nbr, cb) {

    function wither(nbr) {
        var remove_id = "#" + rendered_leaves.pop();
        $(remove_id).fadeOut("fast", function() {
            $(remove_id).remove();
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
    
    // calculate the level based on the leafID
    var level = ('' + leafID).split('d').length;
    if(level > rendered_leaves.length) {
        // leaf is ahead of current lead, add
        growLeaf(tree[leafID]);

    } else if (level <= rendered_leaves.length) {
        // leaf is below current leaf, remove all nodes below
        if(leafID == rendered_leaves[rendered_leaves.length - 1]) return;
        var ceiling = rendered_leaves.length - level;
        if(isChoice) ceiling++;
        witherLeaf(ceiling, function() {
            if(isChoice) {
                growLeaf(tree[leafID]);
            }
        });
    }
}

// load our data and render our tree
$(document).ready(function() {
    // check that this is the first load
    if(!isFirstLoad(dtree)) {
        return;
    }

    // parse our data
    Papa.parse(dataurl, 
        {
            download:true
            ,header:true
            ,complete: function(results) 
            {
                var leaves = results.data;
                leaves.map(function(leaf) {
                    buildTree(leaf);
                })
                growLeaf(tree['1']);
            }
        })
});