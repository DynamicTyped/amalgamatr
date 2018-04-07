/** Implementation of a standard hex color (ex: #FFFFFF or #FFFFFFFF) */
class HexColor extends Color {
    constructor(protected Value: string = '') {
        super();
        this.Value = this.Value.trim();

        if (Value !== null && Value.length > 0) {
            if (!this.validate()) {
                throw new Error('Not a valid hex color!');
            }

            this.parse();
        }
    }

    /** Converts the internal RGB notation back to hex */
    public toString() {
        const rHex = this.toHex(this.Red);
        const gHex = this.toHex(this.Green);
        const bHex = this.toHex(this.Blue);
        const aHex = this.toHex(this.Alpha);

        return `#${rHex}${gHex}${bHex}${aHex}`;
    }

    protected validate(): boolean {
        // Validates string starts with #, and contains 6-8 nibbles.
        return /^(#[0-9a-f]{6})|(#[0-9a-f]{8})$/i.test(this.Value);
    }

    protected parse() {
        this.Red = parseInt(this.Value.substr(1, 2), 16);
        this.Green = parseInt(this.Value.substr(3, 2), 16);
        this.Blue = parseInt(this.Value.substr(5, 2), 16);
        this.Alpha = this.Value.length === 9 ? parseInt(this.Value.substr(7, 2), 16) : 1;
    }

    protected toHex(value: number) {
        const clampedValue = Math.min(255, Math.max(0, Math.round(value)));
        return `${clampedValue < 16 ? '0' : ''}${clampedValue}`;
    }
}
