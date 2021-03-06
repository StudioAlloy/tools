Vue.directive("highlightjs", {
  deep: true,
  bind: function (el, binding) {
    // on first bind, highlight all targets
    let targets = el.querySelectorAll("code");
    targets.forEach(target => {
      // if a value is directly assigned to the directive, use this
      // instead of the element content.
      if (binding.value) {
        target.textContent = binding.value;
      }
      hljs.highlightBlock(target);
    });
  },
  componentUpdated: function (el, binding) {
    // after an update, re-fill the content and then highlight
    let targets = el.querySelectorAll("code");
    targets.forEach(target => {
      if (binding.value) {
        target.textContent = binding.value;
        hljs.highlightBlock(target);
      }
    });
  } });


var app = new Vue({
  el: "#app",
  data: {
    combos: [
    {
      id: +new Date(),
      combo: [{ key: "KC_A" }, { key: "KC_B" }],
      result: "KC_ESC" }],


    comboMax: null,
    comboKeyMax: 8,
    isUserReady: false },


  computed: {
    sourcecode() {
      return `enum combos { 
  ${this.enum}
};

${this.uint16_t}
combo_t key_combos[COMBO_COUNT] = {
  ${this.combo_t}
};`;
    },
    enum() {
      return this.combos.reduce((result, item) => {
        const combo = item.combo.reduce((result, key) => {
          return result += `${this.upperCase(this.replaceKC(key.key))}_`;
        }, '');

        return result += `${combo}${this.upperCase(this.replaceKC(item.result))},\n  `;
      }, '');
    },
    uint16_t() {
      return this.combos.reduce((result, item) => {
        const combo = item.combo.reduce((result, key) => {
          return result += `${this.replaceKC(key.key)}_`;
        }, '');

        const keys = item.combo.reduce((result, key) => {
          return result += `${this.upperCase(key.key)}, `;
        }, '');

        return result += `const uint16_t PROGMEM ${combo}${this.replaceKC(item.result)}[] = { ${keys}COMBO_END};\n`;
      }, '');
    },
    combo_t() {
      return this.combos.reduce((result, item) => {
        const combo = item.combo.reduce((result, key) => {
          return result += `${this.replaceKC(key.key)}_`;
        }, '');

        return result += `[${this.upperCase(combo)}${this.upperCase(this.replaceKC(item.result))}] = COMBO(${combo}${this.replaceKC(item.result)}_combo, ${this.upperCase(item.result)}),\n  `;
      }, '');
    } },

  methods: {
    replaceKC(str) {
      return str.toLowerCase().replace("kc_", "");
    },
    upperCase(str) {
      return str.toUpperCase();
    },
    userIsReady() {
      this.isUserReady = true;
    },
    addCombo() {
      const comboBase = { id: +new Date(), combo: [{ key: "KC_A" }, { key: "KC_B" }], result: "KC_BSPC" };
      this.combos.push(comboBase);
    },
    removeCombo(index) {
      this.combos.splice(index, 1);
    },
    addKey(index) {
      this.combos[index].combo.push({ key: "KC_C" });
    },
    removeKey(index) {
      this.combos[index].combo.pop();
    } },

  mounted() {
    console.log('App mounted!');
    if (localStorage.getItem('combos')) this.combos = JSON.parse(localStorage.getItem('combos'));
  },
  watch: {
    combos: {
      handler() {
        console.log('Combos changed!');
        localStorage.setItem('combos', JSON.stringify(this.combos));
      },
      deep: true } } });