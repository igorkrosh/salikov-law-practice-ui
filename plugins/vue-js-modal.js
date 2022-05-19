import Vue from 'vue';
import VModal from 'vue-js-modal/dist/ssr.nocss';
import AbstractModal from 'vue-js-modal/src/components/Modal.vue';

Vue.use(VModal, {
  componentName: 'abstract-modal',
});

Vue.component('Modal', {
  extends: AbstractModal,
  computed: {
    /**
     * Fix using "adaptive" and "scrollable" at the same time
     */
    autoHeight () {
      if (this.scrollable) {
        return 'auto';
      }
      return AbstractModal.computed.autoHeight.apply(this);
    }
  }
});