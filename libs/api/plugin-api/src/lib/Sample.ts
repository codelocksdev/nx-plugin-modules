import { injectable } from 'inversify';
import SampleAPI from './SampleAPI';

@injectable()
class Sample implements SampleAPI {
  private count = 0;

  public incrementCount = () => {
    this.count += 1;
  };

  public getCount = () => {
    return this.count;
  };
}

export default Sample;
