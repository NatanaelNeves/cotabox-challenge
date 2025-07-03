<script>
import { Doughnut, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ['options', 'hoveredId'], 
  watch: {
    hoveredId() {
      this.updateChartHighlight();
    },
    chartData() {
      this.updateChartHighlight();
    }
  },
  methods: {
    updateChartHighlight() {
      if (!this.chartData || !this.chartData.datasets || !this.$data._chart) {
        return;
      }

      const originalData = this.chartData.datasets[0].data;
      const participantIds = this.chartData.participantIds; 
      const hoveredIndex = participantIds ? participantIds.indexOf(this.hoveredId) : -1;

      const borderWidths = originalData.map((_, index) => {
        return index === hoveredIndex ? 5 : 1;
      });

      this.$data._chart.data.datasets[0].borderWidth = borderWidths;
      this.$data._chart.update();
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
    this.updateChartHighlight(); 
  },
};
</script>
