<template>
  <CBreadcrumb class="d-md-down-none me-auto mb-0" id="AppBreadcrumb">
    <CBreadcrumbItem v-for="item in breadcrumbsJsonValue" :key="item" :href="item.active ? '' : item.path"
      :active="item.active" v-on:click="onClickBreadcrumb">
      {{ item.name }}
    </CBreadcrumbItem>
    <CButton @click="breadcrumbsStrJsonValueChange()" id="breadcrumbsChangeValue" :style="{ visibility: 'hidden' }">
      BreadcrumbsHelper</CButton>
  </CBreadcrumb>
</template>

<script>

export default {
  el: '#AppBreadcrumb',
  name: 'AppBreadcrumb',
  data() {
    return {
      breadcrumbsJsonValue: [{ "active": false, "name": "Home", "path": "#/dashboard" }]
    }
  },
  methods: {
    breadcrumbsStrJsonValueChange() {
      this.breadcrumbsJsonValue = JSON.parse(localStorage.breadcrumbs)
    },
    onClickBreadcrumb(e) {
      let nextBreadCrumbLiElement = e.target.parentNode.nextElementSibling;
      while (nextBreadCrumbLiElement) {
        if (nextBreadCrumbLiElement.tagName === 'LI') {
          nextBreadCrumbLiElement.remove();
          nextBreadCrumbLiElement = e.target.parentNode.nextElementSibling;
        } else {
          nextBreadCrumbLiElement = undefined;
        }
      }
    }
  },
  mounted() {
    console.log(this.$route);
  }
}
</script>
