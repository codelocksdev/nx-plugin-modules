import { Container } from 'inversify';

let container: Container;

const getContainer = (): Container => {
  if (!container) container = new Container();
  return container;
};

export default getContainer;
