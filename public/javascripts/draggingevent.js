'use strict';

interact('.dragging')
  .preventDefault('never')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: {
        top: 0,
        left: 0,
        bottom: 1,
        right: 1
      }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,

  });
//------------------------------------------------------//
interact('.resizing')
  .preventDefault('never')
  .draggable({
    onmove: window.dragMoveListener,
    restrict: {
      restriction: 'parent',
      elementRect: {
        top: 0,
        left: 0,
        bottom: 1,
        right: 1
      }
    },
  })
  .resizable({
    // resize from all edges and corners
    edges: {
      left: true,
      right: true,
      bottom: true,
      top: true
    },

    // keep the edges inside the parent
    restrictEdges: {
      outer: 'parent',
      endOnly: true,
    },

    // minimum size
    restrictSize: {
      min: {
        width: 10,
        height: 10
      },
    },

    inertia: true,
  })
  .on('resizemove', function (event) {
    var target = event.target,
      x = (parseFloat(target.getAttribute('data-x')) || 0),
      y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
      'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  });




//------------------------------------------------------//




//------------------------------------------------------//
var startPos = null,
  ejeX = null,
  ejeY = null;
var canvas;
var ctx;

interact('#work-space').dropzone({
  // only accept elements matching this CSS selector
  accept: '#drag-button, #drag-image, #drag-text, #drag-form',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active');
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget,
      dropzoneElement = event.target,
      dropRect = interact.getElementRect(dropzoneElement),
      dropCenter = {
        x: dropRect.left + dropRect.width / 2,
        y: dropRect.top + dropRect.height / 2
      };

    event.draggable.draggable({
      snap: {
        targets: [dropCenter]
      }
    });

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target');
    draggableElement.classList.add('can-drop');
    //draggableElement.textContent = 'Dragged in';

  },
  ondragleave: function (event) {
    event.draggable.draggable({
      snap: {
        targets: [startPos],
        endOnly: true
      }
    });

    // remove the drop feedback style
    event.target.classList.remove('drop-target');
    event.relatedTarget.classList.remove('can-drop');
  },
  ondrop: function (event) {
    var id = event.relatedTarget.id;
    switch (id) {
      case 'drag-button':
        $('<div/>', {
            id: 'button-field',
            class: 'resizing button-container',
            style: 'width:70px;border:1px solid;position:relative;',
            title: 'button'
          }).load("templates/button/button.html")
          .appendTo($(event.target));
        break;
      case 'drag-image':
        var img_html = $('<div/>', {
          id: 'image-field',
          class: 'resizing image-container',
          style: 'width:30%;border-width:1px;border-style:dashed;padding:50px 0;text-align:center;',
          title: 'image'
        }).load("templates/image/image.html");
        break;
      case 'drag-text':
        $('<div/>', {
            id: 'text-field',
            class: 'resizing text-container',
            style: 'width:30%;border-width:1px;border-style:dashed;padding:50px 0;text-align:center;',
            title: 'text'
          }).load("templates/text/text.html")
          .appendTo($(event.target));
        $(event.target).append('');
        break;
      case 'drag-form':
        $('<div/>', {
            id: 'form-field',
            class: 'resizing form-container',
            style: 'width:60%',
            title: 'form'
          }).load("templates/form/form.html")
          .appendTo($(event.target));
        break;
    }

  },
  ondropdeactivate: function (event) {
    event.draggable.draggable({
      snap: {
        targets: [startPos],
        endOnly: true
      }
    });
    // remove active dropzone feedback
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
  }
});

//-------
function stripAndExecuteScript(text) {
  var scripts = '';
  var cleaned = text.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function () {
    scripts += arguments[1] + '\n';
    return '';
  });

  if (window.execScript) {
    window.execScript(scripts);
  } else {
    var head = document.getElementsByTagName('head')[0];
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('type', 'text/javascript');
    scriptElement.innerText = scripts;
    head.appendChild(scriptElement);
    head.removeChild(scriptElement);
  }
  return cleaned;
};
//-------

interact('.drag-drop')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    snap: {
      targets: [startPos],
      range: Infinity,
      relativePoints: [{
        x: 0.5,
        y: 0.5
      }],
      endOnly: true
    },

    onstart: function (event) {
      var rect = interact.getElementRect(event.target);

      // record center point when starting the very first a drag
      startPos = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      }

      event.interactable.draggable({
        snap: {
          targets: [startPos]
        }
      });

      /*event.target.setAttribute('data-start-x', rect.left + rect.width  / 2);
      event.target.setAttribute('data-start-y', rect.top  + rect.height / 2);
      ejeX = parseFloat(event.target.getAttribute('data-start-x'));
      ejeY = parseFloat(event.target.getAttribute('data-start-y'));


      console.log('jsjs')
      console.log(ejeX);
      console.log(event.target.getAttribute('data-start-x'));
      console.log(ejeY);
      console.log(event.target.getAttribute('data-start-y'));*/

    },

    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var target = event.target,
        x = 0,
        y = 0;
      event.interactable.draggable({
        snap: {
          targets: [startPos]
        }
      });
      // translate the element
      target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

      // update the posiion attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }
  });

//------------------------------------------------//

function dragMoveListener(event) {
  var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;