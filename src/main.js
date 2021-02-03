import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from './store'

Vue.config.productionTip = false

let router = null;
let instance = null;
if (window.__POWERED_BY_QIANKUN__) { 
  //处理资源
   __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__; 
  }
//下面的 /admin  与主应用  registerMicroApps 中的  activeRule 字段对应
function render(props = {}) {
  const {container} = props
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/admin' : '/',
    mode: 'history',
    routes,
  });
  const create = async () => {
    // await ReadConfig(Vue)
    instance = new Vue({
      router,
      render: h => h(App),
    }).$mount(container ? container.querySelector('#childApp') : '#childApp');
  }
  create()
}
if (!window.__POWERED_BY_QIANKUN__) {//判断是否在qiankun环境下
  render();
}
// 导出子应用生命周期 挂载前
export async function bootstrap(props) {
  console.log(props)
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {// 导出子应用生命周期 挂载前 挂载后
  render(props);
}// 导出子应用生命周期 挂载前 卸载后
export async function unmount() {
  instance.$destroy();
  instance = null;
  router = null;
}