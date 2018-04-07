/** Implementation of a short hex color (ex: #FFF or #FFFF) */
class ShortHexColor extends HexColor {
    constructor(value: string = '') {
        super(value);
    }

    protected validate(): boolean {
        // Validates string starts with #, and contains 3-4 nibbles.
        return /^(#[0-9a-f]{3})|(#[0-9a-f]{4})$/i.test(this.Value);
    }

    protected parse() {
        this.Red = parseInt(this.Value[1], 16) * 16;
        this.Green = parseInt(this.Value[2], 16) * 16;
        this.Blue = parseInt(this.Value[3], 16) * 16;
        this.Alpha = this.Value.length === 5 ? parseInt(this.Value[4], 16) : 1;
    }

    protected toHex(value: number) {
        const clampedValue = Math.min(16, Math.max(0, Math.round(value / 16)));
        return `${clampedValue < 16 ? '0' : ''}${clampedValue}`;
    }
}
