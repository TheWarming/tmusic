import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toast from "components/common/toast";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faTimes,
  faPlay,
  faChevronRight,
  faChevronLeft,
  faEllipsisV,
  faPlus,
  faShareAlt,
  faCommentDots,
  faFolderPlus,
  faVideo,
  faCheckCircle,
  faArrowAltCircleDown,
  faPlayCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faSearch,
  faTimes,
  faPlay,
  faChevronRight,
  faChevronLeft,
  faEllipsisV,
  faPlus,
  faShareAlt,
  faCommentDots,
  faFolderPlus,
  faVideo,
  faCheckCircle,
  faArrowAltCircleDown,
  faPlayCircle
);

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Toast);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
