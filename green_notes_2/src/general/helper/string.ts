// Useful in case of regex usage such as wildcards, and other regex rules
//https://stackoverflow.com/questions/26246601/wildcard-string-comparison-in-javascript
export function matchRuleShort(str: string, rule: string) {
  let escapeRegex = (str: string) =>
    str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(
    "^" + rule.split("*").map(escapeRegex).join(".*") + "$"
  ).test(str);
}
