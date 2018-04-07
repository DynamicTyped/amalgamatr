describe('Hex Colors', () => {
    it('parses 6-character hex colors correctly', () => {
        const color = new HexColor('#ffffff');
        expect(color.Red).toBe(255);
        expect(color.Green).toBe(255);
        expect(color.Blue).toBe(255);
        expect(color.Alpha).toBe(255);
    });
});
