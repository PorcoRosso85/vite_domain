const data = {
  features: {
    GraphOptions: {
      container: {
        desc: 'The DOM container of the graph, it can be the id of a DOM element or an HTML node.',
      },
      width: {
        desc: "The width of the canvas for the graph with the unit 'px'.",
      },
      height: {
        desc: "The height of the canvas for the graph with the unit 'px'.",
      },
      fitView: {
        desc: 'Whether to fit the canvas to the view port.',
      },
      fitViewPadding: {
        desc: 'Takes effect only when fitView: true. It is the padding between the canvas and the border of the view port.',
      },
      fitCenter: {
        desc: 'Whether to translate the graph to align its center with the canvas. Its priority is lower than fitView.',
      },
      linkCenter: {
        desc: "Whether to connect the edges to nodes' center.",
      },
      groupByTypes: {
        desc: 'Whether to group the nodes and edges separately.',
      },
      autoPaint: {
        desc: 'Whether to paint the graph automatically while items updated or view port changed.',
      },
      modes: {
        desc: 'The interaction modes of this graph.',
      },
      nodeStateStyles: {
        desc: 'The node styles on different states, e.g. hover, selected.',
      },
      edgeStateStyles: {
        desc: 'The edge styles on different states, e.g. hover, selected.',
      },
      comboStateStyles: {
        desc: 'The combo styles on different states, e.g. hover, selected.',
      },
      defaultNode: {
        desc: 'Default node configurations in global, including type, size, color, and so on.',
      },
      defaultEdge: {
        desc: 'Default edge configurations in global, including type, size, color, and so on.',
      },
      defaultCombo: {
        desc: 'Default combo configurations in global, including type, size, color, and so on.',
      },
      plugins: {
        desc: 'Plugins for the graph.',
      },
      animate: {
        desc: 'Whether to activate the global animation.',
      },
      animateCfg: {
        desc: 'The configurations for global animation.',
      },
      minZoom: {
        desc: 'The minimum zoom ratio.',
      },
      maxZoom: {
        desc: 'The maximum zoom ratio.',
      },
      layout: {
        desc: 'Configurations for layout.',
      },
      renderer: {
        desc: 'Render the graph with Canvas or SVG.',
      },
      enabledStack: {
        desc: 'Whether to enable stack, that is, whether to support redo & undo operations.',
      },
      maxStep: {
        desc: 'The max step number of redo & undo, works only when the enabledStack is true.',
      },
    },
    __GraphOptions: {
      container: {
        desc: 'The DOM container of the graph, it can be the id of a DOM element or an HTML node.',
      },
      width: {
        desc: "The width of the canvas for the graph with the unit 'px'.",
      },
      height: {
        desc: "The height of the canvas for the graph with the unit 'px'.",
      },
      fitView: {
        desc: 'Whether to fit the canvas to the view port.',
      },
      fitViewPadding: {
        desc: 'Takes effect only when fitView: true. It is the padding between the canvas and the border of the view port.',
      },
      fitCenter: {
        desc: 'Whether to translate the graph to align its center with the canvas. Its priority is lower than fitView.',
      },
      linkCenter: {
        desc: "Whether to connect the edges to nodes' center.",
      },
      groupByTypes: {
        desc: 'Whether to group the nodes and edges separately.',
      },
      autoPaint: {
        desc: 'Whether to paint the graph automatically while items updated or view port changed.',
      },
      modes: {
        desc: 'The interaction modes of this graph.',
      },
      nodeStateStyles: {
        desc: 'The node styles on different states, e.g. hover, selected.',
      },
      edgeStateStyles: {
        desc: 'The edge styles on different states, e.g. hover, selected.',
      },
      comboStateStyles: {
        desc: 'The combo styles on different states, e.g. hover, selected.',
      },
      defaultNode: {
        desc: 'Default node configurations in global, including type, size, color, and so on.',
      },
      defaultEdge: {
        desc: 'Default edge configurations in global, including type, size, color, and so on.',
      },
      defaultCombo: {
        desc: 'Default combo configurations in global, including type, size, color, and so on.',
      },
      plugins: {
        desc: 'Plugins for the graph.',
      },
      animate: {
        desc: 'Whether to activate the global animation.',
      },
      animateCfg: {
        desc: 'The configurations for global animation.',
      },
      minZoom: {
        desc: 'The minimum zoom ratio.',
      },
      maxZoom: {
        desc: 'The maximum zoom ratio.',
      },
      layout: {
        desc: 'Configurations for layout.',
      },
      renderer: {
        desc: 'Render the graph with Canvas or SVG.',
      },
      enabledStack: {
        desc: 'Whether to enable stack, that is, whether to support redo & undo operations.',
      },
      maxStep: {
        desc: 'The max step number of redo & undo, works only when the enabledStack is true.',
      },
    },
    GraphFunc: {
      data: [
        {
          title: 'graph.data(data)',
          desc: 'Load the data for graph. Graph data, it should be an object containing an array of nodes and an array of edges.',
        },
        {
          title: 'graph.save()',
          desc: 'Get the graph data. The return value has all the nodes and edges.',
        },
        {
          title: 'graph.read(data)',
          desc: 'Read the data and render the graph. It is equal to combining graph.data(data) and graph.render().',
        },
        {
          title: 'graph.changeData(data, stack)',
          desc: 'Change the data source, and render the graph according to the new data. If there is layout configured on the graph, the new data will be placed according to the layout algorithm. If you do not want to layout the new data with origin layout algorithm, call graph.destroyLayout.',
        },
        {
          title: 'destroyLayout()',
          desc: 'Destroy the layout algorithm. After that, the changeData will not place the new nodes with origin layout configurations.',
        },
      ],
      __data: {
        'graph.data(data)': {
          desc: 'Load the data for graph. Graph data, it should be an object containing an array of nodes and an array of edges.',
        },
        'graph.save()': {
          desc: 'Get the graph data. The return value has all the nodes and edges.',
        },
        'graph.read(data)': {
          desc: 'Read the data and render the graph. It is equal to combining graph.data(data) and graph.render().',
        },
        'graph.changeData(data, stack)': {
          desc: 'Change the data source, and render the graph according to the new data. If there is layout configured on the graph, the new data will be placed according to the layout algorithm. If you do not want to layout the new data with the origin layout algorithm, call graph.destroyLayout.',
        },
        'destroyLayout()': {
          desc: 'Destroy the layout algorithm. After that, the changeData will not place the new nodes with origin layout configurations.',
        },
      },
      render: [
        {
          title: 'graph.render()',
          desc: 'Render the graph with data onto the canvas.',
        },
      ],
      getSet: [
        {
          title: 'GraphOptions.renderer',
          desc: 'Render the graph with Canvas or SVG. It is supported expecting V3.3.x.',
        },
        {
          title: 'GraphOptions.enabledStack',
          desc: 'Whether to enable stack, that is, whether to support redo & undo operation. Support by V3.6 and latter versions.',
        },
        {
          title: 'GraphOptions.maxStep',
          desc: 'The max step number of redo & undo, works only when the enabledStack is true. Support by V3.6 and latter versions.',
        },
      ],
      transform: [
        {
          title: 'graph.getZoom()',
          desc: 'Get the current zoom ratio. The return value indicates the current zoom ratio of view port. The default value is 1.',
        },
        {
          title: 'graph.zoom(ratio, center, animate, animateCfg)',
          desc: 'Change the scale of the graph with a relative ratio. The function can take parameters such as ratio, center, animate, and animateCfg.',
        },
        {
          title: 'graph.zoomTo(toRatio, center)',
          desc: 'Scale the graph to a target ratio. The function can take parameters such as toRatio and center.',
        },
        {
          title: 'graph.changeSize(width, height)',
          desc: 'Change the size of the canvas. The function takes parameters width and height.',
        },
        {
          title: 'graph.translate(dx, dy, animate, animateCfg)',
          desc: 'Move the canvas with relative displacement. The function can take parameters such as dx, dy, animate, and animateCfg.',
        },
        {
          title: 'graph.moveTo(x, y, animate, animateCfg)',
          desc: 'Move the canvas to a fixed position. The function can take parameters such as x, y, animate, and animateCfg.',
        },
        {
          title: 'graph.fitView(padding, rules, animate, animateCfg)',
          desc: 'Fit the graph to the view port. The function can take parameters such as padding, rules, animate, and animateCfg.',
        },
        {
          title: 'graph.fitCenter()',
          desc: 'Translate the graph to align its center with the canvas. The function can take parameters animate and animateCfg.',
        },
        {
          title: 'graph.focusItem(item, animate, animateCfg)',
          desc: 'Move the graph to center at the item. This operation can be used as easing animation after searching a node. The function can take parameters such as item, animate, and animateCfg.',
        },
      ],
      item: [
        {
          title: 'graph.addItem(type, model, stack)',
          desc: 'Add item(node, edge) to the graph. G6 will use the model object as the model of the newly added item, and the model might be modified. If you do not want it to be modified, use the deep cloned model instead.',
        },
        {
          title: 'graph.removeItem(item, stack)',
          desc: 'Remove the item. When the item is the id of a group, this operation will delete the corresponding group.',
        },
        {
          title: 'graph.updateItem(item, model, stack)',
          desc: 'Update the item with new data model. If there are combos in the graph, after calling updateItem to update the position of a node, call updateCombo(combo) to update the sizes and positions of the related combos.',
        },
        {
          title: 'graph.update(item, model, stack)',
          desc: 'The same as updateItem(item, model).',
        },
        {
          title: 'graph.updateCombos()',
          desc: 'Update the sizes and positions of all the combos according to the bboxes of its children.',
        },
        {
          title: 'graph.updateCombo(combo)',
          desc: 'Update the positions and sizes of the combo and all of its ancestors.',
        },
        {
          title: 'graph.updateComboTree(item, parentId)',
          desc: 'Update the hierarchy structure of the combo, such as move a combo into another one.',
        },
        {
          title: 'graph.refreshItem(item)',
          desc: 'Refresh the item.',
        },
        {
          title: 'graph.refreshPositions()',
          desc: 'When the positions of nodes in their data models are changed, refresh the canvas to paint the nodes with new positions. It will update the edges in the same time.',
        },
        {
          title: 'graph.node(nodeFn)',
          desc: 'Set the style and other configurations for each node. This function must be called before graph.render(). It does not take effect otherwise.',
        },
        {
          title: 'graph.edge(edgeFn)',
          desc: 'Set the style and other configurations for each edge. This function must be called before graph.render(). It does not take effect otherwise.',
        },
        {
          title: 'graph.combo(comboFn)',
          desc: 'Set the style and other configurations for each combo. This function must be called before graph.render(). It does not take effect otherwise.',
        },
        {
          title: 'graph.showItem(item, stack)',
          desc: 'Show the item. If the item is a node, the related edges will be shown in the same time. Different from that, item.show() only show the node item itself.',
        },
        {
          title: 'graph.hideItem(item, stack)',
          desc: 'Hide the item. If the item is a node, the related edges will be hidden in the same time. Different from that, item.hide() only hide the node item itself.',
        },
      ],
      state: [
        {
          title: 'graph.setItemState(item, state, enabled)',
          desc: "Set the item's state. v3.4 and further versions support multiple values for a state, refer to Take Use of State Mechanism. This function will emit events beforeitemstatechange and afteritemstatechange.",
        },
        {
          title: 'graph.clearItemStates(item, states)',
          desc: 'Clear the states of the item. This function could clear multiple states in the same time.',
        },
        {
          title: 'graph.priorityState(item, state)',
          desc: 'Raise the priority of the specified state to the highest priority.',
        },
      ],
      mode: [
        {
          title: 'graph.setMode(mode)',
          desc: "Switch the interaction mode of graph. For example, switch from edit mode to read-only mode. The function takes a parameter 'mode' which is the name of the mode.",
        },
        {
          title: 'graph.getCurrentMode()',
          desc: 'Get the current mode. The return value indicates the current interaction mode.',
        },
      ],
      event: [
        {
          title: 'graph.on(event, callback)',
          desc: "Bind an event. The event can be a native event of the canvas, such as 'click', 'mousedown', 'mouseup', 'dblclick', 'contextmenu', 'mouseenter', 'mouseleave', 'mouseover', 'mouseout', 'mousemove', 'dragstart', 'drag', 'dragend', 'drop'. Or a custom event, such as 'node:click', 'edge:click', 'canvas:click'.",
        },
        {
          title: 'graph.off(event, callback)',
          desc: 'Unbind an event.',
        },
        {
          title: 'graph.emit(event, eventObject)',
          desc: 'Emit an event. This function can be used to simulate an event.',
        },
        {
          title: 'graph.getEvents()',
          desc: 'Get all the events bound on the graph.',
        },
      ],
      behavior: [
        {
          title: 'graph.addBehaviors(behaviors, modes)',
          desc: 'Add interaction behaviors to a mode or multiple modes. This function allows you to add specific behaviors to certain interaction modes of the graph.',
        },
        {
          title: 'graph.removeBehaviors(behaviors, modes)',
          desc: 'Remove behavior(s) from mode(s). This function allows you to remove specific behaviors from certain interaction modes of the graph.',
        },
        {
          title: 'graph.updateBehavior(behavior, mode)',
          desc: 'Update the configurations for a behavior from mode. This function allows you to update the configurations of a specific behavior in a certain interaction mode of the graph.',
        },
      ],
      layout: [
        {
          title: 'graph.layout()',
          desc: 'Re-layout the graph with current layout configurations in graph.',
        },
        {
          title: 'graph.updateLayout(cfg)',
          desc: 'Update the layout configurations. If there is type in cfg, type is a string and it is different from current layout method, updateLayout(cfg) will change the layout method and relayout; If there is no type in cfg, updateLayout(cfg) will relayout with current layout method and new layout configurations.',
        },
        {
          title: 'destroyLayout()',
          desc: 'Destroy the layout algorithm. After that, the changeData will not place the new nodes with origin layout configurations.',
        },
      ],
      hull: [
        {
          title: 'createHull(cfg: HullCfg)',
          desc: 'Create a hull for a cluster of nodes. The hull can be of different types such as round-convex, smooth-convex, or bubble. The hull can include specific nodes as members and can also exclude certain nodes as nonMembers. The hull can also have a specific style and padding.',
        },
        {
          title: 'getHulls()',
          desc: 'Get all of the hulls in the current graph. The return value indicates the mapping of hull ID to the corresponding hull instance.',
        },
        {
          title: 'removeHull(id: string)',
          desc: 'Remove a specific hull from the graph using its ID.',
        },
        {
          title: 'removeHulls()',
          desc: 'Remove all the hulls present on the graph.',
        },
      ],
      calculation: [
        {
          title: 'graph.getNodeDegree(node, degreeType, refresh)',
          desc: 'Get the in-degree, out-degree, degree, or all of the three kinds of degree. This function allows you to retrieve the degree of a specific node based on the type of degree you want to obtain.',
        },
        {
          title: 'graph.getShortestPathMatrix(cache, directed)',
          desc: 'Get all-pairs shortest-path matrix of the graph. This function provides the shortest path matrix for all pairs of nodes in the graph.',
        },
        {
          title: 'graph.getAdjMatrix(cache, directed)',
          desc: 'Get the adjacency matrix of the graph. This function provides the adjacency matrix representation of the graph.',
        },
      ],
      stack: [
        {
          title: 'pushStack(action, data, stackType)',
          desc: "Push operation. Implemented the undo function. Implemented the redo function. The function allows you to push an operation to the stack. The operation type is 'update' by default. The stacked data is provided as an argument. The push operation type is 'undo' by default.",
        },
        {
          title: 'getUndoStack()',
          desc: 'Get undo stack. This function retrieves the undo stack.',
        },
        {
          title: 'getRedoStack()',
          desc: 'Get redo stack. This function retrieves the redo stack.',
        },
        {
          title: 'getStackData()',
          desc: 'Get the data in stack. The return value type includes undoStack and redoStack.',
        },
        {
          title: 'clearStack()',
          desc: 'Clear the data in stack. This function clears all the data in the stack.',
        },
      ],
      animation: [
        {
          title: 'graph.positionsAnimate()',
          desc: 'Update the node positions according to the data model animatively. The animateCfg of the graph will be the animation configurations.',
        },
        {
          title: 'graph.stopAnimate()',
          desc: 'Stop the animation on the canvas.',
        },
        {
          title: 'graph.isAnimating()',
          desc: 'Return if the graph is animating.',
        },
      ],
      coordinate: [
        {
          title: 'graph.getPointByClient(clientX, clientY)',
          desc: 'Transform client/screen coordinates into point coordinates.',
        },
        {
          title: 'graph.getClientByPoint(x, y)',
          desc: 'Transform point coordinates into client/screen coordinates.',
        },
        {
          title: 'graph.getPointByCanvas(canvasX, canvasY)',
          desc: 'Transform canvas coordinates into point coordinates.',
        },
        {
          title: 'graph.getCanvasByPoint(x, y)',
          desc: 'Transform point coordinates into canvas coordinates.',
        },
        {
          title: 'graph.getGraphCenterPoint()',
          desc: "Get the x/y in point coordinate system of the graph content's center.",
        },
        {
          title: 'graph.getViewPortCenterPoint()',
          desc: 'Get the x/y in point coordinate system of the view port center.',
        },
      ],
      watermarker: [
        {
          title: 'graph.setTextWaterMarker(texts, config)',
          desc: 'Add text water marker for the canvas. This function allows you to set a text watermark on the canvas. The watermark can be an array of texts, and you can also provide configurations for the watermark such as width, height, compatibility, and text style.',
        },
        {
          title: 'graph.setImageWaterMarker(imgURL, config)',
          desc: 'Add image water markers for the graph. This function allows you to set an image watermark on the graph. You can provide the URL of the image and also configurations for the watermark such as width, height, compatibility, and image style.',
        },
      ],
      download: [
        {
          title: 'graph.downloadFullImage(name, type, imageConfig)',
          desc: 'Export the whole graph as an image, whatever (a part of) the graph is out of the screen.',
        },
        {
          title: 'graph.downloadImage(name, type, backgroundColor)',
          desc: 'Export the canvas as an image.',
        },
        {
          title: 'graph.toDataURL(type, backgroundColor)',
          desc: 'Generate url of the image of the graph inside the view port.',
        },
        {
          title: 'graph.toFullDataURL(callback, type, backgroundColor)',
          desc: 'Generate url of the image of the whole graph including the part out of the view port.',
        },
      ],
      destroy: [
        {
          title: 'graph.clear()',
          desc: 'Clear all the items in the canvas. This function is used for reseting the data source and re-rendering the graph.',
        },
        {
          title: 'graph.destroy()',
          desc: 'Destroy the graph.',
        },
      ],
    },
    GraphLayout: [
      {
        name: 'Random Layout',
        desc: 'Randomizes the node postions.',
      },
      {
        name: 'GForce Layout',
        desc: 'Classical force-directed layout supports GPU parallel computing, supported by G6 4.0.',
      },
      {
        name: 'Force Layout',
        desc: 'Classical force-directed layout.',
      },
      {
        name: 'Force Atlas 2 Layout',
        desc: 'FA2 is a kind of force directed layout, which performs better on the convergence and compactness.',
      },
      {
        name: 'Fruchterman Layout',
        desc: 'A kind of force-directed layout.',
      },
      {
        name: 'Circular Layout',
        desc: 'Arranges the nodes on a circle.',
      },
      {
        name: 'Radial Layout',
        desc: 'Arranges the nodes around a focus node radially.',
      },
      {
        name: 'MDS Layout',
        desc: 'Multidemensional Scaling.',
      },
      {
        name: 'Dagre Layout',
        desc: 'Arranges the nodes hierarchically.',
      },
      {
        name: 'Concentric Layout',
        desc: 'Arranges the nodes on concentric circles.',
      },
      {
        name: 'Grid Layout',
        desc: 'Arranges the nodes on grid.',
      },
      {
        name: 'Combo Force Layout',
        desc: 'New feature of V3.5 Designed for graph with combos.',
      },
      {
        name: 'Combo Combined Layout',
        desc: 'New feature of V4.6 Designed for graph with combos. Support configuring the layout for items inside a combo and the layout for the outer combos and nodes.',
      },
    ],
    Events: {
      node: [
        {
          title: 'node:click',
          desc: 'Activated when user clicks the left button of the mouse on the node.',
        },
        {
          title: 'node:dblclick',
          desc: 'Activated when user double clicks the left button of the mouse on the node.',
        },
        {
          title: 'node:mouseenter',
          desc: 'Activated when the mouse enters the node.',
        },
        {
          title: 'node:mousemove',
          desc: 'Activated while the mouse is moving inside the node. It cannot be activated by keyboard.',
        },
        {
          title: 'node:mouseout',
          desc: 'Activated while the mouse moves out of the node.',
        },
        {
          title: 'node:mouseover',
          desc: 'Activated when the mouse moves over the node.',
        },
        {
          title: 'node:mouseleave',
          desc: 'Activated when the mouse leaves the node.',
        },
        {
          title: 'node:mousedown',
          desc: 'Activated when the left or right button is clicked down on the node. It cannot be activated by keyboard.',
        },
        {
          title: 'node:mouseup',
          desc: 'Activated when the left or right button is released on the node. It cannot be activated by keyboard.',
        },
        {
          title: 'node:dragstart',
          desc: 'Activated when user begins to drag the node. This event is applied on the dragged node.',
        },
        {
          title: 'node:drag',
          desc: 'Activated during the dragging process on the node. This event is applied on the dragged node.',
        },
        {
          title: 'node:dragend',
          desc: 'Activated when user stops dragging on the node. This event is applied on the dragged node.',
        },
        {
          title: 'node:dragenter',
          desc: 'Activated when user drags an item into a target node item. This event is applied on the target node item.',
        },
        {
          title: 'node:dragleave',
          desc: 'Activated when user drags an item out of a target node item. This event is applied on the target node item.',
        },
        {
          title: 'node:dragover',
          desc: 'Activated when user drags an item over a target node item. This event is applied on the target node item.',
        },
        {
          title: 'node:drop',
          desc: 'Activated when user drops an item on a target item. This event is applied on the target item.',
        },
        {
          title: 'node:touchstart',
          desc: 'On touch screen, this event is activated when user begin to touch the node.',
        },
        {
          title: 'node:touchmove',
          desc: 'On touch screen, this event is activated when user is touching the node.',
        },
        {
          title: 'node:touchend',
          desc: 'On touch screen, this event is activated when user finish touching the node.',
        },
        {
          title: 'node:contextmenu',
          desc: 'Open the context menu when user clicks the right button of mouse on the node. Demo.',
        },
      ],
      edge: [
        {
          title: 'edge:click',
          desc: 'Activated when user clicks the left button of the mouse on the edge.',
        },
        {
          title: 'edge:dblclick',
          desc: 'Activated when user double clicks the left button of the mouse on the edge.',
        },
        {
          title: 'edge:mouseenter',
          desc: 'Activated when the mouse enters the edge.',
        },
        {
          title: 'edge:mousemove',
          desc: 'Activated while the mouse is moving inside the edge. It cannot be activated by keyboard.',
        },
        {
          title: 'edge:mouseout',
          desc: 'Activated while the mouse moves out of the edge.',
        },
        {
          title: 'edge:mouseover',
          desc: 'Activated when the mouse moves over the edge.',
        },
        {
          title: 'edge:mouseleave',
          desc: 'Activated when the mouse leaves the edge.',
        },
        {
          title: 'edge:mousedown',
          desc: 'Activated when the left or right button is clicked down on the edge. It cannot be activated by keyboard.',
        },
        {
          title: 'edge:mouseup',
          desc: 'Activated when the left or right button is released on the edge. It cannot be activated by keyboard.',
        },
        {
          title: 'edge:dragenter',
          desc: 'Activated when user drags an item into a target edge item. This event is applied on the target edge item.',
        },
        {
          title: 'edge:dragleave',
          desc: 'Activated when user drags an item out of a target edge item. This event is applied on the target edge item.',
        },
        {
          title: 'edge:dragover',
          desc: 'Activated when user drags an item over a target edge item. This event is applied on the target edge item.',
        },
        {
          title: 'edge:drop',
          desc: 'Activated when user drops an item on a target edge item. This event is applied on the target edge item.',
        },
        {
          title: 'edge:contextmenu',
          desc: 'Open the context menu when user clicks the right button of mouse on the edge. Demo.',
        },
      ],
      canvas: [
        {
          title: 'canvas:click',
          desc: 'Activated when user clicks the left button of the mouse on the canvas.',
        },
        {
          title: 'canvas:dblclick',
          desc: 'Activated when user double clicks the left button of the mouse on the canvas.',
        },
        {
          title: 'canvas:mouseenter',
          desc: 'Activated when the mouse enters the canvas.',
        },
        {
          title: 'canvas:mousemove',
          desc: 'Activated while the mouse is moving inside the canvas. It cannot be activated by keyboard.',
        },
        {
          title: 'canvas:mouseout',
          desc: 'Activated while the mouse moves out of the canvas.',
        },
        {
          title: 'canvas:mouseover',
          desc: 'Activated when the mouse moves over the canvas.',
        },
        {
          title: 'canvas:mouseleave',
          desc: 'Activated when the mouse leaves the canvas.',
        },
        {
          title: 'canvas:mousedown',
          desc: 'Activated when the left or right button is clicked down on the canvas. It cannot be activated by keyboard.',
        },
        {
          title: 'canvas:mouseup',
          desc: 'Activated when the left or right button is released on the canvas. It cannot be activated by keyboard.',
        },
        {
          title: 'canvas:contextmenu',
          desc: 'Open the context menu when user clicks the right button of mouse on the canvas. Demo.',
        },
        {
          title: 'canvas:dragstart',
          desc: 'Activated when user begins to drag the canvas. This event is applied on the dragged canvas.',
        },
        {
          title: 'canvas:drag',
          desc: 'Activated during the dragging process on the canvas. This event is applied on the dragged canvas.',
        },
        {
          title: 'canvas:dragend',
          desc: 'Activated when user stops dragging on the canvas. This event is applied on the dragged canvas.',
        },
        {
          title: 'canvas:dragenter',
          desc: 'Activated when user drags the canvas into a target item. This event is applied on the target item.',
        },
        {
          title: 'canvas:dragleave',
          desc: 'Activated when user drags the canvas out of a target item. This event is applied on the target item.',
        },
        {
          title: 'canvas:drop',
          desc: 'Activated when user drags and drops an item on the canvas.',
        },
        {
          title: 'canvas:touchstart',
          desc: 'On touch screen, this event is activated when user begin to touch the canvas.',
        },
        {
          title: 'canvas:touchmove',
          desc: 'On touch screen, this event is activated when user is touching the canvas.',
        },
        {
          title: 'canvas:touchend',
          desc: 'On touch screen, this event is activated when user finish touching the canvas.',
        },
      ],
      timing: [
        {
          title: 'beforerender',
          desc: 'Emitted before graph.render / graph.read being called.',
        },
        {
          title: 'afterrender',
          desc: 'Emitted after graph.render / graph.read being called.',
        },
        {
          title: 'beforedestroy',
          desc: 'Emitted before graph.destroy being called.',
        },
        {
          title: 'afterdestroy',
          desc: 'Emitted after graph.destroy being called.',
        },
        {
          title: 'beforechangedata',
          desc: 'Emitted before graph.changeData being called.',
        },
        {
          title: 'afterchangedata',
          desc: 'Emitted after graph.changeData being called.',
        },
        {
          title: 'beforeadditem',
          desc: 'Emitted before graph.add / graph.addItem being called.',
        },
        {
          title: 'afteradditem',
          desc: 'Emitted after graph.add / graph.addItem being called.',
        },
        {
          title: 'beforeremoveitem',
          desc: 'Emitted before graph.remove / graph.removeItem being called.',
        },
        {
          title: 'afterremoveitem',
          desc: 'Emitted after graph.remove / graph.removeItem being called.',
        },
        {
          title: 'beforeupdateitem',
          desc: 'Emitted before graph.update / graph.updateItem being called.',
        },
        {
          title: 'afterupdateitem',
          desc: 'Emitted after graph.update / graph.updateItem being called.',
        },
        {
          title: 'beforeitemvisibilitychange',
          desc: 'Emitted before graph.showItem / graph.hideItem being called.',
        },
        {
          title: 'afteritemvisibilitychange',
          desc: 'Emitted after graph.showItem / graph.hideItem being called.',
        },
        {
          title: 'beforeitemstatechange',
          desc: 'Emitted before graph.setItemState being called.',
        },
        {
          title: 'afteritemstatechange',
          desc: 'Emitted after graph.setItemState being called.',
        },
        {
          title: 'beforeitemrefresh',
          desc: 'Emitted before graph.refreshItem being called.',
        },
        {
          title: 'afteritemrefresh',
          desc: 'Emitted after graph.refreshItem being called.',
        },
        {
          title: 'beforeitemstatesclear',
          desc: 'Emitted before graph.clearItemStates being called.',
        },
        {
          title: 'afteritemstatesclear',
          desc: 'Emitted after graph.clearItemStates being called.',
        },
        {
          title: 'beforemodechange',
          desc: 'Emitted before graph.setMode / graph.addBehaviors / graph.removeBehaviors being called.',
        },
        {
          title: 'aftermodechange',
          desc: 'Emitted after graph.setMode / graph.addBehaviors / graph.removeBehaviors being called.',
        },
        {
          title: 'beforelayout',
          desc: 'Emitted before graph layout. graph.render will layout the graph, so graph.render will activate this event as well.',
        },
        {
          title: 'afterlayout',
          desc: 'Emitted after graph layout being done. graph.render will layout the graph, so graph.render will activate this event as well.',
        },
        {
          title: 'beforegraphrefreshposition',
          desc: 'Emitted before graph.refreshPositions beging called.',
        },
        {
          title: 'aftergraphrefreshposition',
          desc: 'Emitted after graph.refreshPositions beging called.',
        },
        {
          title: 'beforegraphrefresh',
          desc: 'Emitted before graph.refresh beging called.',
        },
        {
          title: 'aftergraphrefresh',
          desc: 'Emitted after graph.refresh beging called.',
        },
        {
          title: 'beforeanimate',
          desc: 'Emitted before global animation.',
        },
        {
          title: 'afteranimate',
          desc: 'Emitted after global animation.',
        },
        {
          title: 'beforecreateedge',
          desc: 'Emitted before an edge is created by the built-in behavior create-edge.',
        },
        {
          title: 'aftercreateedge',
          desc: 'Emitted after an edge is created by the built-in behavior create-edge.',
        },
        {
          title: 'beforecollapseexpandcombo',
          desc: 'Emitted before an combo is collapsed or expanded, the parameter action indicates collapse or expand.',
        },
        {
          title: 'aftercollapseexpandcombo',
          desc: 'Emitted after an combo is collapsed or expanded, the parameter action indicates collapse or expand.',
        },
        {
          title: 'graphstatechange',
          desc: 'Emitted after graph.updateItemState being called.',
        },
        {
          title: 'afteractivaterelations',
          desc: "Emitted while activating a node by 'activate-relations' Behavior which is assigned to the the instance of Graph.",
        },
        {
          title: 'nodeselectchange',
          desc: "Emitted while the selected items are changed by 'brush-select', 'click-select' or 'lasso-select' Behavior which is assigned to the instance of Graph.",
        },
        {
          title: 'itemcollapsed',
          desc: "Emitted while a node is clicked to collapse or expand by 'collapse-expand' Behavior which is assigned to the instance of TreeGraph.",
        },
        {
          title: 'tooltipchange',
          desc: "Emitted after the show/hide state is changed by 'tooltip' or 'edge-tooltip' Behavior which is assigned to the instance of Graph.",
        },
        {
          title: 'wheelzoom',
          desc: "Emitted after the canvas is zoomed by 'zoom-canvas' Behavior which is assigned to the instance of Graph.",
        },
        {
          title: 'viewportchange',
          desc: 'Emitted after the canvas is translated by graph.moveTo, graph.translate, and graph.zoom.',
        },
        {
          title: 'dragnodeend',
          desc: "Emitted while drag node end by 'drag-node' Behavior.",
        },
        {
          title: 'stackchange',
          desc: 'Emitted while the redo or undo stacks are changed.',
        },
      ],
    },
    __GraphFunc: {
      data: {
        'graph.data(data)': {
          desc: 'Load the data for graph. Graph data, it should be an object containing an array of nodes and an array of edges.',
        },
        'graph.save()': {
          desc: 'Get the graph data. The return value has all the nodes and edges.',
        },
        'graph.read(data)': {
          desc: 'Read the data and render the graph. It is equal to combining graph.data(data) and graph.render().',
        },
        'graph.changeData(data, stack)': {
          desc: 'Change the data source, and render the graph according to the new data. If there is layout configured on the graph, the new data will be placed according to the layout algorithm. If you do not want to layout the new data with the origin layout algorithm, call graph.destroyLayout.',
        },
        'destroyLayout()': {
          desc: 'Destroy the layout algorithm. After that, the changeData will not place the new nodes with origin layout configurations.',
        },
      },
      render: {
        'graph.render()': {
          desc: 'Render the graph with data onto the canvas.',
        },
      },
      getSet: {
        'GraphOptions.renderer': {
          desc: 'Render the graph with Canvas or SVG. It is supported expecting V3.3.x.',
        },
        'GraphOptions.enabledStack': {
          desc: 'Whether to enable stack, that is, whether to support redo & undo operation. Support by V3.6 and latter versions.',
        },
        'GraphOptions.maxStep': {
          desc: 'The max step number of redo & undo, works only when the enabledStack is true. Support by V3.6 and latter versions.',
        },
      },
      transform: {
        'graph.getZoom()': {
          desc: 'Get the current zoom ratio. The return value indicates the current zoom ratio of view port. The default value is 1.',
        },
        'graph.zoom(ratio, center, animate, animateCfg)': {
          desc: 'Change the scale of the graph with a relative ratio. The function can take parameters such as ratio, center, animate, and animateCfg.',
        },
        'graph.zoomTo(toRatio, center)': {
          desc: 'Scale the graph to a target ratio. The function can take parameters such as toRatio and center.',
        },
        'graph.changeSize(width, height)': {
          desc: 'Change the size of the canvas. The function takes parameters width and height.',
        },
      },
      item: {
        'graph.addItem(type, model, stack)': {
          desc: 'Add item(node, edge) to the graph. G6 will use the model object as the model of the newly added item, and the model might be modified. If you do not want it to be modified, use the deep cloned model instead.',
        },
        'graph.removeItem(item, stack)': {
          desc: 'Remove the item. When the item is the id of a group, this operation will delete the corresponding group.',
        },
        // ... 他の "item" キーも同じように
      },
      state: {
        'graph.setItemState(item, state, enabled)': {
          desc: "Set the item's state. v3.4 and further versions support multiple values for a state, refer to Take Use of State Mechanism. This function will emit events beforeitemstatechange and afteritemstatechange.",
        },
        'graph.clearItemStates(item, states)': {
          desc: 'Clear the states of the item. This function could clear multiple states in the same time.',
        },
        'graph.priorityState(item, state)': {
          desc: 'Raise the priority of the specified state to the highest priority.',
        },
      },
      mode: {
        'graph.setMode(mode)': {
          desc: "Switch the interaction mode of graph. For example, switch from edit mode to read-only mode. The function takes a parameter 'mode' which is the name of the mode.",
        },
        'graph.getCurrentMode()': {
          desc: 'Get the current mode. The return value indicates the current interaction mode.',
        },
      },
      event: {
        'graph.on(event, callback)': {
          desc: "Bind an event. The event can be a native event of the canvas, such as 'click', 'mousedown', 'mouseup', 'dblclick', 'contextmenu', 'mouseenter', 'mouseleave', 'mouseover', 'mouseout', 'mousemove', 'dragstart', 'drag', 'dragend', 'drop'. Or a custom event, such as 'node:click', 'edge:click', 'canvas:click'.",
        },
        'graph.off(event, callback)': {
          desc: 'Unbind an event.',
        },
        'graph.emit(event, eventObject)': {
          desc: 'Emit an event. This function can be used to simulate an event.',
        },
        'graph.getEvents()': {
          desc: 'Get all the events bound on the graph.',
        },
      },
      behavior: {
        'graph.addBehaviors(behaviors, modes)': {
          desc: 'Add interaction behaviors to a mode or multiple modes. This function allows you to add specific behaviors to certain interaction modes of the graph.',
        },
        'graph.removeBehaviors(behaviors, modes)': {
          desc: 'Remove behavior(s) from mode(s). This function allows you to remove specific behaviors from certain interaction modes of the graph.',
        },
        'graph.updateBehavior(behavior, mode)': {
          desc: 'Update the configurations for a behavior from mode. This function allows you to update the configurations of a specific behavior in a certain interaction mode of the graph.',
        },
      },
      layout: {
        'graph.layout()': {
          desc: 'Re-layout the graph with current layout configurations in graph.',
        },
        'graph.updateLayout(cfg)': {
          desc: 'Update the layout configurations. If there is type in cfg, type is a string and it is different from current layout method, updateLayout(cfg) will change the layout method and relayout; If there is no type in cfg, updateLayout(cfg) will relayout with current layout method and new layout configurations.',
        },
        'destroyLayout()': {
          desc: 'Destroy the layout algorithm. After that, the changeData will not place the new nodes with origin layout configurations.',
        },
      },
      hull: {
        'createHull(cfg: HullCfg)': {
          desc: 'Create a hull for a cluster of nodes. The hull can be of different types such as round-convex, smooth-convex, or bubble. The hull can include specific nodes as members and can also exclude certain nodes as nonMembers. The hull can also have a specific style and padding.',
        },
        'getHulls()': {
          desc: 'Get all of the hulls in the current graph. The return value indicates the mapping of hull ID to the corresponding hull instance.',
        },
        'removeHull(id: string)': {
          desc: 'Remove a specific hull from the graph using its ID.',
        },
        'removeHulls()': {
          desc: 'Remove all the hulls present on the graph.',
        },
      },
    },
  },
  // 生成＋矛盾・欠損バリデーション、要約・整理＋矛盾・欠損バリデーション
  requirements: {
    graphLibrary: {
      library: 'antv/g6',
      version: 'v4.8.21',
      purpose: 'グラフの可視化とインタラクションを実現',
      caution: 'テスト中のバージョン。適切なバージョンの提案も受け付ける',
    },
    basicConcepts: {
      node: '編集可能なデータを持つ要素',
      edge: 'ノード間の関係性を示す',
      der: 'depender、親ノードとしても機能する',
      dee: 'dependee、子ノードとしても機能する',
    },
    graphFormat: {
      format: 'lsif形式',
      parentChildRelationship: 'lsifのエッジ情報で定義する',
    },
    displaySettings: {
      nodes: {
        derAndDee: '両方が円形で表示され、接触する形で視覚化される',
        color:
          '全色を使用し、同世代のノードは異なるカラーで、上位世代の色を優先して選択する',
      },
      edges: {
        colorIntensity: '接続するノードによって色の強度が異なる',
      },
      grouping: 'g6のhull機能でderとdeeのエリアをグループ化し視覚化する',
    },
    interactions: {
      click: {
        singleClick: {
          action: 'ノードの詳細情報をwebcomponentで表示',
          implementation: 'webcomponentで行う',
        },
        doubleClick: {
          der: {
            action: '1次下層のdeeを右側に表示',
            area: 'derのhullエリア内',
          },
          emptySpace: {
            action: '全der, deeが画面に収まるように表示',
          },
        },
      },
      drag: {
        action: 'グラフ内を自由に移動できる',
      },
      tooltip: {
        implementation:
          'g6の組み込みモードを使用せず、カスタムwebcomponentを利用',
      },
    },
    focusAndZoom: {
      focus: 'クリックされたノードやエッジが中心に、関連要素が周りに配置',
      zoom: {
        range: '50%~200%',
        method: 'マウスホイールやタッチのピンチ操作で実現',
      },
    },
    errorHandling: {
      display: 'webcomponentを使用した小さなアラート',
      userAction: 'ユーザーはエラーメッセージに従ってノードを編集可能',
      helpLink: 'エラーが発生した場合、ヘルプリンクが提供される',
    },
    uxDetails: {
      nodeDetailPopup: {
        design: '中央表示、webcomponentでの実装',
        size: '300px x 200px',
        colorScheme: '白背景&黒テキスト',
      },
    },
    dataStructure: {
      desc: 'lsifのエッジ情報を元に、ノードの親子関係が定義される。ノードには直列や並列の情報が存在する。',
    },
    performance: {
      desc: 'グラフの読み込みや描画、インタラクションが快適な速度で行える。',
    },
    responsiveness: {
      desc: '特定のデバイスや画面サイズに最適化されており、表示やインタラクションがスムーズに行える。',
    },
  },
};
