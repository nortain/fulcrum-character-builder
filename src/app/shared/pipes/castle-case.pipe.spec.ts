import { CastleCasePipe } from './castle-case.pipe';

describe('CastleCasePipe', () => {
  it('create an instance', () => {
    const pipe = new CastleCasePipe();
    expect(pipe).toBeTruthy();
  });

  it('should be able to format a string correctly', () => {
    const mockString = "heyWeAreCool";
    const correctString = "Hey We Are Cool";
    const pipe = new CastleCasePipe();
    expect(pipe.transform(mockString)).toBe(correctString);
  });

  it('should be able to handle other strings', () => {
    const mock = " asdfCoolnessAsIF I freaking care";
    const actual = "Asdf Coolness As I F  I freaking care";
    const pipe = new CastleCasePipe();
    expect(pipe.transform(mock)).toBe(actual);
  });
});
