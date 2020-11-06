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
    version: '1.0' },

  computed: {
    convertZoom: function () {
      return this.zoom / 10;
    },
    convertQuailty: function () {
      return (this.quality / 100).toFixed(1);
    } },

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
    removeImage: function (e) {
      this.image = "";
    },
    //------------------------------------------------------//
    // END File upload
    //------------------------------------------------------//
    downloadImage: function () {

      let currentQuailty = Number(this.convertQuailty);

      html2canvas(this.$refs.download, {
        scale: this.size }).
      then(function (canvas) {
        document.body.appendChild(canvas);
        canvas.toBlob(function (blob) {
          saveAs(blob, "social.jpg");
        }, "image/jpeg", currentQuailty);
      });
    } },

  mounted() {
    Draggable.create("#background .alloy-image");
  } });