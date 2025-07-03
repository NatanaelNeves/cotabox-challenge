<template>
  <div id="app">
    <div class="page-background">
      <transition name="slide-fade" appear>
        <TheHeaderForm @add-participant="handleAddParticipant" :is-loading="isLoading" />
      </transition>
    </div>

    <main class="main-container">
      <transition name="fade">
        <div class="data-card" v-if="participants.length > 0">
          <div class="data-header">
            <h2>DATA</h2>
            <el-button
              type="danger"
              plain
              size="mini"
              @click="handleResetData"
              :loading="isResetting"
              icon="el-icon-delete"
            >
              Resetar Dados
            </el-button>
          </div>
          <div class="data-display-grid">
            <ParticipantTable
              :participants="participants"
              :hovered-id="hoveredParticipantId"
              @row-hover="handleRowHover"
            />
            <ParticipationChart
              :chart-data="chartDataForGraph"
              :options="chartOptions"
              :hovered-id="hoveredParticipantId"
            />
          </div>
        </div>
      </transition>
    </main>

    <footer class="app-footer">
      Feito com 💙 por [Seu Nome] — Desafio Cotabox
    </footer>
  </div>
</template>

<script>
// A seção <script> continua a mesma
import TheHeaderForm from './components/TheHeaderForm.vue';
import ParticipantTable from './components/ParticipantTable.vue';
import ParticipationChart from './components/ParticipationChart.vue';
import gql from 'graphql-tag';

const GET_PARTICIPANTS_QUERY = gql`
  query {
    getParticipants {
      id
      firstName
      lastName
      participation
    }
  }
`;

export default {
  name: 'App',
  components: {
    TheHeaderForm,
    ParticipantTable,
    ParticipationChart,
  },
  data() {
    return {
      participants: [],
      isLoading: false,
      isResetting: false,
      hoveredParticipantId: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'right',
        },
      },
    };
  },
  apollo: {
    participants: {
      query: GET_PARTICIPANTS_QUERY,
      update: data => data.getParticipants,
    },
  },
  computed: {
    chartDataForGraph() {
      if (!this.participants || this.participants.length === 0) {
        return { labels: [], datasets: [] };
      }
      return {
        labels: this.participants.map(p => `${p.firstName} ${p.lastName}`),
        participantIds: this.participants.map(p => p.id),
        datasets: [
          {
            backgroundColor: [
              '#00B8D9', '#36B37E', '#6554C0', '#FFAB00', '#FF5630',
              '#0052CC', '#5243AA', '#FF8B00'
            ],
            borderColor: '#ffffff',
            data: this.participants.map(p => p.participation),
          },
        ],
      };
    }
  },
  methods: {
    handleAddParticipant(participantData) {
      this.isLoading = true;
      this.$apollo.mutate({
        mutation: gql`
          mutation($firstName: String!, $lastName: String!, $participation: Int!) {
            addParticipant(
              firstName: $firstName,
              lastName: $lastName,
              participation: $participation
            ) {
              id
            }
          }
        `,
        variables: participantData,
        refetchQueries: [{ query: GET_PARTICIPANTS_QUERY }],
      }).then(() => {
        this.$message.success('Participante adicionado com sucesso!');
        this.isLoading = false;
      }).catch(error => {
        console.error(error);
        this.$message.error(error.message.replace('GraphQL error: ', ''));
        this.isLoading = false;
      });
    },
    handleRowHover(participant) {
      this.hoveredParticipantId = participant ? participant.id : null;
    },
    handleResetData() {
      this.$confirm('Isso apagará todos os dados permanentemente. Continuar?', 'Atenção', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      }).then(() => {
        this.isResetting = true;
        this.$apollo.mutate({
          mutation: gql`
            mutation {
              resetData
            }
          `,
          refetchQueries: [{ query: GET_PARTICIPANTS_QUERY }],
        }).then(() => {
          this.$message.success('Dados resetados com sucesso!');
          this.isResetting = false;
        }).catch(error => {
          this.$message.error('Erro ao resetar os dados.');
          this.isResetting = false;
          console.error(error);
        });
      }).catch(() => {
        this.$message.info('Ação cancelada.');       
      });
    }
  },
};
</script>

<style>
/* Estilos Globais e da Aplicação */
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: #f8f9fa;
  color: #333;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-background {
  background: linear-gradient(135deg, #00B8D9, #0077B6);
  padding: 40px 20px 120px 20px;
}

.main-container {
  flex: 1;
  width: 100%;
  /* A mudança está aqui */
  max-width: 1100px;
  margin: -80px auto 40px auto;
  padding: 0 20px;
  position: relative;
  z-index: 10;
}

.data-card {
  background-color: white;
  border-radius: 16px;
  padding: 24px 32px;
  box-shadow: 0 15px 30px rgba(0, 82, 204, 0.1);
}

.data-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 16px;
}
.data-header h2 {
  margin: 0;
  color: #002b40;
}

.data-display-grid {
  display: grid;
  /* E a mudança está aqui, para dar 50% de espaço para cada */
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.app-footer {
  text-align: center;
  padding: 20px;
  color: #adb5bd;
  font-size: 0.9rem;
}

/* Animações */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all .6s ease;
}
.slide-fade-enter {
  transform: translateY(-20px);
  opacity: 0;
}

/* Media Queries */
@media (max-width: 768px) {
  .data-display-grid {
    grid-template-columns: 1fr;
  }
  .page-background {
    padding: 20px 10px 100px 10px;
  }
  .main-container {
    margin-top: -60px;
  }
}
</style>
