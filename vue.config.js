module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    // disableHostCheck: true,
    allowedHosts: [
      'bpskalteng.id', // the domain name address allowed to access, that is, the address of peanut shell intranet penetration
      'tiket.bpskalteng.id',
      'youtube.com'
    ],
    proxy: 'http://localhost:8000/api'
  }
}
