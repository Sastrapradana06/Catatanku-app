
export function generateRandomId() {
  return Math.floor(Math.random() * 1000) + 1;
}


export function getDate() {
  const date = new Date()
  
  const dayNow = date.toLocaleDateString('id-IN', { weekday: 'long' })
  const timeNow = date.toLocaleTimeString('id-IN',{ hour: "numeric", minute: "numeric" })

  return {dayNow, timeNow}
}

// export function resetDetailMemo() {
//     dispatch(getDetailMemo([]))
// }
