<template>
  <div
    v-infinite-scroll="load"
    class="record_list max-h-600 overflow-y-scroll bdr14 <md:(bdr10)"
    :style="{ maxHeight: maxHeight }"
  >
    <slot :list="state.list"></slot>
    <div v-if="state.list.length === 0" class="w100%" flex="~ justify-center">
      <el-empty :description="$t('No data')" />
    </div>
    <p v-if="state.loading" class="h30 line-height-30" text="14 center">{{ $t('Loading') }}</p>
    <p v-if="state.noMore" class="h30 line-height-30" text="14 center">{{ $t('no more') }}</p>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps({
  params: {
    type: Object,
    default: () => ({})
  },
  getDataApi: {
    type: Function,
    required: true
  },
  pageSize: {
    type: Number,
    default: 10
  },
  isPage: {
    type: Boolean,
    default: true
  },
  maxHeight: {
    type: String,
    default: 'auto'
  }
});
const state = reactive({
  list: [],
  loading: false,
  noMore: false,
  pageNo: 1,
  total: 0
});

const getData = async () => {
  if (state.loading) return;
  state.loading = true;
  const res = await props.getDataApi({
    pageSize: props.pageSize,
    pageNo: state.pageNo,
    ...props.params
  });
  if (res && !res.hasErrors) {
    if (props.isPage) {
      state.list = [...state.list, ...res.data.list];
      state.total = res.data.total;
    } else {
      state.list = [...state.list, ...res.data];
    }
    state.loading = false;
  }
};

const load = () => {
  if (state.total <= 0) return;
  if (state.total < state.pageNo * props.pageSize) return (state.noMore = true);
  state.pageNo++;
  getData();
};
onMounted(() => {
  getData();
});
</script>

<style scoped lang="scss">
.record_list {
  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
