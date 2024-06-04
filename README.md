# rateus
it safe to use node v.20.13.1 and npm v.10.5.2

## Project setup
```
npm install

if you found error while running npm install (error dependencies for axios, eslint, etc), try to run :
1. npm install --legacy-peer-deps
2. then try to run the apps ( npm run serve)

if you found error with eslint, then remove it : npm remove @vue/cli-plugin-eslint --force
then try to run apps again (npm run serve)

=======
but the best practice is install any package fit to all their dependencies 
i.e:
cannot resolve
found vue@2.7.14
node_module/vue
    vue@2.6.11 from root project

Could not resolve dependency:
npm WARN peer vue@">=2.5 <2.7" from @vue/vue-template-compiler@1.7.2

it means : vue@2.7.14 was installed on project. but, actually this project ask vue@2.6.11 (from package.json). 
then missmatch the version causing error depencies for vue-template-compiler which is need vue version under 2.7.0.
fix these issues by installing the right version as package.jon asked for every package listed there.
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint --fix
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
