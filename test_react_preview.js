import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Need to wait until page loads
  await page.goto('http://localhost:3000/playground');
  await page.waitForSelector('text/React JS');
  
  // Click React tab
  const tabs = await page.$$('button');
  for (const t of tabs) {
    const text = await page.evaluate(el => el.textContent, t);
    if (text === 'React JS') {
      await t.click();
      break;
    }
  }
  
  // Wait a bit for the iframe to load
  await new Promise(r => setTimeout(r, 2000));
  
  // Find iframe
  const iframeElement = await page.$('iframe');
  if (!iframeElement) {
    console.error('Iframe not found');
    process.exit(1);
  }
  
  const frame = await iframeElement.contentFrame();
  if (!frame) {
    console.error('Frame content not accessible');
    process.exit(1);
  }
  
  // Look for the "Clicked 0 times" button inside frame
  try {
    await frame.waitForSelector('button', { timeout: 3000 });
    const buttonText = await frame.$eval('button', el => el.textContent);
    console.log('Button text:', buttonText);
    
    // Click button
    const btn = await frame.$('button');
    await btn?.click();
    
    await new Promise(r => setTimeout(r, 500));
    
    const newText = await frame.$eval('button', el => el.textContent);
    console.log('Button text after click:', newText);
    
    console.log('SUCCESS!');
  } catch(e) {
    console.error('Error finding content in iframe:', e);
    // Maybe an error overlay is present on the page instead?
    const errorText = await page.evaluate(() => {
      const errEl = document.querySelector('.bg-red-50');
      return errEl ? errEl.textContent : null;
    });
    if (errorText) {
      console.error('Runtime Error overlay found:', errorText);
    }
    process.exit(1);
  }
  
  await browser.close();
})();
