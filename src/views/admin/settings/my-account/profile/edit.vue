<template>  
  <profile-detail :is-edit='true'></profile-detail>
</template>

<script>
import ProfileDetail from './components/ProfileDetail'
export default {
  name: 'editForm',
  components: { ProfileDetail }
}
</script>