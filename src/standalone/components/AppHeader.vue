<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" style="color: #EB0A1E" />
      </CHeaderToggler>
      <CHeaderBrand class="mx-auto d-lg-none d-md-none">
        <h3 id="headerLabel1">{{headerLabel}}</h3>
      </CHeaderBrand>
      <CHeaderNav class="d-none d-md-flex me-auto">
        <h3 id="headerLabel2">{{headerLabel}}</h3>
      </CHeaderNav>
      <CHeaderNav>
        <AppHeaderDropdownAccnt />
      </CHeaderNav>
    </CContainer>
    <CHeaderDivider />
    <CContainer fluid style="height: 19px !important; min-height: 19px; ">
      <AppBreadcrumb />
    </CContainer>
  </CHeader>
</template>

<script>
import AppBreadcrumb from './AppBreadcrumb'
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
import { logo } from '@/standalone/assets/brand/logo'
export default {
  name: 'AppHeader',
  components: {
    AppBreadcrumb,
    AppHeaderDropdownAccnt,
  },
  data(){
    return {
      headerLabel: process.env.VUE_APP_HEADER_LABEL
    }
  },
  setup() {
    return {
      logo,
    }
  },
}
</script>
