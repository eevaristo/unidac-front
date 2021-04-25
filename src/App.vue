<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Café da Manhã Unidac</a>
      </div>
    </nav>

    <div class="container">

      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{erro.field}}</b> - {{erro.defaultMessage}}
        </li>
      </ul>


      <form @submit.prevent="salvar">

          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="lanche.nm_func" >
          <label>CPF</label>
          <input type="number" placeholder="Insira seu CPF" v-model="lanche.nr_cpf" >
          <label>Lanche</label>
          <input type="text" placeholder="Insira seu Lanche" v-model="lanche.nm_lanche" >

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>NOME</th>
            <th>CPF</th>
            <th>LANCHE</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="lanche of lanches" :key="lanche.id">

            <td>{{ lanche.nm_func }}</td>
            <td>{{ lanche.nr_cpf }}</td>
            <td>{{ lanche.nm_lanche }}</td>
            <td>
              <button @click="editar(lanche)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(lanche)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

import Lanche from './services/lanches'

export default {
  name: 'app',
  data () {
    return {
      lanche:{
        id: '',
        nome: '',
        cpf: '',
        lanche: ''
      },
      lanches: [],
      errors: []
    }
  },

  mounted(){
    this.listar()
  },

  methods:{
    
    listar(){
      Lanche.listar().then(resposta => {
        this.lanches = resposta.data
      }).catch(e => {
        console.log(e)
      })
    },

    salvar(){

      if(!this.lanche.id){

        Lanche.salvar(this.lanche).then(resposta => {
          this.resposta = resposta
          this.lanche = {}
          alert('Cadastrado com sucesso!')
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }else{

        Lanche.atualizar(this.lanche).then(resposta => {
          this.resposta = resposta
          this.lanche = {}
          this.errors = {}
          alert('Atualizado com sucesso!')
          this.listar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }
      

    },

    editar(lanche){
      this.lanche = lanche
    },

    remover(lanche){

      if(confirm('Deseja excluir o Lanche?')){
        Lanche.apagar(lanche).then(resposta => {
          this.resposta = resposta
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }

    }
  }

}
</script>

<style>



</style>
