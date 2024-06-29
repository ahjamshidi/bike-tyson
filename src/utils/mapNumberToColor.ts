const interpolateColor = (startColor: [number, number, number], endColor: [number, number, number], factor: number): [number, number, number] => {
  const result = startColor.map((start, index) => {
    return Math.round(start + factor * (endColor[index] - start));
  }) as [number, number, number];
  return result;
};
const rgbToHex = (rgb: [number, number, number]): string => {
  return `#${rgb.map(value => value.toString(16).padStart(2, '0')).join('')}`;
};
export const mapNumberToColor = (value: number, min: number, max: number, startColor: [number, number, number], endColor: [number, number, number]): string => {
  if (value < min) value = min;
  if (value > max) value = max;
  const factor = (value - min) / (max - min);
  const interpolatedColor = interpolateColor(startColor, endColor, factor);
  return rgbToHex(interpolatedColor);
};