export interface ConvertCategoriesType {
  id: number,
  name: string,
  check: boolean,
}

const ConvertCategories = (categories:ConvertCategoriesType[]) => {
  const result = categories.map(ele => {
    return { ...ele, check: false }
  })
  return result
}

export default ConvertCategories