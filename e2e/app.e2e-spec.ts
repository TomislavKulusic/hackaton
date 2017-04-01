import { DuCardPage } from './app.po';

describe('du-card App', () => {
  let page: DuCardPage;

  beforeEach(() => {
    page = new DuCardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
