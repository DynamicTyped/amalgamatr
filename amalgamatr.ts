export class Amalgamatr {
    ParseColors(colorList: string[]): RGBA {
        throw new Error('Method not implemented.');
    }

    public ColorFromGradient(colorList: string[], percent: number) {
        var colors = this.ParseColors(colorList);
    }
}

class ColorConverter {
    DetectColorType(color: string) {
        var trimmedColor = color.trim();
        var length = trimmedColor.length;

        if(trimmedColor.startsWith('#') && (length === 7 || length === 9)) {
            return ColorType.Hex;
        } else if(trimmedColor.startsWith('#') && (length === 4 || length === 5)) {
            return ColorType.ShortHex;
        }
    }
}

enum ColorType {
    Hex = 1,
    ShortHex,
    RGB,
    HSL,
    HWB,
    Gray,
    CMYK,
    Named
}

