function collision(e1, e2) {
  let npx = ((e1.x + e1.w / 2) - (e2.x + e2.w / 2)) / e2.w;
  let npy = ((e1.y + e1.h / 2) - (e2.y + e2.h / 2)) / e2.h;
  if (!(e1.x + e1.w < e2.x || e1.x > e2.x + e2.w || e1.y + e1.h < e2.y || e1.y > e2.y + e2.h)) {
    if (Math.abs(npx) > Math.abs(npy)) {
      if (npx > 0) {
        return [2, e2.x + e1.w - e2.x]
      } else {
        return [0, e1.x + e1.w - e2.x]
      }
    } else {
      if (npy > 0) {
        return [3, e2.y + e2.h - e1.y]
      } else {
        return [1, e1.y + e1.h - e2.y]
      }
    }
  }
  return 0;
}
