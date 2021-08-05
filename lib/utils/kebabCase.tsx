// ケバブケース: 複数の単語をハイフン - でつなげる記法 htmlのclassnameなどに用いられている
const kebabCase = (str) => {
  // 日本語の場合はkebabCaseを適用せずにそのまま返す
  if (
    !str.match(
      /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
    )
  ) {
    return str
  }
  return (
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join('-')
  )
}

export default kebabCase
