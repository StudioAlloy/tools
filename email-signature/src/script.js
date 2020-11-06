var app = new Vue({
  el: '#app',
  data: {
    name: 'Name Lastname',
    email: 'email',
    domain: 'domain.com',
    phone: '+31(0)6 12 34 56 78',
    color: '#ee6644',
    address: 'Address',
    addressExtra: 'Address extra',
    links: []
  },
  methods: {
    decrement: function () {
      this.links.pop();
    },
    increment: function () {
      const obj = {
        title: 'Title',
        url: 'domain.com'
      }
      this.links.push(obj);
    },
  }
});