<template>
  <div>
    <div class="q-pa-md">
      <div class="flex q-mb-md" style="justify-content: space-between; align-items: center;">
        <h4 style="padding: 0; margin: 0;">History</h4>
        <q-select style="width: 120px;" v-model="table_items" :options="['All', 'Best']" outlined label="Standard" />
      </div>
      <template>
        <div>
          <q-table flat bordered :data="data" :columns="columns" row-key="index" :pagination="initialPagination" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      table_items: 'All',
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 9
        // rowsNumber: xx if getting data from a server
      },

      columns: [
        { name: 'index', align: 'center', label: 'id', field: 'index',  },
        { name: 'student_name', label: '学生名', align: 'center', field: 'student_name'},
        { name: 'calories', align: 'center', label: '日期', field: 'calories', sortable: true },
        { name: 'fat', align: 'center', label: '舞蹈名称', field: 'fat', sortable: true },
        { name: 'carbs', align: 'center', label: '视频时长', field: 'carbs' },
        { name: 'protein', align: 'center', label: '得分', field: 'protein' },
        { name: 'sodium', align: 'center', label: '视频回放', field: 'sodium' },
        { name: 'calcium', align: 'center', label: '评测报告', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],

      data: [
        {
          index: '1',
          calories: 'asdas',
          student_name: 'Zamid',
          fat: 'sd',
          carbs: 'sad',
          protein: 'sad',
          sodium: 'asd',
          calcium: '14%',
          iron: '1%'
        },
        {
          index: '2',
          calories: 'asdas',
          student_name: 'Zam',
          fat: 'sd',
          carbs: 'sad',
          protein: 'sad',
          sodium: 'asd',
          calcium: '14%',
          iron: '1%'
        },
        {
          index: '3',
          calories: 'asdas',
          student_name: 'Zad',
          fat: 'sd',
          carbs: 'sad',
          protein: 'sad',
          sodium: 'asd',
          calcium: '14%',
          iron: '1%'
        },
        {
          index: '4',
          calories: 'asdas',
          student_name: 'Zack',
          fat: 'sd',
          carbs: 'sad',
          protein: 'sad',
          sodium: 'asd',
          calcium: '14%',
          iron: '1%'
        },
        {
          index: '5',
          calories: 'asdas',
          student_name: 'Zuu',
          fat: 'sd',
          carbs: 'sad',
          protein: 'sad',
          sodium: 'asd',
          calcium: '14%',
          iron: '1%'
        },
      ]
    }
  }
}
</script>

<style>

</style>