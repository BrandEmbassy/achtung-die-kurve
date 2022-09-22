/**
 * Generates random integer from `min` to `max`
 * @param {number} min
 * @param {number} max
 */
export const int = (min, max) => {
  min = Math.floor(min)
  max = Math.floor(max)
  if (max < min) {
    ;[min, max] = [max, min]
  }
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const color = (min = 0, max = 16777214) => {
  return '#' + int(min, max).toString(16)
}

export const curveColor = () => {
  return color(5592404, 11184809)
}
