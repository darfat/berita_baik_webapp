<template>
  <change-password :is-edit='true'></change-password>
</template>

<script>
import ChangePassword from './components/form'
export default {
  name: 'editForm',
  components: { ChangePassword }
}
</script>