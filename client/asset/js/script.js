if(!localStorage.token) {
  window.location = 'login.html'
}

let app = new Vue ({
  el: '#app-vue',
  data: {
      tasks: [],
      title : null,
      description : null,
      status  : 0,
      date    : (new Date()).toLocaleDateString('id-ID'),
      dataLS: localStorage.getItem('facebookId'),
      dataJWT: localStorage.getItem('token'),
      token: localStorage.getItem('token'),
      quoteAuthor: '',
      quoteContent: ''
  },
  created: function() {
    this.showTask()
    this.getQuote()
  },
  methods: {
      getToken: function () {
          return localStorage.getItem('token')
      },
      showTask: function () {
          axios({
            method  : 'get',
            url     : 'http://localhost:3000/todos',
            headers : {
              token: this.token,
            }
          })
          .then(({data}) => {
            this.tasks = data.data_todo
          })
      },
      addTask: function () {
        axios({
          method  : 'post',
          url     : 'http://localhost:3000/todos',
          headers : {
            token: this.token
          },
          data    : {
            title       : this.title,
            description : this.description,
            date        : this.date
          }
        })
        .then(data => {
          this.showTask()
        })
      },
      deleteTask: function(task) {
          axios({
            method  : 'delete',
            url     : 'http://localhost:3000/todos',
            headers : {
              token: this.token,
              id: task._id
            }
          })
          .then(data => {
            this.showTask()
          })
      },
      statusDone: function (task) {
        this.status = 1
        axios({
          method  : 'put',
          url     : 'http://localhost:3000/todos',
          headers : {
            token: this.token,
            id: task._id
          },
          data: {
            status: this.status
          }
        })
        .then(data=> {
          console.log(data);
          this.showTask()
        })
      },
      editTask: function (task) {
        axios.put('http://localhost:3000/todos/', {
          title: this.title,
          description: this.description,
          date: this.date
        }, {
          headers: { 
            token: this.token,
            id: task._id
          }
        })
        .then(data=> {
          console.log(data);
          this.showTask()
        })
      },
      getQuote: function () {
        axios({
          method: 'get',
          url   : 'http://quotes.rest/qod'
        })
        .then(({data}) => {
          console.log(data);
          this.quoteAuthor = data.contents.quotes[0].author,
          this.quoteContent = data.contents.quotes[0].quote
        })
      }
  }
})
