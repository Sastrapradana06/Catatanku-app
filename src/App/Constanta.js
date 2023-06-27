

export function generateRandomId() {
  return Math.floor(Math.random() * 1000) + 1;
}

export function getDate() {
  const date = new Date()
  
  const dayNow = date.toLocaleDateString('id-IN', { weekday: 'long' })
  const timeNow = date.toLocaleTimeString('id-IN',{ hour: "numeric", minute: "numeric" })

  return {dayNow, timeNow}
}


export function filterOutItemById(id, item) {
  const filteredItems = item.filter((items) => {
    return items.id != id;
  });
  return filteredItems;
}

export function filterItemById(id, item) {
  const filteredItems = item.filter((items) => {
    return items.id == id;
  });
  return filteredItems;
}

export function saveItemTolocalStorage(key, value) {
  const setlocalStorage = localStorage.setItem(key, JSON.stringify(value))
  return setlocalStorage
}



