type MenuOptions = '' | 'all' | 'cat' | 'fish' | 'dog'

export const createMenuObject = (activeMenu: MenuOptions) => {
  let returnObject = {
      all : false,
      dog: false,
      cat: false,
      fish : false
  }

  if(activeMenu !== ''){
      returnObject[activeMenu] = true;
  }

  return returnObject;

} 