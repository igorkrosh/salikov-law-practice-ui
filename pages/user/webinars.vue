<template lang="pug">
    .courses-wrapper.full-page
        CourseCard(v-for="(item, index) in this.courses" :key="index" :item="item")
</template>

<script>
export default {
    data() {
        return {
            courses: [
                {
                    date: '07.04.2022',
                    duration: '2 недели',
                    title: 'Охрана исключительных прав IT-компаний: программное обеспечение и товарные знаки',
                    lectors: 'Иванов А.А.',
                    type: 'Вебинар',
                    image: 'https://www.iserbia.rs/files//2018/06/tajna-oruzja-uverljivih-ljudi.jpg'
                },
                {
                    date: '07.04.2022',
                    duration: '2 недели',
                    title: 'Охрана исключительных прав IT-компаний: программное обеспечение и товарные знаки',
                    lectors: 'Иванов А.А.',
                    type: 'Вебинар',
                    image: 'https://www.iserbia.rs/files//2018/06/tajna-oruzja-uverljivih-ljudi.jpg'
                },
                {
                    date: '07.04.2022',
                    duration: '2 недели',
                    title: 'Охрана исключительных прав IT-компаний: программное обеспечение и товарные знаки',
                    lectors: 'Иванов А.А.',
                    type: 'Вебинар',
                    image: 'https://www.iserbia.rs/files//2018/06/tajna-oruzja-uverljivih-ljudi.jpg'
                },
                {
                    date: '07.04.2022',
                    duration: '2 недели',
                    title: 'Охрана исключительных прав IT-компаний: программное обеспечение и товарные знаки',
                    lectors: 'Иванов А.А.',
                    type: 'Вебинар',
                    image: 'https://www.iserbia.rs/files//2018/06/tajna-oruzja-uverljivih-ljudi.jpg'
                },
                {
                    date: '07.04.2022',
                    duration: '2 недели',
                    title: 'Охрана исключительных прав IT-компаний: программное обеспечение и товарные знаки',
                    lectors: 'Иванов А.А.',
                    type: 'Вебинар',
                    image: 'https://www.iserbia.rs/files//2018/06/tajna-oruzja-uverljivih-ljudi.jpg'
                },
                {
                    date: '07.04.2022',
                    duration: '2 недели',
                    title: 'Охрана исключительных прав IT-компаний: программное обеспечение и товарные знаки',
                    lectors: 'Иванов А.А.',
                    type: 'Вебинар',
                    image: 'https://www.iserbia.rs/files//2018/06/tajna-oruzja-uverljivih-ljudi.jpg'
                },
                {
                    date: '07.04.2022',
                    duration: '2 недели',
                    title: 'Охрана исключительных прав IT-компаний: программное обеспечение и товарные знаки',
                    lectors: 'Иванов А.А.',
                    type: 'Вебинар',
                    image: 'https://www.iserbia.rs/files//2018/06/tajna-oruzja-uverljivih-ljudi.jpg'
                },
                {
                    date: '07.04.2022',
                    duration: '2 недели',
                    title: 'Охрана исключительных прав IT-компаний: программное обеспечение и товарные знаки',
                    lectors: 'Иванов А.А.',
                    type: 'Вебинар',
                    image: 'https://www.iserbia.rs/files//2018/06/tajna-oruzja-uverljivih-ljudi.jpg'
                }
            ]
        }
    },
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Вебинары');
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true);
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style>

</style>