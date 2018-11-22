import puppeteer from 'puppeteer';
import defaultSettings from '@/defaultSettings';

const { title } = defaultSettings;
const BASE_URL = `http://localhost:${process.env.PORT || 8000}`;

describe('Login', () => {
  let browser;
  let page;

  beforeAll(async () => {
    jest.setTimeout(1000000);
    browser = await puppeteer.launch({ args: ['--no-sandbox']});
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(`${BASE_URL}/#/user/login`, { waitUntil: 'networkidle2' });
  });

  afterEach(() => page.close());

  it('should login with failure', async () => {
    await page.waitForSelector('#username', {
      timeout: 2000,
    });
    await page.type('#username', 'mockuser');
    await page.type('#password', 'wrong_password');
    await page.type('#code', 'wrong_code');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.ant-alert-error'); // should display error
  });

  it('should login successfully', async () => {
    await page.waitForSelector('#username', {
      timeout: 2000,
    });
    await page.type('#username', 'admin');
    await page.type('#password', 'admin');
    await page.type('#code', '123');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.ant-layout-sider h1'); // should display error
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain(`<h1>${title}</h1>`);
  });

  afterAll(() => browser.close());
});
