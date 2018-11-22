import puppeteer from 'puppeteer';
import RouterConfig from '../../config/router.config';

const BASE_URL = `http://localhost:${process.env.PORT || 8000}`;

const formatter = (menu = []) =>
  menu
    .reduce((preItem, currItem) => {
      preItem.push(currItem);
      const child = currItem.children || currItem.routes;
      if (child) {
        return preItem.concat(formatter(child));
      }
      return preItem;
    }, [])
    .filter(item => item.menutype === 2 && !(/\/\buser\b/ig.test(item.path)));

describe('Homepage', () => {
  let browser;
  let page;

  const testPage = path => async () => {
    await page.goto(`${BASE_URL}/#${path}`, { waitUntil: 'networkidle2' });
    const haveFooter = await page.evaluate(
      () => document.getElementsByTagName('footer').length > 0
    );
    expect(haveFooter).toBeTruthy();
  };

  beforeAll(async () => {
    jest.setTimeout(1000000);
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    page = await browser.newPage();
  });
  RouterConfig.forEach(({ routes = [] }) => {
    formatter(routes).forEach(route => {
      const { path } = route;
      it(`test pages ${path}`, testPage(path));
    });
  });


  afterAll(() => browser.close());
});
