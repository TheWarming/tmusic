<template>
  <div class="detail">
    <DetailNavBar title="歌单" />
    <Scroll ref="scroll" class="wrapper">
      <DetailHead>
        <template #above>
          <DescItem class="detail-item">
            <template #img>
              <Cover :item="info" :showTitle="false" />
            </template>
            <template #top>
              <span class="detail-title">{{ info.title }}</span>
            </template>
            <template #mid>
              <div class="detail-creator">
                <img :src="info.avatar" alt="" />
                {{ info.name }}
                <button @click="handleAddUser">
                  <icon :icon="['fas', 'plus']" :style="{ color: '#eee' }" />
                </button>
              </div>
            </template>
            <template #bottom>
              <span class="detail-desc">
                {{ info.desc }}
              </span>
              <icon :icon="['fas', 'chevron-right']" />
            </template>
          </DescItem>
        </template>

        <template #below>
          <div class="detail-static">
            <button @click="handleSubs">
              <icon :icon="['fas', 'folder-plus']" />
              {{ changeUnit(info.subscribedCount) }}
            </button>
            <button @click="handleComment">
              <icon :icon="['fas', 'comment-dots']" />
              {{ changeUnit(info.commentCount) }}
            </button>
            <button @click="handleShare">
              <icon :icon="['fas', 'share-alt']" />
              {{ changeUnit(info.shareCount) }}
            </button>
          </div>
        </template>
      </DetailHead>
      <DetailContent>
        <template #content>
          <ListTab>
            <template #left>
              <icon
                class="icon"
                size="lg"
                :icon="['fas', 'play-circle']"
                :style="{ color: '#f00' }"
                @click="handlePlayAll"
              />
            </template>
            <template #center>
              <span>播放全部</span>
              <span>({{ info.trackCount }})</span>
            </template>
            <template #right>
              <icon
                class="icon"
                size="lg"
                :icon="['fas', 'arrow-alt-circle-down']"
                :style="{ color: '#000' }"
              />
              <icon
                class="icon"
                size="lg"
                :icon="['fas', 'check-circle']"
                :style="{ color: '#000' }"
                @click="handleCheckAll"
              />
            </template>
          </ListTab>
          <MusicListItem
            v-for="(item, index) in songs"
            @click="handlePlay(item)"
          >
            <template #left>
              <span>{{ index + 1 }}</span>
            </template>
            <template #top>
              {{ item.name }}
            </template>
            <template #bottom-left>
              <span v-for="(ar, index) in item.artists">
                <span v-if="index !== item.artists.length - 1">
                  {{ ar }} /
                </span>
                <span v-else>{{ ar }} - </span>
              </span>
            </template>
            <template #bottom-right>
              {{ item.album }}
            </template>

            <template #right>
              <icon
                class="icon"
                :icon="['fas', 'video']"
                :style="{ color: '#999' }"
                @click="handleVideo"
              />
              <icon
                class="icon"
                :icon="['fas', 'ellipsis-v']"
                :style="{ color: '#999' }"
                @click="handleSetting"
              />
            </template>
          </MusicListItem>
        </template>
      </DetailContent>
    </Scroll>
  </div>
</template>
<script>
import DetailNavBar from "./comps/DetailNavBar";
import DetailHead from "./comps/DetailHead";
import DetailContent from "./comps/DetailContent";

import Scroll from "components/common/scroll/Scroll";

import Cover from "components/content/cover/Cover";
import DescItem from "components/content/descItem/DescItem";
import ListTab from "components/content/musicList/ListTab";
import MusicListItem from "components/content/musicList/MusicListItem";

import { _getSonglistById } from "network/detail";
import { getSonglistDetail, getSongsDetail } from "network/detail/index";
import { changeUnit } from "common/display";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailHead,
    Cover,
    DetailContent,
    DescItem,
    ListTab,
    MusicListItem,
    Scroll
  },
  setup() {
    /* 数据加载相关 */
    const info = ref({});
    const songs = ref({});
    const $route = useRoute();
    const $store = useStore();
    onMounted(async () => {
      info.value = await getSonglistDetail($route.params.id);
      // console.log(info.value);
      songs.value = await getSongsDetail(info.value.songIds);
    });

    /* 点击相关 */
    const handleAddUser = () => {
      console.log("handleAddUser");
    };
    const handleSubs = () => {
      console.log("handleSubs");
    };
    const handleComment = () => {
      console.log("handleComment");
    };
    const handleShare = () => {
      console.log("handleShare");
    };

    const handlePlayAll = () => {
      console.log("handlePlayAll");
    };
    const handleDownLoad = () => {
      console.log("handleDownLoad");
    };
    const handleCheckAll = () => {
      console.log("handleCheckAll");
    };

    const handleVideo = () => {
      console.log("handleVideo");
    };
    const handleSetting = () => {
      console.log("handleSetting");
    };
    const handlePlay = item => {
      // console.log(item);
      $store
        .dispatch("addPlayList", [item.id])
        .then(song => {
          if (song) {
            // $toast.show("成功添加歌曲~", 1500);
            // 自动跳转到player页面
            // $store.commit(SET_FULL_PLAYER, true);
          } else {
            // $toast.show("添加失败", 1500);
          }
          // if ($store.state.autoPlay) {
          //   $store.commit(SET_CURRENT_SONG, song);
          // }
        })
        .catch(err => {
          console.warn(err);
        });
    };

    return {
      info,
      songs,
      changeUnit,

      handleAddUser,
      handleSubs,
      handleComment,
      handleShare,
      handlePlayAll,
      handleDownLoad,
      handleCheckAll,
      handleVideo,
      handleSetting,
      handlePlay
    };
  },
  data() {
    return {
      type: null,
      navBarTitle: "",
      albumSonglist: [],
      coverLogo: ""
    };
  },
  mounted() {
    let type = this.$route.params.category;
    let albumID = this.$route.params.id;
    // this.getSonglist(albumID);
  },
  methods: {
    getSonglist(albumID) {
      _getSonglistById(albumID).then(res => {
        // console.log(res);
        let data = res.data.data;
        this.navBarTitle = data.desc;
        this.coverLogo = data.logo;
        this.albumSonglist = data.songlist;
      });
    }
  }
};
</script>
<style scoped>
.detail {
  height: 100vh;
  position: relative;
}
.wrapper {
  height: calc(100% - 44px - 60px);

  overflow: hidden;
  position: relative;
}
.detail-item {
  padding-bottom: 30px;
  background-color: var(--color-background-d);
}
.detail-title {
  color: #fff;
}
.detail-creator {
  margin-top: 10px;
}
.detail-creator img {
  width: 20px;
  border-radius: 10px;
  vertical-align: middle;
  margin-right: 3px;
}

.detail-creator button {
  font-size: 14px;
  height: 18px;
  width: 30px;
  margin-left: 3px;
  border-radius: 15px;
  border: solid 1px #bbb;
  background-color: #bbb;
  outline: none;
}
.detail-creator,
.detail-desc {
  font-size: 12px;
  color: var(--color-text);
}

.detail-static {
  height: 40px;
  width: 70%;
  margin: 0 auto;
  border-radius: 30px;
  border: solid 1px #fff;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  position: relative;
  top: -20px;
  display: flex;
  justify-content: center;
}
.detail-static button {
  background-color: rgba(0, 0, 0, 0);
  flex: 1;
  border: none;
  outline: none;
}

.icon {
  margin: 0 8px;
}
</style>
