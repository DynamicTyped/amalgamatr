interface IColor {
    toString(value: string);
}

abstract class Color implements IColor {
    public Red: number = 0;
    public Green: number = 0;
    public Blue: number = 0;
    public Alpha: number = 1;

    public abstract toString();
}