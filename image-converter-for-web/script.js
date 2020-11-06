var app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!",
    image: null,
    fileName: '',
    centerLine: true,
    size: 2,
    backgroundColor: '#ffc0cb',
    quality: 80,
    zoom: 11,
    version: '1.0',
    fileName: '',
  },

  computed: {
    convertZoom: function () {
      return this.zoom / 10;
    },
    convertQuailty: function () {
      return (this.quality / 100).toFixed(1);
    },
    updateFileName: function () {
      console.warn(this.fileName);

      function slugify(string) {
        const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
        const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
        const p = new RegExp(a.split('').join('|'), 'g')

        return string.toString().toLowerCase()
          .replace(/\s+/g, '-') // Replace spaces with -
          .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
          .replace(/&/g, '-and-') // Replace & with 'and'
          .replace(/[^\w\-]+/g, '') // Remove all non-word characters
          .replace(/\-\-+/g, '-') // Replace multiple - with single -
          .replace(/^-+/, '') // Trim - from start of text
          .replace(/-+$/, '') // Trim - from end of text
      }
      const date = Date.now();
      const result = slugify(`${this.fileName}-${date}`);
      return result;
    }

  },

  methods: {
    //------------------------------------------------------//
    // File upload
    //------------------------------------------------------//
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
      console.warn(files[0].name);
      this.fileName = files[0].name.split('.').slice(0, -1).join('.');
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
    removeImage: function (e) {
      this.image = "";
    },
    //------------------------------------------------------//
    // END File upload
    //------------------------------------------------------//
    downloadImage: function () {

      let currentQuailty = Number(this.convertQuailty);
      let name = this.updateFileName;
      console.warn('test');
      html2canvas(this.$refs.download, {
        scale: this.size
      }).
        then(function (canvas) {
          document.body.appendChild(canvas);
          canvas.toBlob(function (blob) {
            saveAs(blob, name);
          }, "image/jpeg", currentQuailty);
        });
    }
  },

  mounted() {
    Draggable.create("#background .alloy-image");
  }
});