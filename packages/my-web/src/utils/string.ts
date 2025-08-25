export function replaceTokens(
  template: string,
  tokens: { [key: string]: string }
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, token) => {
    return tokens[token] || match;
  });
}
