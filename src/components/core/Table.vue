<script setup>
</script>

<template>
    <div class="py-4">
        <div id="table">
          
            <div class="table-responsive text-nowrap mb-3">
                <table class="table">
                        <slot name="content" />
                </table>
            </div>
        </div>
        <slot name="pagination" />
    </div>
</template>