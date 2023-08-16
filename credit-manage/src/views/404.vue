<template>
  <div>
    <el-result icon="warning" title="404 提示" sub-title="您要找的网页走丢了~">
      <template #extra>
        <el-button class="bg-blue-500" type="primary" @click="$router.push('/')"
          >回到首页</el-button
        >
      </template>
    </el-result>
  </div>
</template>
