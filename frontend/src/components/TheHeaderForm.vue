<template>
  <div class="participation-card">
    <h1 class="card-title">PARTICIPATION</h1>
    <p class="card-subtitle">Adicione os participantes do projeto.</p>

    <!-- Novo elemento para exibir a porcentagem restante -->
    <div class="remaining-container" v-if="remaining < 100">
      <p class="remaining-text">
        <span class="remaining-value">{{ remaining }}%</span> de participação disponível
      </p>
    </div>

    <el-form :inline="true" :model="form" class="card-form" @submit.native.prevent="onSubmit">
      <el-form-item>
        <el-input v-model="form.firstName" placeholder="First name" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.lastName" placeholder="Last name" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.participation" placeholder="Participation" type="number" prefix-icon="el-icon-pie-chart"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" :loading="isLoading" icon="el-icon-s-promotion">SEND</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'TheHeaderForm',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    // Recebendo a nova prop
    remaining: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        participation: null
      }
    };
  },
  methods: {
    onSubmit() {
      if (!this.form.firstName || !this.form.lastName || !this.form.participation) {
        this.$message.error('Oops, todos os campos são obrigatórios.');
        return;
      }
      this.$emit('add-participant', {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        participation: parseInt(this.form.participation, 10)
      });
      this.form.firstName = '';
      this.form.lastName = '';
      this.form.participation = null;
    }
  }
}
</script>

<style scoped>
.participation-card {
  background: white;
  padding: 32px 40px;
  border-radius: 16px;
  box-shadow: 0 15px 30px rgba(0, 82, 204, 0.15);
  text-align: center;
  width: 100%;
  max-width: 1100px;
  box-sizing: border-box;
  margin: 0 auto;
}

.card-title {
  font-weight: 700;
  font-size: 2.5rem;
  margin-top: 0;
  margin-bottom: 8px;
  letter-spacing: 1px;
  color: #002b40;
}

.card-subtitle {
  margin-top: 0;
  margin-bottom: 16px; /* Reduzido para dar espaço para o novo texto */
  color: #6c757d;
  font-size: 1.1rem;
}

/* Estilos para o novo container de porcentagem */
.remaining-container {
  margin-bottom: 32px;
}
.remaining-text {
  margin: 0;
  color: #36B37E; /* Verde para indicar "disponível" */
  font-size: 1rem;
}
.remaining-value {
  font-weight: 700;
  font-size: 1.2rem;
}

.card-form {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.card-form .el-form-item {
  margin-bottom: 0;
}

.card-form .el-button {
  background-color: #00B8D9;
  border-color: #00B8D9;
  font-weight: bold;
  padding: 12px 24px;
}
.card-form .el-button:hover {
  background-color: #00a1c0;
  border-color: #00a1c0;
}
</style>
