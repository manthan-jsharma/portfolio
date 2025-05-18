export class TextScrambler {
  el: HTMLElement;
  chars = "!<>-_\\/[]{}—=+*^?#________";
  frameRequest: number | null = null;
  queue: {
    from: string;
    to: string;
    start: number;
    end: number;
    char?: string;
  }[] = [];
  frame = 0;
  resolve!: () => void;

  constructor(el: HTMLElement) {
    this.el = el;
  }

  setText(newText: string): Promise<void> {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20);
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest!);
    this.frame = 0;

    return new Promise((resolve) => {
      this.resolve = resolve;
      this.update();
    });
  }
  randomColor() {
    const colors = [
      "#ff007c", // Neon Pink
      "#39ff14", // Electric Green
      "#0ff0fc", // Cyan Blue
      "#ffea00", // Bright Yellow
      "#ff6ec7", // Hot Pink
      "#9400ff", // Vivid Purple
      "#00f0ff", // Electric Cyan
      "#ff2400", // Scarlet
      "#fe00f6", // Ultra Pink
      "#f83600", // Fiery Orange
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  update = () => {
    let output = "";
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      const { from, to, start, end } = this.queue[i];
      let { char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        const color = this.randomColor();
        output += `<span style="color: ${color}">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frame++;
      this.frameRequest = requestAnimationFrame(this.update);
    }
  };

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}
