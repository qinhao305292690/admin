<template>
    <div>
        <input
         :checked="checked"
         @change="$emit('change', $event.target.checked)" type="checkbox">
    </div>
</template>
<script>
    export default {
        name: "SSelect",
        model: {
            prop: 'checked',
            event: 'change'
        },
        activated() {
            console.log('进入了');
        },
        props: {
            checked: Boolean
        },
        data() {
            return {

            }
        },
    }
</script>
