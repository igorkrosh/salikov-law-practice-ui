<template lang="pug">
.col.second
    CalendarBlock
    .people.block 
        h2 Кураторы 
        .wrapper 
            .item 
                img(src="/assets/images/avatar_sm.png")
                span Иван Иванов
            .item 
                img(src="/assets/images/avatar_sm.png")
                span Иван Иванов
    .people.block 
        h2 Однокурсники 
        .wrapper 
            .item 
                img(src="/assets/images/avatar_sm.png")
                span Иван Иванов
            .item 
                img(src="/assets/images/avatar_sm.png")
                span Иван Иванов
</template>

<script>
export default {

}
</script>

<style lang="scss">
.people.block 
{
    .wrapper 
    {
        .item 
        {
            display: flex;
            align-items: center;
            font-size: 15px;
            margin-bottom: 10px;

            img 
            {
                margin-right: 15px;
            }
        }
    }
}
</style>