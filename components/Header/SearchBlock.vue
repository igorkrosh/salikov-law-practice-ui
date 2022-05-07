<template>
    <div class="search-block">
        <input type="text" placeholder="Поиск">
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.search-block 
{
    width: 145px;
    height: 25px;
    position: relative;
    margin-right: 20px;
    
    input 
    {
        width: 100%;
        height: 100%;
        padding: 5px 10px 10px 25px;
        border: none;
        background: none;
        border-bottom: 1px solid #dedede;
        color: #fff;
        font-family: 'OpenSans';
        font-size: 13px;
    }

    input::placeholder 
    {
        color: #fff;
    }
}

.search-block:after 
{
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    background: url(~assets/images/icons/search.png);
    left: 0;
    top: 3px;
}
</style>