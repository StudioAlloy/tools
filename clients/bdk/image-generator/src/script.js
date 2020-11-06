//Add a description to the data object with the value "A pair of warm, fuzzy socks". Then display the description using an expression in an p element, underneath the h1.

var app = new Vue({
  el: "#app",
  data: {
    title: "Docu Lab | Event title ",
    date: "22 jun 2019 | 20:00 ",
    image: "",
    logo: true
  },
  methods: {
    //------------------------------------------------------//
    // File upload
    //------------------------------------------------------//
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function(e) {
      this.image = "";
    }
    //------------------------------------------------------//
    // END File upload
    //------------------------------------------------------//
    
  },
  mounted() {
    //------------------------------------------------------//
    // Drag & drop
    //------------------------------------------------------//
    //     var contextmenu = document.querySelector('.draggable');
    //     var initX, initY, mousePressX, mousePressY;

    //     contextmenu.addEventListener('mousedown', function(event) {

    //       initX = this.offsetLeft;
    //       initY = this.offsetTop;
    //       mousePressX = event.clientX;
    //       mousePressY = event.clientY;

    //       this.addEventListener('mousemove', repositionElement, false);

    //       window.addEventListener('mouseup', function() {
    //         contextmenu.removeEventListener('mousemove', repositionElement, false);
    //       }, false);

    //     }, false);

    //     function repositionElement(event) {
    //       // this.style.left = initX + event.clientX - mousePressX + 'px';
    //       this.style.top = initY + event.clientY - mousePressY + 'px';
    //     }
    // Learnt and adapted from: http://tech.pro/tutorial/650/javascript-draggable-elements from a user comments post/code (@TheDesigner in 2009-ish).

    // Global variables without any specified type (type will be determined when used in the functions below).
    var obj, x, y, prev_x, prev_y;

    function drag(e) {
      // Yep, use the object I just clicked on.
      obj = e.target;
      // Set current X coordinate minus distance left from offsetParent node.
      prev_x = x - obj.offsetLeft;
      // Set current Y coordinate minus distance top from offsetParent node.
      prev_y = y - obj.offsetTop;
      // Change the object's color so it looks like it's usable/moveable.
      // obj.style.background = '#00ff00';
    }

    function move(e) {
      // Always track and record the mouse's current position.
      if (e.pageX) {
        x = e.pageX; // X coordinate based on page, not viewport.
        y = e.pageY; // Y coordinate based on page, not viewport.
      }
      //  else if (e.clientX) {
      //    x=clientX; // X coordinate based on viewport.
      //    y=clientY; // Y coordinate based on viewport.
      //  }

      // If the object specifically is selected, then move it to the X/Y coordinates that are always being tracked.
      if (obj) {
        obj.style.left = x - prev_x + "px";
        obj.style.top = y - prev_y + "px";
      }
    }

    function drop() {
      // Revert to the default css style.
      obj.style.background = "";
      // Remove the attached event from the element so it doesn't keep following your mouse. :)
      obj = false;
    }

    // Make a specific element movable
    document.querySelector("#background").onmousedown = drag;
    document.querySelector("#title").onmousedown = drag;
    document.querySelector("#logo").onmousedown = drag;

    document.onmousemove = move;
    document.onmouseup = drop;

    //------------------------------------------------------//
    // END Drag & drop
    //------------------------------------------------------//
    //------------------------------------------------------//
    // Generate image
    //------------------------------------------------------//
    const capture = document.querySelector("#export-image");
    const button = document.querySelector("#download");

    // Function on click
    function downloadImage() {
      html2canvas(capture, {
        allowTaint: true,
        onrendered: function(canvas) {
          canvas.toBlob(function(blob) {
            saveAs(blob, "social.jpg");
          }, "image/jpeg");
        }
      });
    }
    // Event Listener
    button.addEventListener("click", downloadImage);
    //------------------------------------------------------//
    // END Generate image
    //------------------------------------------------------//
  }
});