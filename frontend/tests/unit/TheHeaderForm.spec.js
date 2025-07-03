import { mount } from '@vue/test-utils';
import TheHeaderForm from '@/components/TheHeaderForm.vue';
import ElementUI from 'element-ui';
import Vue from 'vue';

// Precisamos registrar o Element UI para o teste entender os componentes <el-*>
Vue.use(ElementUI);

describe('TheHeaderForm.vue', () => {
  it('emits "add-participant" with correct payload when form is submitted', async () => {
    // 1. Monta o componente com uma "simulação" (mock) para a função $message
    const wrapper = mount(TheHeaderForm, {
      mocks: {
        $message: {
          error: jest.fn(),
        },
      },
    });

    // 2. Encontra os inputs e define seus valores
    await wrapper.find('input[placeholder="First name"]').setValue('John');
    await wrapper.find('input[placeholder="Last name"]').setValue('Doe');
    await wrapper.find('input[placeholder="Participation"]').setValue('30');

    // 3. Encontra o formulário e simula a submissão
    await wrapper.find('form').trigger('submit.prevent');

    // 4. Verifica se o evento foi emitido
    expect(wrapper.emitted('add-participant')).toBeTruthy();

    // 5. Verifica se o payload (os dados) do evento está correto
    const expectedPayload = {
      firstName: 'John',
      lastName: 'Doe',
      participation: 30,
    };
    expect(wrapper.emitted('add-participant')[0][0]).toEqual(expectedPayload);
  });

  it('does not emit "add-participant" if a field is empty', async () => {
    // Monta o componente com o mesmo mock
    const wrapper = mount(TheHeaderForm, {
      mocks: {
        $message: {
          error: jest.fn(),
        },
      },
    });

    // Preenche apenas alguns campos
    await wrapper.find('input[placeholder="First name"]').setValue('John');
    await wrapper.find('input[placeholder="Last name"]').setValue('Doe');
    
    // Simula a submissão do formulário
    await wrapper.find('form').trigger('submit.prevent');

    // Verifica que o evento NÃO foi emitido
    expect(wrapper.emitted('add-participant')).toBeUndefined();
  });
});
