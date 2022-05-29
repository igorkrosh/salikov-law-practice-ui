<template lang="pug">
.transition-route-wrapper
    .transition-route(:class="{active: active, slideInDown: loading, slideOutDown: !loading}" @animationend="AnimationEnd")
    .transition-route.second(:class="{active: active, slideInDown: loading, slideOutDown: !loading}" @animationend="AnimationEnd")
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                active: false,
            }
        },
        methods: {
            start() {
                this.loading = true
                this.active = true
                this.$axios.get('/api/user')
                .then(() => {
                    this.finish();
                })
            },
            finish() {
                this.loading = false
                this.$store.dispatch('system/SET_LOADING', false)
            },
            AnimationEnd()
            {
                if (!this.loading)
                {
                    this.active = false
                }
            }
        },
        computed: {
            SystemLoading() {
                return this.$store.getters['system/LOADING']
            }
        },
        watch: {
            SystemLoading()
            {
                this.start();
            }
        },
        mounted()
        {
            this.start();
        }
    }
</script>

<style scoped>
.transition-route
{
    position: fixed;
    z-index: 10;
    background-color: #80a6b4;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0;
    z-index: -1;
    pointer-events: none;
    animation-duration: 0.7s;
    display: flex;
    align-items: center;
    justify-content: center;
}
.transition-route.second
{
    animation-duration: 0.3s;
    opacity: 0.7;
    
}
.transition-route.second.active
{
    opacity: 0.7;
    z-index: 95;
}
.transition-route.active
{
    opacity: 1;
    z-index: 100;
    pointer-events: all;
}

.transition-route.second.slideOutDown
{
    animation-delay: 0.3s;
}

@keyframes slideOutDown {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(0, 100%, 0);
  }
}

.slideOutDown {
  animation-name: slideOutDown;
}

@keyframes slideInDown {
  from {
    transform: translate3d(0, -100%, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

.slideInDown {
  animation-name: slideInDown;
}
</style>