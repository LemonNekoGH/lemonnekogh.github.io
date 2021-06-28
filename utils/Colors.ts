import { random } from '@ctrl/tinycolor'

export class Colors {
  static randomColor (): string {
    let color = random()
    while (color.getBrightness() < 114 || color.getBrightness() > 144) {
      color = random()
    }
    return '#' + color.toHex()
  }

  static randomColors (num: number): string[] {
    const colors: string[] = []
    for (let i = 0; i < num; i++) {
      colors.push(this.randomColor())
    }
    return colors
  }
}
