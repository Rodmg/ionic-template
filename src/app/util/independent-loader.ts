export class IndependentLoader {
  loading = false;
  start() {
    this.loading = true;
  }
  end() {
    this.loading = false;
  }
}
