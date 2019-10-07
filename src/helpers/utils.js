const moduleIfExists = (name) => {
  try {
    // require.resolve(name).then(mod => {
    // console.log(mod)
    // }).catch(e => {
    // console.log(e)
    // })
    console.log('util: ', name)
    // require.ensure(name)
  } catch (e) {
    // console.log(e)
    // console.log('Module does not exist')
    // return false
  }
}

export { moduleIfExists }
