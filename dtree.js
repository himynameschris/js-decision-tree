var config = 
    {
        leafID: '1',
        title: 'decision 1',
        text: 'this is decision 1',
        children: [
            {
                choice: 'this is choice 1 for decision 1',
                leafID: '1d1',
                title: 'decision 1d1',
                text: 'this is decision 1d1',
                children: [
                    {
                        choice: 'this is choice 1 for decision 1d1',
                        leafID: '1d1d1',
                        title: 'decision 1d1d1',
                        text: 'this is decision 1d1d1',
                        children: [
                            {
                                end: true,
                                choice: 'go to google',
                                action: 'http://google.com'
                            },
                            {
                                choice: 'this is choice 1 for decision 1d1d1',
                                leafID: '1d1d1d1',
                                title: 'decision 1d1d1d2',
                                text: 'this is decision 1d1d1d2',
                                children: [
                                    {
                                        end: true,
                                        choice: 'go to google',
                                        action: 'http://google.com'
                                    }
                                ]
                
                            },
                            {
                                choice: 'this is choice 2 for decision 1d1d1',
                                leafID: '1d1d2d1',
                                title: 'decision 1d1d2d1',
                                text: 'this is decision 1d1d2d1',
                                children: [
                                    {
                                        end: true,
                                        choice: 'go to bing',
                                        action: 'http://bing.com'
                                    }
                                ]
                
                            }
                        ]
        
                    },
                    {
                        choice: 'this is choice 2 for decision 1d1',
                        leafID: '1d1d2',
                        title: 'decision 1d1d2',
                        text: 'this is decision 1d1d2',
                        children: [
                            {
                                end: true,
                                choice: 'go to bing',
                                action: 'http://bing.com'
                            }
                        ]
        
                    }
                ]

            },
            {
                choice: 'this is choice 2 for decision 1',
                leafID: '1d2',
                title: 'decision 1d2',
                text: 'this is decision 1d2',
                children: [
                    {
                        end: true,
                        choice: 'go to home',
                        action: 'http://localhost'
                    }
                ]

            },
            {
                choice: 'this is choice 3 for decision 1',
                leafID: '1d3',
                title: 'decision 1d3',
                text: 'this is decision 1d3',
                children: [
                    {
                        end: true,
                        choice: 'go to home',
                        action: 'http://localhost'
                    }
                ]

            },
            {
                choice: 'this is choice 4 for decision 1',
                leafID: '1d4',
                title: 'decision 1d4',
                text: 'this is decision 1d4',
                children: [
                    {
                        end: true,
                        choice: 'go to home',
                        action: 'http://localhost'
                    }
                ]

            }
        ]
    };

// our initial variables

// a hash-map tree to reference nodes by their ID
var tree = {};
var dtree_level = 0;
var rendered_leaves = [];

// build our tree hash-map
var buildTree = function(leaf) {
    console.log('building leaf: ', leaf.leafID);
    if(leaf.end) return;
    tree[leaf.leafID] = leaf;
    if(leaf.children) {
        leaf.children.map(bud => buildTree(bud));
    }
    return;    
}
buildTree(config);

// grow a leaf by assembling the HTML snippet, adding it to the tree and fading in
var growLeaf = function(leaf) {
    
    // assemble our template with the leaf info
    var leafTemplate = '<div id="' + leaf.leafID + '" class="leaf">' +
                        '<p>' +
                        // when title link is clicked, remove all nodes after
                        '<h3><a href="#" onclick="handleClick(\'' + leaf.leafID + '\')">' + leaf.title + '</a></h3>' +
                        '<div>' + leaf.text + '</div>' + 
                        '<ul>';

    for(var i = 0; i < leaf.children.length; i++) {
        leafTemplate += '<li>'
        if(leaf.children[i].end) {
            // when link on an end node is clicked, take the action
            leafTemplate += '<a href="' + leaf.children[i].action + '" target="_blank">' + leaf.children[i].choice + '</a>';
        } else {
            // when a link on a choice is clicked, handle based on position
            leafTemplate += '<a href="#" onclick="handleClick(\'' + leaf.children[i].leafID + '\',true)">' + leaf.children[i].choice + '</a>';
        }
        leafTemplate += '</li>';
    }

    leafTemplate += '</ul></p></div>'

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
    
    growLeaf(config);

    console.log('tree: ', tree);
    console.log('rendered leaves: ', rendered_leaves);

});