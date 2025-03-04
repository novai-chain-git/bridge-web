<template>
  <!-- 记录组件 -->
  <div class="record w100% py16 relative <md:(overflow-hidden)" text="14 c9 ">
    <!-- 列表 -->
    <div class="ranking_list_table h500 overflow-y-scroll">
      <table class="w100% <md:(w800 overflow-x-scroll)">
        <thead class="sticky top-0 ranking_list_thead">
          <tr class="w100% h20 box-border <md:(h20 text-12)" text="12 c14">
            <th>
              {{ $t('Chain name') }}
            </th>
            <th>
              {{ $t('Initiated') }}
            </th>
            <th>
              {{ $t('currency') }}
            </th>
            <th>
              {{ $t('operation') }}
            </th>
            <th>
              {{ $t('state') }}
            </th>
          </tr>
        </thead>
        <tbody v-infinite-scroll="load">
          <tr
            class="list_item w100% h50 <md:(h36 text-13)"
            text="14 c9"
            v-for="(item, i) in pageInfo.list"
            :key="i"
          >
            <td text="center">
              {{
                item.type === 1
                  ? ETHEREUM_CHAIN[item.fromChain].chainName
                  : ETHEREUM_CHAIN[item.toChain].chainName
              }}
            </td>
            <td text="center">
              {{ item.amount }}
            </td>
            <td text="center">USDT</td>
            <td text="center">
              {{ $t(operationData[item.type]) }}
            </td>
            <td text="center" class="receive_num">
              {{ $t('successful') }}
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="pageInfo.list.length === 0" class="w100% pt80" flex="~ justify-center">
        <el-empty :description="$t('No data')" />
      </div>
      <p v-if="pageInfo.loading" class="h30 line-height-30 w100%" text="14 center c14">
        {{ $t('Loading') }}
      </p>
      <p
        v-if="pageInfo.list.length !== 0 && pageInfo.noMore"
        class="h30 line-height-30 w100%"
        text="14 center c14"
      >
        {{ $t('no more') }}
      </p>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import { transactionPageApi } from '@/api/index.js';
import InfiniteScrollList from '@/components/InfiniteScrollList.vue';
import { onMounted, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useActiveWebStateRefs, ETHEREUM_CHAIN } from '@/web3-sdk';

const { account } = useActiveWebStateRefs();

const { t } = useI18n();

const params = reactive({
  address: account.value
});

// 操作的状态
const operationData = reactive({
  1: 'deposit',
  '-1': 'Withdrawal'
});

const pageInfo = reactive({
  list: [
    // {
    //   type: 1,
    //   amount: 100,
    //   fromChain: 7256,
    //   toChain: 7256
    // }
  ],
  pageSize: 10,
  pageNo: 1,
  total: 0,
  loading: false,
  noMore: false
});

const getData = async () => {
  if (pageInfo.loading) return;
  pageInfo.loading = true;
  const res = await transactionPageApi({
    pageSize: pageInfo.pageSize,
    pageNo: pageInfo.pageNo,
    ...params
  });
  if (res && !res.hasErrors) {
    pageInfo.list = [...pageInfo.list, ...res.data.list];
    pageInfo.total = res.data.total;
    pageInfo.loading = false;
    if (res.data.total <= pageInfo.pageNo * pageInfo.pageSize) pageInfo.noMore = true;
    pageInfo.pageNo++;
  }
};

const load = () => {
  if (pageInfo.noMore) return;
  if (account.value) {
    getData();
  }
};
</script>
<style scoped lang="scss">
.list_item {
}
.ranking_list_thead {
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
}
.record {
  .receive_num {
    background-image: linear-gradient(180deg, #5ac27c 0%, #b2e235 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}

.ranking_list_table {
  &::-webkit-scrollbar {
    width: 0;
  }
}
table {
  border-collapse: collapse;
  white-space: nowrap;
  min-width: 100%;
  width: max-content;
  thead {
    tr {
      line-height: 20px;
    }
  }
  tr {
    line-height: 50px;
    td,
    th {
      padding: 0 10px;
      font-weight: 500;
    }
  }
}
@media (max-width: 768px) {
  tbody tr:nth-child(odd) {
    background: var(--bg5);
  }
}
</style>
