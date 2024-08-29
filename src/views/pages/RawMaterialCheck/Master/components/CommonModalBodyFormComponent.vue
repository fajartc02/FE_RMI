<template>
  <CModalBody>
    <CFormInput
      :value="name"
      @input="$emit('update:name', $event.target.value)"
      type="text"
      label="Name"
      class="mb-3"
    />
    <CFormInput
      :value="code"
      @input="$emit('update:code', $event.target.value)"
      type="text"
      label="Code"
      class="mb-3"
    />
    <CFormInput
      :value="description"
      @input="$emit('update:description', $event.target.value)"
      type="text"
      label="Description"
      class="mb-3"
    />
    <slot></slot>
  </CModalBody>
</template>

<script>

const a = [
  'update:name',
  'update:code',
  'update:description',
]

export default {
  name: "CommonMstFormComponent",
  props: {
    name: String,
    code: String,
    description: String,
  },
  emits: [
    'update:name',
    'update:code',
    'update:description',
  ],
}
</script>

