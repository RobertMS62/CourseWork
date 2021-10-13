export const viewDetailMixin = {
  methods: {
    viewDetailInfo(id, item) {
      try {

        this.$store.dispatch('getItem', { id, item });
        this.$emit('open-modal');
      } catch (e) {
        this.error = e;
      }
    }
  }
};
