var app = new Vue({
  el: '#app',
  data: {
    name: 'Name Lastname',
    title: 'Functie bij Pigge',
    email: 'email',
    showPhone: false,
    phone: '+31(0)6 12 34 56 78',
    winkel: '023 531 2454',
    showDisclaimer: false },

  methods: {
    togglePhone() {
      this.showPhone = !this.showPhone;
    } } });