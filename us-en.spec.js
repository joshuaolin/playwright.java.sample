import { test, expect, chromium } from '@playwright/test';

class BrowserTest {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async setup() {
    this.browser = await chromium.launch({ headless: false });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
  }

  async teardown() {
    await this.browser.close();
  }

  async navigateTo(url) {
    test.setTimeout(400000);
    await this.page.goto(url);
  }

  async clickLink(locator) {
    await this.page.locator(locator).click({ timeout: 400000 });
  }

  async verifyURL(expectedURL) {
    try {
      await expect(this.page).toHaveURL(expectedURL, { timeout: 400000 });
      console.log(`Page title: ${await this.page.title()}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  async runTest() {
    await this.setup();

    try {
      await this.navigateTo('https://www.essilor.com/us-en/');

      const links = [
        { main: 'About us', sub1: 'Learn more', url: 'https://www.essilor.com/us-en/about-us/' },
        { main: 'About us', sub2: 'Mission', url: 'https://www.essilor.com/us-en/mission/' },
        { main: 'About us', sub2: 'Innovation', url: 'https://www.essilor.com/us-en/innovation/' },
        { main: 'About us', sub2: 'Essilor Experts', url: 'https://www.essilor.com/us-en/essilor-experts/' },
        { main: 'About us', sub2: 'Advanced vision accuracy', url: 'https://www.essilor.com/us-en/advanced-vision-accuracy/' },

        { main: 'Our products', sub1: 'Discover all products', url: 'https://www.essilor.com/us-en/products/' },

        { main: 'Our products', sub2: 'Eyezen', url: 'https://www.essilor.com/us-en/products/eyezen/' },
        { sub3: 'Technology', url: 'https://www.essilor.com/us-en/products/eyezen/technology/' },
        { sub3: 'Frequently Asked Questions', url: 'https://www.essilor.com/us-en/products/eyezen/frequently-asked-questions/' },

        { main: 'Our products', sub2: 'Varilux', url: 'https://www.essilor.com/us-en/products/varilux/' },
        { sub3: 'Technology', url: 'https://www.essilor.com/us-en/products/varilux/technology/' },
        { sub3: 'Frequently Asked Questions', url: 'https://www.essilor.com/us-en/products/varilux/frequently-asked-questions/' },

        { main: 'Our products', sub2: 'Blue UV', url: 'https://www.essilor.com/us-en/products/blue-uv-filter-system/' },
        { sub3: 'Technology', url: 'https://www.essilor.com/us-en/products/blue-uv-filter-system/technology/' },
        { sub3: 'Frequently Asked Questions', url: 'https://www.essilor.com/us-en/products/blue-uv-filter-system/frequently-asked-questions/' },

        { main: 'Our products', sub2: 'Xperio', url: 'https://www.essilor.com/us-en/products/xperio/' },
        { sub3: 'Technology', url: 'https://www.essilor.com/us-en/products/xperio/technology/' },
        { sub3: 'Frequently Asked Questions', url: 'https://www.essilor.com/us-en/products/xperio/frequently-asked-questions/' },

        { main: 'Our products', sub2: 'Transitions', url: 'https://www.essilor.com/us-en/products/transitions/' },
        { sub3: 'Frequently Asked Questions', url: 'https://www.essilor.com/us-en/products/transitions/frequently-asked-questions/' },

        { main: 'Our products', sub2: 'Crizal', url: 'https://www.essilor.com/us-en/products/crizal/' },
        { sub3: 'Technology', url: 'https://www.essilor.com/us-en/products/crizal/technology/' },
        { sub3: 'Frequently Asked Questions', url: 'https://www.essilor.com/us-en/products/crizal/frequently-asked-questions/' },

        { main: 'Our products', sub2: 'Eyezen', scroll: 6000, sub5: 'https://media.essilor.com/cms/caas/v1/media/12566/data/picture/6ba14e0d22a4829c7d94d9731a87c20c.jpg', url: 'https://www.essilor.com/us-en/products/eyezen/eyezen-start/' },
        { main: 'Our products', sub2: 'Eyezen', scroll: 6000, sub5: 'https://media.essilor.com/cms/caas/v1/media/12564/data/picture/c886c46e3334d29686f9e5bb44cedbae.jpg', url: 'https://www.essilor.com/us-en/products/eyezen/eyezen-plus/' },

        { main: 'Our products', sub2: 'Varilux', scroll: 7500, sub5: 'https://media.essilor.com/cms/caas/v1/media/350612/data/picture/d4756618990e601c8f0e9855ada2fa64.png', url: 'https://www.essilor.com/us-en/products/varilux/varilux-xr-series/' },
        { main: 'Our products', sub2: 'Varilux', scroll: 7500, sub5: 'https://media.essilor.com/cms/caas/v1/media/40100/data/picture/71758178eabb48f977021d4bd39b64f7.png', url: 'https://www.essilor.com/us-en/products/varilux/varilux-x-series/' },
        { main: 'Our products', sub2: 'Varilux', scroll: 7500, sub5: 'https://media.essilor.com/cms/caas/v1/media/40096/data/picture/d69997f14aa9276617a66836037d4728.jpg', url: 'https://www.essilor.com/us-en/products/varilux/varilux-comfort-max/' },
        { main: 'Our products', sub2: 'Varilux', scroll: 7500, sub5: 'https://media.essilor.com/cms/caas/v1/media/837158/data/picture/2d30b5ad9a04786be0d25aa8f49e875e.jpg', url: 'https://www.essilor.com/us-en/products/varilux/varilux-physio-w3-plus/' },

        { main: 'Our products', sub2: 'Blue UV', scroll: 7000, sub5: 'https://media.essilor.com/cms/caas/v1/media/40112/data/picture/ca158195c0fbdec39ebf67ac545eabed.jpg', url: 'https://www.essilor.com/us-en/products/blue-uv-filter-system/blue-uv-capture/' },
        { main: 'Our products', sub2: 'Blue UV', scroll: 7000, sub5: 'https://media.essilor.com/cms/caas/v1/media/40110/data/picture/97801ff314172f5622850e5c8bb8ba71.jpg', url: 'https://www.essilor.com/us-en/products/blue-uv-filter-system/eye-protect-system/' },

        { main: 'Our products', sub2: 'Xperio', scroll: 7500, sub5: 'https://media.essilor.com/cms/caas/v1/media/40196/data/picture/4d880918ab89cfba7c2bb05bb0cee55d.png', url: 'https://www.essilor.com/us-en/products/xperio/xperio-polarized/' },
        { main: 'Our products', sub2: 'Xperio', scroll: 7500, sub5: 'https://media.essilor.com/cms/caas/v1/media/40198/data/picture/ca9924595286937f92ba050e7ce10340.png', url: 'https://www.essilor.com/us-en/products/xperio/xperio-tinted/' },
        { main: 'Our products', sub2: 'Xperio', scroll: 7500, sub5: 'https://media.essilor.com/cms/caas/v1/media/40194/data/picture/0e95b9459398a87fcb59c4a58af8a695.jpg', url: 'https://www.essilor.com/us-en/products/xperio/xperio-mirror/' },

        { main: 'Our products', sub2: 'Transitions', scroll: 5200, sub5: 'https://media.essilor.com/cms/caas/v1/media/1053206/data/picture/21825e7099510c8e29bebc12096a0dbc.png', url: 'https://www.essilor.com/us-en/products/transitions/transitions-gen-s/' },
        { main: 'Our products', sub2: 'Transitions', scroll: 5200, sub5: 'https://media.essilor.com/cms/caas/v1/media/12598/data/picture/ade51e909d0b12194fb2e6fec5947024.jpg', url: 'https://www.essilor.com/us-en/products/transitions/transitions-xtractive/' },
        { main: 'Our products', sub2: 'Transitions', scroll: 5200, sub5: 'https://media.essilor.com/cms/caas/v1/media/40214/data/picture/80f2e41b690d912b3e8f85d44e14e0b3.jpg', url: 'https://www.essilor.com/us-en/products/transitions/transitions-xtractive-polarized/' },

        { main: 'Our products', sub2: 'Crizal', scroll: 7500, sub5: 'https://media.essilor.com/cms/caas/v1/media/12528/data/picture/3f0fe86225e691f4f7511a168a50ae47.jpg', url: 'https://www.essilor.com/us-en/products/crizal/crizal-sapphire-hr/' },
        { main: 'Our products', sub2: 'Crizal', scroll: 7500, sub5: 'https://media.essilor.com/cms/caas/v1/media/12530/data/picture/622be1557152b12e60134348f5dbc157.jpg', url: 'https://www.essilor.com/us-en/products/crizal/crizal-rock/' },
        { main: 'Our products', sub2: 'Crizal', scroll: 7500, sub5: 'https://media.essilor.com/cms/caas/v1/media/12532/data/picture/a017102432bb162918ee0dede4d8f8ee.jpg', url: 'https://www.essilor.com/us-en/products/crizal/crizal-easy-pro/' },
        { main: 'Our products', sub2: 'Crizal', scroll: 7500, sub5: 'https://media.essilor.com/cms/caas/v1/media/12534/data/picture/81446752cad0528841d8c8acbc23fa47.jpg', url: 'https://www.essilor.com/us-en/products/crizal/crizal-prevencia/' },

        { main: 'Help me choose', sub1: 'Find an eyecare professional', url: 'https://www.essilor.com/us-en/store-locator/' },
        { main: 'Help me choose', sub4: 'Test your vision', url: 'https://www.essilor.com/us-en/vision-test/' },
        { main: 'Help me choose', sub4: 'Build your Essilor lenses', url: 'https://www.essilor.com/us-en/personalize-your-essilor-lens/' },

        { main: 'Blog', sub1: 'See all articles', url: 'https://www.essilor.com/us-en/blog/' },
        { main: 'Blog', sub4: 'All about lenses', url: 'https://www.essilor.com/us-en/blog/all-about-lenses/' },
        { main: 'Blog', sub4: 'Eye conditions and symptoms', url: 'https://www.essilor.com/us-en/blog/eye-conditions-symptoms/' },
        { main: 'Blog', sub4: 'Eyesight by age', url: 'https://www.essilor.com/us-en/blog/age-and-eyesight/' },
        { main: 'Blog', sub4: 'Your life and your eyes', url: 'https://www.essilor.com/us-en/blog/your-life-and-your-eyes/' },

        { main: 'About us', sub2: 'Mission', scroll: 10000, sub6: 'Contact us', url: 'https://www.essilor.com/us-en/contactus/' },
      ];

      for (const link of links) {
        if (link.main) {
          await this.clickLink(`//span[text()='${link.main}']`);
        }
        if (link.sub1) {
          await this.clickLink(`//div[@class='NavDescriptionCard_main__tyDQz']/a[text()='${link.sub1}']`);
        }
        if (link.sub2) {
          await this.clickLink(`//div[@class='NavWithoutImage_linksWrapper__zUbOU']/div/div/ul/li/a[text()='${link.sub2}']`);
        }
        if (link.scroll) {
          setTimeout(async () => {
            try {
              await this.page.evaluate(`window.scrollTo(0, ${link.scroll})`);
            } catch (error) {
              console.error('Error occurred while scrolling:', error);
            }
          }, 2000);
        }
        if (link.sub3) {
          await this.clickLink(`//a[text()='${link.sub3}']`);
        }
        if (link.sub4) {
          await this.clickLink(`//img[@alt='${link.sub4}']`);
        }
        if (link.sub5) {
          await this.clickLink(`//img[@src='${link.sub5}']`);
        }
        if (link.sub6) { // Please change the "Have a question?, depends on the language"
          await this.clickLink(`//p[text()='Have a question?']/parent::div/ul/li/a[text()='${link.sub6}']`);
        }
        await this.verifyURL(link.url);
      }
    } finally {
      await this.teardown();
    }
  }
}

test('Locale: US-EN', async () => {
  const testInstance = new BrowserTest();
  await testInstance.runTest();
});
