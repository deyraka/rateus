module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    disableHostCheck: true,
    allowedHosts: [
      'bpskalteng.web.id', // the domain name address allowed to access, that is, the address of peanut shell intranet penetration
      'tiket.bpskalteng.web.id' // . Is a wildcard of the secondary domain name
    ]
  }
}
