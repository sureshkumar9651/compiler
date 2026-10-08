import { shareService } from '../services/share-service';

describe('ShareService', () => {
  it('should successfully round-trip basic code', () => {
    const originalCode = 'console.log("Hello World");';
    const payload = { version: 1 as const, code: originalCode };
    
    const result = shareService.createShareUrl(payload);
    expect(result.isOversized).toBe(false);
    
    const decoded = shareService.decodeShareUrl(result.url);
    expect(decoded).not.toBeNull();
    expect(decoded?.code).toBe(originalCode);
    expect(decoded?.version).toBe(1);
  });

  it('should successfully round-trip complex template literals and variables', () => {
    const originalCode = 'const name = "Suresh";\n\nconsole.log(`Hello, ${name}!`);';
    const payload = { version: 1 as const, code: originalCode, title: 'Template Literals' };
    
    const result = shareService.createShareUrl(payload);
    
    const decoded = shareService.decodeShareUrl(result.url);
    expect(decoded?.code).toBe(originalCode);
    expect(decoded?.title).toBe('Template Literals');
  });

  it('should successfully round-trip emojis and unicode characters', () => {
    const originalCode = 'const emoji = "🚀 🌍";\n\nconsole.log(emoji);';
    const payload = { version: 1 as const, code: originalCode };
    
    const result = shareService.createShareUrl(payload);
    
    const decoded = shareService.decodeShareUrl(result.url);
    expect(decoded?.code).toBe(originalCode);
  });

  it('should successfully round-trip regular expressions', () => {
    const originalCode = 'const regex = /hello\\s+world/gi;\n\nconsole.log(regex);';
    const payload = { version: 1 as const, code: originalCode };
    
    const result = shareService.createShareUrl(payload);
    
    const decoded = shareService.decodeShareUrl(result.url);
    expect(decoded?.code).toBe(originalCode);
  });

  it('should successfully round-trip multi-line objects and whitespace', () => {
    const originalCode = `
function test() {
  return {
    name: "JavaScript",
    version: 1
  };
}
`;
    const payload = { version: 1 as const, code: originalCode };
    
    const result = shareService.createShareUrl(payload);
    
    const decoded = shareService.decodeShareUrl(result.url);
    expect(decoded?.code).toBe(originalCode);
  });

  it('should return null for invalid versions', () => {
    // Manually construct an invalid version URL
    const invalidUrl = 'http://localhost:3000/playground#v=999&code=invalid';
    const decoded = shareService.decodeShareUrl(invalidUrl);
    expect(decoded).toBeNull();
  });
});
