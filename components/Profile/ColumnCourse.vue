<template lang="pug">
.col.second
    CalendarBlock
    ProfilePeopleBlock
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