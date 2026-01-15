export function customEasing(
  x: number,
  inputThreshold = 0.2,
  firstOutputRatio = 0.7
) {
  const secondInputRatio = 1 - inputThreshold

  if (x < -1 || x > 1) {
    throw new Error("Input value must be between -1 and 1.")
  }

  const inputSign = x >= 0 ? 1 : -1
  const inputValue = Math.abs(x)

  let output
  if (inputValue <= inputThreshold) {
    output = (firstOutputRatio * inputValue) / inputThreshold
  } else {
    output =
      firstOutputRatio +
      ((1 - firstOutputRatio) * (inputValue - inputThreshold)) /
        secondInputRatio
  }

  return inputSign * output * 0.12
}
