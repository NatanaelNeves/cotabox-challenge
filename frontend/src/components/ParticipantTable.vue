<template>
    <div>
      <el-table 
        :data="participants" 
        style="width: 100%"
        :row-class-name="tableRowClassName"
        @row-mouse-enter="handleMouseEnter"
        @row-mouse-leave="handleMouseLeave"
      >
        <el-table-column prop="firstName" label="First Name"></el-table-column>
        <el-table-column prop="lastName" label="Last Name"></el-table-column>
        <el-table-column
          prop="participation"
          label="Participation"
          align="right"
          :formatter="percentageFormatter"
        ></el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  export default {
    name: "ParticipantTable",
    props: {
      participants: {
        type: Array,
        required: true,
      },
      hoveredId: {
        type: String,
        default: null,
      },
    },
    methods: {
      percentageFormatter(row, column, cellValue) {
        return `${cellValue}%`;
      },
      handleMouseEnter(row) {
        this.$emit('row-hover', row);
      },
      handleMouseLeave() {
        this.$emit('row-hover', null);
      },
      tableRowClassName({ row }) {
        if (row.id === this.hoveredId) {
          return 'highlighted-row';
        }
        return '';
      },
    },
  };
  </script>
  
  <style>
  /* Usamos CSS não "scoped" para sobrescrever o Element UI com mais facilidade */
  .el-table .highlighted-row {
    background-color: #eaf9fc !important; /* Um azul bem claro */
    cursor: pointer;
  }
  
  .el-table >>> .el-table__header-wrapper th {
    background-color: #f2f4f8 !important;
    color: #333;
    font-weight: 500;
  }
  </style>
  