export class Colors {
  static randomColor (alpha: boolean = false): string {
    let color = ''
    let times = 6
    if (alpha) {
      times = 8
    }
    for (let i = 0; i < times; i++) {
      color += this.randomHexDigital()
    }

    return '#' + color
  }

  static randomColors (num: number, alpha: boolean = false): string[] {
    const colors: string[] = []
    for (let i = 0; i < num; i++) {
      colors.push(this.randomColor(alpha))
    }

    return colors
  }

  static randomHexDigital (): string {
    return Math.floor(Math.random() * 16).toString(16)
  }
}
