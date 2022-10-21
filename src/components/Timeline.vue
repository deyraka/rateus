<template>
   <v-card-text>
        <v-timeline
        align-top
        dense
        >
        <v-timeline-item
            v-for="(item, i) in progress"
            :key="i"
            :color="i==0 ? 'success' : 'grey'"
            icon="mdi-check"
            :large="i==0 ? true : false"
        >
            <div class="text-caption font-weight-light font-italic">
            {{item.timestamp}}
            </div>
            <div>
            {{item.user}}&nbsp;
            <v-icon
                right color="blue" size="15px"
                class="mt-n1 ml-n1"
                v-if="item.verified==1"
            >
                mdi-check-decagram
            </v-icon>
            </div>
            <v-chip
            class="overflow-x-auto"
            label
            :color="i==0 ? 'success' : 'grey'"
            >
            {{item.desc}}
            </v-chip>
        </v-timeline-item>
        </v-timeline>
        <!-- <div>{{progress}}</div> -->
    </v-card-text>
</template>

<script>
export default {
  name: 'Timeline',
  props: {
    progress: []
  }
}
</script>
