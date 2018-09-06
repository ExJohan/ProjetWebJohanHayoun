Vue.prototype.$http = axios

const app = new Vue({
  el: '#app',
  data: {
    currentPage: 'liste',
    filter: '',
    menu: '',
    myList: [],
    name: '',
    name1: '',
    amodif: '',
    supptext:'',
    rechtext:'',
    idtext:'',
    mdptext:'',
    admin: ''
  },

  created () {
    // Ici, l'utilisation d'une fonction flêchée () => {} plutôt que function () {} est primordial !
    // sans fonction fléchée, this.myList = ... ne fonctionnera pas comme prévu
    this.$http.get('/list')
      .then(list => {
        this.myList = list.data
      })
      .catch(err => {
      })
      this.admin = 0;	

  },
  methods: {
    searchElement () {
		if(this.rechtext !=""){
			if(exist(this.rechtext, this.myList) == 1){
				for(var i = 0; i < this.myList.length; i++) {
					if(this.rechtext ==  this.myList[i].name){
						launch_toastrech(i);
						this.rechtext ="";
					}
				}
			}else{
				launch_toastsupp();
			}
		}

    },
    modifElement () {
		if(this.admin == 1){
			if(this.amodif != ""){
				if(exist(this.amodif, this.myList) == 1){ 
					if(exist(this.name1, this.myList) == 1){
						launch_toastexist();
					}else if(exist(this.name1,this.myList) == 0){
						this.$http.delete('/list/'+count(this.amodif,this.myList))
						.then(() => {
							this.myList.splice(count(this.amodif,this.myList), 1)
						})

						this.$http.post('/list', {
							name: this.name1
						})
						.then(() => {
							this.myList.push({
								name: this.name1
							})
						})
					}
				}else if(exist(this.amodif, this.myList) == 0){
					launch_toastsupp();
				}
			}
		}else if(this.admin == 0){
			launch_toastpasco();
		}

    },
    theLogin () {
		if(this.idtext == "admin"){
			if(this.mdptext == "admin"){
				this.admin = 1;
				this.currentPage = "mainpage";
			}else{
				launch_toastmdp();
			}
		}else{
			launch_toastident();
		}
    },
    sendNewElement () {
		if(this.name != ""){
			if(exist(this.name, this.myList) == 1){ 
				launch_toastexist();
			}else if(exist(this.name, this.myList) == 0){
		      this.$http.post('/list', {
		        name: this.name
		      })
		      .then(() => {
		        this.myList.push({
		          name: this.name
		        })
		      })
			}
		}

    },
    removeElement () {
		if(this.admin == 1){
			if(this.supptext != ""){
				if(exist(this.supptext, this.myList) == 1){
					var param = count(this.supptext,this.myList);
					//this.myList.splice(count(isExist,this.myList), 1);
					this.$http.delete('/list/' + param, {data : count(this.supptext,this.myList)})
					.then(() => {
						this.myList.splice(param, 1)
			      })
					console.log("thecount : " + param +"count : " +count(this.supptext,this.myList))
				}else if(exist(this.supptext, this.myList) == 0){
					launch_toastsupp();
				}
			}
		}else if(this.admin == 0){
			launch_toastpasco();
		}

    }
  }
})

function exist(aRechercher, myList){
	var Exist = 0;
	for(var i = 0; i < myList.length; i++) {
		if(aRechercher ==  myList[i].name){
			Exist = 1;
		}
	}
	return Exist;
}

function count(aRechercher, myList){
		for(var i = 0; i < myList.length; i++) {
			if(aRechercher == myList[i].name){
				return i;
		}
	}
}


//Les differents toasts
function launch_toastexist() {
    var x = document.getElementById("toast")
    x.className = "show";
    document.getElementById("img").innerHTML = "Erreur";
    document.getElementById("desc").innerHTML = "Cette BD existe déjà";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}

function launch_toastsupp() {
    var x = document.getElementById("toast")
    x.className = "show";
    document.getElementById("img").innerHTML = "Erreur";
    document.getElementById("desc").innerHTML = "Cette BD n'existe pas";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}

function launch_toastident() {
    var x = document.getElementById("toast")
    x.className = "show";
    document.getElementById("img").innerHTML = "Erreur";
    document.getElementById("desc").innerHTML = "Cet identifiant n'existe pas";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}

function launch_toastmdp() {
    var x = document.getElementById("toast")
    x.className = "show";
    document.getElementById("img").innerHTML = "Erreur";
    document.getElementById("desc").innerHTML = "Mauvais mot de passe";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}

function launch_toastpasco() {
    var x = document.getElementById("toast")
    x.className = "show";
    document.getElementById("img").innerHTML = "Erreur";
    document.getElementById("desc").innerHTML = "Vous n'êtes pas connecté";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}

function launch_toastrech(count) {
    var x = document.getElementById("toast")
    x.className = "show";
    count++;
    document.getElementById("img").innerHTML = "Trouvé";
    document.getElementById("desc").innerHTML = "Votre BD existe au rang "+count+"";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}

