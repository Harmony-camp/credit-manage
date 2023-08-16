import { ref } from "vue";
import { useRoute, onBeforeRouteUpdate, useRouter } from "vue-router";
import { useCookies } from "@vueuse/integrations/useCookies";
import {useStore} from 'vuex'

export function useTabList() {
  const route = useRoute();
  const router = useRouter();
  const store = useStore()
  const cookie = useCookies();
  const activeTab = ref(route.path);
  const tabList = ref([
    {
      title: "首页",
      path: "/index",
    },
  ]);

  function addTab(tab) {
    let notTab = tabList.value.findIndex((t) => t.path == tab.path) == -1;
    if (notTab) {
      tabList.value.push(tab);
    }
    cookie.set("tabList", tabList.value);
  }
  function initTabList() {
    let tabs = cookie.get("tabList");
    if (tabs) tabList.value = tabs;
  }
  initTabList();
  onBeforeRouteUpdate((to, from) => {
    store.commit("SET_PATH_ACTIVE_STATE",to.path)
    activeTab.value = to.path;
    addTab({ title: to.meta.title, path: to.path });
  });

  const changeTab = (t) => {
    activeTab.value = t;
    router.push(t);
  };

  const removeTab = (t) => {
    let tabs = tabList.value;
    let a = activeTab.value;
    if (a == t) {
      tabs.forEach((tab, index) => {
        if (tab.path == t) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            a = nextTab.path;
          }
        }
      });
    }
    activeTab.value = a;
    tabList.value = tabList.value.filter((tab) => tab.path != t);
    cookie.set("tabList", tabList.value);
  };

  const handleClose = (c) => {
    if (c == "clearAll") {
      activeTab.value = "/";
      tabList.value = [
        {
          title: "首页",
          path: "/index",
        },
      ];
    } else if (c == 'clearOther') {
      tabList.value = tabList.value.filter(tab => tab.path == '/index' || tab.path == activeTab.value)
    }
    cookie.set("tabList", tabList.value)
  };
  return {
    activeTab, tabList, changeTab, removeTab, handleClose
  }
}