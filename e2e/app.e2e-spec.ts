import { AppPage } from './app.po';

describe('api-client App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Universal Demo using Angular and Angular CLI');
  });
});
