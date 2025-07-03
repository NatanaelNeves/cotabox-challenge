<script>
import { Doughnut, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ['options', 'hoveredId'], // Adicionamos a prop 'hoveredId'
  watch: {
    // Esta função será chamada toda vez que a prop 'hoveredId' mudar
    hoveredId() {
      this.updateChartHighlight();
    },
    // Também observamos os dados originais para o caso de serem atualizados
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
      const participantIds = this.chartData.participantIds; // Precisaremos passar os IDs
      const hoveredIndex = participantIds ? participantIds.indexOf(this.hoveredId) : -1;

      // Criamos um array de larguras de borda: 5 para o destacado, 1 para os outros
      const borderWidths = originalData.map((_, index) => {
        return index === hoveredIndex ? 5 : 1;
      });

      // Atualizamos o dataset do gráfico diretamente
      this.$data._chart.data.datasets[0].borderWidth = borderWidths;
      this.$data._chart.update();
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
    this.updateChartHighlight(); // Garante o estado inicial correto
  },
};
</script>
