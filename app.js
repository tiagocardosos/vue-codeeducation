Vue.filter('statusGeneral', function(value){

  if(value === false){
    return "Nenhuma conta cadastrada!"
  }

  if(!value){
    return "Nenhuma conta para pagar!"
  }else {
      return "Existem "+value+" contas para serem pagas!"
  }

})

Vue.filter('doneLabel', function(value){
  if(value == 0){
    return 'Não paga'
  }else{
    return 'Paga'
  }
})

var app = new Vue({
  el: "#app",
  data: {
    totalBills: '',
    bill: {
      date_due: '',
      name: '',
      value: 0,
      done: 0
    },
    names: [
      'Conta de luz',
      'Conta de água',
      'Conta de telefone',
      'Supermercado',
      'Cartão de crédito',
      'Empréstimo',
      'Gasolina',
    ],
    menus: [
      {id: 1, name: 'Criar Conta'},
      {id: 0, name: 'Listar Conta'},
    ],
    activedView: 0,
    formType: '',
    title: 'Contas a Pagar',
    bills: [
      {date_due: '20/08/2016', name: 'Conta de luz', value: 39.5, done: true},
      {date_due: '15/08/2016', name: 'Conta de água', value: 99.8, done: false},
      {date_due: '16/08/2016', name: 'Conta de telefone', value: 363.3, done: true},
      {date_due: '20/08/2016', name: 'Supermercado', value: 900, done: false},
      {date_due: '10/08/2016', name: 'Cartão de crédito', value: 2220.5, done: true},
      {date_due: '10/08/2016', name: 'Empréstimo', value: 1525.5, done: false},
      {date_due: '12/08/2016', name: 'Gasolina', value: 125.5, done: true},
    ]
  },
  computed: {
    status: function()
    {
      if(!this.bills.length){
        return false
      }

      var count = 0
      for(var i in this.bills){
        if(!this.bills[i].done){
          count++
        }
      }

      return count
    }
  },
  methods: {
    showView: function(id){
      this.activedView = id
      if(id == 1){
        this.formType = 'insert'
      }
    },
    submit: function(){
      if(this.formType == 'insert'){
        this.bills.push(this.bill)
      }

      this.clearForm()
      this.activedView = 0
    },
    loadBill: function(bill){
      this.bill = bill
      this.activedView = 1
      this.formType = 'update'
    },
    removeBill: function(bill){
      if(confirm('Deseja excluir essa conta?')){
        this.bills.$remove(bill)
      }

    },
    changeDone: function(bill){
      this.bill = bill
      this.bill.done = bill.done == true ? false : true
      this.clearForm()

    },
    clearForm: function(){
      this.bill = {
        date_due: '',
        name: '',
        value: 0,
        done: 0
      }
    }
  }
})
