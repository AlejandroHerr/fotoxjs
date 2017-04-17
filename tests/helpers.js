export function Mouse() {
  this.downs = 0;
  this.onMouseDown = () => {
    this.downs += 1;
  };
}
