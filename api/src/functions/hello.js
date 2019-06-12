/**
 * Aspirational example of front matter that's used to configure a serverless
 * function when it's deployed or during development
 * ---
 * provider: Netlify|Zeit?|Firebase|AWS|Azure|GCF|IBM?
 * runtime: nodejs10.x
 * memory: 128 - 3008 //MB
 * timeout: 3000 // 3s
 * ---
 */
export const handler = (_event, _context, callback) => {
  callback(null, {
    statusCode: 200,
    body: 'hello, world!',
  });
};
