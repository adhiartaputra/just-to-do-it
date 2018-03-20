if(!localStorage.token) {
  window.location = 'login.html'
}

new Vue ({
  el: '#app-vue',
  data: {
      tasks: [],
      title : null,
      description : null,
      status  : false,
      date    : new Date(),
      dataLS: localStorage.getItem('facebookId'),
      dataJWT: localStorage.getItem('token'),
      token: localStorage.getItem('token')
  },
  created: function() {
    this.showTask()
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
        this.status = true        
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
        axios({
          method  : 'put',
          url     : 'http://localhost:3000/todos',
          headers : {
            token: this.token,
            id: task._id
          },
          data: {
            title: this.title,
            description: this.description,
            date: this.date
          }
        })
        .then(data=> {
          console.log(data);
          this.showTask()
        })
      },
      logout: function () {
        window.location = 'login.html'
        localStorage.removeItem('token')
        localStorage.removeItem('facebookId')
        localStorage.removeItem('name')
      }
  }
})
